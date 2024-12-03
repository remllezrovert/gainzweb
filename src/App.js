import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Verification from "./components/Verification";
import ExercisePage from "./components/ExercisePage";
import TemplatePage from "./components/TemplatePage";
import IndexedDB, { clearIndexedDB } from "./services/IndexedDB";

import EventBus from "./common/EventBus";
import { initDB } from './services/IndexedDB.js';

import PrivateRoute from './components/PrivateRoute'; // Import the new PrivateRoute component

initDB()
    .then(() => console.log("LibreGainzIndexedDB initialized successfully"))
    .catch((error) => console.error("Failed to initialize LibreGainzIndexedDB:", error));

const App = () => {



  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  localStorage.setItem("template_1",
    JSON.stringify({
        "id": 1001,
        "title": "Bench Press",
        "dataType": "STRENGTH",
        "summary": "Bench Press on a level bench using a barbell",
        "clientId": 0,
        "formId": 1
    }))

  localStorage.setItem("template_2",
    JSON.stringify(
    {
        "id": 1002,
        "title": "Squats",
        "dataType": "STRENGTH",
        "summary": "Perform squats using a barbell for resistance",
        "clientId": 0,
        "formId": 1
    }))

  localStorage.setItem("template_3",
    JSON.stringify({
        "id": 1003,
        "title": "Running",
        "dataType": "CARDIO",
        "summary": "Run on a treadmill or outdoors for cardiovascular fitness",
        "clientId": 0,
        "formId": 2
    }))

  localStorage.setItem("template_4",
    JSON.stringify(
    {
        "id": 1004,
        "title": "Cycling",
        "dataType": "CARDIO",
        "summary": "Ride a stationary bike or outdoors to improve endurance",
        "clientId": 0,
        "formId": 2
    }))

  localStorage.setItem("template_5",
    JSON.stringify(
    {
        "id": 1005,
        "title": "Plank",
        "dataType": "ISOMETRIC",
        "summary": "Hold a plank position to strengthen core muscles",
        "clientId": 0,
        "formId": 3
    }))

  localStorage.setItem("template_6",

    JSON.stringify(
    {
        "id": 1006,
        "title": "Wall Sit",
        "dataType": "ISOMETRIC",
        "summary": "Perform a wall sit to strengthen leg muscles",
        "clientId": 0,
        "formId": 3
    }))

  localStorage.setItem("template_7",

    JSON.stringify(
    {
        "id": 1007,
        "title": "Deadlift",
        "dataType": "STRENGTH",
        "summary": "Lift a loaded barbell from the ground to the hips",
        "clientId": 0,
        "formId": 1
    }))

  localStorage.setItem("template_8",
    JSON.stringify(
    {
        "id": 1008,
        "title": "Rowing",
        "dataType": "CARDIO",
        "summary": "Use a rowing machine to improve cardiovascular and muscular fitness",
        "clientId": 0,
        "formId": 2
    }))

  localStorage.setItem("template_9",
    JSON.stringify(
    {
        "id": 1009,
        "title": "Lunges",
        "dataType": "STRENGTH",
        "summary": "Perform lunges with or without weights to strengthen legs",
        "clientId": 0,
        "formId": 1
    }))

  localStorage.setItem("template_10",
    JSON.stringify(
    {
        "id": 1010,
        "title": "Isometric Shoulder Hold",
        "dataType": "ISOMETRIC",
        "summary": "Hold weights at shoulder height without movement to build endurance",
        "clientId": 0,
        "formId": 3
    }));




  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
          user.roles = user.roles || ["user"]; // Set default role if none exist
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    // Clear localStorage
    localStorage.clear();
    clearIndexedDB("LibreGainzIndexedDB")
    
    // Call AuthService to log the user out
    AuthService.logout();
    
    // Reset the state to reflect the user is logged out
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  // Check if userData exists in localStorage
  const userData = localStorage.getItem('userData');

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
         LibreGainz 
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {/* Conditionally render "Workout" and "Templates" if userData exists in localStorage */}
          {userData && (
            <>
              <li className="nav-item">
                <Link to={"/ExercisePage"} className="nav-link">
                  Workout
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/TemplatePage"} className="nav-link">
                  Templates
                </Link>
              </li>
            </>
          )}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Verification"} className="nav-link">
                Verify
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/verification" element={<Verification />} />

          {/* Protected routes */}
          <Route path="/ExercisePage" element={<PrivateRoute element={ExercisePage} />} />
          <Route path="/TemplatePage" element={<PrivateRoute element={TemplatePage} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
