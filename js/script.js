const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');

const operatorsList = ["%", "÷", "x", "-", "+"];
const strictOperatorsList = ["÷", "x", "-", "+"];

const ERROR_MESSAGE = "error"; 

allkeys.addEventListener('click', handleKey);



function handleKey(event) {
    const currentKey = event.target.textContent;
    const ultimateKey = display.textContent[display.textContent.length -1];
    const penultimateKey = display.textContent[display.textContent.length -2];

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
            if (penultimateKey === "+") return displaySign(" - ");
            if (penultimateKey === "-") return displaySign(" + ");
            display.textContent += formatDisplay(currentKey, ultimateKey, penultimateKey);//? redondance OK?
            break;
        default:
            display.textContent += formatDisplay(currentKey, ultimateKey, penultimateKey);//? redondance OK?
    }
}

function formatDisplay(currentKey, ultimateKey, penultimateKey) {

    const isANumber = key => !isNaN(key);
    const isADot = key => key === ".";
    const isAPercent = key => key === "%";
    const isAnOperator = key => strictOperatorsList.includes(key);   
    
    /**
     * Si la clé a afficher est :
     * un nombre qui suit tout sauf un pourcent OU
     * un point qui suit un nombre OU
     * un signe négatif (c'est-à-dire un "-" qui suit un "x" ou un "÷", ou qui débute la saisie)
     * on affiche la clé
     */
        if ((isANumber(currentKey) && !isAPercent(ultimateKey)) ||
            (isADot(currentKey) && isANumber(ultimateKey)) ||
            (currentKey === "-" && (ultimateKey === undefined || penultimateKey === "x" || penultimateKey ==="÷"))
        ) {
            return currentKey;
        } 
    /**
     * Si la clé a afficher est un opérateur, et que l'on a un nombre ou un % juste avant, 
     * on affiche la clé avec un espace avant et après
    */
        if (isAnOperator(currentKey) && (isANumber(ultimateKey) || isAPercent(ultimateKey))) {
            return ` ${currentKey} `;
        }

    /**
     * Si la clé a afficher est un point qui suit un opérateur, 
     * on affiche la clé en ajoutant un zéro devant pour commencer le nombre décimal qui va suivre
    */
        if (isADot(currentKey) && isAnOperator(penultimateKey)) {
            return `0${currentKey}`;
        }
 
    /**
     * Si la clé a afficher est un opérateur qui suit un point, 
     * on affiche la clé en ajoutant un zéro devant pour terminer la nombre décimal précédent et
     * on ajoute un espace avant et après
    */
        if (isAnOperator(currentKey) && isADot(ultimateKey)) {
            return `0 ${currentKey} `;
        }

    /**
     * Si la clé a afficher est un pourcent qui suit un nombre, 
     * on affiche la clé avec un espace avant pour le dissocier du nombre
    */
        if (isAPercent(currentKey) && isANumber(ultimateKey)) {
            return ` ${currentKey}`;
        }

    /**
     * Si la clé a afficher est un pourcent qui suit un point, 
     * on affiche la clé en ajoutant un zéro devant pour terminer la nombre décimal précédent et
     * on ajoute un espace avant pour le dissocier du nombre
    */
        if (isAPercent(currentKey) && isADot(ultimateKey)) {
            return `0 ${currentKey}`;
        }

    /**
     * Dans tous les autres cas la saisie n'est pas autorisée et
     * on affiche rien de plus
    */
        return "";
}

function calculate() {
    const elementsToCalculate = display.textContent.split(" ").map(item => {
        if (operatorsList.includes(item)) return item;
        return parseFloat(item);
    });
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
    let calc;
    let numberOfCharsToDelete = 3;//nombre avant opérateur, opérateur, nombre après opérateur
    switch(operator) {
        case "%":
            switch (elementsToCalculate[operatorIndex - 2]) {
                case undefined:
                case "x":
                case "÷":
                    calc = elementsToCalculate[operatorIndex - 1] / 100;
                    numberOfCharsToDelete = 2;//symbole % et nombre avant symbole
                    break;
                case "+":
                case "-":
                    calc = elementsToCalculate[operatorIndex - 3] * (elementsToCalculate[operatorIndex - 1] / 100);
                    numberOfCharsToDelete = 2;
                    break;
            }
            break;
        case "÷":
            calc = elementsToCalculate[operatorIndex - 1] / elementsToCalculate[operatorIndex + 1]; 
            break;
        case "x":
            calc = elementsToCalculate[operatorIndex - 1] * elementsToCalculate[operatorIndex + 1];
            break;
        case "-":
            calc = elementsToCalculate[operatorIndex - 1] - elementsToCalculate[operatorIndex + 1];
            break;
        case "+":
            calc = elementsToCalculate[operatorIndex - 1] + elementsToCalculate[operatorIndex + 1];
            break;
    }
    elementsToCalculate.splice((operatorIndex - 1), numberOfCharsToDelete, calc);
}

function displaySign(sign) {
    display.textContent = display.textContent.slice(0,-3);//-3 --> espace + opérateur précédent + espace
    display.textContent += sign;
}

function erase() {
    const lastCharacter = display.textContent[display.textContent.length - 1];

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