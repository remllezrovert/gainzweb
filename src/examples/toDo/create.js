


const toDoItemInput = document.getElementById("toDoItemInput");
const toDoItemsDiv = document.getElementById("toDoItems");

let toDoItems = [];
const storageKey = "toDoItems"
function toDoLoadItems(){
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) toDoItems=JSON.parse(oldItems);
    toDoRenderItems();

}
function toDoRenderItems() {
    toDoItemsDiv.innerHTML= null;
    for (const [idx, toDoItem] of Object.entries(toDoItems)){
        const container = document.createElement("div")
        container.style.marginBottom = "10px"
        const text = document.createElement("p") 
        text.style.display = "inline"
        text.style.marginLeft= "10px"
        text.textContent = toDoItem;
        const button = document.createElement("button")
        button.textContent = "Delete"
        button.onclick = () => toDoRemoveItem(idx);
        container.appendChild(button)
        container.appendChild(text)
        toDoItemsDiv.appendChild(container)
    }
}

function toDoSaveItems(){
    const stringItems = JSON.stringify(toDoItems);
    localStorage.setItem(storageKey, stringItems);
}

function toDoAddItem(){
    const value = toDoItemInput.value;
    if (!value){
        alert("you cannot add an empty item")
        return
    }
    toDoItems.push(value)
    toDoRenderItems()
    toDoItemInput.value = ""
    toDoSaveItems()
}


function toDoRemoveItem(idx){
    toDoItems.splice(idx,1)
    toDoRenderItems()
    toDoSaveItems()
}
document.addEventListener("DOMContentLoaded", toDoLoadItems)
