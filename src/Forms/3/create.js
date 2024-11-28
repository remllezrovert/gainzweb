import Exercise from "../../model/Exercise.js";
import { saveToIndexedDB, loadFromIndexedDB, deleteFromIndexedDB } from "../../services/IndexedDB.js";


let myExercise = new Exercise();

let weightUnit = "LB"

let workoutHistoryMap = {};
const historyItems = document.getElementById("workoutHistory").getElementsByTagName("li");

for (let i = 0; i < historyItems.length; i++) {
    let item = historyItems[i].textContent.trim().split(' ');
    let weight = item[0] + item[1];
    let time = item.slice(3).join(" ");

    if (time && time !== "00:00:00.00") {
        if (!workoutHistoryMap[weight]) {
            workoutHistoryMap[weight] = [];
        }
        workoutHistoryMap[weight].push(time);
    }
}

let contentMap = {};
for (let weight in workoutHistoryMap) {
    let times = workoutHistoryMap[weight].join(", ");
    contentMap[weight] = times;
}
myExercise.setData("content", contentMap);

myExercise.setDate(new Date().toISOString().split('T')[0]);

let exerciseId = Math.floor(Math.random() * 100000);
myExercise.setId(exerciseId);

let exerciseData = {
    ...myExercise,
    id: exerciseId,
    dataMap: Object.fromEntries(myExercise.getAllData())
};

try {
    await saveToIndexedDB(exerciseId, exerciseData);
    let storedExercise = await loadFromIndexedDB(exerciseId);
    console.log(storedExercise);
} catch (error) {
    console.error("Error saving to IndexedDB:", error);
}

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");

    startButton.addEventListener("click", startStopwatch);
    stopButton.addEventListener("click", stopStopwatch);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (timerRunning) {
                stopStopwatch();
            } else {
                startStopwatch();
            }
        }
    });

    document.querySelector(".submitWorkoutBtn").addEventListener("click", submitWorkout);
});
window.submitWorkout = submitWorkout;
