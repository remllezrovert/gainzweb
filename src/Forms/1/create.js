import Exercise from "../../model/Exercise.js";
import { saveToIndexedDB, loadFromIndexedDB, deleteFromIndexedDB } from "../../services/IndexedDB.js";

const setWeightInput = document.getElementById("setWeightInput");
const setRepsInput = document.getElementById("setRepsInput");
const setItemsDiv = document.getElementById("setItems");

let setItems = [];

const setItemsKey = "setItems";
const lastUnitKey = "lastSelectedUnit";

// Load items and render them on page load
function setLoadItems() {
    const oldItems = localStorage.getItem(setItemsKey);
    if (oldItems) {
        setItems = JSON.parse(oldItems);
    }
    setRenderItems();

    const lastUnit = localStorage.getItem(lastUnitKey);
    if (lastUnit) {
        document.getElementById(lastUnit).checked = true;
    }
}

function setRenderItems() {
    setItemsDiv.innerHTML = null;
    for (const [idx, setItem] of Object.entries(setItems)) {
        const container = document.createElement("div");
        container.style.marginBottom = "10px";
        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginLeft = "10px";
        text.textContent = setItem;
        const button = document.createElement("button");
        button.textContent = "Delete Workout";
        button.onclick = () => setRemoveItem(idx);
        container.appendChild(button);
        container.appendChild(text);
        setItemsDiv.appendChild(container);
    }
}

function setSaveItems() {
    localStorage.setItem(setItemsKey, JSON.stringify(setItems));
}

function setAddItem() {
    const value = setWeightInput.value;
    const value2 = setRepsInput.value;
    const weightUnit = document.querySelector('input[name="weight"]:checked');
    if ((!value || !value2) || !weightUnit) {
        alert("You cannot add an empty workout.");
        return;
    }

    const workoutEntry = `${value2}x${value} ${weightUnit.value}`;
    setItems.push(workoutEntry);

    setRenderItems();
    localStorage.setItem(lastUnitKey, weightUnit.id);
    setRepsInput.value = "";
    setSaveItems();
    setRepsInput.focus();
}
window.setAddItem = setAddItem;

setWeightInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        setAddItem();
    }
});
setRepsInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        setAddItem();
    }
});

function setRemoveItem(idx) {
    setItems.splice(idx, 1);
    setRenderItems();
    setSaveItems();
}
document.addEventListener("DOMContentLoaded", setLoadItems);









async function submitExercise(event) {
    event.preventDefault();

    let exerciseId = Math.floor(Math.random() * 100000);

    const myExercise = new Exercise(exerciseId);
    const today = new Date();
    myExercise.setDate(today.toISOString().split("T")[0]);
    myExercise.setId(exerciseId);
    myExercise.setClientId(0);

    // Retrieve the selected templateId from localStorage
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

    const dataMapContent = {};

    for (const setItem of setItems) {
        const [reps, weightAndUnit] = setItem.split("x");
        const [weight, unit] = weightAndUnit.trim().split(" ");
        const key = `${weight}${unit}`;
        const repsValue = parseInt(reps, 10);

        if (!dataMapContent[key]) {
            dataMapContent[key] = [];
        }
        dataMapContent[key].push(repsValue);
    }

    for (let key in dataMapContent) {
        dataMapContent[key] = dataMapContent[key].join(",");
    }

    myExercise.dataMap = { content: dataMapContent };

    // Ensure `id` is assigned to the Exercise object and verify it before saving
    if (!myExercise.id) {
        console.error("Exercise object does not have a valid id.");
        return;
    }

    try {
        await saveToIndexedDB(myExercise.id, myExercise);
        console.log("Exercise saved successfully!");
    } catch (error) {
        console.error("Failed to save to IndexedDB:", error);
    }

    setItems = [];
    localStorage.removeItem(setItemsKey);
    setRenderItems();

    console.log("Workout submitted!");
}


document.getElementById("WorkoutForm").addEventListener("submit", submitExercise);
