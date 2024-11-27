document.getElementById("templateForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const dataType = document.getElementById("dataType").value;
    const summary = document.getElementById("summary").value;

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
        formId: formId
    };

    const key = `e${templateId}`; 

    localStorage.setItem(key, JSON.stringify(myTemplate));

    console.log("Template saved:", myTemplate);

    event.target.reset();
});