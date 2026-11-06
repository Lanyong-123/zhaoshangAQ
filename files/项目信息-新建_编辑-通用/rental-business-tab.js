(function () {
  "use strict";

  var yesNo = ["是", "否"];
  var venueOptionsByType = {
    "生产仓储场所": ["厂房", "仓库", "园区", "其他（自定义写明）"],
    "商业办公场所": ["办公场所", "楼宇", "商铺", "其他（自定义写明）"],
    "设施装备": ["车辆", "船舶", "特种设备", "其他（自定义写明）"],
    "/": ["/"]
  };
  var fields = [
    { col: "D", group: "出租业务基本信息", label: "我方角色", type: "select", options: ["业主", "发包方", "二房东"] },
    { col: "E", group: "出租业务基本信息", label: "承租分类（场地出租时，结构安全、特种设备可留空）", type: "select", options: ["场地出租", "物业出租", "设施设备出租"] },
    { col: "F", group: "出租业务基本信息", label: "承租单位类型", type: "select", options: ["生产仓储场所", "商业办公场所", "设施装备", "/"] },
    { col: "G", group: "出租业务基本信息", label: "承租场所/设备", type: "select", options: [] },
    { col: "H", group: "出租业务基本信息", label: "承租方名称（请按营业执照名称填写）", type: "text" },
    { col: "I", group: "出租业务基本信息", label: "承租单位类型", type: "select", options: ["集团内部单位", "公司内部单位", "其他央企", "非央企"] },

    { col: "J", group: "资质情况", label: "经营资质", type: "select", options: ["是，符合经营资质范围", "否，法规无要求", "是，但超出经营资质范围", "否，无经营资质"] },
    { col: "K", group: "资质情况", label: "安全许可情况", type: "select", options: ["是，具备安全许可", "否，法规无要求", "否，缺少安全许可"] },
    { col: "L", group: "资质情况", label: "行业资质要求（包括公众聚集场所投入使用/营业前消防安全检查意见书）", type: "select", options: ["是，有要求且规范", "是，有要求但缺少", "否，行业无资质要求"] },

    { col: "M", group: "资质范围、转包及业务信息", label: "是否在资质范围内", type: "select", options: yesNo },
    { col: "N", group: "资质范围、转包及业务信息", label: "是否存在业务转包", type: "select", options: yesNo },
    { col: "O", group: "资质范围、转包及业务信息", label: "转包情况（存在转包时填写）", type: "textarea" },
    { col: "P", group: "资质范围、转包及业务信息", label: "承租部位或场地名称", type: "text" },
    { col: "Q", group: "资质范围、转包及业务信息", label: "租赁场所或场地面积（㎡）", type: "number" },
    { col: "R", group: "资质范围、转包及业务信息", label: "业务描述（承租单位做什么，或者承包了哪个业务）", type: "textarea" },

    { col: "S", group: "场地出租、物业出租安全情况", label: "是否具备房屋或场地产权证明（房屋等物业是否合规）", type: "select", options: yesNo },
    { col: "T", group: "场地出租、物业出租安全情况", label: "结构安全（针对建筑结构，是否符合设计要求）", type: "select", options: ["符合设计要求", "不符合设计要求"] },
    { col: "U", group: "场地出租、物业出租安全情况", label: "消防安全（建设工程消防竣工验收备案/审查资料）", type: "select", options: ["符合要求，且手续齐全", "符合要求，部分资料缺失", "无法规要求", "不符合要求，资料缺失"] },
    { col: "V", group: "场地出租、物业出租安全情况", label: "特种设备（包括设备状态、手续证件等）", type: "select", options: ["无特种设备", "有特种设备且符合要求", "有特种设备，但不符合要求"] },

    { col: "W", group: "合同签订情况", label: "合同名称", type: "text" },
    { col: "X", group: "合同签订情况", label: "签订日期", type: "text" },
    { col: "Y", group: "合同签订情况", label: "签署主体—甲方（我方签署主体）", type: "text" },
    { col: "Z", group: "合同签订情况", label: "签署主体—乙方（乙方签署主体）", type: "text" },
    { col: "AA", group: "合同签订情况", label: "合同内是否明确检维保责任主体（设施装备时填写）", type: "select", options: yesNo },

    { col: "AB", group: "协议、人员及设备管理", label: "安全管理协议签署", type: "select", options: ["是（标准版本）", "是（合同内明确）", "是（非标准版本）", "否（未签署）"] },
    { col: "AC", group: "协议、人员及设备管理", label: "承租方人员资质", type: "select", options: ["已全部按法规要求持证", "部分未持证，法规无要求", "部分持证，不符合法规要求", "存在未持证或过期情况", "全员未持证", "不涉及（无相关持证岗位人员）", "未开展持证审查 / 未有审查记录"] },
    { col: "AD", group: "协议、人员及设备管理", label: "特种设备是否按规定办理使用登记变更（设施装备出租或整体物业出租包含特种设备时填写）", type: "select", options: yesNo },

    { col: "AE", group: "安全教育情况", label: "三级安全教育培训", type: "select", options: ["已组织，有提供记录", "已组织，但未提供记录", "未组织/未提供记录"] },
    { col: "AF", group: "安全教育情况", label: "日常安全教育培训", type: "select", options: ["已组织，且有记录", "已组织，但未记录", "未组织/未有记录"] },
    { col: "AG", group: "安全教育情况", label: "培训档案", type: "select", options: ["已建立，且档案完整准确", "已建立，但档案有缺陷", "未建立"] },

    { col: "AH", group: "安全管理情况", label: "设置安全管理机构（合同直接签署方）", type: "select", options: ["已设置，且符合法规要求", "已设置，但不符合法规要求", "已设置，但无法规要求", "未设置（不符合法规要求）", "未设置（法规无要求）"] },
    { col: "AI", group: "安全管理情况", label: "安全管理人员（包含食品安全管理员等，工程技术人员要达到其资质规定的数量要求）", type: "select", options: ["已设置，且符合法规要求", "已设置，但不符合法规要求", "已设置，但无法规要求", "未设置（不符合法规要求）", "未设置（法规无要求）"] },
    { col: "AJ", group: "安全管理情况", label: "安全投入", type: "select", options: ["已投入，符合法规要求", "已投入，法规无要求", "未投入，法规无要求", "未投入，不符合法规要求"] },
    { col: "AK", group: "安全管理情况", label: "制度情况（责任制、安全投入、培训制度、应急预案、隐患排查治理、危险作业管理等）", type: "select", options: ["无制度（未建立）", "有，很不完善", "有，基本完善", "有，契合业务"] },
    { col: "AL", group: "安全管理情况", label: "物资保障（劳动防护用品、应急物资等是否按要求配备并合格有效）", type: "select", options: yesNo },
    { col: "AM", group: "安全管理情况", label: "安全业绩（在承租范围内是否发生内外部事故或被政府处罚等，供应商评价、奖惩）", type: "select", options: ["发生过事故", "有被政府处罚", "符合要求", "未开展审查"] },
    { col: "AN", group: "安全管理情况", label: "是否具有安全标准化证书、ISO/职业健康体系等", type: "select", options: yesNo },

    { col: "AO", group: "承租单位清退管理", label: "排查后是否清退该承租单位", type: "select", options: ["清退", "不清退"] },
    { col: "AP", group: "承租单位清退管理", label: "清退原因", type: "select", options: ["不具备合法有效的经营资格、安全资质", "存在违规转租分租行为", "存在重大隐患且拒不整改", "存在超资质范围经营行为", "其他原因（请在备注写明）"] },

    { col: "AQ", group: "隐患问题整改情况", label: "问题数量", type: "text" },
    { col: "AR", group: "隐患问题整改情况", label: "问题简要描述", type: "textarea" },
    { col: "AS", group: "隐患问题整改情况", label: "是否完成全部隐患整改", type: "select", options: ["已完成", "全部未完成", "部分未完成"] },
    { col: "AT", group: "隐患问题整改情况", label: "计划整改时间（针对未完成的）", type: "date" }
  ];

  var groupOrder = [
    "出租业务基本信息", "资质情况", "资质范围、转包及业务信息", "场地出租、物业出租安全情况",
    "合同签订情况", "协议、人员及设备管理", "安全教育情况", "安全管理情况",
    "承租单位清退管理", "隐患问题整改情况"
  ];

  var records = [{
    D: "业主", E: "物业出租", F: "生产仓储场所",
    G: "厂房", H: "请按营业执照名称填写", I: "非央企",
    J: "是，符合经营资质范围", K: "是，具备安全许可", L: "是，有要求且规范", M: "是", N: "否",
    O: "", P: "承租XX栋XX商铺", Q: "3000", R: "餐饮服务经营", S: "是", T: "符合设计要求",
    U: "符合要求，且手续齐全", V: "无特种设备", W: "XXX合同", X: "20XX年X月X日至20XX年X月X日",
    Y: "XXXXX公司", Z: "XXXXX公司", AA: "是", AB: "否（未签署）", AC: "不涉及（无相关持证岗位人员）",
    AD: "是", AE: "已组织，有提供记录", AF: "已组织，且有记录", AG: "已建立，且档案完整准确",
    AH: "已设置，且符合法规要求", AI: "已设置，且符合法规要求", AJ: "已投入，符合法规要求",
    AK: "有，契合业务", AL: "是", AM: "未开展审查", AN: "是", AO: "不清退",
    AP: "不具备合法有效的经营资格、安全资质", AQ: "XX个",
    AR: "①叉车驾驶员未持有相应资质证书\n②一名员工未经安全教育培训并考核合格\n③###",
    AS: "部分未完成", AT: "2026-12-30"
  }];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function fieldOptions(field, record) {
    if (field.col === "G") return venueOptionsByType[record.F] || [];
    return field.options || [];
  }

  function controlHtml(field, value, recordIndex, record) {
    var common = ' class="rb-control" data-record="' + recordIndex + '" data-column="' + field.col + '" aria-label="' + escapeHtml(field.label) + '"';
    if (field.type === "select") {
      return '<select' + common + '><option value="">请选择</option>' + fieldOptions(field, record).map(function (option) {
        return '<option value="' + escapeHtml(option) + '"' + (String(value || "") === option ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
      }).join("") + '</select>';
    }
    if (field.type === "textarea") {
      return '<textarea' + common + ' placeholder="请输入">' + escapeHtml(value) + '</textarea>';
    }
    return '<input' + common + ' type="' + field.type + '"' + (field.type === "number" ? ' min="0" step="0.01"' : '') +
      ' value="' + escapeHtml(value) + '" placeholder="请输入">';
  }

  function recordName(record, index) {
    return record.H || record.W || ("出租业务" + (index + 1));
  }

  function groupHtml(group, record, recordIndex) {
    var groupFields = fields.filter(function (field) { return field.group === group; });
    return '<section class="rb-group" data-group="' + escapeHtml(group) + '">' +
      '<div class="rb-group-title">' + escapeHtml(group) + '</div>' +
      '<div class="rb-field-grid">' + groupFields.map(function (field) {
        return '<div class="rb-field"><label>' + escapeHtml(field.label) + '：</label>' +
          controlHtml(field, record[field.col] || "", recordIndex, record) + '</div>';
      }).join("") + '</div></section>';
  }

  function panelHtml() {
    return '<div class="rb-page">' +
      '<div class="rb-toolbar" aria-label="出租业务操作区">' +
        '<div class="rb-toolbar-main"><label for="rbSearch">承租方名称</label>' +
          '<div class="rb-combobox" id="rbCombobox" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
            '<input id="rbSearch" type="text" autocomplete="off" placeholder="搜索承租方名称" aria-controls="rbOptions">' +
            '<button id="rbToggle" class="rb-toggle" type="button" aria-label="展开出租业务列表"><span></span></button>' +
            '<div id="rbOptions" class="rb-options" role="listbox"></div>' +
          '</div><span id="rbCount" class="rb-count"></span>' +
          '<button id="rbAdd" class="rb-button rb-button--primary" type="button"><span class="rb-plus">+</span>新增出租业务</button>' +
        '</div>' +
        '<div class="rb-toolbar-transfer"><button id="rbImport" class="rb-button rb-button--primary" type="button">导入</button>' +
          '<button id="rbExport" class="rb-button rb-button--primary" type="button">导出</button></div>' +
        '<div id="rbToast" class="rb-toast" role="status" aria-live="polite"></div>' +
      '</div><div id="rbRecordList" class="rb-record-list"></div></div>';
  }

  function shiftFollowingTabs() {
    var spans = Array.prototype.slice.call(document.querySelectorAll("span"));
    var label = spans.find(function (span) { return (span.textContent || "").trim() === "项目周期"; });
    var widget = label && label.parentElement && label.parentElement.parentElement && label.parentElement.parentElement.parentElement;
    if (!widget || widget.dataset.rbShifted === "yes") return;
    var left = parseFloat(window.getComputedStyle(widget).left);
    if (!isNaN(left)) widget.style.left = (left + 112) + "px";
    widget.dataset.rbShifted = "yes";
  }

  function init() {
    if (document.getElementById("rbTabButton")) return;
    shiftFollowingTabs();

    var button = document.createElement("button");
    var panel = document.createElement("section");
    var activeIndex = 0;
    var toastTimer;

    button.id = "rbTabButton";
    button.type = "button";
    button.textContent = "出租业务";
    button.setAttribute("aria-controls", "rbTabPanel");
    button.setAttribute("aria-selected", "false");
    panel.id = "rbTabPanel";
    panel.setAttribute("aria-label", "出租业务");
    panel.innerHTML = panelHtml();
    document.body.appendChild(button);
    document.body.appendChild(panel);

    var search = panel.querySelector("#rbSearch");
    var combo = panel.querySelector("#rbCombobox");
    var options = panel.querySelector("#rbOptions");
    var count = panel.querySelector("#rbCount");
    var list = panel.querySelector("#rbRecordList");
    var toast = panel.querySelector("#rbToast");

    function showToast(message) {
      window.clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add("rb-show");
      toastTimer = window.setTimeout(function () { toast.classList.remove("rb-show"); }, 1600);
    }

    function blankRecord() {
      var record = {};
      fields.forEach(function (field) { record[field.col] = ""; });
      return record;
    }

    function updateCount() {
      count.textContent = "共" + records.length + "条";
    }

    function renderRecords() {
      list.innerHTML = records.map(function (record, index) {
        return '<article class="rb-record' + (index === activeIndex ? ' rb-record--active' : '') + '" data-record-card="' + index + '">' +
          '<div class="rb-record-body"><div class="rb-record-head"><div><strong>出租业务' + (index + 1) + '</strong><span>' + escapeHtml(recordName(record, index)) + '</span></div></div>' +
          groupOrder.map(function (group) { return groupHtml(group, record, index); }).join("") + '</div>' +
          '<div class="rb-record-actions" aria-label="第' + (index + 1) + '条出租业务操作">' +
            '<button class="rb-add-record" type="button" data-add-after="' + index + '">新增</button>' +
            '<button class="rb-delete" type="button" data-delete-record="' + index + '">删除</button>' +
          '</div></article>';
      }).join("");
      updateCount();
    }

    function renderOptions(keyword) {
      var normalized = String(keyword || "").trim().toLowerCase();
      options.innerHTML = "";
      records.forEach(function (record, index) {
        var name = recordName(record, index);
        if (normalized && name.toLowerCase().indexOf(normalized) === -1) return;
        var option = document.createElement("div");
        option.className = "rb-option";
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
        option.textContent = name;
        option.addEventListener("mousedown", function (event) {
          event.preventDefault();
          activeIndex = index;
          search.value = name;
          renderRecords();
          setComboOpen(false);
          var card = list.querySelector('[data-record-card="' + index + '"]');
          if (card) window.scrollTo({ left: 0, top: Math.max(210, card.offsetTop - 90), behavior: "smooth" });
        });
        options.appendChild(option);
      });
      if (!options.children.length) options.innerHTML = '<div class="rb-empty">未找到匹配记录</div>';
    }

    function setComboOpen(open) {
      combo.classList.toggle("rb-open", open);
      combo.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) renderOptions(search.value);
    }

    function closeOtherTabs() {
      ["rpnTabButton", "hpTabButton", "pvTabButton", "haTabButton"].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
          element.classList.remove("active");
          element.setAttribute("aria-selected", "false");
        }
      });
      ["rpnTabPanel", "hpTabPanel", "pvTabPanel", "haTabPanel"].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) element.classList.remove("active");
      });
    }

    function closeRental() {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
      panel.classList.remove("active");
    }

    button.addEventListener("click", function () {
      closeOtherTabs();
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
      panel.classList.add("active");
      window.scrollTo({ left: 0, top: 210, behavior: "smooth" });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[selectiongroup="Tab标签"]'), function (tab) {
      tab.addEventListener("click", closeRental);
    });
    ["rpnTabButton", "hpTabButton", "pvTabButton", "haTabButton"].forEach(function (id) {
      var otherButton = document.getElementById(id);
      if (otherButton) otherButton.addEventListener("click", closeRental);
    });

    panel.querySelector("#rbToggle").addEventListener("click", function (event) {
      event.stopPropagation();
      setComboOpen(!combo.classList.contains("rb-open"));
      search.focus();
    });
    search.addEventListener("focus", function () { setComboOpen(true); });
    search.addEventListener("click", function (event) { event.stopPropagation(); setComboOpen(true); });
    search.addEventListener("input", function () { setComboOpen(true); renderOptions(search.value); });

    panel.querySelector("#rbAdd").addEventListener("click", function () {
      records.push(blankRecord());
      activeIndex = records.length - 1;
      search.value = "";
      renderRecords();
      renderOptions("");
      showToast("已新增出租业务");
    });
    list.addEventListener("input", function (event) {
      var index = Number(event.target.getAttribute("data-record"));
      var col = event.target.getAttribute("data-column");
      if (!Number.isFinite(index) || !col || !records[index]) return;
      records[index][col] = event.target.value;
      if (col === "F") {
        records[index].G = "";
        renderRecords();
      }
      if (col === "H" || col === "W") renderOptions(search.value);
    });
    list.addEventListener("click", function (event) {
      var addButton = event.target.closest("[data-add-after]");
      if (addButton) {
        var insertIndex = Number(addButton.getAttribute("data-add-after")) + 1;
        records.splice(insertIndex, 0, blankRecord());
        activeIndex = insertIndex;
        renderRecords();
        renderOptions("");
        showToast("已新增出租业务");
        return;
      }
      var deleteButton = event.target.closest("[data-delete-record]");
      if (!deleteButton) return;
      if (records.length === 1) {
        showToast("至少保留一条出租业务信息");
        return;
      }
      var index = Number(deleteButton.getAttribute("data-delete-record"));
      records.splice(index, 1);
      activeIndex = Math.min(activeIndex, records.length - 1);
      search.value = recordName(records[activeIndex], activeIndex);
      renderRecords();
      renderOptions("");
      showToast("已删除该条出租业务");
    });
    panel.querySelector("#rbImport").addEventListener("click", function () { showToast("请选择出租业务信息导入文件"); });
    panel.querySelector("#rbExport").addEventListener("click", function () { showToast("出租业务信息导出任务已创建"); });
    document.addEventListener("click", function (event) {
      if (!combo.contains(event.target)) setComboOpen(false);
    });

    renderRecords();
    renderOptions("");
    search.value = recordName(records[0], 0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
