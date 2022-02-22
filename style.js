let form = document.getElementById("form");
let userName = document.getElementById("txtUserName");
let email = document.getElementById("txtEmail");
let password = document.getElementById("txtPass");
let conpwd = document.getElementById("txtConPwd");
let btn = document.getElementById("button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();

  if (isFormValid() == true) {
    form.submit();
  } else {
    event.preventDefault();
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll(".form-control");
  let result = true;

  inputContainers.forEach((small) => {
    if (small.classList.contains("error")) {
      result = false;
    }
  });

  return result;
}

function validateForm() {
  if (userName.value.trim() === "") {
    onError(userName, "Username cannot be empty");
  } else {
    onSuccess(userName);
  }

  if (email.value.trim() === "") {
    onError(email, "Email cannot be empty");
  } else if (!isValidEmail(email.value.trim())) {
    onError(email, "Email is not valid");
  } else {
    onSuccess(email);
  }

  if (password.value.trim() === "") {
    onError(password, "Password cannot be empty");
  } else if (!isValidPassword(password.value.trim())) {
    onError(
      password,
      "Password must be at least 8 characters, must contain atleast an uppercase, lowercase, numeric digit and a special character"
    );
  } else {
    onSuccess(password);
  }

  if (conpwd.value.trim() === "") {
    onError(conpwd, "Re-enter your password");
  } else if (conpwd.value.trim() != password.value.trim()) {
    onError(conpwd, "Not matching with password");
  } else {
    onSuccess(conpwd);
  }
}

function onSuccess(input) {
  let parent = input.parentElement;
  let messageEl = parent.querySelector("small");
  messageEl.style.visibility = "hidden";
  messageEl.innerText = "";
  parent.classList.remove("error");
  parent.classList.add("success");
}

function onError(input, message) {
  let parent = input.parentElement;
  let messageEl = parent.querySelector("small");
  messageEl.innerText = message;
  messageEl.style.visibility = "visible";
  messageEl.style.color = "red";
  parent.classList.remove("success");
  parent.classList.add("error");
}

function isValidPassword(password) {
  let passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return passwordRegex.test(password);
}

function isValidEmail(email) {
  let emailRegex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  return emailRegex.test(email);
}
