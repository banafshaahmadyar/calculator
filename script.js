//This class is defined for all opertions and number of the calculator
class Calculator {
    //this is the construcot of calculator class
    constructor (previousOperandTextElement , currentOperandTextElement) 
    {
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    //
    clear(){
        this.currentOperand= ''
        this.previousOperand = ''
        this.operation = undefined
    }

    //This function is deleting the last number in the display
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    //
    appendNumber(number){
        if(number === ' . ' && this.currentOperand.includes('.')) return;
        
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //
    chooseoperation(operation){
        if(this.currentOperand === '') return;

        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //
    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN ( prev ) || isNaN ( current ) ) return;
        switch(this.operation){
            case'+':
            computation = prev + current
            break
            case'-':
            computation =prev - current
            break
            case'*':
            computation = prev * current
            break
            case'/':
            computation = prev / current
            break
            default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)){
            integerDisplay =''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0 })
        }
        if (decimalDigits != null){
            return integerDisplay+"."+decimalDigits
        }else{
            return integerDisplay
        }
    }

    //
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null){
            this.previousOperandTextElement.innerText =
        this.getDisplayNumber(this.previousOperand) + " " + this.operation;
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}
//This is the end of calculator class

/**  This variables are defined for getting numbers and operations in from calculator */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// 
const calculator = new Calculator ( previousOperandTextElement, currentOperandTextElement );

//handle the number button click event
numberButtons.forEach(button => { 
        button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

//handle the operation button click event
operationButtons.forEach(button =>{button.addEventListener('click',() =>{
        calculator.chooseoperation(button.innerText)
        calculator.updateDisplay()
    })
});

// comput
equalsButton.addEventListener('click' , button =>{
    calculator.compute()
    calculator.updateDisplay()
});

// all clear
allClearButton.addEventListener('click' , button =>{
    calculator.clear()
    calculator.updateDisplay()
});

// delet
deleteButton.addEventListener('click' , button =>{
    calculator.delete()
    calculator.updateDisplay()
});

