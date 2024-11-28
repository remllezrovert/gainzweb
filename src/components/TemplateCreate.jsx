import React, { useState } from "react";
import FormSearch from "./FormSearch";

const TemplateCreate = () => {
  const [title, setTitle] = useState("");
  const [dataType, setDataType] = useState("JSON");
  const [summary, setSummary] = useState("");
  const [formSearchTerm, setFormSearchTerm] = useState("");

  // Handle form selection change from FormSearch
  const handleFormSelect = (formId) => {
    switch (formId) {
      case 1:
        setDataType("STRENGTH");
        break;
      case 2:
        setDataType("CARDIO");
        break;
      case 3:
        setDataType("ISOMETRIC");
        break;
      default:
        setDataType("JSON");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateId = Math.floor(Math.random() * 1000);

    let formId;
    switch (dataType) {
      case "STRENGTH":
        formId = 1;
        break;
      case "CARDIO":
        formId = 2;
        break;
      case "ISOMETRIC":
        formId = 3;
        break;
      default:
        formId = 0;
    }

    const myTemplate = {
      title: title,
      dataType: dataType,
      summary: summary,
      id: templateId,
      formId: formId,
    };

    const key = `e${templateId}`;
    localStorage.setItem(key, JSON.stringify(myTemplate));

    console.log("Template saved:", myTemplate);

    setTitle("");
    setDataType("JSON");
    setSummary("");
    setFormSearchTerm("");
  };

  return (
    <div>
      <h1>Create a New Template</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <br />

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 2 }}>
            <label htmlFor="summary">Summary:</label>
            <textarea
              id="summary"
              name="summary"
              rows="4"
              cols="50"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: "100%" }}
            ></textarea>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Search Forms</h4>
            <FormSearch onFormSelect={handleFormSelect} searchTerm={formSearchTerm} setSearchTerm={setFormSearchTerm} />
          </div>
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TemplateCreate;
