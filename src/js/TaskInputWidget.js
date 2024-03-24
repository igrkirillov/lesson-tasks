import FilterExecutor from "./FilterExecutor";

export default class TaskInputWidget {
  constructor(tasksWidget, element) {
    this.tasksWidget = tasksWidget;
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    this.element = element;
    this.filterExecutor = new FilterExecutor(tasksWidget);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onInput = this.onInput.bind(this);

    this.element.addEventListener("keyup", this.onKeyDown);
    this.element.addEventListener("input", this.onInput);
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      this.tasksWidget.addNewTask(this.element.value);
      this.clearInput();
      this.tasksWidget.filter("");
    } else {
      this.filterExecutor.execFilter(this.element.value);
    }
  }

  onInput(event) {
    console.log("input");
    this.filterExecutor.execFilter(this.element.value);
  }

  clearInput() {
    this.element.value = "";
  }
}
