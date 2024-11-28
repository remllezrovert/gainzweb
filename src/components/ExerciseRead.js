import React, { useEffect, useState } from 'react';

const ExerciseRead = ({ storedExArray }) => {
    // Function to get exercises from localStorage
    const getExercises = (storedExArray) => {
        const storedExercises = localStorage.getItem(storedExArray);
        return storedExercises ? JSON.parse(storedExercises) : [];
    };

    // Function to save exercises to localStorage
    const saveExercises = (storedExArray, updatedArray) => {
        localStorage.setItem(storedExArray, JSON.stringify(updatedArray));
    };

    // Demo data for initial loading if localStorage is empty
    const populateDemoExercises = (storedExArray) => {
        const demoExercises = [
            {
                id: 98,
                date: "2024-11-28",
                templateId: 9,
                dataMap: {
                    content: {
                        "50 kg": [10, 8, 6],
                        "60 kg": [8, 6, 5],
                    },
                },
            },
            {
                id: 97,
                date: "2024-11-29",
                templateId: 8,
                dataMap: {
                    content: {
                        "70 kg": [12, 10, 8],
                        "80 kg": [10, 8, 6],
                    },
                },
            },
            {
                id: 96,
                date: "2024-11-30",
                templateId: 9,
                dataMap: {
                    content: {
                        "100kg": [5, 4, 3],
                        "110kg": [4, 3, 2],
                    },
                },
            },
            {
                id: 95,
                date: "2024-12-01",
                templateId: 8,
                dataMap: {
                    content: {
                        "30kg": [12, 10, 8],
                        "35kg": [10, 8, 6],
                    },
                },
            },
            {
                id: 94,
                date: "2024-12-02",
                templateId: 9,
                dataMap: {
                    content: {
                        "300KG": [15, 12, 10],
                        "20KG": [12, 10, 8],
                    },
                },
            },
            {
                id: 93,
                date: "2024-12-03",
                templateId: 8,
                dataMap: {
                    content: {
                        "130LB": [10, 8, 6],
                        "120KG": [8, 6, 4],
                    },
                },
            },
        ];

        localStorage.setItem(storedExArray, JSON.stringify(demoExercises));
    };

    const [exercises, setExercises] = useState(getExercises(storedExArray));

    // Populate with demo data if not already in localStorage
    useEffect(() => {
        if (exercises.length === 0) {
            populateDemoExercises(storedExArray);
            setExercises(getExercises(storedExArray));
        }
    }, [storedExArray]);

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
        <>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
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
            <div id="exerciseList">
                {sortedExercises.map((exercise, index) => {
                    const template = JSON.parse(localStorage.getItem(`template_${exercise.templateId}`));
                    return (
                        <div key={index} className="exercise-container">
                            <div className="exercise-header">Date: {exercise.date}</div>
                            <div className="label">{template ? template.title : 'Unknown Template'}</div>
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
                    );
                })}
            </div>
        </>
    );
};

export default ExerciseRead;
