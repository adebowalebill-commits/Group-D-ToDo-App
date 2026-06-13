// js/taskDeletion.js
// Feature 3 — Task Deletion (Developer C)
//
// Responsibilities:
//   1. Provide a helper to create a delete button element for a given task.
//   2. Listen for click events (via event delegation) and call store.deleteTask(id).
//   3. Call the provided renderTasks() callback to refresh the UI.

import { deleteTask } from './store.js';

/**
 * Create a delete button element for a task.
 * @param {import('./store.js').Task} task
 * @returns {HTMLButtonElement}
 */
export function createDeleteBtn(task) {
  // TODO: Developer C — implement this function.
  // Should return a <button> with:
  //   - class "delete-btn"
  //   - inner text or icon (e.g. "✕")
  //   - appropriate aria-label
  const btn = document.createElement('button');
  btn.className = 'delete-btn';
  btn.textContent = '✕';
  btn.setAttribute('aria-label', `Delete "${task.text}"`);
  return btn;
}

/**
 * Initialise event delegation for task deletion.
 * @param {Function} renderTasks – Callback to re-render the full task list.
 */
export function initTaskDeletion(renderTasks) {
  // TODO: Developer C — implement this function.
  // Should add a 'click' event listener on #task-list that:
  //   1. Checks if the target is a .delete-btn
  //   2. Finds the parent .task-item's data-id
  //   3. Calls deleteTask(id)
  //   4. Calls renderTasks()
}
