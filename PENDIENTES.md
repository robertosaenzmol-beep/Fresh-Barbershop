# Fresh Barbershop — Tareas pendientes

## Urgente (bloquea funcionalidad)

- [x] ~~Google Analytics: poner ID real~~ — Configurado con `G-51880QYVXE`.

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

## Auditoría sept 2026 — Pendiente (requiere acceso o acción manual)

- [ ] **Unificar host www vs no-www en Vercel** — En Vercel → Settings → Domains, configurar `freshbarbershop.es` como dominio primario y que `www.freshbarbershop.es` redirija 301 al sin www. Hoy Google indexa ambas versiones y reparte autoridad.

- [ ] **Pedir acceso de gestor al Google Business Profile** — El canal que más clientes trae (Maps) no está gestionado. Pedir al dueño acceso de gestor. Optimizar: servicios, fotos semanales, enlace de reserva, categorías, UTM en el enlace web.

- [ ] **Pedir reservas de Booksy de agosto y septiembre** — Línea base imprescindible para medir si la web genera negocio. Preguntar al dueño cuántas reservas hubo y cuántas fueron con origen web (`#ba_s=seo`).

- [ ] **UTMs en Instagram, GBP y Booksy** — `?utm_source=instagram&utm_medium=bio` en la bio de IG, UTM en el enlace web de GBP, etc. Destapa el tráfico que hoy aparece como Direct.

- [ ] **Marcar `llamada_telefono` y `como_llegar` como eventos clave en GA4** — Los eventos ya se envían (añadidos en esta actualización). Entrar en GA4 → Admin → Eventos → marcarlos como "evento clave".

- [ ] **Filtro de tráfico interno en GA4** — GA4 → Admin → Data Streams → filtro de IP interna. Excluir tu IP y la del dueño para no contaminar los datos.

- [ ] **Consent Mode v2** — Añadir Consent Mode básico para que GA4 modele el tráfico de usuarios que rechazan cookies. Hoy son invisibles.

## Auditoría sept 2026 — Resuelto

- [x] ~~Quitar `aggregateRating` y `review` del JSON-LD~~ — Eliminados. Riesgo de acción manual por reseñas autoatribuidas en schema de LocalBusiness.
- [x] ~~Añadir H1 real en la home~~ — `<h1>Barbería en Alcobendas.</h1>` en el hero.
- [x] ~~noindex en páginas legales y /admin~~ — `<meta name="robots" content="noindex, nofollow">` en aviso legal, privacidad, cookies y admin/index.html. Eliminadas del sitemap.
- [x] ~~Eventos GA4 para teléfono y "cómo llegar"~~ — `llamada_telefono` y `como_llegar` en todos los enlaces de teléfono y direcciones.
- [x] ~~Política de trailing slash~~ — `trailingSlash: 'always'` en astro.config.mjs para URLs consistentes.

---

*Última revisión: 24 septiembre 2026*
