(function () {
  "use strict";

  var OPTIONS = [
    "钢筋混凝土结构",
    "钢结构",
    "砖混结构",
    "框架结构",
    "剪力墙结构",
    "砌体结构",
    "底部框架-抗震墙结构",
    "内框架结构",
    "砖木结构",
    "空旷砖房",
    "其它结构"
  ];

  var ROW_GAP = 43;

  function pixelValue(value) {
    var number = Number(String(value || "").replace("px", ""));
    return Number.isFinite(number) ? number : 0;
  }

  function shiftChildren(container, threshold, excludedElement) {
    Array.prototype.forEach.call(container.children, function (element) {
      if (element === excludedElement) return;
      var style = window.getComputedStyle(element);
      var top = pixelValue(style.top);
      if (style.position === "absolute" && top >= threshold) {
        element.style.top = (top + ROW_GAP) + "px";
      }
    });
  }

  function createMultiselect(left, top) {
    var wrapper = document.createElement("div");
    var trigger = document.createElement("div");
    var options = document.createElement("div");
    var hidden = document.createElement("input");

    wrapper.id = "buildingStructureTypeControl";
    wrapper.className = "bs-structure-multiselect";
    wrapper.style.left = left + "px";
    wrapper.style.top = top + "px";

    trigger.id = "buildingStructureTypeTrigger";
    trigger.className = "bs-structure-trigger is-placeholder";
    trigger.setAttribute("role", "combobox");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-controls", "buildingStructureTypeOptions");
    trigger.setAttribute("aria-required", "true");
    trigger.textContent = "请选择";

    options.id = "buildingStructureTypeOptions";
    options.className = "bs-structure-options";
    options.setAttribute("role", "listbox");
    options.setAttribute("aria-multiselectable", "true");

    hidden.id = "buildingStructureTypeValue";
    hidden.type = "hidden";
    hidden.name = "buildingStructureType";

    OPTIONS.forEach(function (text, index) {
      var option = document.createElement("label");
      var checkbox = document.createElement("input");
      var caption = document.createElement("span");

      option.className = "bs-structure-option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      checkbox.type = "checkbox";
      checkbox.value = text;
      checkbox.id = "buildingStructureTypeOption" + index;
      caption.textContent = text;

      checkbox.addEventListener("change", function () {
        var selected = Array.prototype.filter.call(
          options.querySelectorAll('input[type="checkbox"]'),
          function (item) { return item.checked; }
        ).map(function (item) { return item.value; });

        option.setAttribute("aria-selected", checkbox.checked ? "true" : "false");
        hidden.value = selected.join(",");
        trigger.textContent = selected.length ? selected.join("、") : "请选择";
        trigger.classList.toggle("is-placeholder", selected.length === 0);
        trigger.title = selected.join("、");
      });

      option.appendChild(checkbox);
      option.appendChild(caption);
      options.appendChild(option);
    });

    function setOpen(open) {
      wrapper.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    trigger.addEventListener("click", function () {
      setOpen(!wrapper.classList.contains("is-open"));
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(!wrapper.classList.contains("is-open"));
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) setOpen(false);
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(options);
    wrapper.appendChild(hidden);
    return wrapper;
  }

  function createLabel(left, top) {
    var label = document.createElement("div");
    label.id = "buildingStructureTypeLabel";
    label.className = "bs-structure-label";
    label.style.left = left + "px";
    label.style.top = top + "px";
    label.innerHTML = '<span class="bs-structure-label-required">*</span><span>建筑结构类型：</span>';
    return label;
  }

  function growPanel(panel, state) {
    if (!panel || !state) return;
    var height = pixelValue(window.getComputedStyle(state).height) + ROW_GAP;
    panel.style.height = height + "px";
    state.style.height = height + "px";
  }

  function initAddPage() {
    var container = document.getElementById("base");
    var anchorLabel = document.getElementById("u10907");
    var anchorInput = document.getElementById("u10908");
    if (!container || !anchorLabel || !anchorInput) return false;

    var labelStyle = window.getComputedStyle(anchorLabel);
    var inputStyle = window.getComputedStyle(anchorInput);
    var labelLeft = pixelValue(labelStyle.left);
    var labelTop = pixelValue(labelStyle.top);
    var inputLeft = pixelValue(inputStyle.left);
    var inputTop = pixelValue(inputStyle.top);

    shiftChildren(container, labelTop, null);
    container.appendChild(createLabel(labelLeft, labelTop));
    container.appendChild(createMultiselect(inputLeft, inputTop));
    return true;
  }

  function initEditPage() {
    var container = document.getElementById("u11099_state0_content");
    var panel = document.getElementById("u11099");
    var state = document.getElementById("u11099_state0");
    var anchorLabel = document.getElementById("u11112");
    var anchorInput = document.getElementById("u11113");
    var base = document.getElementById("base");
    if (!container || !anchorLabel || !anchorInput || !base) return false;

    var labelStyle = window.getComputedStyle(anchorLabel);
    var inputStyle = window.getComputedStyle(anchorInput);
    var labelLeft = pixelValue(labelStyle.left);
    var labelTop = pixelValue(labelStyle.top);
    var inputLeft = pixelValue(inputStyle.left);
    var inputTop = pixelValue(inputStyle.top);

    shiftChildren(container, labelTop, null);
    growPanel(panel, state);
    Array.prototype.forEach.call(base.children, function (element) {
      if (element === panel) return;
      var style = window.getComputedStyle(element);
      var top = pixelValue(style.top);
      if (style.position === "absolute" && top >= 454) {
        element.style.top = (top + ROW_GAP) + "px";
      }
    });

    container.appendChild(createLabel(labelLeft, labelTop));
    container.appendChild(createMultiselect(inputLeft, inputTop));
    return true;
  }

  function init() {
    if (document.getElementById("buildingStructureTypeControl")) return;
    initAddPage() || initEditPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
