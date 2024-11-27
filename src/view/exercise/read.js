//function to get exercises from localStorage
function getExercises(storedExArray) {
    const storedExercises = localStorage.getItem(storedExArray);
    return storedExercises ? JSON.parse(storedExercises) : [];
}
  
//function to save exercises to localStorage
function saveExercises(storedExArray, updatedArray) {
    localStorage.setItem(storedExArray, JSON.stringify(updatedArray));
}

//function to render exercises
function renderExercises(storedExArray) {
    const exerciseArray = getExercises(storedExArray); //get exercises from localStorage
    const exerciseList = document.getElementById("exerciseList");
    exerciseList.innerHTML = ""; //clear previous content

    //sort exercises by date in ascending order
    const sortedExercises = [...exerciseArray].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedExercises.forEach((exercise, index) => {
        //create exercise container
        const container = document.createElement("div");
        container.classList.add("exercise-container");

        //add date
        const dateHeader = document.createElement("div");
        dateHeader.classList.add("exercise-header");
        dateHeader.textContent = `Date: ${exercise.date}`;
        container.appendChild(dateHeader);

        //add label
        const labelHeader = document.createElement("div");
        labelHeader.classList.add("label");
        labelHeader.textContent = `${exercise.label}`;
        container.appendChild(labelHeader);

        //add content
        const contentHeader = document.createElement("div");
        contentHeader.textContent = "Sets:";
        container.appendChild(contentHeader);

        const contentList = document.createElement("ul");
        contentList.classList.add("content-list");

        const content = exercise.dataMap.content;
        for (const [weight, reps] of Object.entries(content)) {
            const listItem = document.createElement("li");
            listItem.textContent = `${weight}: ${reps.join(", ")}`;
            contentList.appendChild(listItem);
        }

        container.appendChild(contentList);

        //add delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteExercise(index, sortedExercises, storedExArray);
        });
        container.appendChild(deleteButton);

        //append container to exercise list
        exerciseList.appendChild(container);
    });
}

function deleteExercise(index, array, storedExArray) {
    array.splice(index, 1); //remove the exercise from the array
    saveExercises(storedExArray, array); //save updated exercises to localStorage
    renderExercises(storedExArray); //re-render the list
    if(index === 0 && array.length == 1){
        localStorage.removeItem(storedExArray);
    } 
}
