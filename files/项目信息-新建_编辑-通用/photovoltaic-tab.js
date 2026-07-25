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
      '<div class="pv-file-action"><div class="pv-file-upload-line">' + upload('') +
      '<button type="button" class="pv-file-add" title="新增附件" aria-label="新增附件">＋</button>' +
      '</div></div>' +
      '<div class="pv-file-desc">' + description + (extra || '') + '</div></div>';
  }

  function createPanel() {
    var button = document.createElement("button");
    button.id = "pvTabButton";
    button.type = "button";
    button.textContent = "光伏";

    var panel = document.createElement("section");
    panel.id = "pvTabPanel";
    panel.setAttribute("aria-label", "光伏信息");
    panel.innerHTML =
      '<div class="pv-section"><div class="pv-section-title">光伏发电</div><div class="pv-form-grid">' +
      field("是否涉及", '<div class="pv-inline"><label class="pv-radio"><input type="radio" name="pvInvolved" value="yes" checked>是</label><label class="pv-radio"><input type="radio" name="pvInvolved" value="no">否</label></div>', true, true) +
      '</div><div id="pvDetailFields">' +
      '<div class="pv-form-grid">' +
      field("安装位置", input("请输入安装位置"), false, true) +
      field("项目类型", select(["屋顶分布式光伏", "地面集中式光伏", "建筑一体化光伏（BIPV）", "其他"]), false, true) +
      field("装机容量", '<div class="pv-inline">' + input("请输入装机容量") + '<span class="pv-unit">MW</span></div>', false, true) +
      field("上网模式", select(["全额上网", "自发自用、余电上网", "全部自用"]), false, true) +
      field("发电类型", select(["并网型", "离网型", "并离网混合型"]), false, true) +
      field("项目备案号", input("请输入项目备案号"), false, true) +
      field("设施组成", '<div class="pv-inline"><label class="pv-check"><input type="checkbox">光伏组件</label><label class="pv-check"><input type="checkbox">逆变器</label><label class="pv-check"><input type="checkbox">汇流箱</label><label class="pv-check"><input type="checkbox">储能设施</label><label class="pv-check"><input type="checkbox">升压站</label></div>', true, true) +
      field("投运时间", '<input class="pv-control" type="date">', false, true) +
      field("重要文件", upload("单个文件不超过 20MB"), false, false) +
      '</div></div></div>' +

      '<div class="pv-section pv-involved-content"><div class="pv-section-title">建设参与单位</div><div class="pv-form-grid">' +
      field("产权单位", input("请输入产权单位"), false, true) +
      field("建设单位", input("请输入建设单位"), false, true) +
      field("监理单位", input("请输入监理单位"), false, false) +
      field("监理单位资质", upload("上传资质文件"), false, false) +
      field("施工单位", input("请输入施工单位"), false, true) +
      field("施工单位资质", input("请输入资质名称或等级"), false, false) +
      field("施工单位资质附件", upload("上传资质文件"), true, false) +
      '</div></div>' +

      '<div class="pv-section pv-involved-content"><div class="pv-section-title">运维信息</div><div class="pv-form-grid">' +
      field("运维模式", select(["自主运维", "委托运维", "联合运维"]), false, true) +
      field("运维单位", input("请输入运维单位"), false, true) +
      field("运维单位资质", upload("上传资质文件"), false, false) +
      field("维保周期", select(["每月", "每季度", "每半年", "每年", "其他"]), false, true) +
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

  function init() {
    if (document.getElementById("pvTabButton")) return;
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
    ui.panel.addEventListener("click", function (event) {
      var fileAddButton = event.target.closest(".pv-file-add");
      if (fileAddButton) {
        var fileAction = fileAddButton.closest(".pv-file-action");
        var fileLine = document.createElement("div");
        fileLine.className = "pv-file-upload-line";
        fileLine.innerHTML = upload("");
        fileAction.appendChild(fileLine);
        fileLine.appendChild(fileAddButton);
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
