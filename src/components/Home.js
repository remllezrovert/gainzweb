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
        const htmlModule = await import("../Forms/Isometric/create.html");
        setHtmlContent(htmlModule.default);

        const script = document.createElement("script");
        script.textContent = `
          ${require("../Forms/Isometric/create.js").default}
        `;
        document.body.appendChild(script);

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

      <ExerciseRead/>
        <h3>{content}</h3>
      </header>
      {/* Render the dynamically imported HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>



  );
};

export default Home;
