# Bajío Inmobiliario

Revista digital diaria de bienes raíces en **Querétaro y El Bajío** — oportunidades para inversionistas.

La home es la edición del día: **un headline** más **tres noticias** y una entrada corta. Las notas largas viven como artículos y todo se archiva por fecha y por categoría.

Marca: **Bajío Inmobiliario**. Publicado en <https://bajioinmobiliario.vercel.app> (`src/lib/site.ts` → `url`); cuando exista dominio propio se cambia ahí.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4 + ESLint
- Contenido en JSON bajo `/content` (sin base de datos, sin autenticación, sin BaaS)
- Fotos de referencia en `public/img/notas`, servidas con `next/image`
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
| `/categoria/[slug]` | Todo lo publicado en una sección (notas de edición y artículos de fondo), de lo más reciente a lo más viejo |
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
6. Ponle `image` a cada nota (ver [Imagen de referencia](#imagen-de-referencia)). Sin `image` la nota se publica igual, solo sin foto.
7. Opcional: si una nota merece desarrollo, crea `content/articulos/<slug>.json` con el **mismo slug** de la nota. La edición detecta el artículo y cambia el enlace de "Ver en la edición" a "Leer la nota completa". Un artículo sin nota que lo referencie también es válido: se publica como pieza de fondo y aparece en su categoría.
8. Levanta `npm run dev`, revisa `/` y corre `npm run build` antes de desplegar.

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
| `image` | `Imagen?` | Foto de referencia. Grande en el headline, miniatura en las 3 noticias |

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
| `image` | `Imagen?` | Foto de apertura; también se usa como imagen de Open Graph |
| `datos` | `DatoClave[]?` | Tabla "Datos clave": `etiqueta`, `valor`, `nota?` |
| `cuerpo` | `{ heading?, body }[]` | Bloques de texto; `heading` opcional |
| `paraInversionistas` | `string[]?` | Caja de lectura práctica |
| `fuentes` | `{ medio, url }[]?` | Bibliografía al pie |

### Imagen de referencia

Tanto `Nota` como `Articulo` aceptan un campo `image`. Es una foto **de referencia**: ilustra el tema (parque industrial, aeropuerto, vivienda, suelo, oficinas), no documenta el hecho concreto de la nota.

| Campo | Tipo | Notas |
|-------|------|-------|
| `src` | `string` | Ruta bajo `/public`, normalmente `/img/notas/<archivo>.jpg` |
| `alt` | `string` | Texto alternativo en español: describe lo que se ve, no repitas el titular |
| `width` | `number` | Ancho real del archivo en px |
| `height` | `number` | Alto real del archivo en px |
| `credit` | `string?` | Autor y licencia, tal como se muestra al pie |
| `creditUrl` | `string?` | Ficha original de la imagen |

Dónde se ve cada variante (`src/components/ImagenNota.tsx`):

| Variante | Dónde | Crédito |
|----------|-------|---------|
| `grande` | Headline del día en `/` y en `/edicion/[fecha]` | Al pie de la foto |
| `media` | Apertura de `/articulo/[slug]` | Al pie de la foto |
| `thumb` | Miniatura de cada una de las 3 noticias | En el bloque "Créditos de imagen" al final de la edición |

Para agregar una foto nueva:

1. Consigue una imagen con licencia que permita uso comercial (Wikimedia Commons, Unsplash, Pexels) o una propia. **No enlaces fotos de medios de noticias.**
2. Recórtala a 3:2 y guárdala en `public/img/notas/` a 1600 × 1067 px, JPEG. Las del seed se generaron así para que todas las miniaturas y aperturas caigan en la misma proporción.
3. Agrega el bloque `image` al JSON de la nota y, si existe, al del artículo con el mismo slug.
4. Llena `credit` con autor y licencia (`"Autor / Wikimedia Commons (CC BY-SA 4.0)"`) y `creditUrl` con la ficha de origen. Las licencias CC BY y CC BY-SA obligan a dar crédito.

Si en lugar de un archivo local quieres una URL remota, primero registra el host en `images.remotePatterns` de `next.config.ts`; `next/image` rechaza cualquier dominio no declarado.

### Categoría — `content/categorias/<slug>.json`

Campos: `slug`, `nombre`, `descripcion`, `orden` (número; controla el orden en la navegación).

Para abrir una sección nueva basta agregar un JSON aquí: aparece en el header, en el footer y en el sitemap.

## Seed incluido

**Edición del 2026-09-08** (la primera edición, con investigación de campo):

| | Nota | Categoría |
|---|------|-----------|
| Headline | Vacancia industrial en 4.8% y renta Clase A cerca de 6.75 USD/m²; absorción de ~287 mil m² en el 1T | `industrial` |
| 1 | 10 proyectos por 8,131 mdp y 3,479 empleos (SEDESU); Costco Corregidora y Phoenix Contact | `corporativo` |
| 2 | Segunda terminal del AIQ antes de octubre de 2027, con 1,500 mdp y Ciudad Aeropuerto | `aeroportuario` |
| 3 | El tren México–Querétaro repreciando suelo en El Marqués, Corregidora y San Juan del Río | `tierra` |

**Edición del 2026-09-07:** oficinas (headline), industrial, residencial y tierra.

**Artículos:** `industrial-queretaro-vacancia-rentas-1t-2026`, `cartera-inversiones-queretaro-1t-2026`, `segunda-terminal-aiq-ciudad-aeropuerto-2027`, `tren-mexico-queretaro-plusvalia-suelo`, `oficinas-queretaro-disponibilidad-2t-2026`, `precio-vivienda-queretaro-2026`, `precio-tierra-industrial-bajio-2026`.

**Categorías:** industrial, aeroportuario, residencial, corporativo, tierra.

Cada nota cita la fuente original con `sourceUrl` y `sourceName`. Las cifras que provienen de precios de lista, índices de portales, mapas de precio por colonia o proyecciones de consultoría están marcadas con `"aproximado": true` y se muestran con la etiqueta "Dato aproximado"; la `editorialNote` de cada edición explica el caveat.

Las 8 notas y los 7 artículos del seed traen `image`. Las 10 fotos de `public/img/notas` vienen de Wikimedia Commons bajo CC BY o CC BY-SA, con el autor y la licencia en `credit` y la ficha original en `creditUrl`. Siete son de Querétaro o Guanajuato (parque industrial, terminal del AIQ, patio ferroviario, corporativo de oficinas, Juriquilla, suelo rústico en Dolores Hidalgo); las de centro de datos y nave corporativa ilustran el tipo de activo, no el proyecto que menciona la nota.

Dos notas de la edición del 7 de septiembre no tienen artículo largo a propósito: sirven de ejemplo del comportamiento cuando solo existe la nota corta. Los artículos `precio-vivienda-queretaro-2026` y `precio-tierra-industrial-bajio-2026` son piezas de fondo que no pertenecen a ninguna edición: aparecen en su categoría y en el sitemap, pero no en la portada de un día.

## Notas para Vercel

1. Importa el proyecto en Vercel (preset Next.js).
2. Build command por defecto; no hay variables de entorno obligatorias.
3. `src/lib/site.ts` (`url`) apunta a `https://bajioinmobiliario.vercel.app` y de ahí salen `metadataBase`, el sitemap y robots. Cuando tengas dominio propio, apúntalo en Vercel y cambia ese valor.
4. Cada deploy regenera las páginas estáticas desde `/content`. Las fotos de `public/img/notas` las optimiza `next/image` en el edge, sin configuración extra.

## Aviso

Publicación editorial independiente. No somos asesores de inversión ni intermediarios inmobiliarios. Verifica precios, factibilidad de servicios y uso de suelo con la fuente original, con un avalúo y con la autoridad municipal antes de tomar una decisión.
