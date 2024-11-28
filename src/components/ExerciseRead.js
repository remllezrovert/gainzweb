import React, { useEffect, useState } from "react";
import Exercise from "../model/Exercise"; // Adjust the path as needed

// Function to get exercises from localStorage
const getExercises = (storedExArray) => {
    const storedExercises = localStorage.getItem(storedExArray);
    return storedExercises ? JSON.parse(storedExercises).map(ex => {
        const exercise = new Exercise(ex.id);
        exercise.setDate(new Date(ex.date));
        exercise.dataMap = new Map(Object.entries(ex.dataMap));
        return exercise;
    }) : [];
};

// Function to save exercises to localStorage
const saveExercises = (storedExArray, updatedArray) => {
    localStorage.setItem(storedExArray, JSON.stringify(updatedArray.map(ex => ({
        id: ex.id,
        date: ex.date.toISOString().split('T')[0],
        dataMap: Object.fromEntries(ex.dataMap)
    }))));
};

const ExerciseRead = ({ storedExArray }) => {
    const [exercises, setExercises] = useState(getExercises(storedExArray));

    // Function to delete an exercise
    const deleteExercise = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(index, 1);
        saveExercises(storedExArray, updatedExercises);
        setExercises(updatedExercises);

        // If the last exercise is deleted, remove the local storage item
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
                    {/* Display date as YYYY-MM-DD */}
                    <div className="exercise-header">
                        Date: {exercise.date instanceof Date ? exercise.date.toISOString().split('T')[0] : "Invalid Date"}
                    </div>
                    <div className="label">{exercise.getData("label")}</div>
                    <div>Sets:</div>
                    <ul className="content-list">
                        {exercise.getData("Sets 1") && Object.entries(exercise.getData("Sets 1")).map(([weight, reps], i) => (
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
