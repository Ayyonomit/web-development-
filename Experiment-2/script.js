// script.js
(function () {
  "use strict";

  // ===== EDIT THIS: the email address that receives messages =====
  var CONTACT_EMAIL = "your-email@example.com";

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var selectedPlan = "";

  // Remember which package button the visitor clicked
  document.querySelectorAll("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectedPlan = btn.getAttribute("data-plan") || "";
    });
  });

  // Strip control characters and trim; text is only ever used via encodeURIComponent
  function clean(value, max) {
    return String(value || "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim()
      .slice(0, max);
  }

  function setInvalid(field, bad) {
    field.setAttribute("aria-invalid", bad ? "true" : "false");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Bots fill the hidden field; silently stop
    if (form.elements["website"].value) return;

    var name = clean(form.elements["name"].value, 80);
    var email = clean(form.elements["email"].value, 120);
    var message = clean(form.elements["message"].value, 1500);

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setInvalid(form.elements["name"], !name);
    setInvalid(form.elements["email"], !emailOk);
    setInvalid(form.elements["message"], !message);

    if (!name || !emailOk || !message) {
      status.textContent = "Fill in your name, a valid email, and a message.";
      return;
    }

    var subject = "Thumbnail inquiry from " + name + (selectedPlan ? " (" + selectedPlan + ")" : "");
    var body = "Name: " + name + "\nEmail: " + email + (selectedPlan ? "\nPackage: " + selectedPlan : "") + "\n\n" + message;

    status.textContent = "Opening your email app. Press send there to finish.";
    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
