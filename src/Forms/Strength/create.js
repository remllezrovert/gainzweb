
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
    // NOTE: ask trevor about if he wants the values to be combined into an entry or changed into different entries
    setItems.push(workoutEntry);
    
    setRenderItems()
    localStorage.setItem('lastSelectedUnit', weightUnit.id);
    setRepsInput.value = ""  // sets textbox to blank after entry is submitted
    setSaveItems()
    setRepsInput.focus(); // When workout added, cursor goes back to reps textbox for next input automatically
}

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

class Excercise {
    constructor() {
        this.id = 0;
        this.clientId = 0;
        this.templateId = 0;
        this.date = "";
        this.dataMap = {};
    }

    // Getters
    get getId() {
        return this.id;
    }
    get getClientId() {
        return this.clientId;
    }
    get getTemplateId() {
        return this.templateId;
    }
    get getDate() {
        return this.date;
    }
    get getDataMap() {
        return this.dataMap;
    }

    // Setters
    set setId(id) {
        this.id = id;
    }
    set setClientId(clientId) {
        this.clientId = clientId;
    }
    set setTemplateId(templateId) {
        this.templateId = templateId;
    }
    setDate() {
        const today = new Date();
        this.date = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
    setDataMap(content) {
        this.dataMap = { content };
    }
}

// Function for form submission and creating excercise object
function submitExcercise() {
    event.preventDefault();
    // Create a new excercise Instance
    const newExcercise = new Excercise();

    // Set the date using setDate method
    newExcercise.setDate();

    newExcercise.setId = 0;
    newExcercise.setClientId = 0;
    newExcercise.setTemplateId = 0;

    // datamap based on example
    const dataMapContent = {};

    for (const setItem of setItems) {
        // keeps reps and weight apart
        const [reps, weightAndUnit] = setItem.split('x');
        // keeps weight and unita apart
        const [weight, unit] = weightAndUnit.trim().split(' ');
        // creates a key combining weight and unit of weight
        const key = `${weight} ${unit}`;
        // converts to integer
        const repsValue = parseInt(reps, 10);
        
        // if key does not exist already creates new array underneath of new weight to organize reps
        if (!dataMapContent[key]) {
            dataMapContent[key] = [];
    }
    // add repsValue to array 
    dataMapContent[key].push(repsValue);
    }

    // add dataMap to excercise object
    newExcercise.dataMap = { content : dataMapContent };
    

    // Convert excercise object to a JSON string
    const jsonOutput = JSON.stringify(newExcercise, (key, value) => {
        return Array.isArray(value) ? JSON.stringify(value).replace(/[\[\]]/g, '') : value;
    }, 2).replace(/\"\[/g, '[').replace(/\]\"/g, ']');

    // print JSON string out to console in browser (right-click and hit 'inspect')
    console.log(jsonOutput);
}
// submits workout form
document.getElementById("WorkoutForm").addEventListener("submit", function(event) {
    event.preventDefault()
    submitExcercise();
});