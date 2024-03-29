/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 580:
/***/ ((module) => {

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/js/Task.js
class Task {
  constructor(name) {
    this.name = name;
    this.pinnedFlag = false;
  }
}
;// CONCATENATED MODULE: ./src/js/TaskWidget.js
class TaskWidget {
  constructor(tasksWidget, task, element) {
    this.tasksWidget = tasksWidget;
    this.task = task;
    if (typeof element === "string") {
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
;// CONCATENATED MODULE: ./src/js/FilterExecutor.js
class FilterExecutor {
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
;// CONCATENATED MODULE: ./src/js/TaskInputWidget.js

class TaskInputWidget {
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
    this.clearEmptyError();
    if (event.key === "Enter") {
      if (this.isFieldEmpty()) {
        this.setEmptyError();
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
  setEmptyError() {
    this.element.closest("label").classList.add("error-empty");
  }
  clearEmptyError() {
    this.element.closest("label").classList.remove("error-empty");
  }
  onInput(event) {
    this.clearEmptyError();
    this.filterExecutor.execFilter(this.element.value);
  }
  clearInput() {
    this.element.value = "";
  }
}
;// CONCATENATED MODULE: ./src/js/NoTasksWidget.js
class NoTasksWidget {
  constructor(tasksWidget, element) {
    this.tasksWidget = tasksWidget;
    if (typeof element === "string") {
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
// EXTERNAL MODULE: ./node_modules/escape-html/index.js
var escape_html = __webpack_require__(580);
var escape_html_default = /*#__PURE__*/__webpack_require__.n(escape_html);
;// CONCATENATED MODULE: ./src/js/TasksWidget.js





class TasksWidget {
  constructor(element) {
    if (typeof element === "string") {
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
    element.innerHTML = `<label>
            ${escape_html_default()(task.name)}
            <input class="pinned-flag hidden ${task.pinnedFlag ? "checked" : ""}" type="checkbox" 
                ${task.pinnedFlag ? "checked" : ""}/>
       </label>`;
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
;// CONCATENATED MODULE: ./src/js/app.js

let tasksWidget;
document.addEventListener("DOMContentLoaded", () => {
  tasksWidget = new TasksWidget(document.querySelector(".tasks"));
});
;// CONCATENATED MODULE: ./src/index.js


})();

/******/ })()
;