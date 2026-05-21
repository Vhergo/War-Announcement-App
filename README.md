# BDO War Announcement Builder

A static frontend-only app for generating Black Desert Online Nodewar and Siege announcement images.

## Features

- Nodewar and Siege form modes with different fields
- Optional map upload
- Live announcement preview
- Theme presets and editable colors/fonts
- Browser-side PNG export
- No backend or build step required

## Run Locally

Open `index.html` in a browser, or serve the folder locally:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## GitHub Pages

This app can be hosted from the repository root with GitHub Pages:

1. Push these files to a GitHub repository.
2. Open the repository settings.
3. Go to Pages.
4. Set the source to deploy from the main branch and repository root.
5. Open the generated GitHub Pages URL.

All data stays in the browser. Uploaded maps are only used locally to render the exported image.
