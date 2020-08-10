
const chrono = document.querySelector('.timing');
const timer = document.querySelector('#time');
const splits = document.querySelector('.splits');
const startButton = document.querySelector('.btn-start');
const pauseButton = document.querySelector('.btn-pause');
const splitButton = document.querySelector('.btn-split');
const resetButton = document.querySelector('.btn-reset');


let minutes = 0;
let seconds = 0;
let centiseconds = 0;
let intervalID;




/*EVENTLISTENERS*/
startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);
splitButton.addEventListener('click', splitChrono);




/*FONCTIONS*/

function formatTimer(min, sec, cs){
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

function startChrono(){
  intervalID = setInterval(function(){
    centiseconds ++;
    if (centiseconds > 99) {
      seconds ++ ;
      centiseconds = 0;
    }
    if(seconds > 59){
      minutes ++;
      seconds = 0;
    }
    chrono.innerHTML = `<p id="time">${formatTimer(minutes, seconds, centiseconds)}</p>`;
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
  centiseconds = 0;
  chrono.innerHTML = `<p id="time">${formatTimer(minutes, seconds, centiseconds)}</p>`;
}
function splitChrono(){
  const li = document.createElement('li');
  li.innerHTML = formatTimer(minutes, seconds, centiseconds);
  splits.appendChild(li);
  const span = document.createElement('span');
  li.appendChild(span);
  calculateGap(li);
}
function calculateGap(currentSplit){
    console.log(currentSplit);
  if(splits.children.length > 2){
    //Récupération des  2 temps en string
    const currentTime = currentSplit.firstElementChild.textContent;
    const previousTime = currentSplit.previousElementSibling.firstElementChild.textContent;
    //Extraction des minutes, seconds, milliseconds
    const current = {
      minutes: parseInt(currentTime.slice(0,2)),
      seconds: parseInt(currentTime.slice(3,5)),
      centiseconds: parseInt(currentTime.slice(6))
    }
    const previous = {
      minutes: parseInt(previousTime.slice(0,2)),
      seconds: parseInt(previousTime.slice(3,5)),
      centiseconds: parseInt(previousTime.slice(6))
    }
    //conversion en milliseconds
    const currentInCentiseconds = current.centiseconds + (current.seconds * 100) + ((current.minutes*60)*100);
    const previousInCentiseconds = previous.centiseconds + (previous.seconds * 100) + ((previous.minutes*60)*100);
    //Calcul de la différence en ms
    const deltaInCentiseconds = currentInCentiseconds - previousInCentiseconds;
    //conversion des ms en minutes, seconds, milliseconds
    console.log(deltaInCentiseconds);
    //On met les millisecondes dans deltaTime
    const deltaTime = {
      minutes: 0,
      seconds: 0,
      centiseconds: deltaInCentiseconds
    }
    //on convertit les millisecondes en minutes/secondes/millisecondes
    while(deltaTime.centiseconds > 99){
      deltaTime.centiseconds -= 100;
      deltaTime.seconds ++;
      while(deltaTime.seconds > 59){
        deltaTime.seconds -= 60;
        deltaTime.minutes ++;
      }
    }
    console.log(deltaTime);

    currentSplit.lastElementChild.textContent = `(+ ${formatTimer(deltaTime.minutes,deltaTime.seconds, deltaTime.centiseconds)})`;

 }else{
   currentSplit.lastElementChild.textContent = `(+ ${currentSplit.firstElementChild.textContent})`;
 }
}




