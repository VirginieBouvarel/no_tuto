const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');

const operatorsList = ["%", "÷", "x", "-", "+"];
const strictOperatorsList = ["÷", "x", "-", "+"];

const ERROR_MESSAGE = "error"; 

allkeys.addEventListener('click', handleKey);

function handleKey(event) {
    const currentKey = event.target.textContent;
    const ultimateKey = getCharByIndex(-1);
    const penultimateKey = getCharByIndex(-2);

    if (event.target === allkeys) return;//fix bug multiselection
    if (display.textContent === ERROR_MESSAGE) display.textContent = "";

    switch(currentKey) {
        case "AC":
            display.textContent = "";
            break;
        case "❮":
            erase();
            break;
        case "=":
            const zeroOrEquivalent = /÷ 0( |$|\.0+ |\.0+$)/;
            if (display.textContent.search(zeroOrEquivalent) > -1) {  // Cas d'une division par zéro
            display.textContent = ERROR_MESSAGE;
            }else {
                display.textContent = calculate();
            } 
            break;
        case "-":
            if (penultimateKey === "+" || penultimateKey === "-") {
                invertSign(penultimateKey);
                break;
            } 
            //On omet le break pour effectuer l'affichage par défaut du moins qui est maintenant un simple operateur
        default:
            display.textContent += formatDisplay(currentKey, ultimateKey, penultimateKey);
    }
}

function getCharByIndex(position) {
    return display.textContent[display.textContent.length + position];
}

function formatDisplay(currentKey, ultimateKey, penultimateKey) {
    const isANumber = key => !Number.isNaN(Number.parseInt(key));
    const isADot = key => key === ".";
    const isAPercent = key => key === "%";
    const isAnOperator = key => strictOperatorsList.includes(key);   
    
    if ((isANumber(currentKey) && !isAPercent(ultimateKey)) ||// un nombre suit tout sauf un pourcent
        (isADot(currentKey) && isANumber(ultimateKey)) ||// un nombre suit un point
        (currentKey === "-" && (ultimateKey === undefined || penultimateKey === "x" || penultimateKey ==="÷")) //signe négatif
    ) {
        return currentKey;
    } 

    if (isAnOperator(currentKey) && (isANumber(ultimateKey) || isAPercent(ultimateKey))) { // un operateur suit un nombre ou un pourcent
        return ` ${currentKey} `;
    }

    if (isADot(currentKey) && isAnOperator(penultimateKey)) { //une virgule suit directement un operateur
        return `0${currentKey}`;
    }
 
    if (isAnOperator(currentKey) && isADot(ultimateKey)) { // un operateur suit directement une virgule
        return `0 ${currentKey} `;
    }

    if (isAPercent(currentKey) && isANumber(ultimateKey)) { // un pourcent suit directement un nombre
        return ` ${currentKey}`;
    }

    if (isAPercent(currentKey) && isADot(ultimateKey)) { // un pourcent suit directement une virgule
        return `0 ${currentKey}`;
    }

    return ""; 
}

function calculate() {
    const elementsToCalculate = display.textContent.split(" ").map(item => {
        if (operatorsList.includes(item)) return item;
        return parseFloat(item);
    });
    if (elementsToCalculate.includes(NaN)) return ERROR_MESSAGE;
    while(elementsToCalculate.length > 1){
        operatorsList.forEach(operator => {
            while(hasOperator(operator, elementsToCalculate)) {
                calculateByOperator(operator, getOperatorIndex(operator, elementsToCalculate), elementsToCalculate);
            } 
        });   
    }
    return elementsToCalculate[0];
}

function hasOperator(operator, elementsToCalculate) {
    return elementsToCalculate.indexOf(operator) > -1;
}

function getOperatorIndex(operator, elementsToCalculate) {
     return elementsToCalculate.indexOf(operator);
}

function calculateByOperator(operator, operatorIndex, elementsToCalculate) {
    const operand1 = elementsToCalculate[operatorIndex - 1];
    const operand2 = elementsToCalculate[operatorIndex + 1];
    let calc;
    let numberOfCharsToDelete = 3;//Par défaut: nombre avant opérateur, opérateur, nombre après opérateur

    switch(operator) {
        case "%":
            const previousOperator = elementsToCalculate[operatorIndex - 2];
            switch (previousOperator) {
                case undefined:
                case "x":
                case "÷":
                    calc = operand1 / 100;
                    numberOfCharsToDelete = 2;//symbole % et nombre avant symbole
                    break;
                case "+":
                case "-":
                    const valueToIncreaseOrDecrease = elementsToCalculate[operatorIndex - 3]
                    calc = (operand1 / 100) * valueToIncreaseOrDecrease;
                    numberOfCharsToDelete = 2;
                    break;
            }
            break;
        case "÷":
            calc = operand1 / operand2; 
            break;
        case "x":
            calc = operand1 * operand2;
            break;
        case "-":
            calc = operand1 - operand2;
            break;
        case "+":
            calc = operand1 + operand2;
            break;
    }
    elementsToCalculate.splice((operatorIndex - 1), numberOfCharsToDelete, calc);
}

function invertSign(sign) {
    display.textContent = display.textContent.slice(0,-3);//-3 --> espace + opérateur précédent + espace
    if (sign === "+") {
        sign= "-";
    }else {
        sign= "+";
    }
    display.textContent += ` ${sign} `;
}

function erase() {
    const lastCharacter = getCharByIndex(-1);

    if (display.textContent === ERROR_MESSAGE) display.textContent = "";

    switch(lastCharacter) {
        case " ": //alors la dernière touche saisie était un opérateur, on enlève "esp+operateur+esp "
            display.textContent = display.textContent.slice(0,-3);
            break;
        case "%"://on enlève "esp+%"
            display.textContent = display.textContent.slice(0,-2);
            break;
        default:
            display.textContent = display.textContent.slice(0,-1);
            break;
    }
}