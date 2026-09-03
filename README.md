# Portafolio — Jose Gerardo Martínez Morán

Sitio personal estático, bilingüe (español e inglés), publicado en GitHub Pages.

Está escrito para que lo mantengas **tú, dentro de seis meses, sin recordar nada**. Si sólo vienes a
agregar un proyecto o a publicar una demo, ve directo a [Tareas frecuentes](#tareas-frecuentes).

---

## Lo esencial en treinta segundos

- **Generador:** [Eleventy](https://www.11ty.dev/) (11ty). Una sola dependencia.
- **El contenido NO vive en el HTML.** Vive en `src/_data/*.json`. Editas JSON, se regenera el sitio.
- **Idiomas:** español en `/`, inglés en `/en/`. Cada texto traducible es un objeto `{ "es": "...", "en": "..." }`.
- **Modo claro/oscuro:** automático según el sistema, con botón para forzarlo. No tienes que tocar nada.
- **Publicar:** haces `git push` a `main` y GitHub Actions despliega solo.

```bash
npm install     # una sola vez
npm start       # servidor local en http://localhost:8080 con recarga automática
npm run build   # genera _site/ (lo que se publica)
```

---

## Estructura de archivos

```
.
├── .github/workflows/deploy.yml   Despliegue automático a GitHub Pages
├── eleventy.config.cjs            Configuración: rutas, filtros, pathPrefix
├── cv/
│   └── gerardo-martinez-cv.pdf    ← PON AQUÍ TU CV con ese nombre exacto
└── src/
    ├── _data/                     ► TODO EL CONTENIDO ESTÁ AQUÍ
    │   ├── site.json              Nombre, correo, redes, ubicación, URL del sitio
    │   ├── i18n.json              Textos de la interfaz (menús, títulos de sección, botones)
    │   ├── projects.json          Proyectos + sus casos de estudio
    │   ├── techtests.json         Pruebas técnicas entregadas
    │   ├── experience.json        Historial laboral
    │   ├── technologies.json      Tecnologías agrupadas por fuerza de evidencia
    │   └── training.json          Formación y certificaciones
    ├── _includes/
    │   ├── layout.njk             Cabecera, pie, metadatos, JSON-LD
    │   ├── home-body.njk          La portada
    │   └── case-body.njk          Plantilla de caso de estudio (proyectos y pruebas)
    ├── assets/
    │   ├── styles.css             Todo el CSS, con los colores de ambos temas arriba
    │   ├── theme.js               Botón de tema claro/oscuro
    │   └── favicon.svg
    ├── static/.nojekyll           Evita que GitHub Pages procese el sitio con Jekyll
    ├── index.njk / en/index.njk           Portada ES / EN
    ├── proyectos.njk / en/projects.njk    Genera una página por proyecto
    ├── pruebas-tecnicas.njk / en/technical-tests.njk
    ├── sitemap.njk, robots.njk, 404.njk
```

**Regla que te ahorra tiempo:** si el cambio es texto o datos, está en `src/_data/`. Si es cómo se ve,
está en `src/assets/styles.css`. Casi nunca vas a tocar los `.njk`.

---

## Tareas frecuentes

### 1. Publicar la demo de un proyecto (Fase 2)

Esto es lo que el sitio fue diseñado para hacer sin tocar HTML.

1. Abre `src/_data/projects.json`.
2. Busca el proyecto y cambia **una línea**:

   ```diff
   -    "liveUrl": null,
   +    "liveUrl": "https://demo.tudominio.com/almacen",
   ```
3. `git commit` y `git push`.

Aparece solo el botón **«Ver en vivo»** en la portada y en el caso de estudio. Mientras `liveUrl` sea
`null`, no aparece nada: la ficha se ve completa, no mutilada. Lo mismo con `"repoUrl"` para el botón
de repositorio.

> **CostoPreciso es la excepción deliberada.** Tiene `"externalLinks": false` y un `noLinksNote`.
> Eso reemplaza los botones por una nota que dice que el proyecto es privado. Cuando decidas
> mostrarlo, borra la línea `"externalLinks": false`, borra `noLinksNote` y pon la URL en `liveUrl`.

### 2. Agregar un proyecto nuevo

Copia este bloque al **inicio** del array en `src/_data/projects.json` (el orden del archivo es el
orden en pantalla, y los proyectos fuertes van arriba):

```json
{
  "slug": "nombre-en-minusculas-con-guiones",
  "title": "Nombre del proyecto",
  "org": { "es": "Cliente o «Proyecto propio»", "en": "Client or \"Personal project\"" },
  "period": { "es": "2027", "en": "2027" },
  "role": { "es": "Mi rol", "en": "My role" },
  "status": null,
  "liveUrl": null,
  "repoUrl": null,
  "summary": { "es": "Dos o tres frases.", "en": "Two or three sentences." },
  "stack": ["TypeScript", "PostgreSQL"],
  "caseStudy": {
    "problem": { "es": "", "en": "" },
    "decisions": [
      { "title": { "es": "", "en": "" }, "body": { "es": "", "en": "" } }
    ],
    "responsibility": { "es": "", "en": "" },
    "outcome": { "es": "", "en": "" },
    "limits": { "es": "", "en": "" }
  }
}
```

El `slug` define la URL: `/proyectos/<slug>/` y `/en/projects/<slug>/`. **No lo cambies después de
publicar**, o rompes los enlaces que ya compartiste.

Campos opcionales que puedes agregar:

| Campo | Para qué sirve |
|---|---|
| `"status"` | Etiqueta junto al título: `{ "es": "En curso", "en": "Ongoing" }`. Usa `null` si no aplica. |
| `"metrics"` | Cifras destacadas: `[{ "value": "50–200", "label": { "es": "paquetes diarios", "en": "packages per day" } }]`. |
| `"ndaNote"` | Nota de que el sistema es del cliente y no hay código ni capturas. |
| `"externalLinks": false` + `"noLinksNote"` | Quita todos los botones externos y explica por qué. |

### 3. Agregar una prueba técnica

Mismo formato, en `src/_data/techtests.json`, más `"date"` y `"org"`. Van en **su propia sección**,
etiquetadas y fechadas, separadas de la experiencia profesional: son trabajo entregado, no empleos.

### 4. Agregar un empleo, una tecnología o un curso

- Empleo → `src/_data/experience.json`
- Tecnología → `src/_data/technologies.json` (dentro del grupo que corresponda a la evidencia real)
- Curso o certificación → `src/_data/training.json`

### 5. Cambiar un texto de la interfaz

Menús, títulos de sección, botones, el pie: todo está en `src/_data/i18n.json`, con la misma
estructura para `es` y `en`. Si agregas una clave nueva, agrégala en **los dos idiomas** o el inglés
saldrá vacío.

### 6. Cambiar colores o tipografía

Los dos temas están al inicio de `src/assets/styles.css`, en tres bloques:

- `:root` → tema claro
- `[data-theme="dark"]` → tema oscuro cuando el visitante lo elige con el botón
- `@media (prefers-color-scheme: dark)` → tema oscuro automático por preferencia del sistema

Si cambias un color en el tema oscuro, **cámbialo en los dos bloques oscuros** o el botón y el
automático se verán distintos.

### 7. Actualizar el CV

Reemplaza `cv/gerardo-martinez-cv.pdf` conservando el nombre. Los enlaces de la barra, el hero y el
pie apuntan a esa ruta fija: así los enlaces que ya compartiste siguen funcionando.

---

## Despliegue

### Configuración inicial (una sola vez)

1. Sube el repo a GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Haz push a `main`. El workflow compila y publica.

El workflow calcula solo el prefijo de rutas:

- Repo llamado `geramoran.github.io` → el sitio vive en la raíz, prefijo `/`.
- Cualquier otro nombre → el sitio vive en `/<nombre-del-repo>/` y el prefijo se aplica a todos los
  enlaces, al CSS y a las imágenes.

Por eso **nunca escribas rutas absolutas a mano** en las plantillas: usa el filtro `| url`, que ya
aplica el prefijo.

`src/static/.nojekyll` existe para que GitHub Pages no intente procesar el sitio con Jekyll.

### Dominio propio

Cuando registres el dominio: crea `src/static/CNAME` con una sola línea (`tudominio.com`), apunta el
DNS a GitHub Pages y actualiza `"url"` en `src/_data/site.json` — de ahí salen las URLs absolutas del
sitemap, del canonical y de Open Graph.

---

## Si más adelante quieres subdominios por proyecto

No está implementado y no hace falta para nada de lo actual. Queda anotado para cuando lo necesites:

- **Cada subdominio (`proyecto.tudominio.com`) es un despliegue aparte.** GitHub Pages sólo admite un
  dominio personalizado por repositorio, así que cada demo sería su propio repo con su propio `CNAME`,
  o vivirían en tu VPS detrás de Nginx.
- **DNS:** un registro `CNAME` por subdominio apuntando al host que sirva esa demo. Si son varias,
  conviene un comodín (`*.tudominio.com`) hacia el VPS y que Nginx enrute por `server_name`.
- **Certificados:** GitHub Pages emite uno por dominio automáticamente; en VPS, un certificado
  comodín con Let's Encrypt (validación DNS-01) evita pedir uno por subdominio.
- **En este sitio no cambia nada:** sigues poniendo la URL completa en `liveUrl`. El sitio no asume
  que las demos vivan en el mismo dominio.
- Lo único que agregaría aquí sería, si acaso, una redirección corta (`/demo/<slug>` → subdominio)
  para no repetir URLs largas en LinkedIn.

---

## Decisiones ya tomadas (no las revuelvas sin querer)

- **El teléfono no se publica.** No está en ningún archivo del sitio; va sólo en el PDF del CV.
- **CostoPreciso no enlaza a ningún lado**: repositorio privado, sin demo ni capturas.
- **Los sistemas privados del cliente** (MySourcing) se etiquetan «Proyecto privado» y se describen
  como arquitectura narrada, sin código, capturas ni nombres de clientes finales.
- **n8n** aparece como «un proyecto completo, no años de uso», no al lado de PHP o TypeScript.
- **Inglés B1**: la línea honesta ya está en `i18n.json`. No la subas a «advanced» ni «fluent».
- **Nueve años**, contados desde febrero de 2017.
- Sin analítica y sin cookies: el sitio no carga nada de terceros salvo la hoja de fuentes de Google.

---

## Pendientes conocidos

- [ ] **Poner el PDF del CV** en `cv/gerardo-martinez-cv.pdf` (hoy sólo hay un aviso).
- [ ] **Imagen de Open Graph.** Falta `src/assets/og.png` de 1200×630 para que el enlace se vea bien
      en LinkedIn. Cuando exista, pon `"ogImage": "/assets/og.png"` en `src/_data/site.json`; las
      etiquetas ya están condicionadas y aparecerán solas.
- [ ] **Revisión del inglés por un tercero.** Los textos en inglés no los escribiste tú; conviene que
      alguien con nivel alto los revise antes de difundir la versión `/en/`.
- [ ] **Prueba técnica de LexCore**: en `techtests.json` está marcada con `"draft": true` y textos
      entre corchetes. Complétala o quítala del array antes de publicar.
- [ ] **Certificados**: `training.json` tiene `certificateUrl: null`. Si subes los PDFs o tienes
      enlaces públicos, se convierten en botón «Certificado →» automáticamente.
