const TIMER = document.querySelector('#time');
const SPLITS = document.querySelector('.splits');
const START_BUTTON = document.querySelector('.btn-start');
const PAUSE_BUTTON = document.querySelector('.btn-pause');
const SPLIT_BUTTON = document.querySelector('.btn-split');
const RESET_BUTTON = document.querySelector('.btn-reset');

const TIME = {
    minutes: 0,
    seconds: 0,
    centiseconds: 0
};

const PREVIOUS_TIME = {
    minutes:0,
    seconds:0,
    centiseconds:0
};

let intervalID;
const CENTISECONDS_CEIL = 99;
const SECONDS_CEIL = 59;

// Au départ on s'assure que le timer est bien à zéro
displayTime(TIME, TIMER);

START_BUTTON.addEventListener('click', startChrono);
PAUSE_BUTTON.addEventListener('click', stopChrono);
RESET_BUTTON.addEventListener('click', resetChrono);
SPLIT_BUTTON.addEventListener('click', splitChrono);



/* FONCTIONS */

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
    // On ajoute un centième de seconde à chaque interval
    if (!intervalID) {
        intervalID = setInterval(function(){
            TIME.centiseconds++;
    
            // Passé 99 cs on ajoute 1 sec
            if (TIME.centiseconds > CENTISECONDS_CEIL) {
                TIME.seconds++ ;
                TIME.centiseconds = 0;
            }
            // Passé 60 sec on ajoute 1 min
            if(TIME.seconds > SECONDS_CEIL) {
                TIME.minutes++;
                TIME.seconds = 0;
            }
     
            displayTime(TIME, TIMER);
        }, 10);
    }
    
}

function stopChrono() {
    clearInterval(intervalID);
    intervalID = 0;
}

function resetChrono() {
    stopChrono();
    
    SPLITS.innerHTML = '';
    TIME.minutes = 0;
    TIME.seconds = 0;
    TIME.centiseconds = 0;
    
    displayTime(TIME, TIMER);
    
    updatePreviousTime();
}

function splitChrono() {
    // On construit le split pour l'afficher
    const LI = document.createElement('li');
    LI.textContent = formatTime(TIME);

    const SPAN = document.createElement('span');
    SPAN.textContent = `(+ ${formatTime(calculateDuration(TIME, PREVIOUS_TIME))})`;
   
    LI.appendChild(SPAN);
    SPLITS.appendChild(LI);

    // On assigne les valeurs actuelles de TIME à PREVIOUSTIME en prévision de la prochaine comparaison
    updatePreviousTime();
}

function updatePreviousTime() {
    PREVIOUS_TIME.minutes = TIME.minutes;
    PREVIOUS_TIME.seconds = TIME.seconds;
    PREVIOUS_TIME.centiseconds = TIME.centiseconds;
}

function calculateDuration(currentTime, previousTime) {
    // On convertit les différents temps en centièmes de secondes pour éxécuter la soustraction plus facilement puis on redistribue en minutes, secondes et centisecondes

    const CURRENT_IN_CENTISECONDS = currentTime.centiseconds + (currentTime.seconds * 100) + ((currentTime.minutes*60)*100);
    const PREVIOUS_IN_CENTISECONDS = previousTime.centiseconds + (previousTime.seconds * 100) + ((previousTime.minutes*60)*100);

    const DURATION_IN_CENTISECONDS = CURRENT_IN_CENTISECONDS - PREVIOUS_IN_CENTISECONDS;

    const DURATION = {
        minutes:0,
        seconds:0,
        centiseconds: DURATION_IN_CENTISECONDS
    };

    while(DURATION.centiseconds > CENTISECONDS_CEIL){
      DURATION.centiseconds -= 100;
      DURATION.seconds++;
      while(DURATION.seconds > SECONDS_CEIL){
        DURATION.seconds -= 60;
        DURATION.minutes++;
      }
    }
    return DURATION;
}




