import Form from "../../model/Form.js";

$(function () {
  const forms = [
    new Form(1, "VGhpcyBpcyBhIHRlc3QgY29udGVudA==", "Strength"),
    new Form(2, "QW5vdGhlciB0ZXN0IGNvbnRlbnQ=", "Cardio"),
    new Form(3, "U29tZSBtb3JlIHRlc3QgZGF0YQ==", "Isometric"),
  ];

  $("#form-title").autocomplete({
    minLength: 0,
    source: function (request, response) {
      const term = request.term.toLowerCase();
      const matches = term
        ? forms.filter((form) => form.title.toLowerCase().startsWith(term))
        : forms;

      response(
        matches.map((form) => ({
          label: form.title,
          value: form.title,
          id: form.id,
        }))
      );
    },
    focus: function (event, ui) {
      $("#form-title").val(ui.item.label);
      return false;
    },
    select: function (event, ui) {
      $("#form-title").val(ui.item.label);
      $("#form-id").val(ui.item.id);
      $("#display-form-id").text(ui.item.id);
      console.log("Selected Form:", ui.item);

      $("#form-title").val("");
      return false;
    },
  })
  .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<div>" + item.label + " (ID: " + item.id + ")</div>")
      .appendTo(ul);
  };

  // Show all options when the input gains focus
  $("#form-title").on("focus", function () {
    $(this).autocomplete("search", "");
  });
});
