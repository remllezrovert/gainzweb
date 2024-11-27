import Template from '../../model/Template.js';

$(function() {
  const ABCD = new Template(1);
  ABCD.title = "ABCD";
  ABCD.summary = "Summary for ABCD";

  const ABDE = new Template(2);
  ABDE.title = "ABDE";
  ABDE.summary = "Summary for ABDE";

  const ACDE = new Template(3);
  ACDE.title = "ACDE";
  ACDE.summary = "Summary for ACDE";

  const templates = [ABCD, ABDE, ACDE];

  $("#template").autocomplete({
    minLength: 0,
    source: function(request, response) {
      const matches = templates.filter(template =>
        template.title.toLowerCase().includes(request.term.toLowerCase())
      ).map(template => ({
        label: template.title, 
        value: template.title,
        id: template.id, 
        summary: template.summary
      }));
      response(matches);
    },
    focus: function(event, ui) {
      $("#template").val(ui.item.label);
      return false;
    },
    select: function(event, ui) {
      $("#template").val(ui.item.label);
      $("#template-id").val(ui.item.id);
      $("#template-description").html(ui.item.summary);
      console.log("Selected Template:", ui.item);
      $("#template").val("");
      return false;
    }
  })
  .autocomplete("instance")._renderItem = function(ul, item) {
    return $("<li>")
      .append("<div>" + item.label + "<br>" + item.summary + "</div>")
      .appendTo(ul);
  };
});
