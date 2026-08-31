# Functional QA — 2026-08-31

| Scenario | Result | Evidence |
| --- | --- | --- |
| Production compilation | Pass | `npm run build` completed with TypeScript and static route generation |
| Main page | Pass | local `GET /` → 200 |
| Catalog and filters route | Pass | local `GET /catalog` → 200; `/catalog/tents` → 200 redirect path |
| Product detail | Pass | local `GET /product/ridge-2` → 200 |
| Kit builder route | Pass | local `GET /kit` → 200 |
| Bag and checkout route | Pass | local `GET /checkout` → 200 |
| Journal index and article | Pass | local `GET /journal` and `/journal/48-hours-away` → 200 |
| Real payment, delivery, account, orders | Not applicable | deliberately not connected in Draft |

Manual browser interaction could not be executed because the local browser control runtime failed to start in the sandbox.
