# Base de datos: conexión y obtención de datos

Documentación de cómo la web (rama `new-design`) se conecta a la base de datos y qué datos lee de ella.

## Resumen

- **Motor:** PostgreSQL
- **Cliente:** [`pg`](https://node-postgres.com/) (`pg` + `@types/pg`). Sin ORM, las consultas son SQL escrito a mano.
- **Acceso:** solo de lectura (`SELECT`). Todas las consultas se ejecutan en servidor (Server Components y Route Handlers). El navegador nunca habla con la BBDD directamente.

```
PostgreSQL
   │
   ▼
src/app/lib/db.ts            ← pool de conexiones + helpers query() / transaction()
   │
   ├── src/app/api/projects.ts   getProjects()  ──► Home (src/app/page.tsx)
   │
   └── src/app/lib/news.ts       getNews()      ──► /noticias (src/app/noticias/page.tsx)
                                                └─► GET /api/news-feed ──► NewsGrid (scroll infinito)
```

## Variables de entorno

Definidas en `.env` (ignorado por git, **no se sube al repo**).

| Variable | Uso |
|---|---|
| `DATABASE_URL` | Cadena de conexión a PostgreSQL, p. ej. `postgres://usuario:password@host:5432/basedatos`. **Obligatoria**: si falta, `db.ts` lanza un error al importarse y rompe tanto el arranque como el build. |
| `API_SECRET_KEY` | Clave que exige `middleware.ts` en la cabecera `x-api-key` para las rutas `/api/*` (ver [Problemas conocidos](#problemas-conocidos)). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (no tiene relación con la BBDD). |

## Conexión: `src/app/lib/db.ts`

Crea un único `Pool` de `pg` y lo reutiliza.

| Opción | Valor |
|---|---|
| `connectionString` | `process.env.DATABASE_URL` |
| `max` | 10 conexiones |
| `idleTimeoutMillis` | 30 000 ms |
| `connectionTimeoutMillis` | 2 000 ms |
| `ssl` | Desactivado. Hay una línea comentada (`ssl: { rejectUnauthorized: false }`) por si el proveedor lo pide. |

- **Singleton:** en desarrollo el pool se guarda en `global.pgPool`, así el hot reload no abre conexiones nuevas cada vez.
- **Errores:** los errores del pool se registran con `console.error`.

### Helpers exportados

```ts
// Ejecuta una consulta parametrizada y devuelve las filas tipadas
query<T>(text: string, params?: any[]): Promise<T[]>

// Ejecuta un callback dentro de BEGIN / COMMIT, con ROLLBACK si falla
transaction<T>(callback: (client) => Promise<T>): Promise<T>
```

Usa siempre parámetros (`$1`, `$2`…) y nunca concatenes valores en el SQL.

## Tablas utilizadas

Esquema deducido de las consultas (no hay migraciones ni DDL en el repo).

### `projects`

| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | entero | Se convierte a `number` |
| `title` | texto | |
| `locked` | booleano | Proyecto bloqueado |
| `featured` | booleano | Proyecto destacado |
| `size` | texto | `'default'`, `'mid'` o `'bottom'`: decide en qué fila de la home aparece |
| `tilt` | texto | `'tilt1'` … `'tilt4'`: inclinación de la tarjeta |
| `image` | texto | Ruta de la imagen (p. ej. `/cards/projects/projectRosalia.png`) |
| `link` | texto, nullable | Si es `null` se convierte en `''` |
| `sort_order` | entero | Orden de aparición |

### `news`

| Columna | Tipo esperado | Notas |
|---|---|---|
| `id` | entero | |
| `title` | texto | |
| `subtitle` | texto, nullable | |
| `body` | texto/HTML, nullable | Se le quita el HTML y se recorta a 120 caracteres para el `excerpt` |
| `image` | texto, nullable | |
| `published_at` | fecha/timestamp | Se formatea como `20 NOV 2026` |
| `views` | entero | |
| `link` | texto | Enlace externo (Instagram) |
| `category_id` | FK → `categories.id` | |

### `categories`

| Columna | Tipo esperado |
|---|---|
| `id` | entero |
| `name` | texto |

## Obtención de datos

### Proyectos: `getProjects()`

Archivo: `src/app/api/projects.ts`

```sql
SELECT id, title, locked, featured, size, tilt, image, link, sort_order
FROM projects
ORDER BY sort_order ASC
```

- Devuelve `ProjectCard[]` (`src/app/types/projectCard.ts`).
- `size = 'default'` se convierte en `undefined`.
- **Se usa en:** `src/app/page.tsx` (Home). Ahí los proyectos se reparten en tres filas según `size`:
  - fila superior: `default` o sin valor
  - fila central: `mid`
  - fila inferior: `bottom`

### Noticias: `getNews(page = 1, limit = 12)`

Archivo: `src/app/lib/news.ts` (reexportado también desde `src/app/api/news.ts`)

```sql
SELECT n.id, n.title, n.subtitle, n.body, n.image, n.published_at, n.views, n.link,
       c.name AS category
FROM news n
LEFT JOIN categories c ON c.id = n.category_id
ORDER BY n.published_at DESC
LIMIT $1 OFFSET $2
```

- **Paginación:** pide `limit + 1` filas. Si llegan más de `limit`, devuelve `hasMore = true`.
- **Respuesta:** `{ articles: NewsArticle[], hasMore: boolean }` (`src/app/types/newsArticle.ts`).
- **Transformaciones:**
  - `body` → `excerpt` (sin HTML, máximo 120 caracteres + `…`)
  - `published_at` → `publishedAt` con mes abreviado en español
  - `id` y `views` se convierten a `number`
- **Se usa en:**
  1. `src/app/noticias/page.tsx`: carga en servidor la página 1 (12 noticias).
  2. `GET /api/news-feed?page=N&limit=M` (`src/app/api/news-feed/route.ts`): `page` como mínimo 1 y `limit` entre 1 y 50 (por defecto 12).
  3. `src/app/noticias/NewsGrid.tsx` (cliente): llama a `/api/news-feed` al hacer scroll (scroll infinito con `IntersectionObserver`).

## Datos que **no** vienen de la BBDD (todavía)

En `src/app/page.tsx` siguen escritos en el código:

- `newsItems`: tarjetas del slider de noticias de la Home
- `drops`: slider de drops

## Problemas conocidos

1. **`/api/news-feed` y el middleware.** `middleware.ts` exige la cabecera `x-api-key` en todas las rutas `/api/*`, pero `NewsGrid.tsx` hace el `fetch` sin ella.
   - Si el middleware se aplica, el scroll infinito recibe un 401 y falla (`data.articles` llega como `undefined`).
   - Además, `middleware.ts` está en la raíz y el proyecto usa `src/`, así que Next probablemente lo ignora (debería estar en `src/`). En Next 16 el archivo pasa a llamarse `proxy.ts`. Si no se aplica, la API queda abierta.
   - Hay que decidir si `/api/news-feed` es pública (excluirla del matcher) o usar otro mecanismo, porque una clave enviada desde el navegador deja de ser secreta.
2. **Datos fijados en el build (sin verificar).** La Home y `/noticias` no declaran `dynamic` ni `revalidate`. Next puede prerenderizarlas en el build, lo que implica dos cosas:
   - hace falta acceso a la BBDD durante el build;
   - los datos quedan congelados hasta el siguiente deploy.

   Si se quieren datos al día, añade `export const dynamic = 'force-dynamic'` o `export const revalidate = <segundos>`.
3. **Sin manejo de errores.** Ni `getProjects()`, ni `getNews()`, ni el route handler capturan errores. Si la BBDD cae, la página entera falla.
4. **Desajustes de tipos:**
   - `ProjectCard` tiene `timer`, que no se selecciona en la consulta.
   - La consulta devuelve `sort_order`, que no está en el tipo.
