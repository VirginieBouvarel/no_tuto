/*Récupération des éléments du DOM*/
const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');
const keys = Array.from(document.querySelectorAll('.key'));
const [ac,one, two, three,four,five,six,seven,eight,nine,zero,dot,plus,minus,multiply,divide,percent,erase,equal] = keys;


const operatorsList = ["%", "÷", "x", "-", "+"];
const strictOperatorsList = ["÷", "x", "-", "+"];//sans les %

/*Affichage des caractères sur l'écran en fonction des touches cliquées*/ 
allkeys.addEventListener('click', event => displayKey(event));

/*Suppression du dernier caractère affiché*/
erase.addEventListener('click', event => {
    event.stopPropagation();
    
    if (display.textContent[display.textContent.length -1] === " ") {//Si le dernier caractère est un espace, alors la dernière touche saisie était un opérateur, on enlève "esp+operateur+esp "
        display.textContent = display.textContent.slice(0,-3);
    } else if (display.textContent[display.textContent.length -1] === "%") {//Si le dernier caractère est un %, on enlève "esp+%"
        display.textContent = display.textContent.slice(0,-2);
    } else if (display.textContent === "error") {//Après une tentative de division par zéro, on vide l'affichage
        display.textContent = ""
    }else {
        display.textContent = display.textContent.slice(0,-1);
    }
    
});

/*Reset complet de l'affichage*/
ac.addEventListener('click', event => {
    event.stopPropagation();
    display.textContent = "";
} )

/*Execution du calcul au clic sur la touche égal*/
equal.addEventListener('click', event => {
    event.stopPropagation();
    if (display.textContent === "error") return;
    display.textContent = calculate();
});


function formatDisplay(currentKey, ultimateKey, penultimateKey) {

    const isANumber = key => {
        if (key === undefined) return false;
        return key.search(/[0-9]/) > -1;
    }
    const isADot = key => key === ".";
    const isAPercent = key => key === "%";
    const isNotAPercent = key => key !== "%";
    const isAnOperator = key => strictOperatorsList.includes(key);   
    const isAMultiSelect = key => key.replace(/\s*/gi, "") === "AC1234567890.+-x÷%❮=";//fix d'un bug lors d'une sélection à la souris de plusieurs cases

    //Gestion conditionnel de l'affichage
    /**
     * Si l'utilisateur à séléctionné plusieurs touches en même temps au lieu d'une 
     * on n'autorise pas la saisie
     */
        if (isAMultiSelect(currentKey)) return "";

    /**
     * Si la clé a afficher est :
     * un nombre qui suit tout sauf un pourcent OU
     * un point qui suit un nombre OU
     * un signe négatif (c'est-à-dire un "-" qui suit un "x" ou un "÷", ou qui débute la saisie)
     * on affiche la clé
     */
        if ((isANumber(currentKey) && isNotAPercent(ultimateKey)) ||
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
    let numberToDelete = 3;//nombre avant opérateur, opérateur, nombre après opérateur

    switch(operator) {
        case "%":
            switch (elementsToCalculate[operatorIndex - 2]) {
                case undefined:
                case "x":
                case "÷":
                    calc = elementsToCalculate[operatorIndex - 1] / 100;
                    numberToDelete = 2;//symbole % et nombre avant symbole
                    break;
                case "+":
                case "-":
                    calc = elementsToCalculate[operatorIndex - 3] * (elementsToCalculate[operatorIndex - 1] / 100);
                    numberToDelete = 2;
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
    elementsToCalculate.splice((operatorIndex - 1), numberToDelete, calc);
}

function displayKey(event) {
    //Récupération du contenu des touches cliquées
    const currentKey = event.target.textContent;
    const ultimateKey = display.textContent[display.textContent.length -1];
    const penultimateKey = display.textContent[display.textContent.length -2];

    //Gestion de la divison par 0
    if (currentKey === "0" && penultimateKey === "÷") {
        return display.textContent = "error";
    }
    if (ultimateKey === "r") {//Après la tentative de division par zéro,on reset l'affichage 
        display.textContent = "";
    }

    //Gestion des nombres relatifs
    if (currentKey === "-" && penultimateKey === "+") {
        displaySign(" - ");
    } else if (currentKey === "-" && penultimateKey === "-"){
        displaySign(" + ");
    } else {//Affichage par défaut
        display.textContent += formatDisplay(currentKey, ultimateKey, penultimateKey);
    }
    
}
function displaySign(sign) {
    display.textContent = display.textContent.slice(0,-3);//-3 --> espace + opérateur précédent + espace
    display.textContent += sign;
}