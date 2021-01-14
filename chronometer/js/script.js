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
};

const previousTime = {
    minutes:0,
    seconds:0,
    centiseconds:0
};

let intervalID;
const CENTISECONDS_CEIL = 99;
const SECONDS_CEIL = 59;

// Au départ on s'assure que le timer est bien à zéro
displayTime(time, timer);

startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);
splitButton.addEventListener('click', splitChrono);



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
            time.centiseconds++;
    
            // Passé 99 cs on ajoute 1 sec
            if (time.centiseconds > CENTISECONDS_CEIL) {
                time.seconds++ ;
                time.centiseconds = 0;
            }
            // Passé 60 sec on ajoute 1 min
            if(time.seconds > SECONDS_CEIL) {
                time.minutes++;
                time.seconds = 0;
            }
     
            displayTime(time, timer);
        }, 10);
    }
    
}

function stopChrono() {
    clearInterval(intervalID);
    intervalID = 0;
}

function resetChrono() {
    stopChrono();
    
    splits.innerHTML = '';
    time.minutes = 0;
    time.seconds = 0;
    time.centiseconds = 0;
    
    displayTime(time, timer);

    updatePreviousTime();
}

function splitChrono() {
    // On construit le split pour l'afficher
    const li = document.createElement('li');
    li.textContent = formatTime(time);

    const span = document.createElement('span');
    span.textContent = `(+ ${formatTime(calculateDuration(time, previousTime))})`;
   
    li.appendChild(span);
    splits.appendChild(li);

    // On assigne les valeurs actuelles de TIME à PREVIOUSTIME en prévision de la prochaine comparaison
    updatePreviousTime();
}

function updatePreviousTime() {
    previousTime.minutes = time.minutes;
    previousTime.seconds = time.seconds;
    previousTime.centiseconds = time.centiseconds;
}

function calculateDuration(currentTime, previousTime) {
    // On convertit les différents temps en centièmes de secondes pour éxécuter la soustraction plus facilement puis on redistribue en minutes, secondes et centisecondes

    const currentInCentiseconds = currentTime.centiseconds + (currentTime.seconds * 100) + ((currentTime.minutes*60)*100);
    const previousInCentiseconds = previousTime.centiseconds + (previousTime.seconds * 100) + ((previousTime.minutes*60)*100);

    const durationInCentiseconds = currentInCentiseconds - previousInCentiseconds;
    
    return getMinSecCs(durationInCentiseconds);;
}

function getMinSecCs(cs) {
    const min = Math.floor(cs / 6000);// 1 minutes = 6000 centièmes de secondes
    cs -= min * 6000;

    const sec = Math.floor(cs / 100);
    cs -= sec * 100;

    const duration = {
        minutes: min,
        seconds: sec,
        centiseconds:cs
    };

    return duration;

}

