(function () {
  "use strict";

  function createLabel(id, text) {
    var label = document.createElement("div");
    label.id = id;
    label.className = "org-workforce-label";
    label.textContent = text + "：";
    return label;
  }

  function createInput(id, labelId) {
    var input = document.createElement("input");
    input.id = id;
    input.className = "org-workforce-input";
    input.type = "text";
    input.value = "0";
    input.disabled = true;
    input.setAttribute("aria-disabled", "true");
    input.setAttribute("aria-labelledby", labelId);
    return input;
  }

  function createHelp(id, tipId, text) {
    var help = document.createElement("button");
    var tip = document.createElement("div");
    help.id = id;
    help.className = "org-workforce-help";
    help.type = "button";
    help.textContent = "?";
    help.title = text;
    help.setAttribute("aria-label", text);
    help.setAttribute("aria-describedby", tipId);
    tip.id = tipId;
    tip.className = "org-workforce-tip";
    tip.textContent = "功能说明：" + text;
    return { help: help, tip: tip };
  }

  function numericValue(element) {
    var matched = element ? String(element.value).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/) : null;
    var value = matched ? Number(matched[0]) : 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function init() {
    var content = document.getElementById("u34267_state0_content");
    if (!content || document.getElementById("orgWorkforceLongTermInput")) return;

    Array.prototype.forEach.call(content.children, function (element) {
      var style = window.getComputedStyle(element);
      var top = Number(style.top.replace("px", ""));
      if (style.position === "absolute" && Number.isFinite(top) && top >= 224) {
        element.style.top = (top + 43) + "px";
      }
    });

    var longTermLabel = createLabel("orgWorkforceLongTermLabel", "长期在发包单位工作的人数（人）");
    var temporaryLabel = createLabel("orgWorkforceTemporaryLabel", "临时到发包单位工作的人数（人）");
    var longTermHelp = createHelp("orgWorkforceLongTermHelp", "orgWorkforceLongTermTip", "相关方管理中长期在发包单位工作的人数（人）之和");
    var temporaryHelp = createHelp("orgWorkforceTemporaryHelp", "orgWorkforceTemporaryTip", "相关方管理中临时到发包单位工作的人数（人）之和");

    content.appendChild(longTermLabel);
    content.appendChild(createInput("orgWorkforceLongTermInput", longTermLabel.id));
    content.appendChild(longTermHelp.help);
    content.appendChild(longTermHelp.tip);
    content.appendChild(temporaryLabel);
    content.appendChild(createInput("orgWorkforceTemporaryInput", temporaryLabel.id));
    content.appendChild(temporaryHelp.help);
    content.appendChild(temporaryHelp.tip);

    function updateSummary() {
      var longTermInput = document.getElementById("orgWorkforceLongTermInput");
      var temporaryInput = document.getElementById("orgWorkforceTemporaryInput");
      if (longTermInput) longTermInput.value = numericValue(document.getElementById("u34949_input"));
      if (temporaryInput) temporaryInput.value = numericValue(document.getElementById("u34951_input"));
    }

    document.addEventListener("input", function (event) {
      if (["u34949_input", "u34951_input"].indexOf(event.target.id) !== -1) updateSummary();
    });
    updateSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
