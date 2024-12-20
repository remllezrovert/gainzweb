import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import ClientRepo from "../repo/ClientRepo";

import TemplateCreate from "./TemplateCreate"; // Import the TemplateSearch component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const currentUser = AuthService.getCurrentUser();


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

    </div>
  );
};

export default Profile;
