/**
 * Timer module that manages the displaying clock. Only exposes necessary components globally
 *
 *
*/
var timeModule = (function () {
  const DISPLAY_TIME = document.querySelector("#display h1");
  const MAIN_BUTTONS = document.querySelectorAll(".main-controls button");
  MAIN_BUTTONS.forEach(button => button.addEventListener("click", clickHandler));
  
  var work = true;
  let timerId, workTime, startTime, endTime;
  var setDisplay, clickHandler, timerCalc, stopTimer;
  let time = {minutes: 0, seconds: 30};

  function clickHandler() {

    if (this === MAIN_BUTTONS[0]) {
      timerCalc();

      if (timerId == undefined) {
        timerId = setInterval(changeDisplay, 1000);
      }

    } else if (this === MAIN_BUTTONS[1]) {
      stopTimer();
    } else if (this === MAIN_BUTTONS[2]) {
      stopTimer();
      timerReset();
      setDisplay();
    } else {
      toggleWork();
      timerReset();
      timerCalc();
      setDisplay();
    }

  };

  function stopTimer() {
    clearTimeout(timerId);
    timerId = undefined;
  }

  function timerReset() {

    if (work == true) {
      time.minutes = WORK_BUTTON_CONTROLLER.getTime();
      time.seconds = 0;
    } else {
      time.minutes = REST_BUTTON_CONTROLLER.getTime();
      time.seconds = 0;
    }
    
  }

  function changeDisplay() {
    let timeNow = new Date().getTime();
    let timeRemaining =  endTime - timeNow;

    if (timeRemaining > 0) {
      time.minutes = Math.floor(timeRemaining / 1000 / 60);
      time.seconds = Math.floor(timeRemaining / 1000 % 60);
      setDisplay();
    } else {
      stopTimer();
      toggleWork();
      timerReset();
      setDisplay();
    }
    
  };

  function setDisplay() {
    let seconds = time.seconds.toString();

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }

    let newDisplay = `${time.minutes}:${seconds}`;
    DISPLAY_TIME.textContent = newDisplay;
  };

  function timerCalc() {
    workTime = ((time.minutes * 60) + time.seconds ) * 1000;
    startTime = new Date().getTime();
    endTime = startTime + workTime;
  }

  function toggleWork() {
    (work == true) ? work = false : work = true;
  }

  return {
    MAIN_BUTTONS, time
  }

})();

const WORK_TIME_DISPLAY = document.querySelector("#controlBar .work span");
const WORK_BUTTONS = document.querySelectorAll(".work .controls button");


const REST_TIME_DISPLAY = document.querySelector("#controlBar .rest span");
const REST_BUTTONS = document.querySelectorAll(".rest .controls button");


const buttonFactory = (buttonArray, display) => {
  buttonArray.forEach(button => button.addEventListener("click", clickHandler));

  let time = parseInt(display.textContent);

  function clickHandler()  {
    if (this === buttonArray[0]) {

      if (time > 1) {
        time = time - 1;
        console.log(time);
        display.textContent = time;
      }
      
    } else {
      
      if (time < 60) {
        time = time + 1;
        display.textContent = time;
      }
      
    }

  }

  const getTime = () => time;

  return { getTime}

};


const REST_BUTTON_CONTROLLER = buttonFactory(REST_BUTTONS, REST_TIME_DISPLAY);

const WORK_BUTTON_CONTROLLER = buttonFactory(WORK_BUTTONS, WORK_TIME_DISPLAY);



