const workTimeDisplay = document.querySelector("#controlBar .work span");
const restTimeDisplay = document.querySelector("#controlBar .rest span");

const workButtons = document.querySelectorAll(".work .controls button");
const restButtons = document.querySelectorAll(".rest .controls button");
//get these into objects

// main timer module
workButtons.forEach(button => button.addEventListener("click", clickHandler));
restButtons.forEach(button => button.addEventListener("click", clickHandler));


var timeModule = (function () {
  const displayTime = document.querySelector("#display h1");
  const mainButtons = document.querySelectorAll(".main-controls button");
  mainButtons.forEach(button => button.addEventListener("click", clickHandler));

  let timerId, workTime, startTime, endTime;
  var setDisplay, clickHandler, timerCalc, stopTimer;
  let time = {minutes: 25, seconds: 00};

  function clickHandler() {

    if (this === mainButtons[0]) {
      timerCalc();

      if (timerId == undefined) {
        timerId = setInterval(changeDisplay, 1000);
      }

    } else if (this === mainButtons[1]) {
      stopTimer();
    } else if (this === mainButtons[2]) {
      stopTimer();
      timerReset();
      setDisplay();
    } else {
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
    time.minutes = 25;
    time.seconds = 0;
  }

  function setDisplay() {
    let seconds = time.seconds.toString();

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }

    let newDisplay = `${time.minutes}:${seconds}`;
    displayTime.textContent = newDisplay;
  };

  function changeDisplay() {
    let timeNow = new Date().getTime();
    let timeRemaining =  endTime - timeNow;

    time.minutes = Math.floor(timeRemaining / 1000 / 60);
    time.seconds = Math.floor(timeRemaining / 1000 % 60);
    setDisplay();
  };

  function timerCalc() {
    workTime = ((time.minutes * 60) + time.seconds ) * 1000;
    startTime = new Date().getTime();
    endTime = startTime + workTime;
  }

  return {
    mainButtons
  }

})();





//you need a clicky factory
function clickHandler(buttonType) {
  if (this === workButtons[0]) {
    workTimeDisplay.textContent = parseInt(workTimeDisplay.textContent) - 1;
  } else {
    workTimeDisplay.textContent = parseInt(workTimeDisplay.textContent) + 1;
  }
}
