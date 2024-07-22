document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    const keys = document.querySelector('.calculator-keys');

    let Input1 = '';
    let Input2 = '';
    let operator = '';

    keys.addEventListener('click', (e) => {
        const target = e.target;
        const value = target.value;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case 'all-clear':
                clear();
                break;
            case '.':
                inputDecimal(value);
                break;
            default:
                inputNumber(value);
                break;
        }
        updateScreen();
    });

    function handleOperator(nextOperator) {
        if (operator && Input2 === '') {
            operator = nextOperator;
            updateScreen();
            return;
        }

        if (Input1 === '') {
            Input1 = Input2;
        } else if (operator) {
            const result = calculate();
            Input1 = `${parseFloat(result.toFixed(7))}`;
        }

        operator = nextOperator;
        Input2 = '';
        updateScreen();
    }

    function calculate() {
        let result;
        const previous = parseFloat(Input1);
        const current = parseFloat(Input2);

        if (isNaN(previous) || isNaN(current)) {
            return;
        }

        switch (operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return;
        }

        Input2 = result;
        operator = '';
        Input1 = '';
        return result;
    }

    function clear() {
        Input2 = '';
        Input1 = '';
        operator = '';
    }

    function inputNumber(num) {
        if (Input2.includes('.') && num === '.') return;
        Input2 = Input2 === '' ? num : Input2 + num;
    }

    function inputDecimal(dot) {
        if (Input2.includes(dot)) return;
        Input2 += dot;
    }

    function updateScreen() {
        screen.value = Input2 || Input1 || '0';
        if (operator) {
            screen.value += ` ${operator}`;
        }
    }

    clear();
    updateScreen();
});
