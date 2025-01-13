// Select necessary DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Variables to store the current operation and values
let firstValue = "";
let operator = "";
let secondValue = "";
let resetDisplay = false;

// Event listener for all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (!isNaN(action) || action === "decimal") {
            handleNumberInput(action);
        } else {
            handleOperatorInput(action);
        }
    });
});

// Handle number and decimal input
function handleNumberInput(value) {
    if (resetDisplay) {
        display.textContent = "0";
        resetDisplay = false;
    }

    if (value === "decimal") {
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
        }
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }

    if (!operator) {
        firstValue = display.textContent;
    } else {
        secondValue = display.textContent;
    }
}

// Handle operator input
function handleOperatorInput(action) {
    switch (action) {
        case "clear":
            clearCalculator();
            break;
        case "backspace":
            backspace();
            break;
        case "percent":
            convertToPercent();
            break;
        case "equals":
            calculateResult();
            break;
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
            setOperator(action);
            break;
        default:
            break;
    }
}

// Clear the calculator
function clearCalculator() {
    firstValue = "";
    secondValue = "";
    operator = "";
    display.textContent = "0";
}

// Delete the last character
function backspace() {
    display.textContent = display.textContent.slice(0, -1) || "0";

    if (!operator) {
        firstValue = display.textContent;
    } else {
        secondValue = display.textContent;
    }
}

// Convert to percentage
function convertToPercent() {
    const currentValue = parseFloat(display.textContent) || 0;
    display.textContent = (currentValue / 100).toString();
    if (!operator) {
        firstValue = display.textContent;
    } else {
        secondValue = display.textContent;
    }
}

// Set the operator
function setOperator(action) {
    if (firstValue && secondValue) {
        calculateResult();
    }
    operator = action;
    resetDisplay = true;
}

// Calculate the result
function calculateResult() {
    if (!firstValue || !operator || !secondValue) return;

    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    let result = 0;

    switch (operator) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            break;
    }

    // Fix floating-point precision issues by rounding
    result = typeof result === "number" ? parseFloat(result.toFixed(10)) : result;

    display.textContent = result.toString();
    firstValue = result.toString();
    secondValue = "";
    operator = "";
    resetDisplay = true;
}
