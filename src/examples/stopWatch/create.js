
stopwatch = document.getElementById("stopwatch");
let secondsElapsed = 0;
let interval = null;
function stopwatchTimer() {
    secondsElapsed++;
    setStopwatch()
}
const padStart = (value) => {
    return String(value).padStart(2,"0")
}
function setStopwatch(){
    hours = Math.floor(secondsElapsed / 3600)
    minutes = Math.floor(secondsElapsed / 60)
    seconds = Math.floor(secondsElapsed % 60)
    displayTime = `${padStart(hours)}: ${padStart(minutes)}: ${padStart(seconds)}`;
    stopwatch.innerHTML = displayTime;
}

function startStopwatch(){
    if (interval) stopStopwatch()
        interval = setInterval(stopwatchTimer, 1000)
}
const stopStopwatch = () => {
    clearInterval(interval)
}
const resetStopwatch = () => {
    stopStopwatch()
    secondsElapsed = 0
    setStopwatch()
}




//timer stuff
function setTimer(){
    hours = Math.floor(secondsElapsed / 3600)
    minutes = Math.floor(secondsElapsed / 60)
    seconds = Math.floor(secondsElapsed % 60)
    displayTime = `${padStart(hours)}: ${padStart(minutes)}: ${padStart(seconds)}`;
    stopwatch.innerHTML = displayTime;
}




