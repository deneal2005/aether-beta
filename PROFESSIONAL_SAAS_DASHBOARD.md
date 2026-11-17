# Fastlane Admin dashboard preview

The dashboard is available at `/admin.html`. It is a standalone static entry point so it can be reviewed without replacing the current workspace at `/dashboard.html`.

## Structure

- `admin.html` defines the dashboard shell, navigation, header, dialog, and toast region.
- `admin.css` contains the dashboard design system, chart styles, dark theme, and responsive layouts.
- `admin.js` owns the hash routes, sample data, table state, charts, forms, notifications, preferences, and local exports.

The implementation uses plain HTML, CSS, and browser APIs already compatible with this repository. SVG charts are generated locally, with no added dependencies or remote data requests.

## Preview behavior

The dashboard uses synthetic Fastlane workspace records. Add, edit, delete, notification, and profile changes save to this browser's local storage. CSV exports are generated in the browser. The Preferences page can restore the original sample records and settings.

There is no backend, production authentication, billing integration, server persistence, or live analytics connection in this repository. The interface labels these values as preview data and does not present local browser changes as account updates.

## Verification

Browser QA covered route navigation, incremental global search and record results, date range and chart metric updates, status filtering, sorting, pagination, customer create/edit/delete, local CSV download, theme switching, notification read state, profile and preference saving, date formatting, desktop sidebar collapse, mobile drawer open/escape close, and sample-data reset. Browser console checks showed no errors or warnings during the reviewed flows.

The repository has no package manifest or configured build, type-check, lint, or automated test commands. The static preview was served locally and verified in the browser; a production build could not be run for this project setup.
