# Product Requirements Document (PRD)

## Group-D ToDo App

| Field | Detail |
|---|---|
| **Project** | Group-D-ToDo-App |
| **Version** | 1.0 |
| **Date** | 2026-06-13 |
| **Team Size** | 3 developers |

---

## 1. Overview

The Group-D ToDo App is a simple, single-page web application that allows users to manage a personal task list. Users can create new tasks, mark them as complete, and delete tasks they no longer need. The project simulates a real-world collaborative development environment where three developers each own one feature end-to-end.

## 2. Goals

- Deliver a functional, visually polished Todo application.
- Enable three developers to work on separate features in parallel with minimal merge conflicts.
- Provide a clear, testable scope for each feature.

## 3. Target User

| Persona | Description |
|---|---|
| **Casual User** | Anyone who needs a quick, lightweight way to track daily tasks in their browser. No account or setup required. |

## 4. Core Features

### Feature 1 — Task Creation

> **Owner:** Developer A

| ID | Requirement |
|---|---|
| CR-1 | The UI shall display a text input field and an "Add" button at the top of the page. |
| CR-2 | When the user types a task description and clicks "Add" (or presses **Enter**), a new task shall be appended to the task list. |
| CR-3 | The input field shall be cleared after a task is successfully added. |
| CR-4 | Empty or whitespace-only submissions shall be rejected — no empty tasks may be created. |
| CR-5 | Each task shall be assigned a unique identifier (e.g. UUID or timestamp-based ID). |
| CR-6 | New tasks shall default to an **incomplete** state. |

#### Acceptance Criteria

- [ ] Typing "Buy groceries" and pressing Enter adds "Buy groceries" to the list.
- [ ] Pressing "Add" with an empty input does nothing (no blank task appears).
- [ ] The input field is empty and focused after a successful add.
- [ ] Each task element in the DOM has a unique `data-id` attribute.

---

### Feature 2 — Task Completion

> **Owner:** Developer B

| ID | Requirement |
|---|---|
| TC-1 | Each task in the list shall display a checkbox (or equivalent toggle control). |
| TC-2 | Clicking the checkbox shall toggle the task between **complete** and **incomplete** states. |
| TC-3 | Completed tasks shall be visually distinguished (e.g. strikethrough text, muted colour, or a checkmark icon). |
| TC-4 | Toggling completion shall not reorder or remove the task from the list. |
| TC-5 | The completion state shall be stored in the same data structure used by the creation feature. |

#### Acceptance Criteria

- [ ] Clicking an unchecked task marks it as complete with a visible style change.
- [ ] Clicking a completed task toggles it back to incomplete.
- [ ] The task remains in its original position after toggling.

---

### Feature 3 — Task Deletion

> **Owner:** Developer C

| ID | Requirement |
|---|---|
| TD-1 | Each task in the list shall display a "Delete" button (e.g. an ✕ icon or a trash icon). |
| TD-2 | Clicking the delete button shall remove the task from the list immediately. |
| TD-3 | Deleted tasks shall be removed from the underlying data structure, not just hidden. |
| TD-4 | The delete action shall not require a confirmation dialog (keep interaction lightweight). |

#### Acceptance Criteria

- [ ] Clicking the delete button on a task removes it from the DOM.
- [ ] After deletion, the task no longer exists in the app's data store.
- [ ] Deleting one task does not affect any other task in the list.

---

## 5. UI / UX Requirements

| Area | Requirement |
|---|---|
| **Layout** | Single-page app with a centred card layout. Input area at top, task list below. |
| **Responsiveness** | Usable on desktop and mobile viewports (min 320 px width). |
| **Empty State** | When no tasks exist, display a friendly message (e.g. "No tasks yet — add one above!"). |
| **Aesthetics** | Modern, polished look — dark mode palette, subtle shadows, smooth transitions. |
| **Typography** | Use a clean sans-serif web font (e.g. Inter or Outfit from Google Fonts). |

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Persistence** | Not required for v1.0 (data lives in memory; refreshing the page resets the list). |
| **Performance** | The app should render and respond to interactions with no perceptible delay. |
| **Accessibility** | All interactive elements must be keyboard-navigable and have appropriate ARIA labels. |
| **Browser Support** | Latest versions of Chrome, Firefox, Safari, and Edge. |

## 7. Out of Scope (v1.0)

- User authentication / accounts
- Backend API / database persistence
- Task editing (renaming)
- Drag-and-drop reordering
- Due dates, priorities, or categories
- Filtering / searching tasks
