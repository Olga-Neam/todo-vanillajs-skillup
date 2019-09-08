(function(_window) {

  var CREATE_MESSAGE = "Created new message"

  var TodoList = function() {
    _printMessage(CREATE_MESSAGE);
  };

  function _init(message) {
    if (message != null && message.length) {
      CREATE_MESSAGE = message;
    }
  }

  function _printMessage(message) {
    console.log(message);
  }

  // export the plugin to window
  _window.todoListPlugin = {
    init: _init,
    create: TodoList,
    print: _printMessage,
  };

})(window);


// IIFE example to count number of function calls
var sayHelloWithCounter = (function() {
  var n = 0;
  return function() {
    console.log("Hello! " + "I already told you this at least " + (++n) + " times!");
  }
})();