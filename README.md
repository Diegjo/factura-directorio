# FacturaDirectorio

Directorio en español (es-MX) de software de facturación electrónica **CFDI** y herramientas contables para freelancers y PyMEs en México.

Marca: **FacturaDirectorio** (dominio futuro tipo facturadirectorio.mx — no configurado aquí).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + ESLint
- Contenido en JSON bajo `/content` (sin base de datos, sin autenticación, sin BaaS)
- SEO: metadata, `src/app/sitemap.ts`, `src/app/robots.ts`

## Correr en local

```bash
cd factura-directorio
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
| `/` | Home: intro, chips de categoría, grid, links a guías |
| `/herramientas` | Listado de herramientas |
| `/herramientas/[slug]` | Ficha completa + CTA afiliado placeholder |
| `/comparar` | Listado de comparaciones |
| `/comparar/[slug]` | Tabla comparativa |
| `/guias` | Listado de guías |
| `/guias/[slug]` | Artículo |
| `/categoria/[slug]` | Filtro por categoría |

## Schema de contenido

Loaders: `src/lib/content.ts`. Tipos: `src/lib/types.ts`.

### Herramienta — `content/herramientas/<slug>.json`

Campos: `slug`, `name`, `tagline`, `description`, `paraQuien[]`, `precios` (`resumen`, `detalle?`, `aproximado`), `checklistCfdi[]`, `pros[]`, `contras[]`, `alternativas[]` (slugs), `categorias[]` (slugs), `sitioWeb`, `affiliateUrl?`, `featured?`.

- Precios: usa `aproximado: true` o texto "consultar web".
- `affiliateUrl` vacío → la UI usa `sitioWeb` sin rel sponsored.
- No inventes programas de afiliados reales.

### Comparación — `content/comparaciones/<slug>.json`

Campos: `slug`, `title`, `description`, `tools` (par de slugs), `criterios[]` (`nombre`, `a`, `b`), `veredicto`.

### Guía — `content/guias/<slug>.json`

Campos: `slug`, `title`, `description`, `keyword`, `fecha`, `contenido[]` (`heading`, `body`).

### Categoría — `content/categorias/<slug>.json`

Campos: `slug`, `name`, `description`.

## Workflow nocturno (agregar 1 página)

1. Elige tipo: herramienta, guía o comparación.
2. Copia un JSON existente en la carpeta correspondiente.
3. Renombra el archivo a `<slug>.json` y alinea el campo `slug`.
4. Escribe copy real en español mexicano (sin lorem).
5. Si es herramienta: usa slugs válidos en `categorias` y `alternativas`.
6. Levanta el servidor de desarrollo y abre la ruta nueva.
7. Ejecuta el build antes de desplegar.

No hace falta tocar rutas: `[slug]` + `generateStaticParams` las recoge al build.

## Seed incluido

**Herramientas:** facturama, alegra, contpaqi-factura, senhub, facturapi, portal-sat

**Comparación:** facturama-vs-alegra

**Guía:** software-cfdi-barato-freelancers-mexico

**Categorías:** freelancers, pymes, despachos, api

## Notas para Vercel

1. Importa el proyecto en Vercel (preset Next.js).
2. Build command por defecto; no hay variables de entorno obligatorias.
3. Cuando tengas el dominio, apúntalo en Vercel y actualiza `src/lib/site.ts` (`url`) para metadataBase, sitemap y robots.
4. Cada deploy regenera páginas estáticas desde `/content`.

## Aviso

Directorio editorial independiente. No somos el SAT. Verifica precios y cumplimiento con fuentes oficiales y tu contador.
