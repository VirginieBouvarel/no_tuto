/**
 * Troisième version
 * Refactoring
 */


/*Récupération des éléments du DOM*/
const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');
const keys = Array.from(document.querySelectorAll('.key'));
const [ac,one, two, three,four,five,six,seven,eight,nine,zero,dot,plus,minus,multiply,divide,percent,erase,equal] = keys;


const operatorsList = ["%", "÷", "x", "-", "+"];
const strictOperatorsList = ["÷", "x", "-", "+"];//sans les %
let previousKey = "";


/*Affichage des caractères sur l'écran en fonction des touches cliquées*/
allkeys.addEventListener('click', event => verifyDisplay(event));

/*Suppression du dernier caractère affiché*/
erase.addEventListener('click', event => {
    event.stopPropagation();
    display.textContent = display.textContent.slice(0,-1);
});

/*Reset complet de l'affichage*/
ac.addEventListener('click', event => {
    event.stopPropagation();
    display.textContent = "";
} )

/*Execution du calcul au clic sur la touche égal*/
equal.addEventListener('click', event => {
    event.stopPropagation();
    display.textContent = calculate();
});


function verifyDisplay(event) {
    const isAnOperator = (event.target.textContent === "+" || 
                         event.target.textContent === "-" || 
                         event.target.textContent === "x" || 
                         event.target.textContent === "÷");
    const isAPercent = event.target.textContent === "%";
    const isADot = event.target.textContent === ".";
    const isANumber = event.target.textContent.match(/[0-9]/);

    switch (true) {
        case (isADot && previousKey === "."):
        case (isADot && previousKey === "%"):
        case (isAPercent && previousKey === "%"):
        case (isAPercent && strictOperatorsList.includes(previousKey)):
        case (isANumber && previousKey === "%"):
            display.textContent += "";
            break;

        case (isAPercent && previousKey === "."):
        case (isAnOperator && previousKey === "."):
            display.textContent += `0 ${event.target.textContent} `;
            previousKey = event.target.textContent;
            break;

        case (isADot && operatorsList.includes(previousKey)):
            display.textContent += `0${event.target.textContent} `;
            previousKey = event.target.textContent;
            break;

        case (isAnOperator && strictOperatorsList.includes(previousKey)):
            display.textContent = display.textContent.slice(0,-3);//-3 --> espace + opérateur précédent + espace
            display.textContent += ` ${event.target.textContent} `;
            previousKey = event.target.textContent;
            break;

        case (isAnOperator):
            display.textContent += ` ${event.target.textContent} `;
            previousKey = event.target.textContent;
            break;
        
        case (isAPercent):
            display.textContent +=` ${event.target.textContent}`;
            previousKey = event.target.textContent;
            break;
        
        default://is a Number or a dot 
            display.textContent += `${event.target.textContent}`;
            previousKey = event.target.textContent;
    }
    
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
    let numberToDelete = 3;//Operateur, nombre d'avant et nombre d'après 

    switch(operator) {
        case "%":
            calc = elementsToCalculate[operatorIndex - 1] / 100;
            numberToDelete = 2;//Pourcent et nombre d'avant
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
    elementsToCalculate.splice((operatorIndex - 1), numberToDelete, calc);
}

