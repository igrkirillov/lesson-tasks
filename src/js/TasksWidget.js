import Task from "./Task";
import TaskWidget from "./TaskWidget";
import TaskInputWidget from "./TaskInputWidget";
import NoTasksWidget from "./NoTasksWidget";

export default class TasksWidget {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.pinnedPanel = element.querySelector(".pinned-panel");
    this.allPanel = element.querySelector(".all-panel");
    this.taskInputWidget = new TaskInputWidget(this, element.querySelector(".task-input"));
    this.noPinnedTasksWidget = new NoTasksWidget(this, element.querySelector(".pinned-panel .no-pinned-tasks"));
    this.noTasksFoundWidget = new NoTasksWidget(this, element.querySelector(".all-panel .no-tasks-found"));
    this.taskWidgets = [];
    this.updateVisibilityNoTasksWidget();
  }

  addNewTask(name) {
    console.log(name);
    const task = new Task(name);
    const taskWidget = new TaskWidget(this, task, this.createTaskElement(task));
    this.taskWidgets.push(taskWidget);
    this.updateVisibilityNoTasksWidget();
  }

  createTaskElement(task) {
    const element = document.createElement("div");
    element.classList.add("task");
    element.innerHTML =
        `<label>
            ${task.name}
            <input class=\"pinned-flag hidden ${task.pinnedFlag ? "checked" : ""} \" 
                type=\"checkbox\" ${task.pinnedFlag ? "checked" : ""}/>
         </label>
         `;
    if (task.pinnedFlag) {
      this.pinnedPanel.appendChild(element);
    } else {
      this.allPanel.appendChild(element);
    }
    return element;
  }

  moveToPinned(task) {
    const taskWidget = this.taskWidgets.find(el => el.task === task);
    this.allPanel.removeChild(taskWidget.element);
    this.pinnedPanel.appendChild(taskWidget.element);
    this.updateVisibilityNoTasksWidget();
  }

  moveToAll(task) {
    const taskWidget = this.taskWidgets.find(el => el.task === task);
    this.pinnedPanel.removeChild(taskWidget.element);
    this.allPanel.appendChild(taskWidget.element);
    this.updateVisibilityNoTasksWidget();
  }

  updateVisibilityNoTasksWidget() {
    if (this.taskWidgets.find(tw => tw.task.pinnedFlag)) {
      this.noPinnedTasksWidget.hide();
    } else {
      this.noPinnedTasksWidget.show();
    }
    if (this.taskWidgets.find(tw => !tw.task.pinnedFlag)) {
      this.noTasksFoundWidget.hide();
    } else {
      this.noTasksFoundWidget.show();
    }
  }

  filter(text) {
    const lowerCasedText = text ? text.toLowerCase().trim() : "";
    for (const tw of this.taskWidgets) {
      console.log(lowerCasedText);
      const matched = !text || tw.task.name.toLowerCase().startsWith(lowerCasedText);
      if (matched) {
        tw.show();
      } else {
        tw.hide();
      }
    }
  }
}
