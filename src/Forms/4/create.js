import { saveToIndexedDB, loadFromIndexedDB } from "../../services/IndexedDB.js";

const mealDescriptionInput = document.getElementById("mealDescription");
const caloriesInput = document.getElementById("caloriesInput");
const carbsInput = document.getElementById("carbsInput");
const sugarInput = document.getElementById("sugarInput");
const proteinInput = document.getElementById("proteinInput");
const mealItemsDiv = document.getElementById("mealItems");

let exerciseObject = {
    exerciseId: generateRandomId(),
    formId: 4, // Form ID for meal logging
    userId: "currentUserId123", // Replace this with dynamic user ID logic
    dataMap: {
        content: [] // Array to store meal entries
    }
};

// Load existing exercise object from IndexedDB or initialize a new one
async function mealLoadItems() {
    try {
        const loadedObject = await loadFromIndexedDB("exerciseData", exerciseObject.exerciseId);
        if (loadedObject) {
            exerciseObject = loadedObject;
        }
    } catch (err) {
        console.error("Error loading exercise object from IndexedDB:", err);
    }
    mealRenderItems();
}

// Render meal entries on the page
function mealRenderItems() {
    mealItemsDiv.innerHTML = null;
    for (const [idx, meal] of exerciseObject.dataMap.content.entries()) {
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginLeft = "10px";
        text.textContent = `Meal: ${meal.description}, Calories: ${meal.calories}, Carbs: ${meal.carbs}g, Sugar: ${meal.sugar}g, Protein: ${meal.protein}g`;

        const button = document.createElement("button");
        button.textContent = "Delete Meal";
        button.onclick = () => mealRemoveItem(idx);

        container.appendChild(button);
        container.appendChild(text);
        mealItemsDiv.appendChild(container);
    }
}

// Save the exercise object to IndexedDB
async function mealSaveItems() {
    try {
        await saveToIndexedDB("exerciseData", exerciseObject);
    } catch (err) {
        console.error("Error saving exercise object to IndexedDB:", err);
    }
}

// Add a meal entry
function mealAddItem() {
    const description = mealDescriptionInput.value.trim();
    const calories = parseInt(caloriesInput.value || 0);
    const carbs = parseInt(carbsInput.value || 0);
    const sugar = parseInt(sugarInput.value || 0);
    const protein = parseInt(proteinInput.value || 0);

    if (!description) {
        alert("Meal description cannot be empty.");
        return;
    }

    const mealEntry = {
        description,
        calories,
        carbs,
        sugar,
        protein
    };

    exerciseObject.dataMap.content.push(mealEntry);

    mealRenderItems();
    mealSaveItems();

    // Clear inputs after adding
    mealDescriptionInput.value = "";
    caloriesInput.value = "";
    carbsInput.value = "";
    sugarInput.value = "";
    proteinInput.value = "";
    mealDescriptionInput.focus();
}
window.mealAddItem = mealAddItem;

// Remove a meal entry
function mealRemoveItem(idx) {
    exerciseObject.dataMap.content.splice(idx, 1);
    mealRenderItems();
    mealSaveItems();
}

// Generate a random ID for the exercise object
function generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Event listeners for "Enter" key
mealDescriptionInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mealAddItem();
    }
});
caloriesInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mealAddItem();
    }
});
carbsInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mealAddItem();
    }
});
sugarInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mealAddItem();
    }
});
proteinInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mealAddItem();
    }
});

// Load meal entries on page load
document.addEventListener("DOMContentLoaded", mealLoadItems);
