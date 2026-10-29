# RINOKU — Estado de despliegue

> Referencia de infraestructura del ecosistema RINOKU (web). Actualizado: 2026-10-29.

## 1. Sitios en producción

| Sitio | Dominio | URL Vercel | Repo GitHub | Proyecto Vercel |
|---|---|---|---|---|
| Corporativo | `https://rinoku.cl` (+ `www.rinoku.cl`) | `rinoku-web-sandy.vercel.app` | `cmm2025-dev/Rinoku-Web` | `rinoku-web` |
| VIGÍA | `https://vigia.rinoku.cl` | `rinoku-vigia.vercel.app` | `cmm2025-dev/Rinoku-Vigia` | `rinoku-vigia` |
| SFI | `https://sfi.rinoku.cl` | `rinoku-sfi.vercel.app` | `cmm2025-dev/Rinoku-SFI` | `rinoku-sfi` |
| CAD | — (en desarrollo) | — | `rinoku-cad` (pendiente) | `rinoku-cad` (pendiente) |
| Alertas | — (en desarrollo) | — | `rinoku-alerts` (pendiente) | `rinoku-alerts` (pendiente) |

Navegación cruzada: el corporativo (sección **Soluciones**) enlaza a `vigia.rinoku.cl` y `sfi.rinoku.cl`; ambos productos vuelven al home `rinoku.cl` desde su logo/footer.

## 2. Flujo de despliegue

- **Rama de producción: `main`** en los tres repos.
- Cada `git push` a `main` dispara automáticamente el deploy de producción en Vercel. No hay paso manual.
- Verificar en cada proyecto Vercel que *Production Branch* = `main`.

## 3. DNS (Cloudflare, zona `rinoku.cl`)

Todos los registros en **DNS only** (nube gris) — requisito para que Vercel emita el SSL.

| Tipo | Nombre | Valor | Proxy |
|---|---|---|---|
| CNAME | `@` (rinoku.cl) | `e60450ef37491b93.vercel-dns-017.com` | DNS only |
| CNAME | `www` | `e60450ef37491b93.vercel-dns-017.com` | DNS only |
| CNAME | `vigia` | `760fa726539cf073.vercel-dns-017.com` | DNS only |
| CNAME | `sfi` | `6851a42f1072cef0.vercel-dns-017.com` | DNS only |

- Nameservers en NIC Chile → Cloudflare (`zac.ns.cloudflare.com`, `dayana.ns.cloudflare.com`).
- Cada dominio/subdominio debe estar agregado en su proyecto Vercel (Settings → Domains) para validar y recibir SSL.
- `rinoku.cl` redirige (308) a `www.rinoku.cl` (principal). Las URLs antiguas `kora-*.vercel.app` redirigen a las nuevas.

## 4. Pendientes

- **Subdominios de producto**: si algún CNAME aún apunta al valor legacy `cname.vercel-dns.com`, actualizarlo al valor recomendado de la tabla (quita el aviso "DNS Change Recommended" de Vercel). Funciona igual con el legacy.
- **CAD y Alertas**: crear repos/proyectos (`rinoku-cad`, `rinoku-alerts`) y subdominios `cad.rinoku.cl` / `alerts.rinoku.cl` cuando se desarrollen.
- **Correo `@rinoku.cl`**: no usar hasta configurar MX + SPF + DKIM + DMARC.
- **Marca**: logo/isotipo vectorial definitivo, validación INAPI, textos legales (sin usar ® hasta registro concedido).

## 5. Identidad

La guía de marca vive en [`docs/BRAND_RINOKU.md`](./BRAND_RINOKU.md). Paleta, tipografía y tokens ahí documentados.
