/*  File Name: app.js
    Student: Oscar Eduardo Gonzalez-Neira 
    Code: 301185878
    ---------------------------------------------
    Date            Update
    03/10/2021  Initial implementation
    21/10/2021  Update to get approval for any button 
*/
// IIFE Immediately Invoked Function Expression

(function () {
  function Start() {
    console.log("App started...");
    let deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach(el=> {
      el.addEventListener("click", () => {
        if (!confirm("Are you sure?")){
          event.preventDefault();
          window.location.assign("/contact-list");
        }
      });
    });
  }
  window.addEventListener("load", Start);
})();
