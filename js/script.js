
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
let centiseconds = 0;
let intervalID;
let diff = 0;

init();

startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', stopChrono);
resetButton.addEventListener('click', resetChrono);
splitButton.addEventListener('click', splitChrono);


function init(){
  displayTimer(chrono);
}

function displayTimer(location){
  const time = {
    minutes: minutes < 10 ? "0" + minutes : minutes,
    seconds: seconds < 10 ? "0" + seconds : seconds,
    centiseconds: centiseconds < 10 ? "0" + centiseconds : centiseconds
  }
  location.innerHTML = `<p id="time">${time.minutes}:${time.seconds}:${time.centiseconds}</p>`;
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
    displayTimer(chrono);
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
  displayTimer(chrono);
}
function splitChrono(){
  const li = document.createElement('li');
  displayTimer(li);
  splits.appendChild(li);
  const span = document.createElement('span');
  span.textContent = ` (+ ${diff})`;
  li.appendChild(span);
}

