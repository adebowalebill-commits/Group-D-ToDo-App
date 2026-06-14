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
  const taskList = document.querySelector('#task-list');

  taskList.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-btn');
    if (!deleteBtn) return;

    const taskItem = deleteBtn.closest('.task-item');
    if (!taskItem) return;

    const id = taskItem.dataset.id;
    if (!id) return;

    deleteTask(id);
    renderTasks();
  });
}
