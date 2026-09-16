(function () {
  "use strict";

  var fireSelectId = "u4770_input";
  var fireMaintainGroupId = "u4723";
  var noFireGroupId = "u4782";
  var containerId = "aiFireWarranty";
  var noFireEntrustId = "aiNoFireEntrust";

  function init() {
    var panel = document.getElementById("u4329_state1_content");
    var fireSelect = document.getElementById(fireSelectId);
    if (!panel || !fireSelect) return;

    createWarrantyArea(panel);
    createNoFireEntrustArea(panel);
    bind(fireSelect);
    sync();
    setTimeout(sync, 300);
  }

  function createWarrantyArea(panel) {
    if (document.getElementById(containerId)) return;

    var box = document.createElement("div");
    box.id = containerId;
    box.className = "ai-fire-warranty";
    box.innerHTML =
      '<div class="ai-fire-warranty__row">' +
      '<div class="ai-fire-warranty__field">' +
      '<span class="ai-fire-warranty__label"><span class="required">*</span>是否在质保期：</span>' +
      '<select id="aiFireWarrantyStatus">' +
      '<option value="请选择">请选择</option>' +
      '<option value="是">是</option>' +
      '<option value="否">否</option>' +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="ai-fire-warranty__detail">' +
      '<div class="ai-fire-warranty__row">' +
      '<div class="ai-fire-warranty__field">' +
      '<span class="ai-fire-warranty__label"><span class="required">*</span>质保期限：</span>' +
      '<input type="text" placeholder="请选择日期" />' +
      '<span class="ai-fire-warranty__date-sep">至</span>' +
      '<input type="text" placeholder="请选择日期" />' +
      "</div>" +
      '<div class="ai-fire-warranty__field">' +
      '<span class="ai-fire-warranty__label"><span class="required">*</span>质保单位：</span>' +
      '<input type="text" placeholder="100个字符以内" style="width:260px;" />' +
      "</div>" +
      "</div>" +
      '<div class="ai-fire-warranty__row">' +
      '<div class="ai-fire-warranty__field ai-fire-warranty__field--wide">' +
      '<span class="ai-fire-warranty__label"><span class="required">*</span>质保报告附件：</span>' +
      '<input type="file" />' +
      '<button type="button" class="ai-fire-warranty__button">上传</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    panel.appendChild(box);

    var warrantyStatus = document.getElementById("aiFireWarrantyStatus");
    if (warrantyStatus) {
      warrantyStatus.addEventListener("change", sync);
    }
  }

  function createNoFireEntrustArea(panel) {
    if (document.getElementById(noFireEntrustId)) return;

    var box = document.createElement("div");
    box.id = noFireEntrustId;
    box.className = "ai-no-fire-entrust";
    box.innerHTML =
      '<div class="ai-no-fire-entrust__row">' +
      '<span class="ai-no-fire-entrust__label"><span class="required">*</span>物业管理单位：</span>' +
      '<input type="text" placeholder="请输入物业管理单位名称" />' +
      "</div>" +
      '<div class="ai-no-fire-entrust__row">' +
      '<span class="ai-no-fire-entrust__label">说明：</span>' +
      '<input type="text" placeholder="100个字符以内" />' +
      "</div>";

    panel.appendChild(box);

    var noFireSelect = document.getElementById("u4783_input");
    if (noFireSelect) {
      noFireSelect.addEventListener("change", sync);
    }
  }

  function bind(fireSelect) {
    fireSelect.addEventListener("change", function () {
      sync();
      setTimeout(sync, 100);
    });

    setInterval(sync, 500);
  }

  function sync() {
    var fireSelect = document.getElementById(fireSelectId);
    var warranty = document.getElementById("aiFireWarrantyStatus");
    var warrantyArea = document.getElementById(containerId);
    var maintainGroup = document.getElementById(fireMaintainGroupId);
    var noFireGroup = document.getElementById(noFireGroupId);
    var noFireEntrust = document.getElementById(noFireEntrustId);
    var noFireSelect = document.getElementById("u4783_input");
    if (!fireSelect || !warrantyArea) return;

    var fireValue = fireSelect.value;
    var warrantyValue = warranty ? warranty.value : "请选择";

    if (fireValue === "有") {
      show(warrantyArea);
      if (noFireGroup) hide(noFireGroup);
      if (noFireEntrust) hide(noFireEntrust);

      if (warrantyValue === "是") {
        warrantyArea.classList.add("is-in-warranty");
        if (maintainGroup) hide(maintainGroup);
      } else if (warrantyValue === "否") {
        warrantyArea.classList.remove("is-in-warranty");
        if (maintainGroup) show(maintainGroup);
      } else {
        warrantyArea.classList.remove("is-in-warranty");
        if (maintainGroup) hide(maintainGroup);
      }
      return;
    }

    hide(warrantyArea);
    warrantyArea.classList.remove("is-in-warranty");
    if (fireValue === "无") {
      if (noFireGroup) show(noFireGroup);
      if (noFireSelect && noFireSelect.value === "委托物业管理") {
        if (maintainGroup) show(maintainGroup);
        if (noFireEntrust) hide(noFireEntrust);
      } else {
        if (maintainGroup) hide(maintainGroup);
        if (noFireEntrust) hide(noFireEntrust);
      }
    } else {
      if (maintainGroup) hide(maintainGroup);
      if (noFireGroup) hide(noFireGroup);
      if (noFireEntrust) hide(noFireEntrust);
    }
  }

  function show(el) {
    el.classList.remove("ai-fire-hidden");
    el.classList.remove("ax_default_hidden");
    el.classList.add("is-visible");
    el.style.display = "block";
    el.style.visibility = "visible";
  }

  function hide(el) {
    el.classList.add("ai-fire-hidden");
    el.classList.remove("is-visible");
    el.style.display = "none";
    el.style.visibility = "hidden";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
