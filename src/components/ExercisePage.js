import React, { useEffect, useState, useRef } from "react";
import UserService from "../services/user.service";
import TemplateSearch from "./TemplateSearch";
import ExerciseRead from './ExerciseRead';

const ExercisePage = () => {
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [formId, setFormId] = useState(null); // State to store the selected form ID

  const exerciseReadRef = useRef(null); // Ref to ExerciseRead component

  const getTemplatesFromLocalStorage = () => {
    let templates = [];
    // Iterate through each key in localStorage
    for (let key in localStorage) {
      if (key.startsWith('template_')) {
        try {
          // Parse the JSON string stored in localStorage
          let template = JSON.parse(localStorage.getItem(key));
          if (template && typeof template === 'object') {
            templates.push(template);
          }
        } catch (error) {
          console.error(`Error parsing template data for key ${key}:`, error);
        }
      }
    }
    return templates;
  };

  const demoTemplates = getTemplatesFromLocalStorage();

  useEffect(() => {
    // Save demoTemplates in localStorage
    demoTemplates.forEach(template => {
      localStorage.setItem(`template_${template.id}`, JSON.stringify(template));
    });

    // Fetch public content
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

    if (formId) {
      const loadHtml = async () => {
        try {
          // Dynamically load the HTML file based on formId
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
    }
  }, [formId]); // Dependency array includes formId

  // Handler function for when a template is selected
  const handleTemplateSelect = (template) => {
    // Retrieve the template object from localStorage using its id
    const storedTemplate = JSON.parse(localStorage.getItem(`template_${template.id}`));

    if (storedTemplate) {
      console.log("Selected Template from localStorage:", storedTemplate);
      localStorage.setItem("selectedTemplateId", storedTemplate.id);
      setFormId(storedTemplate.formId);
    } else {
      console.error("Template not found in localStorage for templateId:", template.id); // Debugging log
    }
  };

  // Function to refresh the exercises in ExerciseRead
  const handleRefreshExercises = () => {
    if (exerciseReadRef.current) {
      exerciseReadRef.current.handleFetchExercises(); // Call the method to refresh the data
    }
  };

  return (
    <div className="container">
      {/* Align TemplateSearch and the refresh button side by side */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        {/* TemplateSearch component */}
        <TemplateSearch templates={demoTemplates} onSelect={handleTemplateSelect} style={{ flex: 1 }} />

        {/* Refresh Button */}
        <button
          onClick={handleRefreshExercises}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px", // space between search bar and button
            cursor: "pointer"
          }}
        >
          ⟳
        </button>
      </div>

      {/* Render the dynamically imported HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Pass the necessary prop for ExerciseRead */}
      <div>
        <ExerciseRead ref={exerciseReadRef} storedExArray="storedExercises" />
      </div>
    </div>
  );
};

export default ExercisePage;
