// default calculator functions
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function divide(a,b){
    if(b==0){
        return "Error";
    }
    return a/b;
}
function multiply(a,b){
    return a*b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}
let num1 = '';
let num2 = '';
let operator = null;
let resetDisplay = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
//updates the display of the calculator
function updateDisplay(value) {
  if (resetDisplay) {
    display.textContent = '';
    resetDisplay = false;
  }
  if (display.textContent === '0' && value !== '.') {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}
// triggers display update upon clicking a number
numberButtons.forEach(button => {
  button.addEventListener('click', () => updateDisplay(button.textContent));
});
//operator display
operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.textContent));
});
//equal button evaluates
equalButton.addEventListener('click', evaluate);

function setOperator(op) {
  if (operator !== null) evaluate();
  num1 = display.textContent;
  operator = op;
  display.textContent = `${num1} ${operator}`;
  resetDisplay = true;
}
function evaluate() {
  if (operator === null || resetDisplay) return;
  if (operator === '/' && display.textContent === '0') {
    display.textContent = ">_< Reset!";
    operator = null;
    return;
  }

  num2 = display.textContent;
  const result = operate(operator, parseFloat(num1), parseFloat(num2));

  display.textContent = Math.round(result*1e5)/1e5;
  operator = null;
}
// Clear button
clearButton.addEventListener('click', clear);

function clear() {
  display.textContent = '0';
  num1 = '';
  num2 = '';
  operator = null;
  resetDisplay = false;
}
//decimal
const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => addDecimal());
function addDecimal() {
  // If display is reset or showing an operator, start fresh
  if (resetDisplay) {
    display.textContent = '0';
    resetDisplay = false;
  }

  // Prevent multiple decimals in the current number
  const parts = display.textContent.split(/[\+\-\*\/]/);
  const currentPart = parts[parts.length - 1].trim()//removes space in the last element;
  if (currentPart.includes('.')) return;

  display.textContent += '.';
}

