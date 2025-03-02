const display = document.querySelector('.screen');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let firstNum = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.val;

        if (button.classList.contains('num') || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } 
        else if (button.classList.contains('opr')) {
            if (value === 'C') {
                currentInput = '';
                firstNum = null;
                operator = null;
                display.value = '';
            } 
            else if (value === '<') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } 
            else if (value === '=') {
                if (firstNum !== null && operator && currentInput !== '') {
                    const secondNum = parseFloat(currentInput);
                    const result = compute(firstNum, secondNum, operator);
                    display.value = result;
                    currentInput = result.toString();
                    firstNum = null;
                    operator = null;
                }
            } 
            else {
                if (currentInput !== '') {
                    firstNum = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            }
        }
    });
});

function compute(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}
