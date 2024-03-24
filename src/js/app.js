import TasksWidget from "./TasksWidget";

let tasksWidget;

document.addEventListener("DOMContentLoaded", () => {
  tasksWidget = new TasksWidget(document.querySelector(".tasks"));
});
