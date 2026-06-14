import { deleteTask } from "./store.js";

export function initTaskDeletion(taskList, renderTasks) {

    taskList.addEventListener("click", (event) => {

        if (!event.target.classList.contains("delete-btn")) return;

        const id = event.target.dataset.id;

        deleteTask(id);

        renderTasks();
    });

}