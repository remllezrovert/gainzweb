document.getElementById("templateForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const title = document.getElementById("title").value;
    const dataType = document.getElementById("dataType").value;
    const summary = document.getElementById("summary").value;

    // Generate random templateId
    const templateId = Math.floor(Math.random() * 1000);

    // Determines formId based on dataType
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
            formId = 0; // Default value for unsupported dataTypes
    }

    // Create the template object
    const myTemplate = {
        title: title,
        dataType: dataType,
        summary: summary,
        id: templateId,
        formId: formId
    };

    // Generate a unique key for localStorage
    const key = `e${templateId}`; 

    // Save the template to localStorage
    localStorage.setItem(key, JSON.stringify(myTemplate));

    console.log("Template saved:", myTemplate);

    // Reset the form
    event.target.reset();
});
