import Exercise from "../../model/Exercise.js"; // Import Exercise class for workout data handling
import { saveToIndexedDB } from "../../services/IndexedDB.js";

let stopwatch = document.getElementById("stopwatch");
let lapsContainer = document.getElementById("Laps");
let hundrethsElapsed = 0; // Variable to keep track of elapsed hundredths of a second
let lastLapTime = 0; // Variable to track the last lap time
let interval = null; // Stores the interval ID for the timer
let lapsButton = document.getElementById("lapBtn");

const disableLapBtn = () => {
    lapsButton.disabled = true;
};

const enableLapBtn = () => {
    lapsButton.disabled = false;
};

const padStart = (value) => String(value).padStart(2, "0");

function setStopwatch() {
    let totalHundreths = hundrethsElapsed;

    let hours = Math.floor(totalHundreths / 360000);
    let minutes = Math.floor((totalHundreths % 360000) / 6000);
    let seconds = Math.floor((totalHundreths % 6000) / 100);
    let hundreths = totalHundreths % 100;

    stopwatch.innerHTML = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}:${padStart(hundreths)}`;
}

function stopwatchTimer() {
    hundrethsElapsed++;
    setStopwatch();
}

function startStopwatch() {
    const weightUnit = getSelectedWeightUnit();
    if (!weightUnit) {
        alert("Please select a weight unit (kg or lb) before starting the timer.");
        return;
    }

    if (!interval) {
        interval = setInterval(stopwatchTimer, 10);
        enableLapBtn();
    }
}

function stopStopwatch() {
    if (interval) {
        recordLap(); // Record the last lap before stopping
        clearInterval(interval);
        interval = null;
    }
    disableLapBtn();
}

function resetStopwatch() {
    stopStopwatch();
    hundrethsElapsed = 0;
    lastLapTime = 0;
    setStopwatch();
    lapsContainer.innerHTML = "";
}

function getSelectedWeightUnit() {
    const radioButtons = document.querySelectorAll('input[name="weight"]');
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return null;
}

function recordLap() {
    const lapTime = hundrethsElapsed - lastLapTime;
    const hours = Math.floor(lapTime / 360000);
    const minutes = Math.floor((lapTime % 360000) / 6000);
    const seconds = Math.floor((lapTime % 6000) / 100);
    const hundreths = lapTime % 100;

    const lapDisplay = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}:${padStart(hundreths)}`;
    const weight = document.getElementById("weightInput").value.trim();
    const weightUnit = getSelectedWeightUnit();

    if (!weight || isNaN(weight) || weight <= 0) {
        alert("Please enter a valid positive number for the weight.");
        return;
    }

    const weightKey = `${weight}${weightUnit}`;
    const lapItem = document.createElement("li");
    lapItem.dataset.weightKey = weightKey; // Attach the weight key for grouping later
    lapItem.textContent = `${weightKey} in ${lapDisplay}`;
    lapsContainer.appendChild(lapItem);

    lastLapTime = hundrethsElapsed; // Update the last lap time
}

// Function to submit laps
const submitLaps = async () => {
    const lapItems = lapsContainer.getElementsByTagName("li");
    if (lapItems.length === 0) {
        alert("No laps to submit.");
        return;
    }

    // Generate a unique exercise ID
    let exerciseId = Math.floor(Math.random() * 100000);
    let myExercise = new Exercise();
    myExercise.setId(exerciseId); // Set exercise ID
    myExercise.setClientId(0); // Default client ID
    myExercise.setTemplateId(0); // Default template ID
    myExercise.setDate(new Date().toISOString().split("T")[0]); // Set the date to today's date (YYYY-MM-DD)

    // Create an object to hold laps grouped by weight
    let lapsData = {};

    // Iterate over lap items and group them by weight
    for (let i = 0; i < lapItems.length; i++) {
        const lapItem = lapItems[i];
        const lapText = lapItem.textContent; // e.g., "100kg in 00:00:00:67"
        const [weightKey, lapTime] = lapText.split(" in "); // Split to get weight and lap time

        if (!lapsData[weightKey]) {
            lapsData[weightKey] = lapTime; // If this is the first lap for the weight, set it
        } else {
            lapsData[weightKey] += `, ${lapTime}`; // Otherwise, append the lap time to the existing entry
        }
    }

    // Prepare the data structure for saving
    const dataMap = {
        content: lapsData,
    };

    // Add the remaining properties to the exercise object
    myExercise.setData("dataMap", dataMap);

    const selectedTemplateId = localStorage.getItem("selectedTemplateId");
    if (selectedTemplateId) {
        myExercise.setTemplateId(parseInt(selectedTemplateId, 10)); // Ensure the templateId is a number
    } else {
        console.error("No templateId found in localStorage. Please select a template.");
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("userData"));
    if (currentUser){
        myExercise.setClientId(currentUser.id);
    } else {
        console.error("No clientId found in localStorage.");
        return;
    }

    // Save to IndexedDB
    try {
        await saveToIndexedDB(exerciseId, {
            id: exerciseId,
            clientId: currentUser.id, // Default client ID
            templateId: selectedTemplateId, // Default template ID
            date: myExercise.getDate(),
            dataMap: dataMap,
        });
        console.log("Exercise saved to IndexedDB:", myExercise);
    } catch (error) {
        console.error("Failed to save exercise to IndexedDB:", error);
        alert("Failed to save exercise to IndexedDB.");
    }

    // Reset after submission
    lapsContainer.innerHTML = "";
    hundrethsElapsed = 0;
    lastLapTime = 0;
    setStopwatch();


    // Dispatch the custom event globally
    const exerciseSubmitEvent = new CustomEvent('exerciseSubmit', {
        detail: {
            message: 'Workout successfully submitted',
            exerciseId: myExercise.id,
            dataMapContent: myExercise.dataMap
        }
    });

    // Dispatch the custom event
    document.dispatchEvent(exerciseSubmitEvent);  // Trigger the event globally
};

document.getElementById("submitLapsBtn").addEventListener("click", submitLaps);

disableLapBtn();

window.startStopwatch = startStopwatch;
window.stopStopwatch = stopStopwatch;
window.resetStopwatch = resetStopwatch;
window.recordLap = recordLap;
