 import Exercise from "../../model/Exercise.js";

const setWeightInput = document.getElementById("setWeightInput");
const setRepsInput = document.getElementById("setRepsInput");
const setItemsDiv = document.getElementById("setItems");

let setItems = [];
const storageKey = "setItems"

function setLoadItems(){
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) setItems=JSON.parse(oldItems);
    setRenderItems();
}

function setRenderItems() {
    setItemsDiv.innerHTML= null;
    for (const [idx, setItem] of Object.entries(setItems)) {
        const container = document.createElement("div")
        container.style.marginBottom = "10px"
        const text = document.createElement("p") 
        text.style.display = "inline"
        text.style.marginLeft= "10px"
        text.textContent = setItem;
        const button = document.createElement("button")
        button.textContent = "Delete Workout" 
        button.onclick = () => setRemoveItem(idx);
        container.appendChild(button)
        container.appendChild(text)
        setItemsDiv.appendChild(container)
    }
}

function setSaveItems(){
    const stringItems = JSON.stringify(setItems);
    localStorage.setItem(storageKey, stringItems);
}

function setAddItem(){
    const value = setWeightInput.value;
    const value2 = setRepsInput.value;
    const weightUnit = document.querySelector('input[name="weight"]:checked'); // grab selected radio button
    if ((!value || !value2) || !weightUnit) { // if no radio button is selected, or no value is inputted throw alert
        alert("you cannot add an empty workout")
        return
    }

    const workoutEntry = `${value2}x${value} ${weightUnit.value}`; // combines the two values into one string
    setItems.push(workoutEntry);
    
    setRenderItems()
    localStorage.setItem('lastSelectedUnit', weightUnit.id);
    setRepsInput.value = ""  // sets textbox to blank after entry is submitted
    setSaveItems()
    setRepsInput.focus(); // When workout added, cursor goes back to reps textbox for next input automatically
}
window.setAddItem = setAddItem;

setWeightInput.addEventListener("keypress", function(event) { // When textbox is selected, enter key will start setAddItem() function
    if (event.key === "Enter") {
        event.preventDefault();
        setAddItem(); // Trigger function when enter button is pressed
    }
});

setRepsInput.addEventListener("keypress", function(event) { // When textbox is selected, enter key will start setAddItem() function
    if (event.key === "Enter") {
        event.preventDefault();
        setAddItem(); // Trigger function when enter button is pressed
    }
});

function setRemoveItem(idx){
    setItems.splice(idx,1)
    setRenderItems()
    setSaveItems()
}
document.addEventListener("DOMContentLoaded", setLoadItems)

// Function for form submission and creating exercise object
function submitExercise() {
    event.preventDefault();

    let exerciseId = Math.floor(Math.random() * 100000);  //  random exercise ID generation

    // Create a new Exercise instance
    const myExercise = new Exercise();

    // Set the date to today's date in YYYY-MM-DD format
    const today = new Date();
    myExercise.setDate(today.toISOString().split('T')[0]); // Format date

    // Set additional Exercise properties
    myExercise.setId(exerciseId);
    myExercise.setClientId(0);
    myExercise.setTemplateId(0);

    const dataMapContent = {};

    for (const setItem of setItems) {
        // Parse set item into reps, weight, and unit
        const [reps, weightAndUnit] = setItem.split('x');
        const [weight, unit] = weightAndUnit.trim().split(' ');
        const key = `${weight}${unit}`;
        const repsValue = parseInt(reps, 10);

        // Organize reps under the appropriate weight/unit key
        if (!dataMapContent[key]) {
            dataMapContent[key] = [];
        }
        dataMapContent[key].push(repsValue);
    }

    // Convert the reps arrays into comma-separated strings
    for (let key in dataMapContent) {
        dataMapContent[key] = dataMapContent[key].join(',');
    }

    // Assign dataMap to the Exercise object
    myExercise.dataMap = { content: dataMapContent };

    let key = `e${exerciseId}`;  // Key format: e1

    // Log the exercise object to the console
    console.log(myExercise);

    // save the exercise to localStorage with the unique key
    localStorage.setItem(key, JSON.stringify(myExercise));

    // used to retrieve the exercise from localStorage
    let storedExercise = JSON.parse(localStorage.getItem(key));

    // generate the JSON output
    const jsonOutput = JSON.stringify(
        {
            id: myExercise.getId(),
            clientId: myExercise.getClientId(),
            templateId: myExercise.getTemplateId(),
            date: myExercise.getDate(),
            dataMap: {
                content: dataMapContent,
            },
        },
        null,
        2
    );
console.log(jsonOutput);
}

// submits workout form
document.getElementById("WorkoutForm").addEventListener("submit", function(event) {
    event.preventDefault()
    submitExercise();
});
