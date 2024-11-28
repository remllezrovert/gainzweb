import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import ClientRepo from "../repo/ClientRepo";

import TemplateCreate from "./TemplateCreate"; // Import the TemplateSearch component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const currentUser = AuthService.getCurrentUser();

  const templates = [
    { id: 1, title: "ABCD", summary: "Summary for ABCD" },
    { id: 2, title: "ABDE", summary: "Summary for ABDE" },
    { id: 3, title: "ACDE", summary: "Summary for ACDE" },
  ];


  const handleTemplateSelect = (template) => {
    console.log("Selected Template:", template);
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      ClientRepo.getMe(currentUser.token)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []); // Empty array to run only once

  if (!currentUser) {
    return <div className="container"><h1>Please log in</h1></div>;
  }

  localStorage.setItem("userData", JSON.stringify(userData, null, 2));

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles ? (
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
        ) : (
          <li>No roles found</li>
        )}
      </ul>

      {userData ? (
        <div>
          <h4>Fetched User Data:</h4>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading additional user data...</div>
      )}
      <TemplateCreate/>

    </div>
  );
};

export default Profile;
