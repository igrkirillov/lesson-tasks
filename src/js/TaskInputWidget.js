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
    this.clearErrorEmpty();
    if (event.key === "Enter") {
      if (this.isFieldEmpty()) {
        this.setErrorEmpty();
        return;
      }
      this.tasksWidget.addNewTask(this.element.value);
      this.clearInput();
      this.tasksWidget.filter("");
    } else {
      this.filterExecutor.execFilter(this.element.value);
    }
  }

  isFieldEmpty() {
    return !this.element.value;
  }

  setErrorEmpty() {
    this.element.closest("label").classList.add("error-empty");
  }

  clearErrorEmpty() {
    this.element.closest("label").classList.remove("error-empty");
  }

  onInput(event) {
    this.clearErrorEmpty();
    this.filterExecutor.execFilter(this.element.value);
  }

  clearInput() {
    this.element.value = "";
  }
}
