(function () {
  "use strict";

  function field(label, control, wide, required) {
    return '<div class="pv-field' + (wide ? ' pv-field-wide' : '') + '">' +
      '<div class="pv-label' + (required ? ' pv-required' : '') + '">' + label + '：</div>' +
      '<div>' + control + '</div></div>';
  }

  function input(placeholder) {
    return '<input class="pv-control" type="text" placeholder="' + placeholder + '">';
  }

  function select(options) {
    return '<select class="pv-control"><option>请选择</option>' +
      options.map(function (item) { return '<option>' + item + '</option>'; }).join('') +
      '</select>';
  }

  function upload(note) {
    var noteHtml = note === "" ? "" :
      '<span class="pv-upload-note">' + (note || '支持常用文档及图片格式') + '</span>';
    return '<span class="pv-upload"><button type="button" class="pv-upload-button">上传附件</button>' +
      noteHtml + '</span>';
  }

  function fileRow(title, description, extra) {
    return '<div class="pv-file-group"><div class="pv-file-type">' + title + '</div>' +
      '<select class="pv-control pv-file-presence" aria-label="' + title + '有无">' +
      '<option value="">请选择</option><option value="yes">有</option><option value="no">无</option></select>' +
      '<div class="pv-file-details">' +
      '<div class="pv-file-entries"><div class="pv-file-entry">' +
      '<input class="pv-control pv-file-name" type="text" placeholder="请输入文件名称">' +
      upload('') +
      '<button type="button" class="pv-file-add" title="新增附件" aria-label="新增附件">＋</button>' +
      '</div></div>' +
      '<div class="pv-file-desc">' + description + (extra || '') + '</div></div></div>';
  }

  function createPanel() {
    var button = document.createElement("button");
    button.id = "pvTabButton";
    button.type = "button";
    button.textContent = "光伏发电";

    var panel = document.createElement("section");
    panel.id = "pvTabPanel";
    panel.setAttribute("aria-label", "光伏信息");
    panel.innerHTML =
      '<div class="pv-section"><div class="pv-section-title">光伏发电</div><div class="pv-form-grid">' +
      field("是否涉及", '<div class="pv-inline"><label class="pv-radio"><input type="radio" name="pvInvolved" value="yes" checked>是</label><label class="pv-radio"><input type="radio" name="pvInvolved" value="no">否</label></div>', true, true) +
      '</div><div id="pvDetailFields">' +
      '<div class="pv-form-grid">' +
      field("安装位置", input("请输入安装位置"), false, true) +
      field("项目类型", select(["地面集中式", "屋顶分布式", "水面光伏", "农光互补", "其他"]), false, true) +
      field("装机容量", '<div class="pv-inline">' + input("请输入装机容量") + '<span class="pv-unit">MW</span></div>', false, true) +
      field("上网模式", select(["全额上网", "全部自发自用", "自发自用余电上网"]), false, true) +
      field("发电类型", select(["自然人户用", "非自然人户用", "一般工商业", "大型工商业"]), false, true) +
      field("项目备案号", input("请输入项目备案号"), false, true) +
      field("设施组成", '<div id="pvFacilitySelect" class="pv-multiselect">' +
        '<button type="button" class="pv-multiselect-trigger" aria-expanded="false">请选择</button>' +
        '<div class="pv-multiselect-menu">' +
        ["光伏直流发电单元", "逆变交流配电单元", "防雷与接地安全系统", "消防安全配套设施", "监控、计量与二次系统", "土建、运维附属设施", "储能配套", "其他"].map(function (item) {
          return '<label class="pv-multiselect-option"><input type="checkbox" value="' + item + '">' + item + '</label>';
        }).join("") +
        '</div></div>', false, true) +
      field("投运时间", '<input class="pv-control" type="date">', false, true) +
      '</div></div></div>' +

      '<div class="pv-section pv-involved-content"><div class="pv-section-title">参建单位</div><div class="pv-party-list">' +
      '<div class="pv-party-row"><div class="pv-label">产权单位：</div>' +
      '<select class="pv-control pv-party-presence" aria-label="产权单位有无"><option value="">请选择</option><option value="yes">有</option><option value="no">无</option></select>' +
      '<div class="pv-party-details pv-party-details-single"><input class="pv-control" type="text" placeholder="请输入产权单位"></div></div>' +
      '<div class="pv-party-row"><div class="pv-label">建设单位：</div>' +
      '<select class="pv-control pv-party-presence" aria-label="建设单位有无"><option value="">请选择</option><option value="yes">有</option><option value="no">无</option></select>' +
      '<div class="pv-party-details pv-party-details-single"><input class="pv-control" type="text" placeholder="请输入建设单位"></div></div>' +
      '<div class="pv-party-row"><div class="pv-label">监理单位：</div>' +
      '<select class="pv-control pv-party-presence" aria-label="监理单位有无"><option value="">请选择</option><option value="yes">有</option><option value="no">无</option></select>' +
      '<div class="pv-party-details pv-party-details-paired"><input class="pv-control" type="text" placeholder="请输入监理单位">' +
      '<div class="pv-party-inner-label">监理单位资质：</div><div>' + upload("上传资质文件") + '</div></div></div>' +
      '<div class="pv-party-row"><div class="pv-label">施工单位：</div>' +
      '<select class="pv-control pv-party-presence" aria-label="施工单位有无"><option value="">请选择</option><option value="yes">有</option><option value="no">无</option></select>' +
      '<div class="pv-party-details pv-party-details-paired"><input class="pv-control" type="text" placeholder="请输入施工单位">' +
      '<div class="pv-party-inner-label">施工单位资质：</div><div>' + upload("上传资质文件") + '</div></div></div>' +
      '</div></div>' +

      '<div class="pv-section pv-involved-content"><div class="pv-section-title">运维信息</div><div class="pv-form-grid">' +
      field("运维模式", select(["自营运维", "外包运维"]), false, true) +
      field("运维单位", input("请输入运维单位"), false, true) +
      field("运维单位资质", upload("上传资质文件"), false, false) +
      field("维保周期", select(["日检", "月检", "季度检", "其他"]), false, true) +
      '<div id="pvPersonnelList" class="pv-personnel-list"><div class="pv-personnel-row">' +
      '<div class="pv-label">运维人员姓名：</div><div><input class="pv-control" type="text" placeholder="请输入姓名"></div>' +
      '<div class="pv-label">运维人员资质：</div><div>' + upload("上传人员资质文件") + '</div>' +
      '<button type="button" class="pv-personnel-add" title="新增运维人员" aria-label="新增运维人员">＋</button>' +
      '</div></div>' +
      '</div></div>' +

      '<div class="pv-section pv-involved-content"><div class="pv-section-title">重要文件</div><div class="pv-file-list">' +
      fileRow("立项合规审批文件", "企业投资项目备案证明；场地权属/屋顶租赁协议、屋面业主同意建设证明；电网接入系统审查意见、并网意向批复；建设工程规划许可证、施工许可证等。") +
      fileRow("土建结构安全验收资料", "屋面承重安全鉴定报告、荷载验算书；支架基础/配重隐蔽工程验收记录；土建分部、单位工程竣工验收报告、监理质量评估报告。") +
      fileRow("电气设备出厂、进场法定资料", "产品合格证、型式鉴定、设备开箱验收记录。") +
      fileRow("电气交接试验法定报告", "电气交接试验总报告（绝缘、耐压、回路电阻）等。") +
      fileRow("防雷专项法定验收文件", "防雷验收文件。") +
      fileRow("消防专项验收文件", "消防验收文件等。") +
      fileRow("电网并网法定验收文件", "分布式电源并网验收意见书等。") +
      fileRow("其他", "") +
      '</div></div>';

    document.body.appendChild(button);
    document.body.appendChild(panel);
    return { button: button, panel: panel };
  }

  function shiftProjectCycleTab() {
    var spans = Array.prototype.slice.call(document.querySelectorAll("span"));
    var label = spans.find(function (span) {
      return (span.textContent || "").trim() === "项目周期";
    });
    var widget = label && label.parentElement && label.parentElement.parentElement &&
      label.parentElement.parentElement.parentElement;
    if (!widget || widget.dataset.pvShifted === "yes") return;
    var left = parseFloat(window.getComputedStyle(widget).left);
    if (!isNaN(left)) {
      widget.style.left = (left + 112) + "px";
      widget.dataset.pvShifted = "yes";
    }
  }

  function init() {
    if (document.getElementById("pvTabButton")) return;
    shiftProjectCycleTab();
    var ui = createPanel();
    var involved = ui.panel.querySelectorAll('input[name="pvInvolved"]');
    var content = ui.panel.querySelectorAll(".pv-involved-content");
    var detailFields = ui.panel.querySelector("#pvDetailFields");

    function closePhotovoltaic() {
      ui.button.classList.remove("active");
      ui.panel.classList.remove("active");
    }
    function openPhotovoltaic() {
      ui.button.classList.add("active");
      ui.panel.classList.add("active");
      window.scrollTo({ left: 0, top: 210, behavior: "smooth" });
    }
    function updateInvolved() {
      var show = ui.panel.querySelector('input[name="pvInvolved"]:checked').value === "yes";
      detailFields.style.display = show ? "" : "none";
      Array.prototype.forEach.call(content, function (section) {
        section.style.display = show ? "" : "none";
      });
    }

    ui.button.addEventListener("click", openPhotovoltaic);
    Array.prototype.forEach.call(document.querySelectorAll('[selectiongroup="Tab标签"]'), function (tab) {
      tab.addEventListener("click", closePhotovoltaic);
    });
    Array.prototype.forEach.call(involved, function (radio) {
      radio.addEventListener("change", updateInvolved);
    });
    var facilitySelect = ui.panel.querySelector("#pvFacilitySelect");
    var facilityTrigger = facilitySelect.querySelector(".pv-multiselect-trigger");
    facilityTrigger.addEventListener("click", function () {
      var open = facilitySelect.classList.toggle("open");
      facilityTrigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    facilitySelect.addEventListener("change", function () {
      var selected = Array.prototype.slice.call(
        facilitySelect.querySelectorAll('input[type="checkbox"]:checked')
      ).map(function (checkbox) {
        return checkbox.value;
      });
      facilityTrigger.textContent = selected.length ? selected.join("、") : "请选择";
    });
    document.addEventListener("click", function (event) {
      if (facilitySelect.contains(event.target)) return;
      facilitySelect.classList.remove("open");
      facilityTrigger.setAttribute("aria-expanded", "false");
    });
    ui.panel.addEventListener("change", function (event) {
      if (event.target.classList.contains("pv-party-presence")) {
        var partyRow = event.target.closest(".pv-party-row");
        var partyDetails = partyRow.querySelector(".pv-party-details");
        var partyShow = event.target.value === "yes";
        partyDetails.classList.toggle("active", partyShow);
        if (!partyShow) {
          Array.prototype.forEach.call(partyDetails.querySelectorAll("input"), function (input) {
            input.value = "";
          });
        }
        return;
      }
      if (!event.target.classList.contains("pv-file-presence")) return;
      var fileGroup = event.target.closest(".pv-file-group");
      var details = fileGroup.querySelector(".pv-file-details");
      var show = event.target.value === "yes";
      details.classList.toggle("active", show);
      if (!show) {
        Array.prototype.forEach.call(details.querySelectorAll(".pv-file-name"), function (input) {
          input.value = "";
        });
      }
    });
    ui.panel.addEventListener("click", function (event) {
      var fileAddButton = event.target.closest(".pv-file-add");
      if (fileAddButton) {
        var fileEntries = fileAddButton.closest(".pv-file-entries");
        var fileEntry = document.createElement("div");
        fileEntry.className = "pv-file-entry";
        fileEntry.innerHTML =
          '<input class="pv-control pv-file-name" type="text" placeholder="请输入文件名称">' +
          upload("");
        fileEntries.appendChild(fileEntry);
        fileEntry.appendChild(fileAddButton);
        return;
      }
      var addButton = event.target.closest(".pv-personnel-add");
      if (!addButton) return;
      var list = ui.panel.querySelector("#pvPersonnelList");
      var row = document.createElement("div");
      row.className = "pv-personnel-row";
      row.innerHTML =
        '<div class="pv-label">运维人员姓名：</div><div><input class="pv-control" type="text" placeholder="请输入姓名"></div>' +
        '<div class="pv-label">运维人员资质：</div><div>' + upload("上传人员资质文件") + '</div>';
      list.appendChild(row);
      row.appendChild(addButton);
    });
    updateInvolved();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
