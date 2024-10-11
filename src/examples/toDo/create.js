


const setItemInput = document.getElementById("setItemInput");
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
    for (const [idx, setItem] of Object.entries(setItems)){
        const container = document.createElement("div")
        container.style.marginBottom = "10px"
        const text = document.createElement("p") 
        text.style.display = "inline"
        text.style.marginLeft= "10px"
        text.textContent = setItem;
        const button = document.createElement("button")
        button.textContent = "Delete"
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
    const value = setItemInput.value;
    if (!value){
        alert("you cannot add an empty item")
        return
    }
    setItems.push(value)
    setRenderItems()
    setItemInput.value = ""
    setSaveItems()
}


function setRemoveItem(idx){
    setItems.splice(idx,1)
    setRenderItems()
    setSaveItems()
}
document.addEventListener("DOMContentLoaded", setLoadItems)
