/*Récupération des éléments du DOM*/
const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');
const keys = Array.from(document.querySelectorAll('.key'));
const [ac,one, two, three,four,five,six,seven,eight,nine,zero,dot,plus,minus,multiply,divide,percent,erase,equal] = keys;


/*Affichage des caractères sur l'écran en fonction des touches cliquées*/
allkeys.addEventListener('click', event => {
   const isAnOperator = (event.target.textContent === "+" || 
                         event.target.textContent === "-" || 
                         event.target.textContent === "x" || 
                         event.target.textContent === "÷");
    const isAPercent = event.target.textContent === "%";    

   if (isAnOperator) {
       display.textContent += ` ${event.target.textContent} `;
   }else if (isAPercent){
        display.textContent +=` ${event.target.textContent}`;
   }else{
       display.textContent += `${event.target.textContent}`;
   }
});

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
    const result = calculate();
    display.textContent = result;
});

function calculate(){
    const elements = display.textContent.split(" ");
    const hasPercent = elements.indexOf('%') > -1;
    const hasDivide = elements.indexOf('÷') > -1;
    const hasMultiply = elements.indexOf('x') > -1;
    const hasSubstract = elements.indexOf('-') > -1;
    const hasAdd = elements.indexOf('+') > -1;
    const percent = elements.indexOf('%');
    const divide = elements.indexOf('÷');
    const multiply = elements.indexOf('x');
    const substract = elements.indexOf('-');
    const add = elements.indexOf('+');

    while(elements.length > 1){
        let calc = 0;

        if(hasPercent){
            calc = elements[percent - 1] / 100;
            elements.splice(elements[percent - 1], 2, calc);
        }
        if(hasDivide){
            calc = elements[divide - 1] / elements[divide + 1];
            elements.splice(elements[divide - 1], 3, calc);
        }
        if(hasMultiply){
            calc = elements[multiply - 1] * elements[multiply + 1];
            elements.splice(elements[multiply - 1], 3, calc);
        }
        if(hasSubstract){
            calc = elements[substract - 1] - elements[substract + 1];
            elements.splice(elements[substract - 1], 3, calc);
        }
        if(hasAdd){
            calc = elements[add - 1] + elements[add + 1];
            elements.splice(elements[add - 1], 3, calc);
        }
    }
    
    console.log(elements[0]) ;

        

}



