# "Signed by": datos del CRM

La sección "Signed by" de la Home (rama `kurto`) lee quién firma la web del **CRM (adminUNK)**, que es donde se gestionan las personas, sus fotos y su Instagram. No hay que tocar nada en la web para añadir o quitar a alguien: se hace en el CRM y se ve en la siguiente visita.

La base de datos de la web se documenta aparte en [BBDD.md](BBDD.md).

## De dónde salen los datos

En el CRM, esta web es el proyecto **"Web corporativa"**, con slug **`web`**. En el detalle de ese proyecto, el bloque "Firmado por" dice quién lo firma:

- los **usuarios con acceso** al proyecto, automáticamente;
- los **administradores** que se añadan en ese bloque, uno a uno o con "Añadir todos los admins".

No salen las personas desactivadas. El orden lo decide el CRM (por antigüedad de la firma). Si el proyecto se desactiva, la API responde 404.

## La API

```http
GET /api/public/projects/web/signers
X-Api-Key: <clave>
```

Respuesta `200`, con los firmantes ya ordenados:

```json
{
  "signers": [
    {
      "instagram": "darioxgd",
      "instagram_url": "https://www.instagram.com/darioxgd/",
      "avatar_url": "https://media.unkedition.com/avatars/3f2c…-9a1b….webp"
    },
    { "instagram": null, "instagram_url": null, "avatar_url": null }
  ]
}
```

- `instagram` / `instagram_url`: `null` si la persona no tiene Instagram.
- `avatar_url`: foto de 512×512 en WebP, recortada en cuadrado, o `null` si no tiene.
- **No devuelve nombres** a propósito: el nombre del CRM es el usuario de inicio de sesión y no se publica.

| Código | Qué significa |
| --- | --- |
| `200` | Bien (la lista puede venir vacía) |
| `401` | Falta la cabecera `X-Api-Key` o la clave no es la correcta |
| `404` | No existe un proyecto activo con ese slug |
| `503` | El CRM no tiene la clave configurada |

**La llamada se hace siempre desde el servidor** (Server Component), nunca desde el navegador: si no, la clave quedaría a la vista de cualquiera.

## Variables de entorno

| Variable | Local (`.env`) | Producción (`/var/www/unk-web/.env.production`) |
| --- | --- | --- |
| `ADMIN_API_URL` | `https://admin.unkedition.com` | `http://127.0.0.1:3002` (el CRM está en el mismo servidor: va directo, sin salir a Internet ni pasar por Cloudflare) |
| `ADMIN_API_KEY` | La clave de producción (pídesela a Kurto) | La misma clave |

