const workTimeDisplay = document.querySelector("#controlBar .work span");
const restTimeDisplay = document.querySelector("#controlBar .rest span");
const displayTime = document.querySelector("#display h1");
let timeShowing = displayTime.textContent;
const workButtons = document.querySelectorAll(".work .controls button");
const restButtons = document.querySelectorAll(".rest .controls button");
let play = false;
var start = Date.now();
let timerId;

const mainButtons = document.querySelectorAll(".main-controls button");

//get these into objects
// main timer module


workButtons.forEach(button => button.addEventListener("click", clickHandler));
restButtons.forEach(button => button.addEventListener("click", clickHandler));
mainButtons.forEach(button => button.addEventListener("click", mainClickHandler));



//you need a clicky factory
function clickHandler(buttonType) {
  if (this === workButtons[0]) {
    workTimeDisplay.textContent = parseInt(workTimeDisplay.textContent) - 1;
  } else {
    workTimeDisplay.textContent = parseInt(workTimeDisplay.textContent) + 1;
  }
}

function Timer(minutes, seconds) {
  return {minutes, seconds}
}

function mainClickHandler(buttonType) {
  if (this === mainButtons[0]) {
    timerId = setInterval(changeDisplay, 1000);
  } else if (this === mainButtons[1]) {
    clearTimeout(timerId);

  } else if (this === mainButtons[2]) {
    defaultTimer.minutes = 25;
    defaultTimer.seconds = 0;
    setDisplay();
  } else {
    defaultTimer.minutes = 25;
    defaultTimer.seconds = 0;
    setDisplay();
    //segments increase
  }
}

var defaultTimer = new Timer(25, 00);

function setUp() {

  setDisplay();
}

setUp();




function setDisplay() {
  let minutes = defaultTimer.minutes.toString();
  let seconds = defaultTimer.seconds.toString();

  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }

  let newDisplay = `${minutes}:${seconds}`;
  displayTime.textContent = newDisplay;
}









function changeDisplay() {
  if (defaultTimer.seconds > 0) {
    defaultTimer.seconds --;
  } else {
    defaultTimer.minutes --;
    defaultTimer.seconds = 59;
  }
  setDisplay()

}


//takes current time and calculates the future time base on timer
function calculate() {









}
calculate();
// timeRunner();

//take displayTime as an argument
function timeRunner() {
  let minutes, seconds;


  let timerId = setInterval(calculate, 1000);

}

function realTime() {
  let workTime = parseInt(workTimeDisplay.textContent) * 1000; //timer time in msec
  console.log(workTime);

  let startDate = new Date();
  console.log(startDate);

  startTime = startDate.getTime();  //time in milliseconds
  console.log(startTime);


  let endTime = startTime + workTime; //end time in milliseconds
  console.log(endTime);
}
