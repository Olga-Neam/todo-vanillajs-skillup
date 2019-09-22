// JAVASCRIPT SANDBOX
// ==============================
;(function(_window) {
  'use strict';

  // REMOVE RETURN TO SEE IN ACTION
  return;

  // Get title from document <head>
  var oldTitle = document.head.querySelector("title");

  // Create new title with text inside
  var newTitle = document.createElement("title");
  newTitle.innerText = "THIS IS UPDATED TITLE";

  // Replace the old title (existing) with the new one
  document.head.replaceChild(newTitle, oldTitle);

  // Get DOM element from the page which has id = "page"
  var pageElement = document.getElementById('page');

  // Dynamically create anchor (link) DOM element
  var anchor = document.createElement("A");

  // Set html content and href/title attributes for dynamically created Anchor
  anchor.innerHTML = "This is some sort of a link";
  anchor.href = "#";
  anchor.title = "\"This is some sort of a link\"";

  pageElement.appendChild(anchor);

  /*
  // Removes the anchor (link) element after 5 seconds
  setTimeout(function () {
    pageElement.removeChild(anchor);
  }, 5000);
   */

  // Dynamically set the unique attribute value
  anchor.setAttribute(getUniqueAttribute(), generateUniqueValue());

  // Hide the Anchor element
  anchor.style.display = "none";

  // Display the Anchor element after 1 second
  setTimeout(function() {
    anchor.style.display = "inline-block";
  }, 1000);


  // Helpers
  // ==============================

  function getUniqueAttribute() {
    return "data-unique-id";
  }

  function generateUniqueValue() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

})(window);
