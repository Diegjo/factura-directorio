# Bajío Inmobiliario

Revista digital diaria de bienes raíces en **Querétaro y El Bajío** — oportunidades para inversionistas.

La home es la edición del día: **un headline** más **tres noticias** y una entrada corta. Las notas largas viven como artículos y todo se archiva por fecha y por categoría.

Marca: **Bajío Inmobiliario** (dominio futuro tipo bajioinmobiliario.mx — no configurado aquí).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4 + ESLint
- Contenido en JSON bajo `/content` (sin base de datos, sin autenticación, sin BaaS)
- SEO: metadata por ruta, `src/app/sitemap.ts`, `src/app/robots.ts`
- Tipografía: Playfair Display para titulares, Inter para texto

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Build de producción:

```bash
npm run build
npm start
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Edición de hoy: intro, headline del día, 3 noticias más, nota del editor |
| `/edicion/[fecha]` | Edición de un día específico (`YYYY-MM-DD`) con navegación anterior/siguiente |
| `/articulo/[slug]` | Nota larga: datos clave, cuerpo, lectura para inversionistas y fuentes |
| `/categoria/[slug]` | Todas las notas de una sección, de la más reciente a la más vieja |
| `/archivo` | Listado completo de ediciones |

La home siempre muestra la edición con la **fecha más alta** en `content/ediciones`. No hay que tocar código para publicar.

## Cómo publicar la edición de mañana

1. Copia la edición más reciente:

```bash
cp content/ediciones/2026-09-08.json content/ediciones/2026-09-09.json
```

2. Abre el archivo nuevo y actualiza el campo `fecha` para que coincida con el nombre del archivo (`YYYY-MM-DD`).
3. Escribe el `intro`, el `headline` y las 3 notas de `masNoticias`. Cada nota necesita `title`, `slug`, `summary` y `category`.
4. Usa un `category` que exista en `content/categorias`: `industrial`, `aeroportuario`, `residencial`, `corporativo`, `tierra`.
5. Si la nota viene de un medio, agrega `sourceUrl` y `sourceName`. Si la cifra es precio de lista, índice de portal o proyección, marca `"aproximado": true`.
6. Opcional: si una nota merece desarrollo, crea `content/articulos/<slug>.json` con el **mismo slug** de la nota. La edición detecta el artículo y cambia el enlace de "Ver en la edición" a "Leer la nota completa".
7. Levanta `npm run dev`, revisa `/` y corre `npm run build` antes de desplegar.

No hace falta registrar rutas ni fechas en ningún índice: `generateStaticParams` lee `/content` en cada build.

## Schema de contenido

Loaders: `src/lib/content.ts`. Tipos: `src/lib/types.ts`.

### Edición — `content/ediciones/<YYYY-MM-DD>.json`

| Campo | Tipo | Notas |
|-------|------|-------|
| `fecha` | `string` | `YYYY-MM-DD`, igual al nombre del archivo |
| `intro` | `string` | Dos o tres frases que abren la edición |
| `headline` | `Nota` | La nota principal del día |
| `masNoticias` | `Nota[]` | Normalmente 3; la UI se adapta al número real |
| `editorialNote` | `string?` | Caja "Nota del editor" al pie de la edición |

Una `Nota` es:

| Campo | Tipo | Notas |
|-------|------|-------|
| `title` | `string` | Titular |
| `slug` | `string` | Identificador; si existe `content/articulos/<slug>.json`, enlaza ahí |
| `summary` | `string` | Resumen de 2–3 frases con la cifra que importa |
| `category` | `string` | Slug de `content/categorias` |
| `sourceUrl` | `string?` | Liga al medio original |
| `sourceName` | `string?` | Nombre del medio |
| `aproximado` | `boolean?` | Muestra la etiqueta "Dato aproximado" |

### Artículo — `content/articulos/<slug>.json`

| Campo | Tipo | Notas |
|-------|------|-------|
| `slug` | `string` | Igual al nombre del archivo y al slug de la nota |
| `title` | `string` | Titular |
| `dek` | `string` | Bajada editorial debajo del título |
| `summary` | `string` | Se usa en metadata y en listados |
| `category` | `string` | Slug de categoría |
| `fecha` | `string` | `YYYY-MM-DD`; liga de regreso a su edición |
| `aproximado` | `boolean?` | Etiqueta "Dato aproximado" |
| `datos` | `DatoClave[]?` | Tabla "Datos clave": `etiqueta`, `valor`, `nota?` |
| `cuerpo` | `{ heading?, body }[]` | Bloques de texto; `heading` opcional |
| `paraInversionistas` | `string[]?` | Caja de lectura práctica |
| `fuentes` | `{ medio, url }[]?` | Bibliografía al pie |

### Categoría — `content/categorias/<slug>.json`

Campos: `slug`, `nombre`, `descripcion`, `orden` (número; controla el orden en la navegación).

Para abrir una sección nueva basta agregar un JSON aquí: aparece en el header, en el footer y en el sitemap.

## Seed incluido

**Ediciones:** `2026-09-08` (industrial, aeroportuario, residencial, tierra) y `2026-09-07` (corporativo, industrial, residencial, tierra).

**Artículos:** `inventario-industrial-queretaro-julio-2026`, `ciudad-aeropuerto-aiq-inversion-inmobiliaria`, `precio-vivienda-queretaro-2026`, `precio-tierra-industrial-bajio-2026`, `oficinas-queretaro-disponibilidad-2t-2026`.

**Categorías:** industrial, aeroportuario, residencial, corporativo, tierra.

Las notas del seed citan la fuente original con `sourceUrl`. Las cifras que provienen de precios de lista, índices de portales inmobiliarios o proyecciones a futuro están marcadas con `"aproximado": true` y se muestran con la etiqueta "Dato aproximado". Dos notas de la edición del 7 de septiembre no tienen artículo largo a propósito: sirven de ejemplo del comportamiento cuando solo existe la nota corta.

## Notas para Vercel

1. Importa el proyecto en Vercel (preset Next.js).
2. Build command por defecto; no hay variables de entorno obligatorias.
3. Cuando tengas el dominio, apúntalo en Vercel y actualiza `src/lib/site.ts` (`url`) para `metadataBase`, sitemap y robots.
4. Cada deploy regenera las páginas estáticas desde `/content`.

## Aviso

Publicación editorial independiente. No somos asesores de inversión ni intermediarios inmobiliarios. Verifica precios, factibilidad de servicios y uso de suelo con la fuente original, con un avalúo y con la autoridad municipal antes de tomar una decisión.
