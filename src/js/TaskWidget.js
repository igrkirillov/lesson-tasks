export default class TaskWidget {
  constructor(tasksWidget, task, element) {
    this.tasksWidget = tasksWidget;
    this.task = task;
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.toolgleElement = element.querySelector(".pinned-flag");
    this.visible = true;

    this.onClickCheckbox = this.onClickCheckbox.bind(this);

    this.toolgleElement.addEventListener("change", this.onClickCheckbox);
  }

  onClickCheckbox(event) {
    if (this.toolgleElement.checked) {
      this.task.pinnedFlag = true;
      this.toolgleElement.classList.add("checked");
      this.tasksWidget.moveToPinned(this.task);
    } else {
      this.task.pinnedFlag = false;
      this.toolgleElement.classList.remove("checked");
      this.tasksWidget.moveToAll(this.task);
    }
  }

  show() {
    this.visible = true;
    this.element.classList.remove("displayNone");
    console.log(this.visible);
  }

  hide() {
    this.visible = false;
    this.element.classList.add("displayNone");
    console.log(this.visible);
  }
}
