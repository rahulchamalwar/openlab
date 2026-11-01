# Syntecks Infotech (Open Lab)

Static, multi-page website built with HTML, Bootstrap 5.3, CSS, JavaScript and jQuery. The original logo supplied by the owner is at `assets/images/logo/open-lab-logo.png` and is used in the navigation, About section, footer and social preview metadata.

## Before publishing

1. Replace `YOUR-DOMAIN-HERE` in `robots.txt` and `sitemap.xml` with the confirmed production domain.
2. Replace `REPLACE-WITH-SEARCH-CONSOLE-TOKEN` in each HTML page with the site's Google Search Console verification token.
3. The canonical URL and Open Graph URL are set at runtime from the domain serving the page. Once the production domain is known, you can also hard-code those URLs for crawlers that do not execute JavaScript.
4. Add owner-approved business photos, real project examples and genuine customer reviews when available. The current Gallery uses clearly labelled abstract SVG illustrations; the portfolio and review areas contain no fabricated examples.
5. Add the AdSense seller record to `ads.txt` only after the account and publisher details are known.

## Contact form

The contact form validates the required fields in the browser and opens the visitor's default email application with the enquiry addressed to `rahulchamalwar@gmail.com`. It does not transmit or store form submissions on a server. If server-side delivery is needed, connect a backend or a verified form service and update the form notice and Privacy Policy to describe that processing.

## Publish

### GitHub Pages

Copy the contents of this folder into the repository root (or a supported `docs` folder), commit and push them, then enable GitHub Pages for that branch and folder in repository settings. Set the custom domain there after its DNS is configured.

### Cloudflare Pages

Connect the repository and set the project root to `work/syntecks-infotech` (or upload this folder's contents directly). No build command is required; use the folder itself as the static output directory.

### cPanel

Upload the contents of this folder into `public_html` using File Manager or FTP. Configure the domain's document root to that directory and enable HTTPS.

Bootstrap, Bootstrap Icons, jQuery and Google Fonts are loaded from CDNs, so the published site needs internet access for those assets. The map is embedded from Google Maps.
