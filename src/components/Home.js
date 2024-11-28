import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import ExerciseRead from "./ExerciseRead.js";

const Home = () => {
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );

    const loadHtml = async () => {
      try {
        const formId = "3"; // Replace this with the desired form ID or make it dynamic
        const htmlModule = await import(`../Forms/${formId}/create.html`);
        setHtmlContent(htmlModule.default);

        // Dynamically create and load the script element for the JavaScript module
        const script = document.createElement("script");
        const jsModule = await import(`../Forms/${formId}/create.js`);
        script.textContent = jsModule.default; // Use the default export of the module

        document.body.appendChild(script);

        // Cleanup function to remove the script after the component is unmounted
        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error("Error loading HTML or script:", error);
      }
    };

    loadHtml();
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <ExerciseRead />
        <h3>{content}</h3>
      </header>
      {/* Render the dynamically imported HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Home;
