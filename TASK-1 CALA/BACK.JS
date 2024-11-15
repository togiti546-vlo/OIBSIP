// script.js
let currentInput = "";
let previousInput = "";
let operator = null;

const screen = document.getElementById("screen");

function updateDisplay(value) {
  screen.value = value;
}

// Function to handle number and operator button clicks
function handleButtonClick(value) {
  if (value === "C") {
    // Clear the screen
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay("");
  } else if (value === "=") {
    if (operator && previousInput !== "" && currentInput !== "") {
      currentInput = calculate(previousInput, operator, currentInput);
      previousInput = "";
      operator = null;
      updateDisplay(currentInput);
    }
  } else if (["+", "-", "*", "/"].includes(value)) {
    // Store the operator and current input
    if (currentInput !== "") {
      if (previousInput !== "") {
        currentInput = calculate(previousInput, operator, currentInput);
        updateDisplay(currentInput);
      }
      operator = value;
      previousInput = currentInput;
      currentInput = "";
    }
  } else {
    currentInput += value;
    updateDisplay(currentInput);
  }
}

// Function to perform the calculation
function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      if (b === 0) {
        alert("Cannot divide by zero!");
        return "";
      }
      return (a / b).toString();
    default:
      return b.toString();
  }
}

// Event listeners for all buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () =>
    handleButtonClick(button.getAttribute("data-value"))
  );
});
