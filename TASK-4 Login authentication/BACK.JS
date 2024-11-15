// Elements
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const securedPage = document.getElementById("secured-page");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");

const goToLogin = document.getElementById("go-to-login");
const goToRegister = document.getElementById("go-to-register");

const logoutButton = document.getElementById("logout");

// Initialize users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Show login or secured page if already logged in
if (loggedInUser) {
  showSecuredPage();
} else {
  showRegisterForm();
}

// Event Listeners
goToLogin.addEventListener("click", showLoginForm);
goToRegister.addEventListener("click", showRegisterForm);

registerForm.addEventListener("submit", registerUser);
loginForm.addEventListener("submit", loginUser);
logoutButton.addEventListener("click", logoutUser);

// Functions to manage pages

function showRegisterForm() {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
  securedPage.style.display = "none";
}

function showLoginForm() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  securedPage.style.display = "none";
}

function showSecuredPage() {
  registerForm.style.display = "none";
  loginForm.style.display = "none";
  securedPage.style.display = "block";
}

// Registration logic
function registerUser(event) {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if user already exists
  if (users.some(user => user.username === username)) {
    alert("Username already exists!");
    return;
  }

  // Register new user
  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("User registered successfully! Please log in.");
  showLoginForm();
}

// Login logic
function loginUser(event) {
  event.preventDefault();
  
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  // Find user in users array
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    showSecuredPage();
  } else {
    alert("Invalid credentials!");
  }
}

// Logout logic
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  loggedInUser = null;
  showRegisterForm();
}
