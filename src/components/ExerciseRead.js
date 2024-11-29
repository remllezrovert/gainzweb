import React, { Component } from 'react';
import { getAllExercises } from '../services/IndexedDB';

class ExerciseRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: this.getExercises(props.storedExArray),
        };
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
                        "60 kg": [8, 6, 5],
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
    }

    deleteExercise(index) {
        const { storedExArray } = this.props;
        const updatedExercises = [...this.state.exercises];
        updatedExercises.splice(index, 1);
        this.saveExercises(storedExArray, updatedExercises);
        this.setState({ exercises: updatedExercises });

        if (updatedExercises.length === 0) {
            localStorage.removeItem(storedExArray);
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
                            padding: 10px;
                            background-color: #f9f9f9;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            font-family: Arial, sans-serif;
                        }

                        .exercise-container {
                            margin-bottom: 15px;
                            padding: 15px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            background-color: #ffffff;
                            transition: box-shadow 0.2s ease-in-out;
                        }

                        .exercise-container:hover {
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                        }

                        .exercise-header {
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                            margin-bottom: 8px;
                        }

                        .label {
                            font-size: 16px;
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
