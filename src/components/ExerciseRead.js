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
        <div>
            <style>
                {`
                    body {
                        margin: 0; /* Remove default margin */
                        padding: 0; /* Remove default padding */
                        font-family: Arial, sans-serif;
                    }

                    .exercise-container {
                        margin-bottom: 20px;
                        padding: 15px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        background-color: #f9f9f9;
                    }

                    .exercise-header {
                        font-size: 18px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 10px;
                    }

                    .label {
                        font-size: 16px;
                        font-style: italic;
                        margin-bottom: 10px;
                    }

                    .content-list {
                        list-style-type: none;
                        padding: 0;
                    }

                    .content-list li {
                        padding: 5px 0;
                    }

                    .delete-button {
                        margin-top: 10px;
                        padding: 5px 10px;
                        font-size: 14px;
                        background-color: #ff4d4d;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .delete-button:hover {
                        background-color: #ff1a1a;
                    }
                `}
            </style>
            <h1>Exercises</h1>
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
