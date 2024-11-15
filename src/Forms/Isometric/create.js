
let stopwatch = document.getElementById("stopwatch");
let weightTypeInput = document.getElementById("weightInput");
let workoutHistory = document.getElementById("workoutHistory");

let hundrethsElapsed = 0; // Variable to keep track of seconds passed
let interval = null;

function stopwatchTimer() {
    hundrethsElapsed++;
    setStopwatch()
}

const padStart = (value) => {
    return String(value).padStart(2,"0")
}

function validateInputs() {
    const weightType = weightTypeInput.value.trim();
    const weightUnit = document.querySelector('input[name="weight"]:checked');

    if (weightType === "" && !weightUnit) {
        alert("Please fill out the Isometric workout.")
        weightTypeInput.focus();
        return false;
    }
    if (weightType === "") {
        alert("Please enter a weight value.");
        weightTypeInput.focus();
        return false;
    }

    if (!weightUnit) {
        alert("Please select a weight unit.");
        return false;
    }

    return true;
        
 }

function setStopwatch(){
    let totalHundreths = hundrethsElapsed; // total hundreths of a second elapsed
    
    let hours = Math.floor(totalHundreths / 360000)
    let minutes = Math.floor((totalHundreths % 36000) / 6000)
    let seconds = Math.floor((totalHundreths % 6000) / 100);
    let hundreths = totalHundreths % 100; // Get the remainder as hundreths of a second

    let displayTime;
    if (totalHundreths < 6000) {
        // If less than a minute display timer as only showing seconds
        displayTime = `${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    } else if (totalHundreths < 360000) {
        // if less than a hour display timer as showing only minutes
        displayTime = `${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    } else {
        // display full timer of hours:minutes:seconds:hundreths of seconds
        displayTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    }

    stopwatch.innerHTML = displayTime;
}

function startStopwatch(){
    
    if(!validateInputs()) return;
        
    if (interval) stopStopwatch();
    interval = setInterval(stopwatchTimer, 10);
}

const stopStopwatch = () => {
    clearInterval(interval)
    interval = null;
    addWorkout(hundrethsElapsed);
    resetStopwatch();
}
const resetStopwatch = () => {
    interval = null;
    hundrethsElapsed = 0
    setStopwatch()
}

function addWorkout() {
    if (!validateInputs()) return;

    const weightType = weightTypeInput.value.trim();
    const weightUnit = document.querySelector('input[name="weight"]:checked'); // grab selected radio button
    
    if (weightType === "") {
        alert("Please enter a weight type.")
        weightTypeInput.focus();
        return;
    }

    if (!weightUnit) {
        alert("Please select a weight unit.");
        return;
    }

    const hours = Math.floor(hundrethsElapsed / 360000);
    const minutes = Math.floor((hundrethsElapsed % 360000) / 6000);
    const seconds = Math.floor((hundrethsElapsed % 6000) / 100);
    const hundreths = hundrethsElapsed % 100;

    let workoutTime;

    if (hundrethsElapsed < 6000) {
        // If less than a minute display timer as only showing seconds
        workoutTime = `${padStart(seconds)}.${String(hundreths).padStart(2, '0')} second(s)`;
    } else if (hundrethsElapsed < 360000) {
        // if less than a hour display timer as showing only minutes
        workoutTime = `${padStart(minutes)}:${padStart(seconds)} minute(s)`;
    } else {
        // display full timer of hours:minutes:seconds:hundreths of seconds
        workoutTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')} hours`;
    }

    const workoutEntry = document.createElement("li");
    workoutEntry.textContent = `${weightType} ${weightUnit.value} for ${workoutTime}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this workout?")) {
            workoutHistory.removeChild(workoutEntry);
        }
    });
    
    workoutEntry.appendChild(deleteButton);
    workoutHistory.appendChild(workoutEntry);

    weightTypeInput.value = ""; // Clear input for next entry
    weightTypeInput.focus(); //Adds cursor back to workout box to start next workout quicker
}

weightTypeInput.addEventListener("keypress", function(event) { // When textbox is selected, enter key will start setAddItem() function
    if (event.key === "Enter") {
        if (interval) {
            stopStopwatch();
        } else {
            startStopwatch();
        }
    }
});






