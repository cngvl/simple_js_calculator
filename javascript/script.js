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
    // console.log(`BEFORE DELETE - ${this.currentOperand}`);
    this.currentOperand = this.currentOperand.slice(0, -1);
    // console.log(`AFTER DELETE - ${this.currentOperand}`)
  }

  appendNumber(number) {
    // console.log(this.currentOperand === undefined)
    if (this.currentOperand === undefined) {
      this.currentOperand = number
      // console.log(`IF BRANCH - Current operand in append number method - ${this.currentOperand}`)
    } else {
      this.currentOperand += number
      // console.log(`ELSE BRANCH - Current operand in append number method - ${this.currentOperand}`)
    }
  }

  chooseOperation(operation) {
    // Move the currentOperand text to previousOperand and include the operation symbol
    // Should retain the old input values in previousOperand
    // If there is no currentOperand, clicking an operand button won't do anything
    if (this.currentOperand === '') return
    // If there's already some content in the previous operand (NOT EMPTY), solve that and then do the next set of computations
    if (this.previousOperand !== '') {
      compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    // console.log(previousOperandTextElement.innerText)
    // previousOperandTextElement += operation
    // this.previousOperand += operation.innerText
    // console.log(operation.innerText)
    this.currentOperand = '';
    // console.log(`Running - '${operation}'`)
  }

  compute() {
    // Use updateDisplay with the computed value
    console.log('Computing')
    var answer = 0;
    const prevOperandVal = parseInt(previousOperandTextElement.innerText, 10);
    const currentOperandVal = parseInt(currentOperandTextElement.innerText, 10);
    console.log(prevOperandVal);
    console.log(currentOperandVal);
    console.log(this.operation.innerText);
    switch (this.operation.innerText) {
      case '+':
        answer = prevOperandVal + currentOperandVal;
        break
      case '-':
        answer = prevOperandVal - currentOperandVal;
        break
      case '+':
        answer = prevOperandVal + currentOperandVal;
        break
      case '+':
        answer = prevOperandVal / currentOperandVal;
        break
    }
    // console.log(answer);
    // return answer
    this.currentOperand = answer
    this.previousOperand = ''
    this.operation = null
  }

  updateDisplay() {
    // console.log('Updating display')
    // console.log(`Current operand in updateDisplay method - ${this.currentOperand}`)
    currentOperandTextElement.innerText = this.currentOperand
    previousOperandTextElement.innerText = this.previousOperand

    // console.log(opbutton.innerText)
    // adding this. BROKE the code
    // Use parameter and check if nul?¿¿
    // this.currentOperandTextElement.innerText = this.currentOperand
  }
}

// let d = new Date();
// document.body.innerHTML = `<p>Today's date is ${d}</p>`;
// These are the buttons
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')

// This is the display section
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // console.log(`Event listener - ${button.innerText}`)
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
    // console.log(`${opbutton.innerText} clicked`)
    calculator.chooseOperation(opbutton)
    // calculator.updateDisplay()
    // console.log(previousOperandTextElement.innerText);
  })
})


equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay()
})
