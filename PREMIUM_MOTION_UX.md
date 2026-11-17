# Premium motion and interaction pass

This branch adds a small, dependency-free motion layer to the existing static Fastlane site and local workspace preview.

## What changed

- Added a shared `motion.css` and `motion.js` layer to the marketing, sign-in, onboarding, and workspace pages.
- Added a restrained entrance for the marketing hero, sign-in card, onboarding content, and workspace route/tab content, with a short exit before same-origin page navigation.
- Added count-up animation for the existing marketing proof metrics and workspace analytics cards. Values animate only when they enter view or change; their displayed values remain the existing sample data.
- Added a left-to-right draw for the workspace analytics chart line, plus short hover, press, and selected-tab feedback.
- Added exit motion for workspace dialogs, drawers, and route changes. The View Transition API is used when available; an opacity/transform Web Animation provides the route exit fallback. Escape and close controls still work, and dialog focus returns to its opener after the exit completes.
- Added a touch swipe-right gesture to close the right-side workspace drawer. Vertical scrolling remains native; the gesture only closes after a clear horizontal swipe.
- Kept all custom motion disabled when `prefers-reduced-motion: reduce` is active. No animation dependency was added.

## Implementation notes

The site is plain HTML, CSS, and JavaScript, so the motion uses CSS keyframes, `requestAnimationFrame`, `IntersectionObserver`, and pointer events already supported by the browser. The workspace emits a small render event after replacing its view so route and tab transitions run only on relevant updates, not while a user types into a field.

The existing preview has no live backend chart data or account integrations. Count-ups and the chart draw animate the sample figures and illustrative chart already shown in the frontend; they do not imply new server-side data.

## Verification

- Manually checked the marketing, sign-in, onboarding, and workspace pages in the browser. The final route change to Campaigns rendered with its route entrance class and no browser console warnings or errors.
- Checked workspace route changes, analytics tab changes, dialog and drawer open/close, and Escape handling. The swipe gesture itself was not emulated in the browser; its pointer-event implementation was reviewed.
- Reviewed the reduced-motion CSS and JavaScript branches. The browser session did not expose reduced-motion emulation, and the running browser reported its default `no-preference` setting.
- Confirmed the desktop and phone layouts remain within the viewport, including the full-width phone drawer, and reviewed the browser console for errors.
- No build, lint, or package test command is configured in the repository.
