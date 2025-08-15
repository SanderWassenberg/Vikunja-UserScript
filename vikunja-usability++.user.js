// ==UserScript==
// @name        Vikunja Usability++
// @namespace   github.com/SanderWassenberg
// @match       http://*/*
// @match       https://*/*
// @grant       none
// @version     1.0
// @author      Sander
// @description Fix some annoyances, add some features.
// ==/UserScript==

if (document.title.endsWith("| Vikunja")) return;
console.log("%cRunning Sander's custom Vikunja script", "color:cyan");

window.addEventListener("keydown", e => {
  switch (e.key) {

    // This adds:
    // Pressing Enter in the filter screen runs the query, so I don't have to move my mouse to the "Show Results" Button
    case "Enter": {
      if (document.activeElement.matches(".filter-input > .input")) {
        const button = Array.prototype.find.call(
          document.querySelectorAll("footer > button"),
          e => e.innerText.toLowerCase() === "show results");
        button.click();
      }
    } break;

    // This adds:
    // Pressing F on a project page opens the filter menu
    case "f": {
      const on_project_page = location.pathname.startsWith("/projects/");
      const no_modal_open = !document.querySelector("body>section.modal-mask");
      if (on_project_page && no_modal_open) {
        e.preventDefault(); // do not register keystroke
        Array.prototype.find.call(
          document.querySelectorAll(".filter-container > button"),
          e => e.innerText.toLowerCase() === "filters").click();
      }
    } break;

    // This adds:
    // Esc closes any modal
    case "Escape": {
      console.log("escape!");
      document.querySelector("body>section.modal-mask>.modal-container>button.close").click();
    } break;
  }
});

// This adds:
// Clicking on the FILTER button automatically changes focus to the query input
window.addEventListener("click", e => {
  if (e.target.matches(".filter-container>button")) {
    if (e.target.innerText.toLowerCase() === "filters") {
        setTimeout(()=>{ // this timeout of 0 is necessary to make this work on keypresses, otherwise the queryselector can return null (for some reason)
          document.querySelector("body>section .filter-input > .input").focus()
        }, 0);
    }
  }
});
