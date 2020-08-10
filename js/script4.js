const timer = document.querySelector('#time');
const splits = document.querySelector('.splits');
const startButton = document.querySelector('.btn-start');
const pauseButton = document.querySelector('.btn-pause');
const splitButton = document.querySelector('.btn-split');
const resetButton = document.querySelector('.btn-reset');

const time = {
    minutes: 0,
    seconds: 0,
    centiseconds: 0
}
const previousTime = {
    minutes:0,
    seconds:0,
    centiseconds:0
}
let intervalID;

//Initialisation du timer
displayTime(time, timer);

startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);
splitButton.addEventListener('click', splitChrono);



/*FONCTIONS*/
function displayTime(timeToDisplay, place) {
    place.textContent = formatTime(timeToDisplay);
}
function formatTime(timeToFormat) {
    let min = timeToFormat.minutes;
    let sec = timeToFormat.seconds;
    let cs = timeToFormat.centiseconds;

    if(min < 10){
      min = "0" + min;
    }
    if(sec < 10){
      sec = "0" + sec;
    }
    if(cs < 10){
      cs = "0" + cs;
    }
    return `${min}:${sec}.${cs}`;
}


function startChrono() {
    intervalID = setInterval(function(){
        //On ajoute un centième de seconde à chaque interval
        time.centiseconds ++;
        //On met a jour les valeurs de time 
        const centisecondsCeil = 99; 
        if (time.centiseconds > centisecondsCeil) {
            time.seconds ++ ;
            time.centiseconds = 0;
        }
        const secondsCeil = 59;
        if(time.seconds > secondsCeil) {
            time.minutes ++;
            time.seconds = 0;
        }
        //On rafraichit l'affichage
        displayTime(time, timer);
    }, 10);
}
function stopChrono() {
    clearInterval(intervalID);
}
function resetChrono() {
    stopChrono();
    //On vide la liste de splits et on remet les valeurs de time à zéro
    splits.innerHTML = '<h3><i class="fas fa-user-clock"></i></h3>';
    time.minutes = 0;
    time.seconds = 0;
    time.centiseconds = 0;
    //On rafraîchit l'affichage
    displayTime(time, timer);
}
function splitChrono() {
    //On crée un li pour contenir la valeur courante de time
    const li = document.createElement('li');
    li.textContent = formatTime(time);
    //On crée une span pour contenir le calcul de la différence avec le temps précédent
    const span = document.createElement('span');
    span.textContent = `(+ ${formatTime(calculateDuration(time, previousTime))})`;
    //On met les deux éléments dans le DOM
    li.appendChild(span);
    splits.appendChild(li);
    //on met a jour les valeurs de previousTime
    updatePreviousTime();
}

function updatePreviousTime() {
    previousTime.minutes = time.minutes;
    previousTime.seconds = time.seconds;
    previousTime.centiseconds = time.centiseconds;
}
function calculateDuration(currentTime, previousTime) {
    //On convertit les temps en centièmes de secondes
    const currentInCentiseconds = currentTime.centiseconds + (currentTime.seconds * 100) + ((currentTime.minutes*60)*100);
    const previousInCentiseconds = previousTime.centiseconds + (previousTime.seconds * 100) + ((previousTime.minutes*60)*100);

    //On calcule la différence 
    const durationInCentiseconds = currentInCentiseconds - previousInCentiseconds;

    //On met le résultat dans une variable duration
    const duration = {
        minutes:0,
        seconds:0,
        centiseconds: durationInCentiseconds
    }
    //On met à jour les valeurs de duration
    while(duration.centiseconds > 99){
      duration.centiseconds -= 100;
      duration.seconds ++;
      while(duration.seconds > 59){
        duration.seconds -= 60;
        duration.minutes ++;
      }
    }
    return duration;
}




