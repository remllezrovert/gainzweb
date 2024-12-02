import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import ClientRepo from "../repo/ClientRepo";

import TemplateCreate from "./TemplateCreate"; // Import the TemplateSearch component

const TemplatePage = () => {
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



      <TemplateCreate/>

    </div>
  );
};

export default TemplatePage;
