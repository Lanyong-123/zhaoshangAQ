(function () {
  "use strict";

  var fields = [
    { id: "outsourcing", label: "外包人员数量（人）" },
    { id: "long-term", label: "长期在发包单位工作的人数（人）" },
    { id: "temporary", label: "临时到发包单位工作的人数（人）" }
  ];

  function fieldHtml(field) {
    return '<div class="ai-workforce-search-field">' +
      '<label class="ai-workforce-search-label" for="ai-' + field.id + '-min">' + field.label + '：</label>' +
      '<input id="ai-' + field.id + '-min" class="ai-workforce-search-input" type="number" min="0" step="1" placeholder="最小值" aria-label="' + field.label + '最小值">' +
      '<span class="ai-workforce-search-separator">—</span>' +
      '<input id="ai-' + field.id + '-max" class="ai-workforce-search-input" type="number" min="0" step="1" placeholder="最大值" aria-label="' + field.label + '最大值">' +
      '</div>';
  }

  function init() {
    var content = document.getElementById("u2993_state0_content");
    if (!content || document.getElementById("ai-workforce-search")) return;

    var section = document.createElement("section");
    section.id = "ai-workforce-search";
    section.setAttribute("aria-label", "人员数量查询");
    section.innerHTML = '<div class="ai-workforce-search-title">人员数量查询</div>' +
      '<div class="ai-workforce-search-grid">' + fields.map(fieldHtml).join("") + '</div>';
    content.appendChild(section);

    var reset = document.getElementById("u2996");
    if (reset) {
      reset.addEventListener("click", function () {
        Array.prototype.forEach.call(section.querySelectorAll("input"), function (input) {
          input.value = "";
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
