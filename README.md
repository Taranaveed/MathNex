# MathNex

CAIE and Edexcel papers, 9231 notes, an AI marker, and class CTAs that open Mathism. Node.js serves the site from the `Exam Boards` folders. cPanel’s “Setup Node.js App” can host it.

## Run it locally

```bash
npm install
npm start
```

Open http://localhost:3000

For the AI Marker, set an OpenAI key first:

```bash
# Windows PowerShell
$env:OPENAI_API_KEY="sk-..."
npm start
```

Optional: `OPENAI_MODEL=gpt-4o` (default) and `SITE_URL=https://your-domain`.

## Put it on cPanel

1. Zip the project **without** `node_modules` and without `data/inbox.json`.
2. Upload and extract it somewhere outside the public web root, for example `~/mathnex`.
3. In cPanel open **Setup Node.js App**:
   - Node.js 18 or 20
   - Application root: `mathnex`
   - Startup file: `app.js`
4. Add environment variables:
   - `OPENAI_API_KEY` — required for `/marker`
   - `SITE_URL` — optional public URL for the sitemap
   - `OPENAI_MODEL` — optional, default `gpt-4o`
5. **Run NPM Install**, then **Restart**.
6. `https://your-domain/health` should say `ok`.

Edit `data/site.js` for email and the Mathism login URL (`mathismLogin`).

## Papers and mark schemes

Put files in the folder the page names, for example:

`Exam Boards/CAIE/A Level/9709 (Mathematics)/May-June/P1/`

Naming for the AI Marker:

| Role | Filename pattern |
| --- | --- |
| Mark scheme | `something-ms.pdf` or `something_ms.pdf` |
| Question paper | `something-qp.pdf` (optional) |

Example: `2024-mj-p1-ms.pdf`

If a folder has a mark-scheme PDF, the marker uses it. If not (or no folder is chosen), it still runs an open check. Use text-based PDFs when you can; scanned-only schemes may not extract.

Only upload files you have the right to host.

## Classes

`/classes` has One-to-one and Group buttons. Both open the Mathism login in a new tab:

`https://mathism-96d1c.web.app/login`

## AI Marker

1. Open `/marker`
2. Upload a photo/PDF and/or type the working (any question — library papers are not required)
3. Optionally choose board → level → paper path so the server can load a `*-ms.pdf`
4. Submit — with a scheme file you get scheme-based marks; without one you get an open examiner-style check

Student uploads are temporary and deleted after the response. Requests are rate-limited per IP.

## 9231 notes

Topic notes live under `/further-maths`. Optional topical/session PDFs for notes still use `public/papers/topical/` and `public/papers/sessions/`.
