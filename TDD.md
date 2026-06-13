# Technical Design Document (TDD)

## Group-D ToDo App

| Field | Detail |
|---|---|
| **Project** | Group-D-ToDo-App |
| **Version** | 1.0 |
| **Date** | 2026-06-13 |
| **Related PRD** | [PRD.md](PRD.md) |

---

## 1. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Structure** | HTML5 | Semantic, accessible, no build step needed. |
| **Styling** | Vanilla CSS | Full control over design; no framework overhead. |
| **Logic** | Vanilla JavaScript (ES6+ modules) | Keeps the project dependency-free and easy to run. |
| **Fonts** | Google Fonts — *Inter* | Clean, modern sans-serif. |
| **Dev Server** | VS Code Live Server or `python -m http.server` | Zero-config local development. |

> **Note:** No build tools, bundlers, or package managers are required for v1.0.

---

## 2. Project File Structure

```
Group-D-ToDo-App/
├── index.html            # Main HTML page (shared — mostly static)
├── css/
│   └── styles.css        # All styles (shared file, sectioned by feature)
├── js/
│   ├── app.js            # Entry point — imports & initialises modules
│   ├── store.js          # Shared data store (task array + helper methods)
│   ├── taskCreation.js   # Feature 1 — Task Creation module
│   ├── taskCompletion.js # Feature 2 — Task Completion module
│   └── taskDeletion.js   # Feature 3 — Task Deletion module
├── PRD.md
├── TDD.md
└── README.md
```

> **Important:** Each developer works **primarily** in their own `js/taskXxx.js` module. The shared files (`index.html`, `css/styles.css`, `js/store.js`, `js/app.js`) have clearly marked sections per feature to minimise merge conflicts.

---

## 3. Shared Data Model — `store.js`

The store is the single source of truth. All three features read from and write to this module.

```js
// js/store.js

/**
 * @typedef {Object} Task
 * @property {string}  id          – Unique identifier (crypto.randomUUID())
 * @property {string}  text        – Task description
 * @property {boolean} completed   – Completion state
 */

let tasks = [];

export function getTasks()          { return tasks; }
export function addTask(text)       { /* ...returns new Task */ }
export function toggleTask(id)      { /* ...flips completed flag */ }
export function deleteTask(id)      { /* ...removes task from array */ }
export function getTaskById(id)     { /* ...returns Task or undefined */ }
```

### Data-flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                        UI                           │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────┐ │
│  │ Input + Add  │  │ Checkbox  │  │ Delete Button│ │
│  │   Button     │  │ per Task  │  │   per Task   │ │
│  └──────┬───────┘  └─────┬─────┘  └──────┬───────┘ │
└─────────┼────────────────┼───────────────┼──────────┘
          │                │               │
          ▼                ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│taskCreation  │  │taskCompletion│  │ taskDeletion  │
│     .js      │  │     .js      │  │     .js       │
└──────┬───────┘  └──────┬───────┘  └──────┬────────┘
       │                 │                 │
       │  addTask(text)  │ toggleTask(id)  │ deleteTask(id)
       ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────┐
│                  store.js (tasks[])                  │
│                 Single Source of Truth               │
└─────────────────────────────────────────────────────┘
```

---

## 4. Feature Designs

### 4.1 Feature 1 — Task Creation (`taskCreation.js`)

**Owner:** Developer A

#### Responsibilities

1. Query the input field (`#task-input`) and add button (`#add-btn`).
2. Listen for `click` on the button **and** `keydown` (Enter) on the input.
3. Validate: trim the input; if empty, abort.
4. Call `store.addTask(text)` to persist the new task.
5. Call a shared `renderTasks()` function (or dispatch a custom event) to re-render the list.
6. Clear and re-focus the input field.

#### DOM Elements Owned

| Element | Selector | Notes |
|---|---|---|
| Input field | `#task-input` | `<input type="text">` |
| Add button | `#add-btn` | `<button>` |

#### Key HTML Snippet (in `index.html`)

```html
<!-- === TASK CREATION SECTION === -->
<div class="input-wrapper">
  <input type="text" id="task-input" placeholder="What needs to be done?" aria-label="New task description" />
  <button id="add-btn" aria-label="Add task">Add</button>
</div>
```

---

### 4.2 Feature 2 — Task Completion (`taskCompletion.js`)

**Owner:** Developer B

#### Responsibilities

1. During render, add a checkbox (`<input type="checkbox">`) to each task item.
2. Set the checkbox's `checked` property based on `task.completed`.
3. Apply the CSS class `.task--completed` when `task.completed === true`.
4. Listen for `change` events on checkboxes (use event delegation on the task list).
5. Identify the task by its `data-id` attribute and call `store.toggleTask(id)`.
6. Re-render the list.

#### DOM Elements Owned

| Element | Selector | Notes |
|---|---|---|
| Checkbox | `.task-checkbox` | One per task `<li>` |

#### CSS Classes

| Class | Effect |
|---|---|
| `.task--completed` | Applies `text-decoration: line-through`, reduces opacity. |

