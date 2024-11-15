
let stopwatch = document.getElementById("stopwatch");
let lapsContainer = document.getElementById("Laps"); 
let hundrethsElapsed = 0; // Variable to keep track of seconds passed
let lastLapTime = 0; // Variable to keep track of the last lap time 
let interval = null;

function stopwatchTimer() {
    hundrethsElapsed++;
    setStopwatch()
}

const padStart = (value) => {
    return String(value).padStart(2,"0")
}

function setStopwatch(){
    let totalHundreths = hundrethsElapsed; // total hundreths of a second elapsed
    
    let hours = Math.floor(totalHundreths / 360000)
    let minutes = Math.floor((totalHundreths % 36000) / 6000)
    let seconds = Math.floor((totalHundreths % 6000) / 100);
    let hundreths = totalHundreths % 100; // Get the remainder as hundreths of a second

    let displayTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    stopwatch.innerHTML = displayTime;
}

function startStopwatch(){
    if (interval) stopStopwatch()
        interval = setInterval(stopwatchTimer, 10)
}
const stopStopwatch = () => {
    clearInterval(interval)
}
const resetStopwatch = () => {
    stopStopwatch()
    hundrethsElapsed = 0
    lastLapTime = 0
    setStopwatch()
    lapsContainer.innerHTML = "";
}

const recordLap = () => { // recordLap function 
    const lapTime = hundrethsElapsed - lastLapTime;
    const hours = Math.floor(lapTime / 360000);
    const minutes = Math.floor((lapTime % 360000) / 6000);
    const seconds = Math.floor((lapTime % 6000) / 100);
    const hundreths = hundrethsElapsed % 100;

    const lapDisplay = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    const lapElement = document.createElement("li");
    lapElement.innerHTML = `Lap: ${lapDisplay} <button class="delete-lap">Delete Lap</button>`;
    
    lapElement.querySelector(".delete-lap").addEventListener("click", () => {
        lapsContainer.removeChild(lapElement);
    });
    
    lapsContainer.appendChild(lapElement);
    lastLapTime = secondsElapsed;
}




