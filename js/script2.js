/*Récupération des éléments du DOM*/
const display = document.querySelector('#display');
const allkeys = document.querySelector('#all-keys');
const keys = Array.from(document.querySelectorAll('.key'));
const [ac,one, two, three,four,five,six,seven,eight,nine,zero,dot,plus,minus,multiply,devide,percent,erase,equal] = keys;


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
    const elements = display.textContent.split(" ").map(item => {
        if (item === "x") return "*";
        if (item === "÷") return "/";
        if (item === "%") return "/100";
        return item;
    });
    const result = eval(elements.reduce((operation, item) => operation + item));
    return result; 
}


