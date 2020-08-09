
const chrono = document.querySelector('.timing');
const timer = document.querySelector('#time');
const splits = document.querySelector('.splits');
const startButton = document.querySelector('.btn-start');
const pauseButton = document.querySelector('.btn-pause');
const splitButton = document.querySelector('.btn-split');
const resetButton = document.querySelector('.btn-reset');
const splitsArray = [];

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalID;



/*EVENTLISTENERS*/
startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);
splitButton.addEventListener('click', splitChrono);



/*FONCTIONS*/
function displayTimer(){
  const time = {
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  }
  if(minutes < 10){
    time.minutes = "0" + minutes;
  }
  if(seconds < 10){
    time.seconds = "0" + seconds;
  }
  if(milliseconds < 10){
    time.milliseconds = "00" + milliseconds;
  }
  if(milliseconds < 100){
    time.milliseconds = "0" + milliseconds;
  }
  return `<p id="time">${time.minutes}:${time.seconds}.${time.milliseconds}</p>`;
}

function startChrono(){
  intervalID = setInterval(function(){
    milliseconds ++;
    if (milliseconds > 99) {
      seconds ++ ;
      milliseconds = 0;
    }
    if(seconds > 59){
      minutes ++;
      seconds = 0;
    }
    chrono.innerHTML = displayTimer();
  }, 10);
  
}
function stopChrono(){
  clearInterval(intervalID);
}
function resetChrono(){
  stopChrono();
  splits.innerHTML = '<h3><i class="fas fa-user-clock"></i></h3>';
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  chrono.innerHTML = displayTimer();
}
function splitChrono(){
  const li = document.createElement('li');
  li.innerHTML = displayTimer();
  splits.appendChild(li);
  const span = document.createElement('span');
  li.appendChild(span);
  calculateGap(li);
}
function calculateGap(currentSplit){
  if(splits.children.length > 2){
    //Récupération des  2 temps en string
    const currentTime = currentSplit.firstElementChild.textContent;
    const previousTime = currentSplit.previousElementSibling.firstElementChild.textContent;
    //Extraction des minutes, seconds, milliseconds
    const current = {
      minutes: parseInt(currentTime.slice(0,2)),
      seconds: parseInt(currentTime.slice(3,5)),
      milliseconds: parseInt(currentTime.slice(6))
    }
    const previous = {
      minutes: parseInt(previousTime.slice(0,2)),
      seconds: parseInt(previousTime.slice(3,5)),
      milliseconds: parseInt(previousTime.slice(6))
    }
    //conversion en milliseconds
    const currentInMs = current.milliseconds + (current.seconds * 1000) + ((current.minutes*60)*1000);
    const previousInMs = previous.milliseconds + (previous.seconds * 1000) + ((previous.minutes*60)*1000);
    //Calcul de la différence en ms
    const deltaInMs = currentInMs - previousInMs;
    //conversion des ms en minutes, seconds, milliseconds
    console.log(deltaInMs);
    //On met les millisecondes dans deltaTime
    const deltaTime = {
      minutes: 0,
      seconds: 0,
      milliseconds: deltaInMs
    }
    //on convertit les millisecondes en minutes/secondes/millisecondes
    while(deltaTime.milliseconds > 999){
      deltaTime.milliseconds -= 1000;
      deltaTime.seconds ++;
      while(deltaTime.seconds > 59){
        deltaTime.seconds -= 60;
        deltaTime.minutes ++;
      }
    }
    console.log(deltaTime);

    currentSplit.lastElementChild.textContent = `(+ ${deltaTime.minutes}:${deltaTime.seconds}:${deltaTime.milliseconds})`;

 }else{
   currentSplit.lastElementChild.textContent = `(+ ${currentSplit.firstElementChild.textContent})`;
 }
}




