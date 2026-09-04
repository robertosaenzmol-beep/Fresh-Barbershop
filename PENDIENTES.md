# Fresh Barbershop — Tareas pendientes

## Urgente (bloquea funcionalidad)

- [ ] **Google Analytics: poner ID real** — En `src/layouts/Layout.astro` línea 168, cambiar `G-XXXXXXXXXX` por el ID de medición real de GA4. Sin esto no se recogen datos de visitas. Obtenerlo desde [analytics.google.com](https://analytics.google.com) con la cuenta `freshbarbershop15@gmail.com`.

- [ ] **Dominio propio** — La web funciona en `fresh-barbershop.vercel.app`. Si se tiene o se compra un dominio (ej: `freshbarbershop.es`, que ya se menciona en el Aviso Legal), hay que:
  - Configurarlo en Vercel (Settings → Domains)
  - Actualizar la variable `SITE` en `Layout.astro`, `[slug].astro`, `sitemap.xml.ts`
  - Actualizar `astro.config.mjs` (`site`)
  - Actualizar `public/robots.txt` (URL del sitemap)
  - Actualizar el Aviso Legal si el dominio final es diferente a `freshbarbershop.es`

## SEO y visibilidad

- [ ] **Google Search Console** — Entrar con `freshbarbershop15@gmail.com`, añadir la propiedad de la web y enviar el sitemap (`/sitemap.xml`). Esto hace que Google rastree e indexe la web.

- [ ] **Google Business Profile** — Verificar que el perfil de la barbería en Google Maps tiene los datos exactos (nombre, dirección, teléfono, web, email). La consistencia NAP es clave para SEO local.

- [ ] **Incoherencia de dominio en Aviso Legal** — En `src/pages/aviso-legal.astro` se menciona `freshbarbershop.es` como dominio, pero la web está en `fresh-barbershop.vercel.app`. Alinear cuando se tenga el dominio definitivo.

## Imágenes y rendimiento

- [ ] **`fondoFresh.png` pesa 1 MB** — Es un PNG. Convertirla a WebP o JPEG comprimido para bajar a ~100-200 KB.

- [ ] **`logo-fresh-barbershop.png` pesa 783 KB** — Es excesivo para un logo. Convertir a WebP o SVG, o al menos comprimir el PNG. Debería pesar menos de 100 KB.

- [ ] **Las imágenes no tienen `width`/`height` explícitos** — Causa layout shift (CLS). Añadir dimensiones a las etiquetas `<img>` de la galería, hero y nav para mejorar Core Web Vitals.

## Contenido y legal

- [ ] **Fecha de actualización en Privacidad y Cookies** — Ambas políticas dicen "agosto de 2026". Actualizar la fecha cada vez que se modifiquen.

- [ ] **Datos de contacto en Política de Cookies** — La política de cookies no incluye email ni datos del responsable (a diferencia de Privacidad y Aviso Legal). Considerar añadirlos por coherencia.

## Funcionalidad

- [ ] **Modelo 3D tarda en cargar** — El archivo `animacionTijera.glb` pesa 887 KB. El script de `model-viewer` (CDN) se carga síncronamente. Considerar añadir un placeholder/skeleton mientras carga.

- [ ] **Cookie banner solo usa `localStorage`** — Técnicamente no es una cookie, pero cumple su función. Si en el futuro se añaden más servicios (chat, pixel de Facebook, etc.), revisar la implementación.

## Git / deploy

- [ ] **Imágenes movidas a `/images/` sin commitear** — Las imágenes se movieron de `public/` a `public/images/` pero los cambios no están commiteados. Los ficheros antiguos aparecen como "deleted" y los nuevos como "untracked" en git status. Hacer commit de estos cambios.

- [ ] **Archivos sueltos en la raíz del proyecto** — Hay imágenes antiguas en la raíz del proyecto (`.jpeg`, `.png`) que ya no se usan. Verificar y eliminar si son residuales.

- [ ] **Carpeta `.vercel/` y `.astro/` sin gitignore** — Verificar que `.gitignore` incluye `.vercel/` y `.astro/` para no subir artefactos de build al repo.

---

*Última revisión: septiembre 2026*
