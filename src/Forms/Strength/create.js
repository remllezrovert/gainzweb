
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
        setAddItem(); // Trigger function when enter button is pressed
    }
});

setRepsInput.addEventListener("keypress", function(event) { // When textbox is selected, enter key will start setAddItem() function
    if (event.key === "Enter") {
        setAddItem(); // Trigger function when enter button is pressed
    }
});

function setRemoveItem(idx){
    setItems.splice(idx,1)
    setRenderItems()
    setSaveItems()
}
document.addEventListener("DOMContentLoaded", setLoadItems)