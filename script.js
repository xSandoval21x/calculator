const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('button[id=clear]');
const equalButton = document.querySelector('button[id=equals]');
const deleteButton = document.querySelector('button[id=delete]');
const previousTextElement = document.querySelector('div[id=previous-input]');
const currentTextElement = document.querySelector('div[id=current-input]');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        insertNum(button.innerText);
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        insertOperator(button.innerText);
    })
});

equalButton.addEventListener('click', equate);

let total = 0;
let operator;
let a = 0;
let b = 0;

function insertNum(num) {
    if(num === '.' && currentTextElement.innerText.includes('.')) return;

    const tempInput = currentTextElement.textContent;
    document.getElementById('current-input').innerText = tempInput + num;
}

function insertOperator(op) {
    const tempInput = currentTextElement.textContent;
    if(a == 0){
        if(total == 0){
            a = tempInput; 
        }else{
            a = total;
        }
    }else{
        b = tempInput.substring(tempInput.indexOf(operator)+1);
        operate(operator, a, b);    
    }
    operator = op;
    
    if(total == 0){
        document.getElementById('previous-input').textContent = tempInput + op;
    }else {
        document.getElementById('previous-input').textContent = total + op;
    }
    document.getElementById('current-input').textContent = '';
}

document.getElementById('clear').addEventListener('click', clear);

function clear() {
    document.getElementById('previous-input').textContent = '';
    document.getElementById('current-input').textContent = '';
    total = 0;
    a = 0;
    b = 0;
}

function equate() {
    const tempInput = currentTextElement.textContent;
    b = tempInput.substring(tempInput.indexOf(operator)+1);
    operate(operator, a, b);
    document.getElementById('current-input').textContent = `${total}`;
    document.getElementById('previous-input').textContent = '';
}

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            total = add(a, b);
            break;
        case '-':
            total = subtract(a, b);
            break;
        case '*':
            total = multiply(a, b);
            break;
        case '/':
            total = divide(a, b);
            break;
    }

    a = 0;
}