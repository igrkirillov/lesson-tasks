export default class NoTasksWidget {
  constructor(tasksWidget, element) {
    this.tasksWidget = tasksWidget;
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
  }

  show() {
    this.element.classList.remove("displayNone");
  }

  hide() {
    this.element.classList.add("displayNone");
  }
}
