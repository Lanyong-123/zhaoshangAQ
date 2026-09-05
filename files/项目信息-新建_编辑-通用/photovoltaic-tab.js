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

  var applianceNameOptions = [
    "家用空调", "洗（烘）衣机", "冰箱", "电磁炉", "电烤箱", "消毒碗柜", "电热水器", "抽油烟机", "微波炉", "电热水壶", "电吹风", "空气净化器", "除湿机", "电视机", "空调", "电视", "咖啡机", "自定义"
  ];

  var applianceColumns = [
    { key: "name", label: "家电电器名称", type: "select", options: applianceNameOptions },
    { key: "model", label: "型号", type: "text", placeholder: "请输入型号" },
    { key: "quantity", label: "数量", type: "number", placeholder: "请输入数量" },
    { key: "productionDate", label: "生产日期", type: "date", placeholder: "" },
    { key: "ccc", label: "是否有3C认证", type: "select", options: ["是", "否"] },
    { key: "scrapYears", label: "建议判废年限", type: "text", placeholder: "请输入建议判废年限" },
    { key: "scrapDate", label: "判废日期", type: "date", placeholder: "" },
    { key: "maintenanceCycle", label: "检查维护周期", type: "select", options: ["每日", "每周", "每月", "每季度", "每半年", "每年"] },
    { key: "location", label: "存放（使用）位置", type: "text", placeholder: "请输入存放（使用）位置" }
  ];

  var applianceData = [
    { name: "抽油烟机", model: "CXW-268", quantity: "2", productionDate: "2026-01-01", ccc: "是", scrapYears: "8年", scrapDate: "2034-01-01", maintenanceCycle: "每周", location: "1号楼-3层-厨房" },
    { name: "电热水器", model: "ES60H", quantity: "4", productionDate: "2025-06-15", ccc: "是", scrapYears: "8年", scrapDate: "2033-06-15", maintenanceCycle: "每月", location: "2号楼-5层-设备间" },
    { name: "空调", model: "KFR-35GW", quantity: "12", productionDate: "2024-09-20", ccc: "是", scrapYears: "10年", scrapDate: "2034-09-20", maintenanceCycle: "每季度", location: "综合楼-办公区" },
    { name: "冰箱", model: "BCD-220", quantity: "3", productionDate: "2023-04-12", ccc: "是", scrapYears: "10年", scrapDate: "2033-04-12", maintenanceCycle: "每月", location: "商业裙楼-餐饮区" }
  ];

  function applianceControl(column, value, required) {
    if (column.type === "select") {
      return '<select class="pv-control" data-field="' + column.key + '"' + (required ? ' required' : '') + '>' +
        '<option value="">请选择</option>' +
        column.options.map(function (item) {
          return '<option' + (item === value ? ' selected' : '') + '>' + item + '</option>';
        }).join("") +
        '</select>';
    }
    return '<input class="pv-control" data-field="' + column.key + '" type="' + column.type + '" value="' + (value || "") +
      '" placeholder="' + (column.placeholder || "") + '"' + (required ? ' required' : '') + '>';
  }

  function applianceQueryField(column) {
    if (column.key === "quantity") {
      return '<div class="ha-query-field"><div class="ha-query-label">' + column.label + '：</div>' +
        '<div class="ha-range"><input class="pv-control" data-field="quantityMin" type="number" placeholder="最小值">' +
        '<span>至</span><input class="pv-control" data-field="quantityMax" type="number" placeholder="最大值"></div></div>';
    }
    return '<div class="ha-query-field"><div class="ha-query-label">' + column.label + '：</div>' +
      applianceControl(column, "", false) + '</div>';
  }

  function applianceFormField(column, value) {
    return '<div class="pv-field"><div class="pv-label pv-required">' + column.label + '：</div><div>' +
      applianceControl(column, value || "", true) + '<div class="ha-error">请填写' + column.label + '</div></div></div>';
  }

  function applianceRows(rows) {
    return rows.map(function (item, index) {
      var dataIndex = typeof item.__applianceIndex === "number" ? item.__applianceIndex : index;
      return '<tr data-index="' + dataIndex + '">' +
        applianceColumns.map(function (column) {
          return '<td>' + (item[column.key] || "") + '</td>';
        }).join("") +
        '<td><button type="button" class="ha-link ha-edit">修改</button><span class="ha-divider">|</span><button type="button" class="ha-link ha-delete">删除</button></td>' +
        '</tr>';
    }).join("");
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

  function createAppliancePanel() {
    var button = document.createElement("button");
    button.id = "haTabButton";
    button.type = "button";
    button.textContent = "家用电器";

    var panel = document.createElement("section");
    panel.id = "haTabPanel";
    panel.setAttribute("aria-label", "家用电器");
    panel.innerHTML =
      '<div class="ha-page">' +
      '<div class="ha-toolbar">' +
      '<button type="button" class="ha-primary ha-add">新增</button>' +
      '<button type="button" class="ha-primary ha-import">导入</button>' +
      '<button type="button" class="ha-primary ha-export">导出</button>' +
      '</div>' +
      '<div class="ha-query">' +
      applianceColumns.map(applianceQueryField).join("") +
      '<div class="ha-query-actions"><button type="button" class="ha-default ha-reset">重置</button><button type="button" class="ha-primary ha-search">查询</button></div>' +
      '</div>' +
      '<div class="ha-table-card">' +
      '<div class="ha-table-title">家用电器列表</div>' +
      '<div class="ha-table-wrap"><table class="ha-table"><thead><tr>' +
      applianceColumns.map(function (column) { return '<th>' + column.label + '</th>'; }).join("") +
      '<th>操作</th></tr></thead><tbody>' + applianceRows(applianceData) + '</tbody></table></div>' +
      '<div class="ha-pagination"></div>' +
      '</div>' +
      '<div class="ha-modal-mask" aria-hidden="true">' +
      '<div class="ha-modal" role="dialog" aria-modal="true" aria-label="家用电器维护">' +
      '<div class="ha-modal-title">新增家用电器</div>' +
      '<div class="ha-modal-body"><div class="pv-form-grid">' +
      applianceColumns.map(function (column) { return applianceFormField(column, ""); }).join("") +
      '</div></div>' +
      '<div class="ha-modal-footer"><button type="button" class="ha-default ha-cancel">取消</button><button type="button" class="ha-primary ha-save">保存</button></div>' +
      '</div>' +
      '</div>' +
      '</div>';

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
      widget.style.left = (left + 224) + "px";
      widget.dataset.pvShifted = "yes";
    }
  }

  function init() {
    if (document.getElementById("pvTabButton")) return;
    shiftProjectCycleTab();
    var ui = createPanel();
    var applianceUi = createAppliancePanel();
    var involved = ui.panel.querySelectorAll('input[name="pvInvolved"]');
    var content = ui.panel.querySelectorAll(".pv-involved-content");
    var detailFields = ui.panel.querySelector("#pvDetailFields");

    function closePhotovoltaic() {
      ui.button.classList.remove("active");
      ui.panel.classList.remove("active");
    }
    function closeAppliance() {
      applianceUi.button.classList.remove("active");
      applianceUi.panel.classList.remove("active");
    }
    function openPhotovoltaic() {
      closeAppliance();
      ui.button.classList.add("active");
      ui.panel.classList.add("active");
      window.scrollTo({ left: 0, top: 210, behavior: "smooth" });
    }
    function openAppliance() {
      closePhotovoltaic();
      applianceUi.button.classList.add("active");
      applianceUi.panel.classList.add("active");
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
    applianceUi.button.addEventListener("click", openAppliance);
    Array.prototype.forEach.call(document.querySelectorAll('[selectiongroup="Tab标签"]'), function (tab) {
      tab.addEventListener("click", function () {
        closePhotovoltaic();
        closeAppliance();
      });
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

    var applianceRowsData = applianceData.slice();
    var applianceFilteredRows = applianceRowsData.slice();
    var applianceCurrentPage = 1;
    var appliancePageSize = 10;
    var editingIndex = -1;
    var applianceTbody = applianceUi.panel.querySelector(".ha-table tbody");
    var appliancePager = applianceUi.panel.querySelector(".ha-pagination");
    var applianceModalMask = applianceUi.panel.querySelector(".ha-modal-mask");
    var applianceModalTitle = applianceUi.panel.querySelector(".ha-modal-title");
    var applianceModal = applianceUi.panel.querySelector(".ha-modal");

    function renderAppliancePager(total, totalPages) {
      var buttons = [];
      var page;
      for (page = 1; page <= totalPages; page += 1) {
        buttons.push('<button type="button" class="ha-page-btn' + (page === applianceCurrentPage ? ' active' : '') + '" data-page="' + page + '">' + page + '</button>');
      }
      appliancePager.innerHTML =
        '<div class="ha-page-left">每页显示 <select class="ha-page-size">' +
        [10, 20, 50].map(function (size) {
          return '<option value="' + size + '"' + (size === appliancePageSize ? ' selected' : '') + '>' + size + '</option>';
        }).join("") +
        '</select> 记录，共' + total + '条记录</div>' +
        '<div class="ha-page-right"><button type="button" class="ha-page-btn" data-page="prev">上一页</button>' +
        buttons.join("") +
        '<button type="button" class="ha-page-btn" data-page="next">下一页</button></div>';
    }

    function renderApplianceTable(rows, resetPage) {
      applianceFilteredRows = rows || applianceRowsData.slice();
      if (resetPage) applianceCurrentPage = 1;
      var total = applianceFilteredRows.length;
      var totalPages = Math.max(1, Math.ceil(total / appliancePageSize));
      if (applianceCurrentPage > totalPages) applianceCurrentPage = totalPages;
      var start = (applianceCurrentPage - 1) * appliancePageSize;
      var pageRows = applianceFilteredRows.slice(start, start + appliancePageSize).map(function (item) {
        var row = {};
        applianceColumns.forEach(function (column) {
          row[column.key] = item[column.key];
        });
        row.__applianceIndex = applianceRowsData.indexOf(item);
        return row;
      });
      applianceTbody.innerHTML = pageRows.length ? applianceRows(pageRows) :
        '<tr><td colspan="' + (applianceColumns.length + 1) + '">暂无数据</td></tr>';
      renderAppliancePager(total, totalPages);
    }

    function collectApplianceValues(scope) {
      var values = {};
      applianceColumns.forEach(function (column) {
        var control = scope.querySelector('[data-field="' + column.key + '"]');
        values[column.key] = control ? control.value.replace(/^\s+|\s+$/g, "") : "";
      });
      Array.prototype.forEach.call(scope.querySelectorAll('[data-field="quantityMin"], [data-field="quantityMax"]'), function (control) {
        values[control.getAttribute("data-field")] = control.value.replace(/^\s+|\s+$/g, "");
      });
      return values;
    }

    function fillApplianceForm(values) {
      applianceColumns.forEach(function (column) {
        var control = applianceModal.querySelector('[data-field="' + column.key + '"]');
        var error = control && control.parentElement.querySelector(".ha-error");
        if (control) control.value = values && values[column.key] ? values[column.key] : "";
        if (error) error.style.display = "none";
        if (control) control.classList.remove("ha-invalid");
      });
    }

    function openApplianceModal(title, values, index) {
      editingIndex = typeof index === "number" ? index : -1;
      applianceModalTitle.textContent = title;
      fillApplianceForm(values);
      applianceModalMask.classList.add("open");
      applianceModalMask.setAttribute("aria-hidden", "false");
    }

    function closeApplianceModal() {
      applianceModalMask.classList.remove("open");
      applianceModalMask.setAttribute("aria-hidden", "true");
      editingIndex = -1;
    }

    function validateApplianceForm() {
      var ok = true;
      applianceColumns.forEach(function (column) {
        var control = applianceModal.querySelector('[data-field="' + column.key + '"]');
        var error = control && control.parentElement.querySelector(".ha-error");
        var empty = !control || !control.value.replace(/^\s+|\s+$/g, "");
        if (control) control.classList.toggle("ha-invalid", empty);
        if (error) error.style.display = empty ? "block" : "none";
        if (empty) ok = false;
      });
      return ok;
    }

    function filterApplianceRows() {
      var filters = collectApplianceValues(applianceUi.panel.querySelector(".ha-query"));
      var minQuantity = filters.quantityMin === "" ? null : Number(filters.quantityMin);
      var maxQuantity = filters.quantityMax === "" ? null : Number(filters.quantityMax);
      var result = applianceRowsData.filter(function (row) {
        var rowQuantity = Number(row.quantity);
        if (minQuantity !== null && !isNaN(minQuantity) && rowQuantity < minQuantity) return false;
        if (maxQuantity !== null && !isNaN(maxQuantity) && rowQuantity > maxQuantity) return false;
        return applianceColumns.every(function (column) {
          if (column.key === "quantity") return true;
          var value = filters[column.key];
          if (!value) return true;
          return String(row[column.key] || "").toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      });
      renderApplianceTable(result, true);
    }

    applianceUi.panel.querySelector(".ha-add").addEventListener("click", function () {
      openApplianceModal("新增家用电器", null, -1);
    });
    applianceUi.panel.querySelector(".ha-search").addEventListener("click", filterApplianceRows);
    applianceUi.panel.querySelector(".ha-reset").addEventListener("click", function () {
      Array.prototype.forEach.call(applianceUi.panel.querySelectorAll(".ha-query [data-field]"), function (control) {
        control.value = "";
      });
      renderApplianceTable(applianceRowsData, true);
    });
    applianceUi.panel.querySelector(".ha-import").addEventListener("click", function () {
      alert("支持按家电电器管理台账模板导入");
    });
    applianceUi.panel.querySelector(".ha-export").addEventListener("click", function () {
      alert("已触发家用电器台账导出");
    });
    applianceUi.panel.querySelector(".ha-cancel").addEventListener("click", closeApplianceModal);
    applianceUi.panel.querySelector(".ha-save").addEventListener("click", function () {
      if (!validateApplianceForm()) return;
      var values = collectApplianceValues(applianceModal);
      if (editingIndex > -1) {
        applianceRowsData[editingIndex] = values;
      } else {
        applianceRowsData.unshift(values);
      }
      filterApplianceRows();
      closeApplianceModal();
    });
    appliancePager.addEventListener("click", function (event) {
      var button = event.target.closest(".ha-page-btn");
      if (!button) return;
      var totalPages = Math.max(1, Math.ceil(applianceFilteredRows.length / appliancePageSize));
      var page = button.getAttribute("data-page");
      if (page === "prev") {
        applianceCurrentPage = Math.max(1, applianceCurrentPage - 1);
      } else if (page === "next") {
        applianceCurrentPage = Math.min(totalPages, applianceCurrentPage + 1);
      } else {
        applianceCurrentPage = parseInt(page, 10) || 1;
      }
      renderApplianceTable(applianceFilteredRows, false);
    });
    appliancePager.addEventListener("change", function (event) {
      if (!event.target.classList.contains("ha-page-size")) return;
      appliancePageSize = parseInt(event.target.value, 10) || 10;
      renderApplianceTable(applianceFilteredRows, true);
    });
    applianceModalMask.addEventListener("click", function (event) {
      if (event.target === applianceModalMask) closeApplianceModal();
    });
    applianceTbody.addEventListener("click", function (event) {
      var row = event.target.closest("tr");
      if (!row) return;
      var index = parseInt(row.getAttribute("data-index"), 10);
      if (event.target.classList.contains("ha-edit")) {
        openApplianceModal("修改家用电器", applianceRowsData[index], index);
      }
      if (event.target.classList.contains("ha-delete")) {
        applianceRowsData.splice(index, 1);
        filterApplianceRows();
      }
    });
    renderApplianceTable(applianceRowsData, true);
    updateInvolved();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
