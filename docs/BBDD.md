# Base de datos: conexión y obtención de datos

Documentación de cómo la web se conecta a la base de datos y qué datos lee de ella.

La **capa de datos** (conexión, consultas, API y tipos) vive en la rama de desarrollo `kurto` y es independiente del diseño. Las **páginas que la usan** son del diseño nuevo (rama `new-design`); se marcan con _(new-design)_ en este documento.

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
   ├── src/app/lib/projects.ts   getProjects()  ──► Home (src/app/page.tsx)                (new-design)
   │
   └── src/app/lib/news.ts       getNews()      ──► /noticias (src/app/noticias/page.tsx)  (new-design)
                                                └─► GET /api/news-feed
                                                        └─► NewsGrid (scroll infinito)       (new-design)
```

| Capa de datos (`kurto`) | Usa la capa de datos (`new-design`) |
| --- | --- |
| `src/app/lib/db.ts`, `src/app/lib/projects.ts`, `src/app/lib/news.ts` | `src/app/page.tsx` (Home) |
| `src/app/api/news-feed/route.ts` | `src/app/noticias/page.tsx`, `src/app/noticias/NewsGrid.tsx` |
| `src/app/types/projectCard.ts`, `src/app/types/newsArticle.ts` | |

## Variables de entorno

Definidas en `.env` (ignorado por git, **no se sube al repo**).

| Variable | Uso |
| --- | --- |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL, p. ej. `postgres://usuario:password@host:5432/basedatos`. **Obligatoria**: si falta, `db.ts` lanza un error al importarse y rompe tanto el arranque como el build. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (no tiene relación con la BBDD). |

## Conexión: `src/app/lib/db.ts`

Crea un único `Pool` de `pg` y lo reutiliza.

| Opción | Valor |
| --- | --- |
| `connectionString` | `process.env.DATABASE_URL` |
| `max` | 10 conexiones |
| `idleTimeoutMillis` | 30 000 ms |
| `connectionTimeoutMillis` | 2 000 ms |
| `ssl` | Desactivado. Hay una línea comentada (`ssl: { rejectUnauthorized: false }`) por si el proveedor lo pide. |

- **Singleton:** en desarrollo el pool se guarda en `global.pgPool`, así el hot reload no abre conexiones nuevas cada vez.
- **Errores:** los errores del pool se registran con `console.error`.
- **Columnas `DATE`:** se devuelven como texto `'YYYY-MM-DD'` (`types.setTypeParser`). Por defecto `pg` las convertiría en un `Date` a medianoche de la zona horaria del servidor, y el día mostrado podría cambiar según dónde se ejecute.

### Helpers exportados

```ts
// Ejecuta una consulta parametrizada y devuelve las filas tipadas
query<T extends QueryResultRow>(text: string, params?: unknown[]): Promise<T[]>

// Ejecuta un callback dentro de BEGIN / COMMIT, con ROLLBACK si falla
transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T>
```

Usa siempre parámetros (`$1`, `$2`…) y nunca concatenes valores en el SQL.

## Tablas utilizadas

Tipos tomados de `information_schema` (no hay migraciones ni DDL en el repo).

### `projects`

| Columna | Tipo | Notas |
| --- | --- | --- |
| `id` | `bigint` | Se convierte a `number` |
| `title` | `varchar` | |
| `locked` | `boolean` | Proyecto bloqueado. `null` → `false` |
| `featured` | `boolean` | Proyecto destacado (muestra la imagen y el enlace). `null` → `false` |
| `size` | enum | `'default'`, `'mid'` o `'bottom'`: decide en qué fila de la home aparece. `null` → `'default'` |
| `tilt` | enum | `'tilt1'` … `'tilt4'`: inclinación de la tarjeta |
| `image` | `text` | Ruta de la imagen (p. ej. `/cards/projects/projectRosalia.png`) |
| `link` | `text`, nullable | Si es `null` se convierte en `''` |
| `sort_order` | `integer` | Orden de aparición (solo se usa en el `ORDER BY`) |
| `created_at`, `updated_at` | `timestamptz` | No se leen |

### `news`

| Columna | Tipo | Notas |
| --- | --- | --- |
| `id` | `bigint` | |
| `title` | `varchar` | |
| `subtitle` | `varchar`, nullable | |
| `body` | `text` (HTML), nullable | Se pasa a texto plano y se recorta a 120 caracteres para el `excerpt` |
| `image` | `text`, nullable | Ahora mismo ninguna noticia tiene imagen |
| `published_at` | `date` | Sin hora. Se formatea como `20 NOV 2026` |
| `views` | `integer` | |
| `link` | `text` | Enlace externo (Instagram) |
| `category_id` | `bigint` → `categories.id` | |
| `created_at`, `updated_at` | `timestamptz` | No se leen |

### `categories`

| Columna | Tipo |
| --- | --- |
| `id` | `bigint` |
| `name` | `varchar` |

## Obtención de datos

### Proyectos: `getProjects()`

Archivo: `src/app/lib/projects.ts`

