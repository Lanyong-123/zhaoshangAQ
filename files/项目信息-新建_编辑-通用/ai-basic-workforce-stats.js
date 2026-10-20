(function () {
  "use strict";

  function createLabel(id, text) {
    var label = document.createElement("div");
    label.id = id;
    label.className = "ai-basic-stat-label";
    label.textContent = text + "：";
    return label;
  }

  function createInput(id, labelId) {
    var input = document.createElement("input");
    input.id = id;
    input.className = "ai-basic-stat-input";
    input.type = "text";
    input.value = "";
    input.disabled = true;
    input.setAttribute("aria-labelledby", labelId);
    input.setAttribute("aria-label", document.getElementById(labelId) ? document.getElementById(labelId).textContent : "统计人数");
    return input;
  }

  function createHelp(id, tipId, text) {
    var help = document.createElement("button");
    var tip = document.createElement("div");
    help.id = id;
    help.className = "ai-basic-stat-help";
    help.type = "button";
    help.textContent = "?";
    help.title = text;
    help.setAttribute("aria-label", text);
    help.setAttribute("aria-describedby", tipId);
    tip.id = tipId;
    tip.className = "ai-basic-stat-tip";
    tip.textContent = "功能说明：" + text;
    return { help: help, tip: tip };
  }

  function numericValue(element) {
    var matched = element ? String(element.value).replace(/,/g, "").match(/-?\d+(?:\.\d+)?/) : null;
    var value = matched ? Number(matched[0]) : 0;
    return Number.isFinite(value) && value > 0 ? value : 0;
  }

  function init() {
    var content = document.getElementById("u4329_state0_content");
    if (!content || document.getElementById("aiBasicLongTermInput")) return;

    Array.prototype.forEach.call(content.querySelectorAll("*"), function (element) {
      var style = window.getComputedStyle(element);
      var top = Number(style.top.replace("px", ""));
      if (style.position !== "absolute" || !Number.isFinite(top) || top < 573) return;

      var ancestor = element.parentElement;
      while (ancestor && ancestor !== content) {
        var ancestorStyle = window.getComputedStyle(ancestor);
        var ancestorTop = Number(ancestorStyle.top.replace("px", ""));
        if (ancestorStyle.position === "absolute" && Number.isFinite(ancestorTop) && ancestorTop >= 573) {
          return;
        }
        ancestor = ancestor.parentElement;
      }

      element.style.top = (top + 43) + "px";
    });

    var longTermLabel = createLabel("aiBasicLongTermLabel", "长期在发包单位工作的人数（人）");
    var temporaryLabel = createLabel("aiBasicTemporaryLabel", "临时到发包单位工作的人数（人）");
    var longTermHelp = createHelp("aiBasicLongTermHelp", "aiBasicLongTermTip", "相关方管理中长期在发包单位工作的人数（人）之和");
    var temporaryHelp = createHelp("aiBasicTemporaryHelp", "aiBasicTemporaryTip", "相关方管理中临时到发包单位工作的人数（人）之和");
    content.appendChild(longTermLabel);
    content.appendChild(createInput("aiBasicLongTermInput", longTermLabel.id));
    content.appendChild(longTermHelp.help);
    content.appendChild(longTermHelp.tip);
    content.appendChild(temporaryLabel);
    content.appendChild(createInput("aiBasicTemporaryInput", temporaryLabel.id));
    content.appendChild(temporaryHelp.help);
    content.appendChild(temporaryHelp.tip);

    var outsourcingNote = document.querySelector("#u4685_text span");
    var outsourcingInput = document.getElementById("u4684_input");
    var formulaText = "自动计算：业务外包人员数量 + 劳务派遣人员数量 + 长期在发包单位工作的人数（人） + 临时到发包单位工作的人数（人），同时外层查询需支持";
    if (outsourcingNote) outsourcingNote.textContent = "功能说明：" + formulaText;
    if (outsourcingInput) outsourcingInput.title = formulaText;

    function updateWorkforceSummary() {
      var longTermTotal = numericValue(document.getElementById("rpnFieldV"));
      var temporaryTotal = numericValue(document.getElementById("rpnFieldW"));
      var longTermInput = document.getElementById("aiBasicLongTermInput");
      var temporaryInput = document.getElementById("aiBasicTemporaryInput");
      if (longTermInput) longTermInput.value = longTermTotal;
      if (temporaryInput) temporaryInput.value = temporaryTotal;
      if (outsourcingInput) {
        outsourcingInput.value = numericValue(document.getElementById("u4682_input")) +
          numericValue(document.getElementById("u4626_input")) + longTermTotal + temporaryTotal;
      }
    }

    document.addEventListener("input", function (event) {
      if (["rpnFieldV", "rpnFieldW", "u4682_input", "u4626_input"].indexOf(event.target.id) !== -1) {
        updateWorkforceSummary();
      }
    });
    document.addEventListener("change", function (event) {
      if (["rpnFieldV", "rpnFieldW"].indexOf(event.target.id) !== -1) updateWorkforceSummary();
    });
    updateWorkforceSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
