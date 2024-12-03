import React, { useEffect, useState } from "react";
import Form from "../model/Form.js";

const FormSearch = ({ onFormSelect, searchTerm, setSearchTerm }) => {
  const [matchingForms, setMatchingForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);  // State to track the selected form

  const forms = [
    new Form(1, "VGhpcyBpcyBhIHRlc3QgY29udGVudA==", "Strength"),
    new Form(2, "QW5vdGhlciB0ZXN0IGNvbnRlbnQ=", "Cardio"),
    new Form(3, "U29tZSBtb3JlIHRlc3QgZGF0YQ==", "Isometric"),
    new Form(4, "U29tZSBtb3JlIHRlc3QgZGF0YQ==", "Meal"),
  ];

  useEffect(() => {
    const matches = forms.filter((form) => form.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setMatchingForms(matches);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSelect = (form) => {
    setSelectedForm(form); // Set the selected form
    onFormSelect(form.id); // Call the parent callback
  };

  useEffect(() => {
    // Reorder the forms so the selected form moves to the top
    if (selectedForm) {
      const reorderedForms = [selectedForm, ...matchingForms.filter((form) => form.id !== selectedForm.id)];
      setMatchingForms(reorderedForms);
    }
  }, [selectedForm, matchingForms]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Type to search..."
        style={{ width: "100%" }}
      />
      {matchingForms.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {matchingForms.map((form) => (
            <li
              key={form.id}
              onClick={() => handleFormSelect(form)} // Handle form selection
              style={{
                cursor: "pointer",
                padding: "5px",
                borderBottom: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                border: selectedForm?.id === form.id ? "2px solid green" : "none", // Apply green border to selected form
                fontWeight: selectedForm?.id === form.id ? "bold" : "normal", // Optional: Make selected form bold
              }}
            >
              {form.title} (ID: {form.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormSearch;
