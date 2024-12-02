import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import "jquery-ui/themes/base/all.css";

// A utility function for case-insensitive matching
const matchString = (str, query) => {
  const regex = new RegExp(query, "i"); // case-insensitive match
  return regex.test(str);
};

const TemplateSearch = ({ templates, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    $(inputRef.current).autocomplete({
      minLength: 1,
      source: function (request, response) {
        const matches = templates
          .filter((template) =>
            matchString(template.title, request.term)
          )
          .map((template) => ({
            label: template.title,
            value: template.title,
            id: template.id,
            summary: template.summary,
          }));
        response(matches);
      },
      focus: function (event, ui) {
        setInputValue(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        setInputValue("");
        setSelectedTemplate(ui.item);
        if (onSelect) onSelect(ui.item);
        return false;
      },
    });

    $(inputRef.current).on("focus", function () {
      $(this).autocomplete("search", "");
    });

    return () => {
      $(inputRef.current).autocomplete("destroy");
    };
  }, [templates, onSelect]);

  return (
    <div>
      <label htmlFor="template" style={{ fontWeight: "bold", marginBottom: "1em" }}>
        Search templates:
      </label>
      <input
        id="template"
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type to search..."
        style={{ display: "block", width: "100%", marginBottom: "1em" }}
      />
      {selectedTemplate && (
        <p id="template-description">
          <strong>Description:</strong> {selectedTemplate.summary}
        </p>
      )}
    </div>
  );
};

export default TemplateSearch;
