(function () {
  "use strict";

  var SHIFT_FROM_TOP = 777;
  var ROW_GAP = 86;

  function createLabel(id, text) {
    var label = document.createElement("div");
    label.id = id;
    label.className = "property-workforce-label";
    label.textContent = text + "：";
    return label;
  }

  function createInput(id, labelId) {
    var input = document.createElement("input");
    input.id = id;
    input.className = "property-workforce-input";
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
    help.className = "property-workforce-help";
    help.type = "button";
    help.textContent = "?";
    help.title = text;
    help.setAttribute("aria-label", text);
    help.setAttribute("aria-describedby", tipId);
    tip.id = tipId;
    tip.className = "property-workforce-tip";
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
    var content = document.getElementById("u12974_state0_content");
    if (!content || document.getElementById("propertyWorkforceLongTermInput")) return;

    Array.prototype.forEach.call(content.children, function (element) {
      moveByGap(element);
      var rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) moveZeroSizeGroupChildren(element);
    });

    var externalLabel = document.getElementById("u13087");
    var externalInput = document.getElementById("u13088");
    var ownPersonnelLabel = document.getElementById("u12989");
    var ownPersonnelInput = document.getElementById("u12990");
    var duplicateTotalLabel = document.getElementById("u13089");
    var duplicateTotalInput = document.getElementById("u13090");
    var totalLabel = document.getElementById("u13289");
    var totalInput = document.getElementById("u13290");
    if (externalLabel) externalLabel.style.display = "none";
    if (externalInput) externalInput.style.display = "none";
    if (duplicateTotalLabel) duplicateTotalLabel.style.display = "none";
    if (duplicateTotalInput) duplicateTotalInput.style.display = "none";
    if (ownPersonnelLabel) {
      ownPersonnelLabel.style.left = "752px";
      ownPersonnelLabel.style.top = "776px";
    }
    if (ownPersonnelInput) {
      ownPersonnelInput.style.left = "965px";
      ownPersonnelInput.style.top = "776px";
    }
    if (totalLabel) {
      totalLabel.style.left = "19px";
      totalLabel.style.top = "820px";
    }
    if (totalInput) {
      totalInput.style.left = "232px";
      totalInput.style.top = "820px";
    }

    var longTermLabel = createLabel("propertyWorkforceLongTermLabel", "长期在发包单位工作的人数（人）");
    var temporaryLabel = createLabel("propertyWorkforceTemporaryLabel", "临时到发包单位工作的人数（人）");
    var relatedLabel = createLabel("propertyWorkforceRelatedLabel", "相关人员数量（人）");
    var longTermHelp = createHelp("propertyWorkforceLongTermHelp", "propertyWorkforceLongTermTip", "相关方管理中长期在发包单位工作的人数（人）之和");
    var temporaryHelp = createHelp("propertyWorkforceTemporaryHelp", "propertyWorkforceTemporaryTip", "相关方管理中临时到发包单位工作的人数（人）之和");

    content.appendChild(longTermLabel);
    content.appendChild(createInput("propertyWorkforceLongTermInput", longTermLabel.id));
    content.appendChild(longTermHelp.help);
    content.appendChild(longTermHelp.tip);
    content.appendChild(temporaryLabel);
    content.appendChild(createInput("propertyWorkforceTemporaryInput", temporaryLabel.id));
    content.appendChild(temporaryHelp.help);
    content.appendChild(temporaryHelp.tip);
    content.appendChild(relatedLabel);
    content.appendChild(createInput("propertyWorkforceRelatedInput", relatedLabel.id));

    function updateSummary() {
      var longTermValue = firstPositive(["u13172_input", "u14062_input"]);
      var temporaryValue = firstPositive(["u13174_input", "u14064_input"]);
      document.getElementById("propertyWorkforceLongTermInput").value = longTermValue;
      document.getElementById("propertyWorkforceTemporaryInput").value = temporaryValue;
      document.getElementById("propertyWorkforceRelatedInput").value = longTermValue + temporaryValue;
    }

    document.addEventListener("input", function (event) {
      if (["u13172_input", "u13174_input", "u14062_input", "u14064_input"].indexOf(event.target.id) !== -1) {
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
