import React, { useEffect, useState } from "react";

// Function to get exercises from localStorage
const getExercises = (storedExArray) => {
    const storedExercises = localStorage.getItem(storedExArray);
    return storedExercises ? JSON.parse(storedExercises) : [];
};

// Function to save exercises to localStorage
const saveExercises = (storedExArray, updatedArray) => {
    localStorage.setItem(storedExArray, JSON.stringify(updatedArray));
};

const ExerciseRead = ({ storedExArray }) => {
    const [exercises, setExercises] = useState(getExercises(storedExArray));

    // Function to delete an exercise
    const deleteExercise = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(index, 1);
        saveExercises(storedExArray, updatedExercises);
        setExercises(updatedExercises);

        // If all exercises are deleted, remove the local storage item
        if (updatedExercises.length === 0) {
            localStorage.removeItem(storedExArray);
        }
    };

    // Sort exercises by date in ascending order
    const sortedExercises = [...exercises].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div id="exerciseList">
            {sortedExercises.map((exercise, index) => (
                <div key={index} className="exercise-container">
                    <div className="exercise-header">Date: {exercise.date}</div>
                    <div className="label">{exercise.label}</div>
                    <div>Sets:</div>
                    <ul className="content-list">
                        {Object.entries(exercise.dataMap.content).map(([weight, reps], i) => (
                            <li key={i}>{`${weight}: ${reps.join(", ")}`}</li>
                        ))}
                    </ul>
                    <button
                        className="delete-button"
                        onClick={() => deleteExercise(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExerciseRead;
