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
  const taskList = document.getElementById('task-list');

  // Add a 'change' event listener using event delegation
  taskList.addEventListener('change', (event) => {
    
    // 1. Check if the target that triggered the event is a checkbox
    if (event.target.classList.contains('task-checkbox')) {
      
      // 2. Find the parent .task-item and get its data-id
      const taskItem = event.target.closest('.task-item');
      const taskId = taskItem.dataset.id; 
      
      // 3. Call toggleTask from the store to update the state
      toggleTask(taskId);
      
      // 4. Call renderTasks to refresh the UI and apply the completed CSS classes
      renderTasks();
    }
  });
}