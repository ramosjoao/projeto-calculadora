const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previusOperandTextElement = document.querySelector("[data-previus-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previusOperandTextElement, currentOperandTextElement) {
        this.previusOperandTextElement = previusOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    calculate() {
        let result;
        const previusOperandFloat = parseFloat(this.previusOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);
        if (isNaN(previusOperandFloat) || isNaN(currentOperandFloat)) return;
        switch (this.operation) {
            case '+':
                result = previusOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previusOperandFloat - currentOperandFloat;
                break;
            case '÷':
                result = previusOperandFloat / currentOperandFloat;
            case '*':
                result = previusOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previusOperand = '';
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previusOperand != '') {
            this.calculate()
        } 
        this.operation = operation;
        this.previusOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.currentOperand = "";
        this.previusOperand = "";
        this.operation = undefined;
    }
    updateDisplay() { 
        this.previusOperandTextElement.innerText = `${this.previusOperand} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previusOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText)
        calculator.updateDisplay();
    });
}
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})