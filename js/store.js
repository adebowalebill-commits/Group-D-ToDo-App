// js/store.js
// Shared data store — single source of truth for all tasks.

/**
 * @typedef {Object} Task
 * @property {string}  id        – Unique identifier
 * @property {string}  text      – Task description
 * @property {boolean} completed – Whether the task is complete
 */

/** @type {Task[]} */
let tasks = [];

/**
 * Return a shallow copy of the tasks array.
 * @returns {Task[]}
 */
export function getTasks() {
  return [...tasks];
}

/**
 * Find a task by its ID.
 * @param {string} id
 * @returns {Task|undefined}
 */
export function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

/**
 * Create a new task and add it to the list.
 * @param {string} text – The task description (must be non-empty after trimming).
 * @returns {Task|null} The newly created task, or null if text was invalid.
 */
export function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const task = {
    id: crypto.randomUUID(),
    text: trimmed,
    completed: false,
  };

  tasks.push(task);
  return task;
}

/**
 * Toggle the completed state of a task.
 * @param {string} id
 * @returns {Task|null} The updated task, or null if not found.
 */
export function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  task.completed = !task.completed;
  return task;
}

/**
 * Delete a task by its ID.
 * @param {string} id
 * @returns {boolean} True if the task was found and removed.
 */
export function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
