const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator_keys');
const display = calculator.querySelector('.calculator_display');

const calculate = (n1, operator, n2) => {
    let result = '';
    
    if (operator === 'add') {;
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2);
    }
    
    return result;
  }

keys.addEventListener('click', event => {
    const key = event.target;
    if (key.matches('button')){
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        let allButtons = Array.from(key.parentNode.children);
        allButtons.forEach(element => element.classList.remove('is-depressed'));

        if (!action){
            console.log('number key!');
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent;
            } else{
                display.textContent = display.textContent + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            console.log('operator key!');

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
              } else {
                calculator.dataset.firstValue = displayedNum;
              }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        if (action === 'decimal'){
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
              } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
              }
              
            calculator.dataset.previousKeyType = 'decimal';
            console.log('decimal key!');
        }

        if (action === 'clear'){
            console.log('clear key!');
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }

        if (action === 'calculate'){
            console.log('equal key!');
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                  }
                  
                  display.textContent = calculate(firstValue, operator, secondValue);
              }
            
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})