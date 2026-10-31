(function () {
  "use strict";

  var ROW_TOP = 606;
  var ROW_GAP = 43;

  function createLabel(id, text) {
    var label = document.createElement("div");
    label.id = id;
    label.className = "project-workforce-label";
    label.textContent = text + "：";
    return label;
  }

  function createInput(id, labelId) {
    var input = document.createElement("input");
    input.id = id;
    input.className = "project-workforce-input";
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
    help.className = "project-workforce-help";
    help.type = "button";
    help.textContent = "?";
    help.title = text;
    help.setAttribute("aria-label", text);
    help.setAttribute("aria-describedby", tipId);
    tip.id = tipId;
    tip.className = "project-workforce-tip";
    tip.textContent = "功能说明：" + text;
    return { help: help, tip: tip };
  }

  function numericValue(element) {
    var matched = element ? String(element.value).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/) : null;
    var value = matched ? Number(matched[0]) : 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function firstPositive(ids) {
    var value = 0;
    ids.some(function (id) {
      value = numericValue(document.getElementById(id));
      return value > 0;
    });
    return value;
  }

  function init() {
    var content = document.getElementById("u17534_state0_content");
    if (!content || document.getElementById("projectWorkforceLongTermInput")) return;

    Array.prototype.forEach.call(content.children, function (element) {
      var style = window.getComputedStyle(element);
      var top = Number(String(style.top).replace("px", ""));
      if (style.position === "absolute" && Number.isFinite(top) && top >= ROW_TOP) {
        element.style.top = (top + ROW_GAP) + "px";
      }
    });

    // Axure 的分组容器本身没有尺寸和 top，外框图片定位在分组内部，
    // 因此不会被上面的直接子元素移动逻辑覆盖，需要单独同步下移。
    ["u17764", "u17767"].forEach(function (id) {
      var frame = document.getElementById(id);
      if (!frame) return;
      var top = Number(String(window.getComputedStyle(frame).top).replace("px", ""));
      if (Number.isFinite(top)) frame.style.top = (top + ROW_GAP) + "px";
    });

    var longTermLabel = createLabel("projectWorkforceLongTermLabel", "长期在发包单位工作的人数（人）");
    var temporaryLabel = createLabel("projectWorkforceTemporaryLabel", "临时到发包单位工作的人数（人）");
    var longTermHelp = createHelp("projectWorkforceLongTermHelp", "projectWorkforceLongTermTip", "相关方管理中长期在发包单位工作的人数（人）之和");
    var temporaryHelp = createHelp("projectWorkforceTemporaryHelp", "projectWorkforceTemporaryTip", "相关方管理中临时到发包单位工作的人数（人）之和");

    content.appendChild(longTermLabel);
    content.appendChild(createInput("projectWorkforceLongTermInput", longTermLabel.id));
    content.appendChild(longTermHelp.help);
    content.appendChild(longTermHelp.tip);
    content.appendChild(temporaryLabel);
    content.appendChild(createInput("projectWorkforceTemporaryInput", temporaryLabel.id));
    content.appendChild(temporaryHelp.help);
    content.appendChild(temporaryHelp.tip);

    var relatedPersonnelInput = document.getElementById("u17655_input");
    if (relatedPersonnelInput) {
      relatedPersonnelInput.disabled = true;
      relatedPersonnelInput.setAttribute("aria-disabled", "true");
    }

    function updateSummary() {
      var longTermInput = document.getElementById("projectWorkforceLongTermInput");
      var temporaryInput = document.getElementById("projectWorkforceTemporaryInput");
      var longTermValue = firstPositive(["u17684_input", "u18606_input"]);
      var temporaryValue = firstPositive(["u17686_input", "u18608_input"]);
      if (longTermInput) longTermInput.value = longTermValue;
      if (temporaryInput) temporaryInput.value = temporaryValue;
    }

    document.addEventListener("input", function (event) {
      if (["u17684_input", "u17686_input", "u18606_input", "u18608_input"].indexOf(event.target.id) !== -1) {
        updateSummary();
      }
    });
    updateSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
