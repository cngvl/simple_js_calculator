class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear()
  }

  clear() {
    // console.log('Clearing');
    this.currentOperandTextElement = '';
    this.currentOperand = '';
    this.previousOperandTextElement = '';
    this.previousOperand = '';
    this.operation = undefined;
    currentOperandTextElement.innerText = this.currentOperandTextElement;
    previousOperandTextElement.innerText = this.previousOperandTextElement
  }

  delete() {
    // console.log('Deleting');
    // console.log(typeof this.currentOperand);
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    // console.log(this.currentOperand === undefined)
    if (this.currentOperand === undefined) {
      this.currentOperand = number
    } else {
      this.currentOperand += number
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '';
  }

  compute() {
    if (this.currentOperand === '' || this.previousOperand === '') return
    var answer = 0;
    const prevOperandVal = parseInt(previousOperandTextElement.innerText, 10);
    const currentOperandVal = parseInt(currentOperandTextElement.innerText, 10);
    switch (this.operation.innerText) {
      case '+':
        answer = prevOperandVal + currentOperandVal;
        break
      case '-':
        answer = prevOperandVal - currentOperandVal;
        break
      case '*':
        answer = prevOperandVal * currentOperandVal;
        break
      case '÷':
        answer = prevOperandVal / currentOperandVal;
        break
    }
    this.currentOperand = answer
    this.previousOperand = `${prevOperandVal} ${this.operation.innerText} ${currentOperandVal}`
    this.operation = null
    this.removeActiveOperation()
  }

  updateDisplay() {
    // console.log('Updating display')
    currentOperandTextElement.innerText = this.currentOperand
    previousOperandTextElement.innerText = this.previousOperand
    if (this.operation !== null) {
      previousOperandTextElement.innerText += ` ${this.operation.innerText}`
    }
  }

  removeActiveOperation() {
    const allElements = document.querySelectorAll('*')
    allElements.forEach((item) => {
      item.classList.remove("active-operation")
    })
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
var operationExists = false

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // console.log('Number pressed')
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

clearAllButton.addEventListener('click', () => {
  // console.log('Clear pressed')
  calculator.clear()
})

deleteButton.addEventListener('click', () => {
  // console.log('Delete pressed')
  calculator.delete()
  calculator.updateDisplay()
})

operationButtons.forEach((opbutton) => {
  opbutton.addEventListener('click', () => {
    if (operationExists === false) {
      // console.log("Operation doesn't exist");
      calculator.chooseOperation(opbutton)
      calculator.updateDisplay()
      opbutton.classList.toggle("active-operation")
      operationExists = true
    }
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay()
  operationExists = false
})
