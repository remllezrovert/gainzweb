import Exercise from "../../model/Exercise.js"; // Import Exercise class for workout data handling

let stopwatch = document.getElementById("stopwatch");
let hundrethsElapsed = 0; // Variable to keep track of hundredths of a second
let interval = null;
let timerRunning = false; // Track if the timer is running

// Function to start the stopwatch timer
function stopwatchTimer() {
    hundrethsElapsed++;
    setStopwatch();
}

const padStart = (value) => String(value).padStart(2, "0");

function setStopwatch() {
    let totalHundreths = hundrethsElapsed; // Total hundredths of a second elapsed

    let hours = Math.floor(totalHundreths / 360000);
    let minutes = Math.floor((totalHundreths % 360000) / 6000);
    let seconds = Math.floor((totalHundreths % 6000) / 100);
    let hundreths = totalHundreths % 100; // Get the remainder as hundredths of a second

    let displayTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;
    stopwatch.innerHTML = displayTime;
}

// Function to start the stopwatch
function startStopwatch() {
    const weightUnit = getSelectedWeightUnit();
    if (!weightUnit) {
        alert("Please select a weight unit (lb or kg) before starting the timer.");
        return; // Exit if no weight unit is selected
    }

    if (!interval) {
        interval = setInterval(stopwatchTimer, 10); // Start the stopwatch
        timerRunning = true;
    }
}

// Function to stop the stopwatch
function stopStopwatch() {
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    addToWorkoutHistory(); // Add to workout history when the stopwatch is stopped
    resetStopwatch(); // Reset the stopwatch after adding the workout
}

// Function to add workout to the history
function addToWorkoutHistory() {
    const hours = Math.floor(hundrethsElapsed / 360000); // Calculate hours from hundredths
    const minutes = Math.floor((hundrethsElapsed % 360000) / 6000); // Calculate minutes from hundredths
    const seconds = Math.floor((hundrethsElapsed % 6000) / 100); // Calculate seconds from hundredths
    const hundreths = hundrethsElapsed % 100; // Remainder is hundredths

    const workoutTime = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}.${String(hundreths).padStart(2, '0')}`;

    if (workoutTime !== "00:00:00.00") {
        let weight = document.getElementById("weightInput").value; // Get weight from textbox
        let weightUnit = getSelectedWeightUnit(); // Get the selected weight unit

        if (!weightUnit || !weight) return; // Exit if no weight or weight unit is selected

        // Add to the history list
        let workoutListItem = document.createElement("li");
        workoutListItem.textContent = `${weight} ${weightUnit} for ${workoutTime}`;
        document.getElementById("workoutHistory").appendChild(workoutListItem);
    }
}

// Function to get the selected weight unit (either "lb" or "kg")
function getSelectedWeightUnit() {
    const weightRadioButtons = document.querySelectorAll('input[name="weight"]');
    let selectedUnit = null;

    for (let i = 0; i < weightRadioButtons.length; i++) {
        if (weightRadioButtons[i].checked) {
            selectedUnit = weightRadioButtons[i].value;
            break;
        }
    }

    return selectedUnit;
}

// Function to reset stopwatch
function resetStopwatch() {
    hundrethsElapsed = 0;
    setStopwatch();
    timerRunning = false; // Reset the flag
}

// Attach resetStopwatch function to the global scope
window.resetStopwatch = resetStopwatch;

// Function to generate JSON output and store workout data
const submitWorkout = () => {
    // Create a new Exercise instance
    let myExercise = new Exercise();

    // Get the weight unit and validate
    let weightUnit = getSelectedWeightUnit();
    if (!weightUnit) return; // Don't proceed if no weight unit is selected

    // Create a map for the workout history organized by weight
    let workoutHistoryMap = {};
    const historyItems = document.getElementById("workoutHistory").getElementsByTagName("li");

    // Loop through each history item to organize by weight
    for (let i = 0; i < historyItems.length; i++) {
        let item = historyItems[i].textContent.trim().split(' '); // Trim to avoid leading/trailing spaces
        let weight = item[0] + item[1]; // This will be the weight (e.g., "20 lb")

        // Ensure we're extracting the correct time format (after the 'for' part)
        let time = item.slice(3).join(" "); // Get the time part (skip 'for' and the weight)

        // Only add to the map if the time is valid (not empty or "00:00:00.00")
        if (time && time !== "00:00:00.00") {
            if (!workoutHistoryMap[weight]) {
                workoutHistoryMap[weight] = [];
            }
            workoutHistoryMap[weight].push(time); // Store each time as an individual entry in an array
        }
    }

    // Populate the dataMap with the workout history
    let contentMap = {};
    for (let weight in workoutHistoryMap) {
        let times = workoutHistoryMap[weight].join(", "); // Join times for the same weight
        contentMap[weight] = times; // Store in the content map under the weight
    }
    myExercise.setData("content", contentMap); // Set content data in the main dataMap

    // Set additional properties on myExercise
    myExercise.setDate(new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format

    // Generate random exerciseId and assign it to the Exercise object
    let exerciseId = Math.floor(Math.random() * 100000); // Generate a random exerciseId (e.g., 78)
    myExercise.setId(exerciseId); // Assuming Exercise has a setId method

    // Convert the Map to a plain object before storing in localStorage
    let exerciseData = {
        ...myExercise,
        id: exerciseId,
        dataMap: Object.fromEntries(myExercise.getAllData()) // Convert Map to object
    };

    // Save to localStorage
    let key = `e${exerciseId}`; 
    localStorage.setItem(key, JSON.stringify(exerciseData)); // Save exercise data in localStorage

    let storedExercise = JSON.parse(localStorage.getItem(key)); // Retrieve the exercise from localStorage
    console.log(storedExercise); // Log the exercise stored in localStorage
};

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");

    startButton.addEventListener("click", startStopwatch);
    stopButton.addEventListener("click", stopStopwatch);

    // Ensure "Enter" key starts or stops the stopwatch
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            if (timerRunning) {
                stopStopwatch(); // Stop the stopwatch
            } else {
                startStopwatch(); // Start the stopwatch
            }
        }
    });

    document.querySelector(".submitWorkoutBtn").addEventListener("click", submitWorkout);
});
window.submitWorkout = submitWorkout;