- Sin barra al final en `ADMIN_API_URL`.
- La clave **no se sube al repo** ni se pone en variables `NEXT_PUBLIC_…`, que acabarían en el navegador.
- En el servidor van en **`.env.production`** (junto a `DATABASE_URL`), que es el que tiene prioridad. Ver [BBDD.md → Producción](BBDD.md#producción).

## Cómo lo usa la web

| Archivo | Qué hace |
| --- | --- |
| `src/app/lib/staff.ts` | `getStaff()`: llama a la API y valida la respuesta |
| `src/app/types/staffMember.ts` | Tipo `StaffMember`: `{ id, instagram, instagramUrl, avatar }` |
| `src/app/page.tsx` | Pinta el "Signed by". `dynamic = 'force-dynamic'`: llama al CRM en cada visita |
| `public/avatar-generico.svg` | Avatar para quien no tiene foto. Para cambiar el dibujo, sustituye el archivo con el mismo nombre |
| `next.config.ts` | `images.remotePatterns` autoriza las fotos de `https://media.unkedition.com/avatars/**` |

### `getStaff()`

- Pide `/api/public/projects/web/signers` con `cache: 'no-store'` y un **timeout de 3 s**: si el CRM no responde, la Home no se queda esperando.
- Lanza un error si faltan las variables, si la respuesta no es `2xx` o si no trae la lista `signers`.
- **Valida lo que llega del CRM** antes de pintarlo:
  - **Instagram:** se queda solo con un usuario válido (letras, números, `.` y `_`, máx. 30; se le quita la `@` inicial si la trae) y la URL se construye en la web (`https://www.instagram.com/<usuario>/`). No se usa `instagram_url` tal cual, así nunca se pinta un enlace inesperado. Si el usuario no es válido, se trata como "sin Instagram".
  - **Foto:** solo se acepta si empieza por `https://media.unkedition.com/avatars/`; si no, se trata como "sin foto". Es importante: `next/image` da error al pintar una imagen de un dominio no autorizado, y ese error no lo captura `loadStaff()`, así que tumbaría la Home entera. Si se cambia el dominio de las fotos, hay que actualizar a la vez `AVATAR_URL_PREFIX` en `staff.ts` y `remotePatterns` en `next.config.ts`.

### Cómo se pinta cada firmante

| Caso | Resultado |
| --- | --- |
| Con foto y con Instagram | Foto con enlace a su Instagram (`aria-label` y `title`: `@usuario`) |
| Sin foto | `avatar-generico.svg` |
| Sin Instagram | La foto sin enlace (`title`: "Miembro de UNK") |
| Nadie firma, o el CRM falla | La Home se muestra **sin** la sección "Signed by", y el error queda en el log: `Error obteniendo el staff del CRM: …` |

Las fotos pasan por el optimizador de `next/image` (se sirven a 100 px y en el formato que acepte el navegador). El SVG genérico no (`unoptimized`).

## Probar

En local, con `ADMIN_API_URL` y `ADMIN_API_KEY` en el `.env`:

```bash
# La API directamente
curl -s -H "X-Api-Key: <clave>" https://admin.unkedition.com/api/public/projects/web/signers

# La web
pnpm dev   # y abrir la Home
```

En el servidor, contra el CRM local:

```bash
curl -s -H "X-Api-Key: <clave>" http://127.0.0.1:3002/api/public/projects/web/signers
```

Para probar los casos raros (sin foto, sin Instagram, CRM lento o caído) sin tocar datos del CRM, se puede arrancar la web con `ADMIN_API_URL` apuntando a un servidor falso que devuelva esos casos.

## Problemas típicos

| Síntoma en el log | Causa | Solución |
| --- | --- | --- |
| `Faltan ADMIN_API_URL o ADMIN_API_KEY` | Faltan las variables (o están vacías) | Añadirlas y reiniciar la app |
| `El CRM respondió 401` | Clave mal copiada (espacios, comillas) o distinta de la del CRM | Copiarla otra vez |
| `El CRM respondió 404` | El proyecto `web` no existe en el CRM o está desactivado | Revisarlo en el CRM |
| `TimeoutError` o `fetch failed` | El CRM no responde o `ADMIN_API_URL` está mal (en producción, `http://127.0.0.1:3002`) | Revisar la URL y que el CRM esté en marcha |
| `Respuesta del CRM sin la lista "signers"` | La API ha cambiado de formato | Revisar la API del CRM |
| Error `hostname "…" is not configured under images` | Falta `remotePatterns` en `next.config.ts` | Añadirlo y reiniciar |
| No sale "Signed by" y el log está limpio | La API responde `200` con `"signers": []`: nadie firma el proyecto `web` | Añadirlos en "Firmado por" |
| Sale el avatar genérico aunque la persona tiene foto | La foto no viene de `https://media.unkedition.com/avatars/` | Revisar la URL en el CRM, o actualizar `AVATAR_URL_PREFIX` y `remotePatterns` |

## Pendiente

- **Borrar la tabla `staff` de la BBDD de la web**, que ya no se usa. Cuando lleve unos días funcionando: migración `db/migrations/003_borrar_staff.sql` con `DROP TABLE IF EXISTS staff;`, quitarla de [BBDD.md](BBDD.md) y borrar `public/dario.png`, `kurto.png` y `tresillo.png`.
- **Rama `new-design`:** su `Footer.tsx` tiene el equipo escrito en el código, con nombres. Se deja así (decidido): no lee del CRM.
- **Página de equipo** (más adelante): será otra ruta de la API del CRM, parecida a esta.
