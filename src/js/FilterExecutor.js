export default class FilterExecutor {
  constructor(tasksWidget) {
    this.tasksWidget = tasksWidget;
    this.timerId = null;
  }

  execFilter(text) {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.tasksWidget.filter(text);
    }, 300);
  }

}
