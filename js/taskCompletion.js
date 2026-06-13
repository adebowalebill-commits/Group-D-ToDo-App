// js/taskCompletion.js
// Feature 2 — Task Completion (Developer B)
//
// Responsibilities:
//   1. Provide a helper to create a checkbox element for a given task.
//   2. Set the checkbox state based on task.completed.
//   3. Listen for change events (via event delegation) and call store.toggleTask(id).
//   4. Apply the .task--completed CSS class to completed tasks.
//   5. Call the provided renderTasks() callback to refresh the UI.

import { toggleTask } from './store.js';

/**
 * Create a checkbox element for a task.
 * @param {import('./store.js').Task} task
 * @returns {HTMLInputElement}
 */
export function createCheckbox(task) {
  // TODO: Developer B — implement this function.
  // Should return an <input type="checkbox"> with:
  //   - class "task-checkbox"
  //   - checked property matching task.completed
  //   - appropriate aria-label
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
  return checkbox;
}

/**
 * Initialise event delegation for task completion toggles.
 * @param {Function} renderTasks – Callback to re-render the full task list.
 */
export function initTaskCompletion(renderTasks) {
  // TODO: Developer B — implement this function.
  // Should add a 'change' event listener on #task-list that:
  //   1. Checks if the target is a .task-checkbox
  //   2. Finds the parent .task-item's data-id
  //   3. Calls toggleTask(id)
  //   4. Calls renderTasks()
}
