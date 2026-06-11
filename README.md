# Smart House Energy Monitor

A free, ad-free single-page web app for tracking home electricity usage, running costs, carbon footprint, and savings. No accounts, no payments — everything runs in the browser and your data stays on your own device.

## Files in this project

| File | What it is |
|------|------------|
| `index.html` | **The whole app.** Self-contained — React and the chart library are embedded inside it, so it has no external dependencies and works offline. This is the only file the site actually needs to run. |
| `404.html` | Friendly "page not found" page, shown automatically by GitHub Pages for unknown URLs. |
| `favicon.svg` | The site icon (shown in the browser tab). |
| `site.webmanifest` | Lets the site be "installed" to a phone home screen and sets the browser theme colour. |
| `robots.txt` | Tells search engines they may index the site, and points them to the sitemap. |
| `sitemap.xml` | Lists the site's page for search engines. |
| `.nojekyll` | Tells GitHub Pages to serve the files exactly as-is. |
| `SmartHouseEnergyMonitor.jsx` | The original React source code (for editing/rebuilding — not needed to host the site). |

## Before you publish — update two placeholders

In **`robots.txt`** and **`sitemap.xml`**, replace `USERNAME` and `REPO` with your own GitHub username and repository name, so the address reads like:

```
https://your-name.github.io/energy-monitor/
```

## Deploy to GitHub Pages

1. Create a **public** repository on GitHub.
2. Upload every file in this folder (`index.html`, `404.html`, `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, and `.nojekyll`).
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**, select **main** and **/ (root)**, then **Save**.
5. Wait a minute or two — your site goes live at `https://USERNAME.github.io/REPO/`.

To get it appearing in Google search afterwards, see the included guide **How-to-Put-Your-Website-on-Google.pdf** (Google Search Console: add property → verify → submit sitemap → request indexing).

## Updating the site later

Replace `index.html` in the repository with a new version (same name) and commit — the live site refreshes within a minute or two.

## Design

The interface uses a deliberately instrument-like style: a deep petrol-teal palette, Space Grotesk for headings, and JetBrains Mono for all numeric readouts, so the data reads like a real energy meter. Colour carries meaning throughout — green for efficient, amber for cost, coral for high usage.

---

*Estimates are indicative and depend on your tariff and how appliances are actually used.*