```sql
SELECT id, title, locked, featured, size, tilt, image, link
FROM projects
ORDER BY sort_order ASC, id ASC
```

- Devuelve `ProjectCard[]` (`src/app/types/projectCard.ts`).
- **Se usa en:** `src/app/page.tsx` (Home) _(new-design)_. Ahí los proyectos se reparten en tres filas según `size`:
  - fila superior: `default`
  - fila central: `mid`
  - fila inferior: `bottom`

### Noticias: `getNews(page = 1, limit = 12)`

Archivo: `src/app/lib/news.ts`

```sql
SELECT n.id, n.title, n.subtitle, n.body, n.image, n.published_at, n.views, n.link,
       c.name AS category
FROM news n
LEFT JOIN categories c ON c.id = n.category_id
ORDER BY n.published_at DESC, n.id DESC
LIMIT $1 OFFSET $2
```

- **Orden estable:** `published_at` es una fecha sin hora y muchas noticias comparten día. El desempate por `id` hace que el orden sea siempre el mismo; sin él, la paginación por `OFFSET` podría repetir o saltarse noticias entre páginas.
- **Paginación:** pide `limit + 1` filas. Si llegan más de `limit`, devuelve `hasMore = true`.
- **Respuesta:** `{ articles: NewsArticle[], hasMore: boolean }` (`src/app/types/newsArticle.ts`).
- **Transformaciones:**
  - `body` → `excerpt`: las etiquetas se cambian por un espacio (para que no se peguen las palabras de párrafos distintos), se decodifican las entidades HTML (`&amp;`, `&aacute;`, `&#225;`…), se normalizan los espacios y se recorta a 120 caracteres + `…` sin partir emojis.
  - `published_at` → `publishedAt` con mes abreviado en español. Como llega como texto `'YYYY-MM-DD'`, el resultado no depende de la zona horaria del servidor. Si la columna pasara a ser `timestamp`, se formatea en `Europe/Madrid`.
  - `id` y `views` se convierten a `number`.
- **Se usa en:**
  1. `src/app/noticias/page.tsx` _(new-design)_: carga en servidor la página 1 (12 noticias).
  2. `GET /api/news-feed?page=N&limit=M` (`src/app/api/news-feed/route.ts`): ruta **pública** (sin clave). `page` entre 1 y 10 000 y `limit` entre 1 y 50; si no son números válidos se usan los valores por defecto (1 y 12). Si la BBDD falla, devuelve `500` con `{ error }`.
  3. `src/app/noticias/NewsGrid.tsx` _(new-design)_ (cliente): llama a `/api/news-feed` al hacer scroll (scroll infinito con `IntersectionObserver`). Descarta noticias repetidas por `id`. Si una petición falla, deja de cargar sola y muestra un botón **Reintentar**.

## Build y refresco de datos

- **`DATABASE_URL` siempre es obligatoria en el build**, aunque ninguna página consulte la BBDD: Next importa el route handler de `/api/news-feed` al compilar, y `db.ts` lanza un error si la variable no existe.
- **Conexión con la BBDD en el build:** solo hace falta si alguna página consulta datos al generarse. En `kurto` no hay ninguna, así que el build funciona aunque la BBDD no esté accesible (la API solo conecta al recibir peticiones).
- **Páginas con datos** _(new-design)_: la Home y `/noticias` declaran `export const revalidate = 60`.
  - Se generan en el build, así que ahí **el build sí necesita conectar con la BBDD**.
  - Después, Next las regenera en segundo plano como mucho cada 60 s cuando alguien las visita.
  - Si la BBDD falla al regenerar, Next sigue sirviendo la última versión buena.
  - Cualquier página nueva que use `getProjects()` o `getNews()` debería declarar también `revalidate` (o `dynamic = 'force-dynamic'`); si no, sus datos se congelan en el build.

## Seguridad de la API

No hay middleware ni clave de API: todos los datos que se exponen ya son públicos en la web, y una clave enviada desde el navegador no sería secreta. Si en el futuro hay rutas privadas (p. ej. de escritura), protégelas con autenticación real en un `src/proxy.ts` (nombre que usa Next 16 en lugar de `middleware.ts`) limitado a esas rutas.

## Datos que **no** vienen de la BBDD (todavía)

En `src/app/page.tsx` _(new-design)_ siguen escritos en el código:

- `newsItems`: tarjetas del slider de noticias de la Home
- `drops`: slider de drops

## Pendiente

1. **Producción.** El deploy se lanza al hacer push a `master`. Antes de integrar la capa de datos en `master`, el `.env` del servidor de producción tiene que tener `DATABASE_URL` y la BBDD tiene que ser accesible desde ese servidor; si no, el build falla (falta la variable) o la API devuelve `500` (no hay conexión).
2. **Build sin BBDD** _(new-design)_. Si la BBDD no está accesible durante el build, el build falla, porque las páginas se prerenderizan con datos.
3. **Imágenes de Instagram.** Las noticias serán Reels y publicaciones de Instagram. Si `news.image` lleva URLs externas, hay que permitir esos dominios en `images.remotePatterns` de `next.config.ts` o `next/image` dará error.
