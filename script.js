class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();

    }

    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
    }

    insertNum(num) {
        if(num === '.' && this.current.includes('.')) return;
        if(this.current === 'error') return;
        this.current += num;
    }

    insertOperator(operation) {
        if(this.current === '') return;
        if(this.previous !== ''){
            this.compute();
        }

        if(this.current == 'error' ) return;
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    compute() {
        let total;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);

        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation){
            case '+':
                total = prev + curr;
                break;
            case '-':
                total = prev - curr;
                break;
            case '*':
                total = prev * curr;
                break;
            case '/':
                if(curr == 0) {
                    this.divisionByZero();
                    return;
                }
                total = prev / curr;
                break;
        }

        this.current = total;
        this.operation = undefined;
        this.previous = '';
    }

    getDisplayNumber(num) {
        const stringNum = num.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;

        if(isNaN(intDigits)){
            integerDisplay = '';
        }else {
            integerDisplay = intDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            });
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay;
        }
    }

    updateDisplay() {      
        if(this.current === 'error'){
            this.currentTextElement.innerText = "You can't divide by 0";
            this.previousTextElement.innerText = "Wait, that's illegal!";
            return;
        }

        this.currentTextElement.innerText = this.getDisplayNumber(this.current);
        if(this.operation != null) {
            this.previousTextElement.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        }else {
            this.previousTextElement.innerText = this.previous;
        }
        
    }

    divisionByZero () {
        this.current = 'error';
        this.previous = 'error';
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('button[id=clear]');
const equalButton = document.querySelector('button[id=equals]');
const deleteButton = document.querySelector('button[id=delete]');
const previousTextElement = document.querySelector('div[id=previous-input]');
const currentTextElement = document.querySelector('div[id=current-input]');

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertNum(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertOperator(button.innerText);
        calculator.updateDisplay();
    })
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

operationButtons.forEach(button => {
    button.classList.add('operator-buttons');
});