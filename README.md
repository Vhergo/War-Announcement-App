# BDO War Announcement Builder

A static frontend-only app for generating Black Desert Online Nodewar and Siege announcement images.

## Features

- Nodewar and Siege form modes with different fields
- Optional map upload
- Bundled nodewar day/node/tier/member-cap data from `data/War Days and Caps.xlsx`
- Date-driven node dropdown and automatic tier/cap display
- PST/EST time display from a selected input timezone
- Two-sided teamfight layout with a visual VS treatment
- Live announcement preview
- Theme presets and editable colors/fonts in a settings popup
- Side, bottom, or separate map export modes
- Browser-side PNG export
- No backend or build step required

## Update War Schedule

Replace `data/War Days and Caps.xlsx`, then run:

```powershell
python tools\import_schedule.py "data\War Days and Caps.xlsx"
```

The importer regenerates `data/schedule-data.json`, `data/schedule-data.js`, and the embedded app data used by GitHub Pages.

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
