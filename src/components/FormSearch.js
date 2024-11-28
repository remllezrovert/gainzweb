import React, { useEffect, useState } from "react";
import Form from "../model/Form.js";

const FormSearch = ({ onFormSelect, searchTerm, setSearchTerm }) => {
  const [matchingForms, setMatchingForms] = useState([]);

  const forms = [
    new Form(1, "VGhpcyBpcyBhIHRlc3QgY29udGVudA==", "Strength"),
    new Form(2, "QW5vdGhlciB0ZXN0IGNvbnRlbnQ=", "Cardio"),
    new Form(3, "U29tZSBtb3JlIHRlc3QgZGF0YQ==", "Isometric"),
  ];

  useEffect(() => {
    const matches = forms.filter((form) => form.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setMatchingForms(matches);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSelect = (form) => {
    onFormSelect(form.id);
  };

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
              onClick={() => handleFormSelect(form)}
              style={{
                cursor: "pointer",
                padding: "5px",
                borderBottom: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
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
