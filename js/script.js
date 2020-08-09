
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
let gap = "xxx";

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
  li.appendChild(span);
  calculateGap(li);
}
function calculateGap(currentSplit){
  if(splits.children.length > 2){
    const current = currentSplit.firstElementChild.textContent;
    const previous = currentSplit.previousElementSibling.firstElementChild.textContent;

    const currentTime = {
      minutes: parseInt(current.slice(0,2)),
      seconds: parseInt(current.slice(3,5)),
      centiseconds: parseInt(current.slice(6))
    }
    const previousTime = {
      minutes: parseInt(previous.slice(0,2)),
      seconds: parseInt(previous.slice(3,5)),
      centiseconds: parseInt(previous.slice(6))
    }
    console.log(currentTime);
    console.log(previousTime);

    const substractTime = {
      minutes: calculateMinutes(),
      seconds: calculateSeconds(),
      centiseconds : calculateCentiseconds(currentTime.centiseconds, previousTime.centiseconds)
    }
    currentSplit.lastElementChild.textContent = `${substractTime.minutes}:${substractTime.seconds}:${substractTime.centiseconds}`;

 }else{
   currentSplit.lastElementChild.textContent = currentSplit.firstElementChild.textContent ;
 }
}

function calculateCentiseconds(current, previous){
  if (current > previous){
    return current - previous;
  }else{
    current += 100;
    substractTime.seconds += 1;
    return current - previous
  }
}