---

### 4.3 Feature 3 — Task Deletion (`taskDeletion.js`)

**Owner:** Developer C

#### Responsibilities

1. During render, add a delete button (`<button class="delete-btn">`) to each task item.
2. Listen for `click` events on delete buttons (use event delegation on the task list).
3. Identify the task by its `data-id` attribute and call `store.deleteTask(id)`.
4. Re-render the list.
5. (Optional stretch) Add a short fade-out CSS animation before removal.

#### DOM Elements Owned

| Element | Selector | Notes |
|---|---|---|
| Delete button | `.delete-btn` | One per task `<li>`, displays ✕ or 🗑 icon |

---

## 5. Rendering Strategy

A single shared `renderTasks()` function in `app.js` is responsible for rebuilding the task list DOM. Each feature module **contributes** to a single `<li>` during render:

```
renderTasks()
  ├─ for each task in store.getTasks():
  │    ├─ taskCompletion: create checkbox, set checked state
  │    ├─ <span class="task-text">: display task.text
  │    └─ taskDeletion: create delete button
  └─ append all <li> elements to <ul id="task-list">
```

Each module exports a helper (e.g. `createCheckbox(task)`, `createDeleteBtn(task)`) that `renderTasks()` calls. This keeps rendering centralised while letting each developer own their component.

---

## 6. CSS Architecture

Styles are organised into clearly commented sections within a single file:

```css
/* ====================== */
/* 1. RESET & BASE        */
/* ====================== */

/* ====================== */
/* 2. LAYOUT & CARD       */
/* ====================== */

/* ====================== */
/* 3. TASK CREATION        */
/* ====================== */

/* ====================== */
/* 4. TASK COMPLETION      */
/* ====================== */

/* ====================== */
/* 5. TASK DELETION        */
/* ====================== */

/* ====================== */
/* 6. EMPTY STATE          */
/* ====================== */

/* ====================== */
/* 7. ANIMATIONS           */
/* ====================== */
```

### Design Tokens (CSS Custom Properties)

```css
:root {
  --color-bg:        #0f0f13;
  --color-surface:   #1a1a24;
  --color-primary:   #6c63ff;
  --color-primary-h: #7b73ff;
  --color-text:      #e2e2e8;
  --color-text-muted:#8888a0;
  --color-danger:    #ff6b6b;
  --color-success:   #4ecb71;
  --radius:          12px;
  --shadow:          0 8px 32px rgba(0,0,0,0.35);
  --font:            'Inter', system-ui, sans-serif;
}
```

---

## 7. Developer Workflow & Branching Strategy

```
main ─────┬─────────────────────────────────────┬── merge ── merge ── merge ── polish
          │                                     │
          ├── feature/task-creation ─── commit ──┤
          │                                     │
          ├── feature/task-completion ── commit ─┤
          │                                     │
          └── feature/task-deletion ─── commit ──┘
```

| Step | Action |
|---|---|
| 1 | One developer scaffolds the project on `main` (creates `index.html`, `store.js`, `app.js`, `styles.css` with empty sections). |
| 2 | Each developer creates a **feature branch** (`feature/task-creation`, `feature/task-completion`, `feature/task-deletion`). |
| 3 | Developers implement their feature module, add their HTML section, and fill in their CSS section. |
| 4 | Each developer opens a **Pull Request** to `main` for code review. |
| 5 | Merge PRs sequentially; resolve any minor conflicts in shared files. |
| 6 | Final integration pass on `main` to polish and test all features together. |

---

## 8. Integration Plan

| Phase | Description |
|---|---|
| **Scaffold** | Set up the project skeleton: `index.html` with all three HTML sections stubbed, `store.js` with the full API, `app.js` with a `renderTasks()` shell, `styles.css` with design tokens and section markers. |
| **Parallel Dev** | Each developer implements their feature on their branch. They can test independently using mock data in `store.js`. |
| **Merge & Test** | Merge branches one at a time into `main`. After each merge, manually test the combined features. |
| **Polish** | Fix cross-feature styling issues, add the empty-state message, fine-tune animations, and do a final accessibility pass. |

---

## 9. Testing Strategy

| Type | Approach |
|---|---|
| **Manual** | Each developer tests their feature in Chrome and Firefox before opening a PR. |
| **Cross-feature** | After merging, test end-to-end: create → complete → delete. Verify no side effects. |
| **Edge cases** | Empty input, rapid double-clicks, deleting a completed task, toggling the last remaining task. |
| **Accessibility** | Tab through all controls; verify ARIA labels; test with screen reader (VoiceOver). |
| **Responsive** | Test at 320 px, 768 px, and 1440 px viewport widths. |

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Merge conflicts in `index.html` or `styles.css` | Use clearly delimited sections with comment markers; merge one PR at a time. |
| Inconsistent task `<li>` structure | Define the `<li>` template in `renderTasks()` early so all developers build against the same structure. |
| Data store race conditions | Not a real risk with synchronous JS, but keep `store.js` as the single source of truth. |
