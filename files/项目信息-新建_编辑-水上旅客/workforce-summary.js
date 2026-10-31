(function () {
  "use strict";

  var SHIFT_FROM_TOP = 493;
  var ROW_GAP = 43;

  function createLabel(id, text) {
    var label = document.createElement("div");
    label.id = id;
    label.className = "water-workforce-label";
    label.textContent = text + "：";
    return label;
  }

  function createInput(id, labelId) {
    var input = document.createElement("input");
    input.id = id;
    input.className = "water-workforce-input";
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
    help.className = "water-workforce-help";
    help.type = "button";
    help.textContent = "?";
    help.title = text;
    help.setAttribute("aria-label", text);
    help.setAttribute("aria-describedby", tipId);
    tip.id = tipId;
    tip.className = "water-workforce-tip";
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

  function moveByGap(element) {
    var style = window.getComputedStyle(element);
    var top = Number(String(style.top).replace("px", ""));
    if (style.position === "absolute" && Number.isFinite(top) && top >= SHIFT_FROM_TOP) {
      element.style.top = (top + ROW_GAP) + "px";
    }
  }

  function moveZeroSizeGroupChildren(group) {
    Array.prototype.forEach.call(group.children, function (child) {
      moveByGap(child);
      var rect = child.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) moveZeroSizeGroupChildren(child);
    });
  }

  function init() {
    var content = document.getElementById("u22289_state0_content");
    if (!content || document.getElementById("waterWorkforceLongTermInput")) return;

    Array.prototype.forEach.call(content.children, function (element) {
      moveByGap(element);
      var rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) moveZeroSizeGroupChildren(element);
    });

    var ownPersonnelLabel = document.getElementById("u22436");
    var ownPersonnelInput = document.getElementById("u22437");
    var relatedLabel = document.getElementById("u22438");
    var relatedInput = document.getElementById("u22439_input");
    var totalLabel = document.getElementById("u22444");
    var totalInput = document.getElementById("u22445");
    var duplicateTotalLabel = document.getElementById("u22451");
    var duplicateTotalInput = document.getElementById("u22452");

    if (relatedLabel) {
      relatedLabel.style.left = "19px";
      relatedLabel.style.top = "430px";
    }
    if (document.getElementById("u22439")) {
      document.getElementById("u22439").style.left = "232px";
      document.getElementById("u22439").style.top = "430px";
    }
    if (ownPersonnelLabel) {
      ownPersonnelLabel.style.left = "752px";
      ownPersonnelLabel.style.top = "430px";
    }
    if (ownPersonnelInput) {
      ownPersonnelInput.style.left = "965px";
      ownPersonnelInput.style.top = "430px";
    }
    if (totalLabel) totalLabel.style.top = "474px";
    if (totalInput) totalInput.style.top = "474px";
    if (duplicateTotalLabel) duplicateTotalLabel.style.display = "none";
    if (duplicateTotalInput) duplicateTotalInput.style.display = "none";

    var longTermLabel = createLabel("waterWorkforceLongTermLabel", "长期在发包单位工作的人数（人）");
    var temporaryLabel = createLabel("waterWorkforceTemporaryLabel", "临时到发包单位工作的人数（人）");
    var longTermHelp = createHelp("waterWorkforceLongTermHelp", "waterWorkforceLongTermTip", "相关方管理中长期在发包单位工作的人数（人）之和");
    var temporaryHelp = createHelp("waterWorkforceTemporaryHelp", "waterWorkforceTemporaryTip", "相关方管理中临时到发包单位工作的人数（人）之和");

    content.appendChild(longTermLabel);
    content.appendChild(createInput("waterWorkforceLongTermInput", longTermLabel.id));
    content.appendChild(longTermHelp.help);
    content.appendChild(longTermHelp.tip);
    content.appendChild(temporaryLabel);
    content.appendChild(createInput("waterWorkforceTemporaryInput", temporaryLabel.id));
    content.appendChild(temporaryHelp.help);
    content.appendChild(temporaryHelp.tip);

    function updateSummary() {
      var longTermValue = firstPositive(["u22409_input", "u23291_input"]);
      var temporaryValue = firstPositive(["u22411_input", "u23293_input"]);
      document.getElementById("waterWorkforceLongTermInput").value = longTermValue;
      document.getElementById("waterWorkforceTemporaryInput").value = temporaryValue;
      if (relatedInput) relatedInput.value = longTermValue + temporaryValue;
    }

    document.addEventListener("input", function (event) {
      if (["u22409_input", "u22411_input", "u23291_input", "u23293_input"].indexOf(event.target.id) !== -1) {
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
