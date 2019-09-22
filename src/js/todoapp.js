// JAVASCRIPT TODOLIST APP
// ==============================
;(function (win, doc, undefined) {
  'use strict';

  var TodoApp = {

    domElement: null,
    domSelector: '',

    // PUBLIC METHODS
    // ==============================

    init: function(selector, options) {
      this.selector = selector;
      this._refreshDomElement();
      this._drawHtml();
      this._bindEventListeners();
    },

    // PRIVATE METHODS
    // ==============================

    _refreshDomElement: function() {
      this.domElement = doc.querySelector(this.selector);
      if (this.domElement) {
        this.domElement.classList.add('todolist');
      }
    },

    _drawHtml: function() {
      if (this.domElement == null) {
        return;
      }

      this.domElement.innerHTML = this._renderHtml();
    },

    _renderHtml: function() {
      return [
        '<div class="todolist__container">',
          '<label class="todolist__label">',
            '<input class="todolist__input" type="text" placeholder="Type some text to do">',
          '</label>',
          '<ul class="todolist__list"></ul>',
        '</div>'
      ].join('');
    },

    _bindEventListeners: function() {
      var inputElement = this.domElement.querySelector(".todolist__input");

      var _this = this;
      inputElement.addEventListener("keypress", function(event) {
        if (event && event.keyCode == 13) {
          _this._addTodoItem(inputElement.value);
        }
      });
    },

    _addTodoItem: function(itemText) {
      if (!itemText || !itemText.length) {
        return;
      }

      itemText = itemText.trim();
      var item = this._createTodoItem(itemText);
      var list = this.domElement.querySelector(".todolist__list");
      list.appendChild(item);

      var inputElement = this.domElement.querySelector(".todolist__input");
      inputElement.value = '';
    },

    _createTodoItem: function(text) {
      var item = doc.createElement('LI');
      item.className = "todolist__item todolist__item--active";
      item.innerText = text;
      return item;
    },

  };

  win.$todoApp = TodoApp;

})(window, document, undefined);

function onDocumentReady(fn) {
  // See if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

onDocumentReady(function() {
  if (window.$todoApp) {
    window.$todoApp.init("#page");
  }
});