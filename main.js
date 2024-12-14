const getSignal = document.getElementById("get-signal");
const stopSignalTimeBlock = document.getElementById("stop-signal-time-block");
const printSignal = document.getElementById("print-signal");
const stopProgress = document.getElementById("stop-progress");
const errorNotification = document.getElementById("error-notification");
const errorProgress = document.getElementById("error-progress");
const textError = document.getElementById("text-error");
const getSignalTwo = document.getElementById("get-signal-two");
const errorExit = document.getElementById("error-exit");

//Функция для генерации случайного числа
function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(
    decimals,
  );
  return parseFloat(str);
}

//Нажатие на кнопку "GET SIGNAL"
getSignal.onclick = function () {
  let receivingSignal = getRandomFloat(1.00, 3.99, 2);

  if ((receivingSignal.toString().length == 3)) {
    receivingSignal += "0";
  } if ((receivingSignal.toString().length == 1)) {
    receivingSignal += ".00";
  }
  printSignal.innerHTML = `${receivingSignal}${"x"}`;
  printSignal.classList.remove("deactivate");
  goTimer(60);
  getSignal.disabled = true;
}

//Нажатие на кнопку "GET SIGNAL", когда идёт таймер 60 секунд.
getSignalTwo.onclick = function () {
  getSignalTwo.disabled = true;
  goTimerError(5, "go");
}



//Таймер после получения сигнала
function goTimer(time) {
  const timer = setInterval(() => {
    if (time >= 1) {
      getSignalTwo.classList.remove("deactivate");
      getSignal.classList.add("deactivate");
      getSignalTwo.style["z-index"] = "5";
      stopProgress.style["animation"] = "animateProgress 60s linear infinite";
      stopSignalTimeBlock.classList.remove("deactivate");
      let stopTimer = document.getElementById("stop-timer");
      stopTimer.innerHTML = `${time--}${"<span> seconds</span>"}`;
      timerr = time;
      getSignal.disabled = true;
    } else {
      getSignalTwo.classList.add("deactivate");
      getSignal.classList.remove("deactivate");
      getSignalTwo.style["z-index"] = "-1";
      stopSignalTimeBlock.classList.add("deactivate");
      stopProgress.style["animation"] = "none";
      clearInterval(timer);
      getSignal.disabled = false;
    }
  }, 1000)
}

//Работа уведомления ошибки
function goTimerError(time) {
  const timer = setInterval(() => {
    if (time >= 1) {
      time--;
      errorNotification.classList.remove("deactivate");
      textError.innerHTML = `Wait for the time to expire`;
      errorProgress.style["animation"] = "animateErrorProgress 5s linear infinite";
      errorNotification.style["transform"] = "translateY(0px)";
    } else {
      errorNotification.style["transform"] = "translateY(-99px)";
      errorProgress.style["animation"] = "none";
      clearInterval(timer);
      getSignalTwo.disabled = false;
      errorNotification.classList.add("deactivate");
    }
    errorExit.onclick = function () {
      errorNotification.classList.add("deactivate");
      errorNotification.style["transform"] = "translateY(-99px)";
      errorProgress.style["animation"] = "none";;
      clearInterval(timer);
      getSignalTwo.disabled = false;
    }
  }, 1000)
}