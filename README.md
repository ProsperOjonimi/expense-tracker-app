# Expense Tracker

A client-side React application for recording income and expense transactions with real-time balance calculations.

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 19 | Chosen for its component model and efficient re-rendering via the reconciled virtual DOM. React 19's improved concurrent features enable smoother state transitions as the transaction list grows. |
| Build Tool | Create React App 5 | Provided a zero-config Webpack setup so development could begin immediately without tooling overhead. For a project of this scope, CRA's abstraction over Webpack, Babel, and ESLint eliminated configuration drift. |
| Styling | Plain CSS (Poppins via Google Fonts) | A CSS framework (Tailwind, Bootstrap) would have introduced a dependency and class noise for what amounts to a single-page layout with roughly a dozen styled elements. Vanilla CSS keeps the bundle lean and gives full control over every rule. |
| Testing | Jest + React Testing Library (included via CRA) | Tests are written from the user's perspective (queries by label text, role, etc.) rather than testing implementation details, which means refactors rarely break tests unless behavior changes. |
| State Management | React built-in hooks (useState) | The entire application state is a single array of transaction objects. Introducing Context, Redux, or Zustand would have been over-engineering for a state shape this shallow. useState with lift-state-up keeps the data flow explicit and traceable. |

## Features

### Transaction Management

- **Add transactions** via a three-field form (description, amount, type) with inline validation that blocks empty submissions.
- **Delete transactions** using a per-row button identified by a `data-id` attribute, enabling granular removal without a separate edit mode.
- **Type classification** through a `<select>` dropdown that tags each transaction as either `income` or `expense`, which drives the split aggregation in the summary view.

### Financial Overview

- **Income and expense totals** computed on every render via chained `.filter().reduce()` calls over the transactions array. Because the array is typically small (< 1000 entries), the O(n) traversal introduces no perceptible latency.
- **Net balance** derived as `totalIncome - totalExpense` and displayed alongside a contextual status message that warns when the balance goes negative.
- **Empty state** renders a placeholder message when no transactions exist, keeping the UI informative rather than blank.

### Data Integrity

- **Unique identifiers** generated with `crypto.randomUUID()` rather than array indices or incrementing counters, which guarantees collision resistance even if transactions were ever persisted or synced externally.
- **Controlled form inputs** ensure the React state is the single source of truth for every field, preventing mismatch between the DOM and the component tree.

## Architecture

```
expense-tracker/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── App.js           # Root component, state owner, computation hub
│   │   ├── Form.js          # Transaction input form
│   │   ├── Header.js        # Application title and subtitle
│   │   ├── Summary.js       # Income, expense, balance display
│   │   └── TransactionList.js # Transaction rows with delete action
│   ├── index.css            # Global styles
│   └── index.js             # React DOM entry point
├── package.json
└── README.md
```

### Key Design Decisions

**1. Lifted state over context or global store.** All transaction state lives in `App.js` and is passed down as props. For a component tree only two levels deep, this avoids the indirection of Context (which can cause unnecessary re-renders) and the boilerplate of Redux. The tradeoff is that adding a deeply nested component in the future would require either prop drilling or a migration to Context -- but the current shape doesn't warrant that complexity.

**2. `crypto.randomUUID()` over integer IDs or nanoid.** The native Web Crypto API has shipped in all major browsers since 2022 and produces v4 UUIDs with 122 bits of entropy. This removes an external dependency (nanoid or uuid) while providing production-grade uniqueness. The tradeoff is a slightly larger string key versus a compact integer, but for a client-only app with no database, the collision guarantee is worth the overhead.

**3. Computed-on-render totals instead of memoized selectors.** Income, expense, and balance are recalculated from the full array on every render rather than being cached with `useMemo`. For the expected data volume (tens to low hundreds of transactions), the cost of iterating the array is negligible (sub-millisecond). Using `useMemo` would add cognitive overhead and a dependency array to maintain without measurable benefit. If the app scaled to thousands of transactions, this would be the first optimization target.

**4. Conditional rendering of the records column.** The transaction list and summary are shown only when `transactions.length > 0`; otherwise a static placeholder is displayed. This avoids rendering an empty scrollable container and a summary with all zeros, which could confuse a new user. The tradeoff is a brief layout shift when the first transaction is added, but this is a one-time occurrence per session.

## Getting Started

### Prerequisites

- Node.js >= 18 (required for `crypto.randomUUID()` support)
- npm >= 9

### Installation

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
npm install
npm start
```

The app starts on `http://localhost:3000`.

### Environment Variables

None required. The application runs entirely client-side with no backend or external API dependencies.

### Database Schema

Not applicable. All data lives in React state and is ephemeral (lost on page refresh). No database or storage layer is configured.

## What I Learned

- **State lifting and uni-directional data flow**: Managing all transaction state in the root component and distributing it as props taught me how to reason about data ownership and prevent fragmented state across sibling components.
- **Derived state over stored state**: Computing totals from the source array on every render rather than maintaining separate running counters reinforced the principle that derived data should not be duplicated in state.
- **Controlled form components in React 19**: Building a multi-field form where every input's value is driven by `useState` and every mutation flows through `onChange` handlers gave me a practical understanding of React's contract with form elements.
- **Conditional rendering patterns**: Choosing between Early Return, Ternary, and `&&` operators depending on whether the fallback is a loading state, an empty state, or a visibility toggle.
- **Unique key strategies for lists**: Moving from index-based keys to stable UUID-based keys and understanding the consequences for React's reconciliation algorithm when items are reordered or deleted.
- **Separation of concerns in component design**: Decomposing the UI into Header, Form, TransactionList, and Summary so each component answers one question ("what goes in the form?", "what does a row look like?") rather than mixing concerns in a monolithic file.

## Roadmap

- [ ] Add transaction editing (inline or modal) so users can correct mistakes without deleting and re-entering.
- [ ] Persist data to localStorage so the transaction list survives page reloads without requiring a backend.
- [ ] Implement filtering and search by description text or date range.
- [ ] Add a chart or visualization (e.g., a pie chart of expense categories) using a library like Recharts.
- [ ] Support multiple currencies with a conversion toggle.
- [ ] Deploy as a Progressive Web App (PWA) with a service worker for offline access.
