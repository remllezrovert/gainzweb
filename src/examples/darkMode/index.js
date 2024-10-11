//color flipper
const body = document.getElementsByTagName("body")[0]

body.style.backgroundColor = "red"


const setColor = (name) => {
    body.style.backgroundColor = name
}

const randomColor = () => {
    const red = Math.random() * 255
    const green = Math.random() * 255
    const blue = Math.random() * 255
    const color = `rgb(${red}, ${green}, ${blue})`

    body.style.backgroundColor = color
}






const txtInput = document.getElementById("txtInput")


const check = () => {
    const value = txtInput.value;
    alert(value)
}