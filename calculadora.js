function calcular (tipo, calcValue){
    if ( tipo === 'action'){
        if (calcValue === 'c'){
            document.querySelector('#resultado').value = '';
        }

        if (calcValue === '+' || calcValue === '/' || calcValue === '*' || calcValue === '-' || calcValue === '.'){
            document.querySelector('#resultado').value += calcValue;
        }

        if (calcValue === 'parentheses1'){
            document.querySelector('#resultado').value += '(';
        }

        if (calcValue === 'parentheses2'){
            document.querySelector('#resultado').value += ')';
        }

        if (calcValue === '='){
            let calcValue_field = eval(document.querySelector('#resultado').value);
            document.querySelector('#resultado').value = calcValue_field;
        }

    } else if (tipo === 'calcValue'){
        document.querySelector('#resultado').value += calcValue;

    }
}