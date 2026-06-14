// js/taskCreation.js
// Feature 1 — Task Creation (Developer A)
//
// Responsibilities:
//   1. Listen for click on #add-btn and Enter key on #task-input.
//   2. Validate that input is not empty/whitespace.
//   3. Call store.addTask(text) to create the task.
//   4. Call the provided renderTasks() callback to refresh the UI.
//   5. Clear and re-focus the input field.

import { addTask } from './store.js';

/**
 * Initialise the task creation feature.
 * @param {Function} renderTasks – Callback to re-render the full task list.
 */
export function initTaskCreation(renderTasks) {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');

  /**
   * Handle adding a new task from the input field.
   */
  function handleAdd() {
    const text = input.value.trim();
    if (!text) return; // Reject empty / whitespace-only input (CR-4)

    const task = addTask(text);
    if (task) {
      renderTasks();       // Refresh the list
      input.value = '';    // Clear the field (CR-3)
      input.focus();       // Re-focus for quick consecutive adds
    }
  }

  // Click the "Add" button (CR-2)
  addBtn.addEventListener('click', handleAdd);

  // Press Enter inside the input field (CR-2)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  });
}
