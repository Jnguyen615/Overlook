const form = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function () {
  // Toggle the hidden attribute of the form
  form.hidden = true
});