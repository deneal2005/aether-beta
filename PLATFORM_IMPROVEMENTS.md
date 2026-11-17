# Platform improvements

## Baseline

The repository is a static HTML, CSS, and JavaScript preview. `index.html` is the marketing site, `login.html` and `onboarding.html` are a local demo flow, and `dashboard.html` hosts the existing workspace with hash-based navigation. There is no package manifest, build system, test runner, backend, or server-side persistence. Authentication is a client-side demo gate and must not be treated as production authentication.

The existing styles already include responsive breakpoints and reduced-motion overrides. The most concrete interaction gaps found in the audit were that workspace dialogs and drawers did not keep keyboard focus inside or return it to the opener, and onboarding's add-competitor control only showed an explanatory message after it became available.

## Skills review

I reviewed the installed skill catalog and read the guidance for the skills relevant to this static frontend change: `frontend-ui-engineering`, `coding-standards`, `change-impact`, `security-and-hardening`, and `verification-loop`. The React and Next.js patterns were not applied because this repository has no React or Next.js runtime. Backend and database guidance was also out of scope because there is no server or data layer.

## Changes

- Workspace dialogs and drawers now trap Tab navigation while open, close with Escape, and return focus to the element that opened them. Dialog focus falls back safely if a close button is absent.
- Onboarding can add a competitor after one is unchecked or removed. The form validates the name and web address, rejects duplicate domains, builds the card with DOM text nodes, updates the kept count, and remains local to the preview.

No backend or production authentication behavior was added. New competitor entries exist only for the current onboarding session.

## Verification limits

The baseline has no build, lint, or automated test commands. Node.js and npm are not installed in the execution environment. Changes are checked with `git diff --check` and browser-based interaction smoke checks against the local static server.
