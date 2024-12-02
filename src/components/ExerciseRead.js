import React, { Component } from 'react';
import { getAllExercises, deleteFromIndexedDB } from '../services/IndexedDB';

class ExerciseRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: this.getExercises(props.storedExArray),
        };
        this.handleFetchExercises = this.handleFetchExercises.bind(this); // Bind method to this
    }

    getExercises(storedExArray) {
        const storedExercises = localStorage.getItem(storedExArray);
        return storedExercises ? JSON.parse(storedExercises) : [];
    }

    saveExercises(storedExArray, updatedArray) {
        localStorage.setItem(storedExArray, JSON.stringify(updatedArray));
    }

    static readAll(storedExArray, updatedExercises = null) {
        const arrIndexedDB = getAllExercises();

        if (updatedExercises !== null) {
            localStorage.setItem(storedExArray, JSON.stringify(updatedExercises));
        } else if (arrIndexedDB != null) {
            localStorage.setItem(storedExArray, JSON.stringify(arrIndexedDB));
        } else {
            console.log("No updated exercises provided, only fetching from IndexedDB.");
        }

        return arrIndexedDB;
    }

    populateDemoExercises(storedExArray) {
        const demoExercises = [
            {
                id: 98,
                date: "2024-11-28",
                templateId: 9,
                dataMap: {
                    content: {
                        "50 kg": [10, 8, 6],
                    },
                },
            },
        ];

        localStorage.setItem(storedExArray, JSON.stringify(demoExercises));
    }

    componentDidMount() {
        const { storedExArray } = this.props;
        if (this.state.exercises.length === 0) {
            this.populateDemoExercises(storedExArray);
            this.setState({ exercises: this.getExercises(storedExArray) });
        }

        // Fetch exercises on mount
        this.handleFetchExercises();
    }

    // This method can be called from outside (e.g., from ExercisePage)
    async handleFetchExercises() {
        try {
            const exercises = await getAllExercises();
            const storedExArray = "storedExercises"; // Use a key for localStorage
            await ExerciseRead.readAll(storedExArray, exercises); // Call the static method on ExerciseRead

            // Update the component state to trigger re-render with new exercises
            this.setState({ exercises: exercises });

        } catch (error) {
            console.error("Error fetching exercises from IndexedDB:", error);
        }
    }

    async deleteExercise(index) {
        const { storedExArray } = this.props;
        const updatedExercises = [...this.state.exercises];
        const exerciseToDelete = updatedExercises[index];

        // Remove from localStorage
        updatedExercises.splice(index, 1);
        this.saveExercises(storedExArray, updatedExercises);
        this.setState({ exercises: updatedExercises });

        if (updatedExercises.length === 0) {
            localStorage.removeItem(storedExArray);
        }

        try {
            await deleteFromIndexedDB(exerciseToDelete.id);
            console.log(`Exercise with ID ${exerciseToDelete.id} removed from IndexedDB.`);
        } catch (error) {
            console.error('Error deleting exercise from IndexedDB:', error);
        }
    }

    render() {
        const { exercises } = this.state;
        const sortedExercises = [...exercises].sort((a, b) => new Date(a.date) - new Date(b.date));

        return (
            <div>
                <style>
                    {`
                        #exerciseList {
                            margin-top: 20px;
                        }
                        .exercise-container {
                            background-color: #fff;
                            padding: 15px;
                            margin-bottom: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .exercise-header {
                            font-size: 18px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .label {
                            font-size: 14px;
                            font-weight: 500;
                            color: #555;
                            margin-bottom: 6px;
                        }
                        .content-list {
                            list-style: none;
                            padding: 0;
                            margin: 0 0 10px;
                        }
                        .content-list li {
                            font-size: 14px;
                            color: #666;
                            padding: 4px 0;
                        }
                        .delete-button {
                            padding: 8px 12px;
                            font-size: 14px;
                            color: #fff;
                            background-color: #e74c3c;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            transition: background-color 0.2s ease-in-out;
                        }
                        .delete-button:hover {
                            background-color: #c0392b;
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
                                        <li key={i}>{`${weight}: ${reps}`}</li>
                                    ))}
                                </ul>
                                <button
                                    className="delete-button"
                                    onClick={() => this.deleteExercise(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ExerciseRead;
