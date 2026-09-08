# Fresh Barbershop — Tareas pendientes

## Urgente (bloquea funcionalidad)

- [ ] **Google Analytics: poner ID real** — En `src/layouts/Layout.astro`, cambiar `G-XXXXXXXXXX` por el ID de medición real de GA4. Aparece en dos sitios: el `<script>` del head y la variable `GA_ID` del cookie banner. Sin esto no se recogen datos de visitas. Obtenerlo desde [analytics.google.com](https://analytics.google.com) con la cuenta `freshbarbershop15@gmail.com`.

- [ ] **Dominio: configurar DNS en el proveedor** — El dominio `freshbarbershop.es` ya está actualizado en todos los ficheros del proyecto. Falta configurar los registros DNS apuntando a Vercel:
  - **A** → `76.76.21.21` (para `freshbarbershop.es`)
  - **CNAME** → `cname.vercel-dns.com` (para `www.freshbarbershop.es`)
  - Añadir el dominio en Vercel → Settings → Domains

## SEO y visibilidad

- [ ] **Google Search Console** — Entrar con `freshbarbershop15@gmail.com`, añadir la propiedad `https://freshbarbershop.es` y enviar el sitemap (`https://freshbarbershop.es/sitemap.xml`). Esto hace que Google rastree e indexe la web.

- [ ] **Google Business Profile** — Verificar que el perfil de la barbería en Google Maps tiene los datos exactos (nombre, dirección, teléfono, web: `https://freshbarbershop.es`, email). La consistencia NAP es clave para SEO local.

## Imágenes y rendimiento

- [ ] **`fondoFresh.png` pesa 1 MB** — Es un PNG usado como textura de fondo en la nav, secciones oscuras, footer, booking y cookie banner. Convertirla a WebP o JPEG comprimido para bajar a ~100-200 KB.

- [ ] **`logo-fresh-barbershop.png` pesa 783 KB** — Es excesivo para un logo. Convertir a WebP o SVG, o al menos comprimir el PNG. Debería pesar menos de 100 KB.

- [ ] **Las imágenes no tienen `width`/`height` explícitos** — Causa layout shift (CLS). Añadir dimensiones a las etiquetas `<img>` de la galería, hero y nav para mejorar Core Web Vitals.

## Contenido y legal

- [ ] **Fecha de actualización en Privacidad y Cookies** — Ambas políticas dicen "agosto de 2026". Actualizar la fecha cada vez que se modifiquen.

- [ ] **Datos de contacto en Política de Cookies** — La política de cookies no incluye email ni datos del responsable (a diferencia de Privacidad y Aviso Legal). Considerar añadirlos por coherencia.

## Funcionalidad

- [ ] **Modelo 3D tarda en cargar** — El archivo `animacionTijera.glb` pesa 887 KB. El script de `model-viewer` (CDN) se carga síncronamente. Considerar añadir un placeholder/skeleton mientras carga.

- [ ] **Cookie banner solo usa `localStorage`** — Técnicamente no es una cookie, pero cumple su función. Si en el futuro se añaden más servicios (chat, pixel de Facebook, etc.), revisar la implementación.

## Limpieza

- [ ] **`index.html` en la raíz del proyecto** — Es la versión antigua de la web (42 KB, HTML monolítico pre-Astro). No se usa para nada. Eliminar.

## Ya resuelto

- [x] ~~Dominio actualizado en todos los ficheros~~ — Cambiado `fresh-barbershop.vercel.app` → `freshbarbershop.es` en Layout.astro, [slug].astro, sitemap.xml.ts, astro.config.mjs, robots.txt, admin/config.yml.
- [x] ~~Incoherencia de dominio en Aviso Legal~~ — Ya coincide con `freshbarbershop.es`.
- [x] ~~Imágenes movidas a `/images/` sin commitear~~ — Commiteado y pusheado.
- [x] ~~Archivos sueltos en la raíz (`.jpeg`, `.png` residuales)~~ — Eliminados en el commit.
- [x] ~~`.vercel/` y `.astro/` sin gitignore~~ — Añadidos a `.gitignore`.
- [x] ~~Datos del propietario (nombre, NIF, email) en páginas legales~~ — Actualizados.
- [x] ~~Sitemap estático que no se actualiza~~ — Sustituido por `sitemap.xml.ts` dinámico.
- [x] ~~Sin página 404~~ — Creada.
- [x] ~~Sin schema BlogPosting en blog~~ — Añadido JSON-LD en cada post.
- [x] ~~Fuentes cargadas con @import en CSS (render-blocking)~~ — Movidas a `<link>` en head.
- [x] ~~Sin meta tags SEO (author, geo, hreflang)~~ — Añadidos.
- [x] ~~Sin `nofollow` en enlaces externos~~ — Añadido en todos.
- [x] ~~Nav sin aria-label~~ — Añadido.
- [x] ~~Galería sin lazy loading~~ — Añadido.
- [x] ~~Rutas de imágenes rotas (`/fondoFresh.png` en CSS)~~ — Corregidas a `/images/`.
- [x] ~~Diseño: animaciones y micro-interacciones~~ — Hero Ken Burns, button feedback, review card hover, map color reveal, footer underline, cookie slide-up, ::selection, focus-visible.

---

*Última revisión: 8 septiembre 2026*
