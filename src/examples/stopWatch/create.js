
let stopwatch = document.getElementById("stopwatch");
let lapsContainer = document.getElementById("Laps"); 
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
    let hours = Math.floor(secondsElapsed / 3600)
    let minutes = Math.floor((secondsElapsed % 3600) / 60)
    let seconds = secondsElapsed % 60;

    let displayTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
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

const recordLap = () => { // recordLap function 
    const lapTime = secondsElapsed;
    const hours = Math.floor(lapTime / 3600);
    const minutes = Math.floor((lapTime % 3600) / 60);
    const seconds = lapTime % 60;

    const lapDisplay = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;
    const lapElement = document.createElement("li");
    lapElement.innerHTML = `Lap: ${lapDisplay} <button class="delete-lap">Delete</button>`;
    
    lapElement.querySelector(".delete-lap").addEventListener("click", () => {
        lapsContainer.removeChild(lapElement);
    });
    
    lapsContainer.appendChild(lapElement);
}

//timer stuff
function setTimer(){
    hours = Math.floor(secondsElapsed / 3600)
    minutes = Math.floor(secondsElapsed / 60)
    seconds = Math.floor(secondsElapsed % 60)
    displayTime = `${padStart(hours)}: ${padStart(minutes)}: ${padStart(seconds)}`;
    stopwatch.innerHTML = displayTime;
}




