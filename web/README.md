# CodeSaathi — Web v1

Static HTML, CSS and JavaScript learning website.

## Current implementation
- Responsive landing page and Telugu/English interface switch
- Starter lessons for HTML, CSS and JavaScript
- Browser code editor with sandboxed iframe preview
- Local browser progress tracking via localStorage
- No framework, build step, backend, Firebase or paid hosting required for the static frontend

## Run locally
Open `index.html` in a modern browser, or serve this folder with any static HTTP server.

## Release boundaries
- Lessons are starter content, not a complete W3Schools-coverage curriculum.
- Progress is local to this browser/device and is not synced to an account.
- No payment collection, ₹1 checkout, paid-content enforcement or user authentication is implemented. Do not advertise payment as active until verified payment and server-side entitlement checks exist.
- The editor is an educational preview, not a secure production sandbox for arbitrary untrusted code. Review CSP and execution boundaries before public expansion.
- Google Fonts is optional; system fallback fonts remain available.

## Deployment
Configure GitHub Pages to publish the `web/` folder if repository settings support it, or copy the static entry files to a dedicated deployment root. Configure custom domain only after GitHub Pages provides authoritative DNS instructions. Do not change GoDaddy DNS before that.