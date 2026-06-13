// js/app.js
// Entry point — imports all feature modules and provides the shared renderTasks() function.

import { getTasks } from './store.js';
import { initTaskCreation } from './taskCreation.js';
import { createCheckbox, initTaskCompletion } from './taskCompletion.js';
import { createDeleteBtn, initTaskDeletion } from './taskDeletion.js';

// DOM references
const taskListEl = document.getElementById('task-list');
const emptyStateEl = document.getElementById('empty-state');

/**
 * Re-render the entire task list from the store.
 * Each feature module contributes a piece of each <li>.
 */
function renderTasks() {
  const tasks = getTasks();

  // Clear existing list
  taskListEl.innerHTML = '';

  // Toggle empty state
  emptyStateEl.classList.toggle('visible', tasks.length === 0);

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('data-id', task.id);

    // Apply completed class if needed
    if (task.completed) {
      li.classList.add('task--completed');
    }

    // --- Task Completion: checkbox (Developer B) ---
    const checkbox = createCheckbox(task);
    li.appendChild(checkbox);

    // --- Task text ---
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    li.appendChild(span);

    // --- Task Deletion: delete button (Developer C) ---
    const deleteBtn = createDeleteBtn(task);
    li.appendChild(deleteBtn);

    taskListEl.appendChild(li);
  });
}

// Initialise all features
initTaskCreation(renderTasks);
initTaskCompletion(renderTasks);
initTaskDeletion(renderTasks);

// Initial render (shows empty state)
renderTasks();
