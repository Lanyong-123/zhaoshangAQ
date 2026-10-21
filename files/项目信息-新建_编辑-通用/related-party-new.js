(function () {
  "use strict";

  var fields = [
    { col: "D", section: "项目及单位信息", group: "基本信息", label: "端口", value: "非开发板块", required: true, type: "select", options: ["开发板块", "非开发板块"], hidden: true },
    { col: "E", section: "项目及单位信息", group: "基本信息", label: "我方角色", value: "使用人", required: true, type: "text", hidden: true },

    { col: "K", section: "安全生产高风险业务情况", group: "安全生产高风险业务情况", label: "安全生产高风险业务", value: "", type: "text" },
    { col: "L", section: "安全生产高风险业务情况", group: "安全生产高风险业务情况", label: "安全生产高风险业务存在的主要安全风险", value: "", type: "textarea" },
    { col: "M", section: "安全生产高风险业务情况", group: "安全生产高风险业务情况", label: "该安全生产高风险业务是否存在外包情形", value: "", type: "select", options: ["是", "否"], wide: true },

    { col: "G", section: "外包分包单位情况摸排", group: "基本信息", label: "外包分包方名称", value: "", type: "text" },
    { col: "F", section: "外包分包单位情况摸排", group: "基本信息", label: "相关方角色", value: "外包供应商", type: "text" },
    { col: "H", section: "外包分包单位情况摸排", group: "基本信息", label: "是否存在业务转包", value: "否", type: "select", options: ["是", "否"] },
    { col: "I", section: "外包分包单位情况摸排", group: "基本信息", label: "转包业务单位名称（存在转包时填写）", value: "/", type: "text" },
    { col: "J", section: "外包分包单位情况摸排", group: "基本信息", label: "业务描述（指在本单位开展的业务或服务）", value: "档案整理服务", type: "textarea" },
    { col: "STORE_TYPE", section: "外包分包单位情况摸排", group: "基本信息", label: "门店类型", value: "", type: "select", options: ["直营门店", "加盟门店", "不涉及"], hidden: true },

    { col: "N", section: "外包分包单位情况摸排", group: "合同金额情况", label: "该安全生产高风险业务外包合同额总数（万元）", value: "", type: "number", step: "0.01" },
    { col: "O", section: "外包分包单位情况摸排", group: "合同金额情况", label: "该安全生产高风险业务合同总额（万元）", value: "", type: "number", step: "0.01" },
    { col: "P", section: "外包分包单位情况摸排", group: "合同金额情况", label: "占比（%）（该安全生产高风险业务外包合同额÷该安全生产高风险业务合同总额×100%）", value: "", type: "number", step: "0.01", max: "100", readonly: true },

    { col: "R", section: "外包分包单位情况摸排", group: "在发包单位工作的人员情况", label: "外包单位情况", value: "", type: "select", options: ["集团内部单位", "公司内部单位", "其他央企", "非央企"] },
    { col: "AD", section: "外包分包单位情况摸排", group: "在发包单位工作的人员情况", label: "长期在发包单位工作的人数", value: 1, type: "number" },
    { col: "AE", section: "外包分包单位情况摸排", group: "在发包单位工作的人员情况", label: "临时到发包单位工作的人数", value: 0, type: "number" },
    { col: "WORKER_TOTAL", section: "外包分包单位情况摸排", group: "在发包单位工作的人员情况", label: "总人数", value: 1, type: "number", readonly: true },

    { col: "INTERNAL_UNIT", section: "外包分包单位情况摸排", group: "安全准入条件", label: "是否内部单位", value: "", type: "select", options: ["集团内部单位", "公司内部单位", "外部单位"] },
    { col: "T", section: "外包分包单位情况摸排", group: "安全准入条件", label: "经营资质", value: "是，符合经营资质范围", type: "select", options: ["是，符合经营资质范围", "否，法规无要求", "是，但超出经营资质范围", "否，无经营资质"] },
    { col: "U", section: "外包分包单位情况摸排", group: "安全准入条件", label: "安全许可情况", value: "是，具备安全许可", required: true, type: "select", options: ["是，具备安全许可", "否，法规无要求", "否，缺少安全许可"] },
    { col: "V", section: "外包分包单位情况摸排", group: "安全准入条件", label: "行业资质要求", value: "是，有要求且规范", required: true, type: "select", options: ["是，有要求且规范", "是，有要求但缺少", "否，行业无资质要求"] },
    { col: "W", section: "外包分包单位情况摸排", group: "安全准入条件", label: "承接相关业务是否在资质范围内", value: "是", required: true, type: "select", options: ["是", "否"] },
    { col: "X", section: "外包分包单位情况摸排", group: "安全准入条件", label: "安全管理机构", value: "已设置，且符合法规要求", type: "select", options: ["已设置，且符合法规要求", "已设置，但不符合法规要求", "已设置，但无法规要求", "未设置（不符合法规要求）", "未设置（法规无要求）"] },
    { col: "Y", section: "外包分包单位情况摸排", group: "安全准入条件", label: "安全管理人员", value: "已设置，且符合法规要求", required: true, type: "select", options: ["已设置，且符合法规要求", "已设置，但不符合法规要求", "已设置，但无法规要求", "未设置（不符合法规要求）", "未设置（法规无要求）"] },
    { col: "Z", section: "外包分包单位情况摸排", group: "安全准入条件", label: "人员资质", value: "已全部按法规要求持证", type: "select", options: ["已全部按法规要求持证", "部分未持证，法规无要求", "部分持证，不符合法规要求", "存在未持证或过期情况", "全员未持证", "不涉及（无相关持证岗位人员）", "未开展持证审查 / 未有审查记录"] },
    { col: "AA", section: "外包分包单位情况摸排", group: "安全准入条件", label: "安全管理制度", value: "无制度（未建立）", type: "select", options: ["无制度（未建立）", "有，很不完善", "有，基本完善", "有，契合业务"] },
    { col: "AB", section: "外包分包单位情况摸排", group: "安全准入条件", label: "安全业绩", value: "未有审查记录", type: "select", options: ["符合要求", "无", "未有审查记录"] },
    { col: "AC", section: "外包分包单位情况摸排", group: "安全准入条件", label: "购买工伤保险、社会保险情况", value: "全员购买", required: true, type: "select", options: ["全员购买", "未全员购买，有部分商业保险补充", "未全员购买，也无商业保险补充"] },

    { col: "AF", section: "外包分包单位情况摸排", group: "安全教育情况", label: "三级安全教育培训", value: "已组织，但未提供记录", type: "select", options: ["已组织，有提供记录", "已组织，但未提供记录", "未组织/未提供记录"] },
    { col: "AG", section: "外包分包单位情况摸排", group: "安全教育情况", label: "日常安全教育培训", value: "已组织，且有记录", type: "select", options: ["已组织，且有记录", "已组织，但未记录", "未组织/未有记录"] },
    { col: "AH", section: "外包分包单位情况摸排", group: "安全教育情况", label: "培训档案", value: "未建立", type: "select", options: ["已建立，且档案完整准确", "已建立，但档案有缺陷", "未建立"] },
    { col: "AI", section: "外包分包单位情况摸排", group: "安全投入情况", label: "安全投入情况", value: "已投入，符合法规要求", required: true, type: "select", options: ["已投入，符合法规要求", "已投入，法规无要求", "未投入，法规无要求", "未投入，不符合法规要求"] },
    { col: "AJ", section: "外包分包单位情况摸排", group: "体系建设", label: "适用业务的制度", value: "未建立", required: true, type: "select", options: ["已建立，且符合业务实际", "已建立，但未贴合业务", "未建立"] },
    { col: "AK", section: "外包分包单位情况摸排", group: "体系建设", label: "业务相应应急预案", value: "未建立", type: "select", options: ["已建立，且符合业务实际", "已建立，但未贴合业务", "未建立"] },
    { col: "AL", section: "外包分包单位情况摸排", group: "体系建设", label: "是否具有安全标准化证书、ISO\\职业健康体系等", value: "是", required: true, type: "select", options: ["是", "否"] },
    { col: "AM", section: "外包分包单位情况摸排", group: "职业病危害", label: "告知作业人员作业场所存在的职业病危害因素及其后果", value: "已落实，并有材料", required: true, type: "select", options: ["已落实，并有材料", "已落实，无材料", "未落实", "不涉及"] },
    { col: "AN", section: "外包分包单位情况摸排", group: "现场管理", label: "物资保障（劳动防护用品、应急物资等是否按要求配备并合格有效）", value: "是", required: true, type: "select", options: ["是", "否"] },

    { col: "AO", section: "发包单位（我方）情况摸排", group: "建立健全承包商安全管理制度", label: "建立健全承包商安全管理制度", value: "已建立，且符合业务实际", required: true, type: "select", options: ["已建立，且符合业务实际", "已建立，但未贴合业务", "未建立"] },
    { col: "AP", section: "发包单位（我方）情况摸排", group: "纳入本单位安全生产管理体系", label: "纳入本单位安全生产管理体系", value: "是", required: true, type: "select", options: ["是", "否"] },
    { col: "AQ", section: "发包单位（我方）情况摸排", group: "招采文件是否包含安全准入条件", label: "招采文件是否包含安全准入条件", value: "是否，不涉及", required: true, type: "text" },
    { col: "AR", section: "发包单位（我方）情况摸排", group: "签署安全协议情况", label: "签署安全协议情况", value: "是（标准版本）", type: "select", options: ["是（标准版本）", "是（非标准版本）", "是（合同内明确）", "否（未签署）"] },
    { col: "AS", section: "发包单位（我方）情况摸排", group: "对外包分包单位的安全教育培训", label: "首次进入人员培训", value: "均已培训考核", required: true, type: "select", options: ["均已培训考核", "已培训未考核", "未培训未考核"] },
    { col: "AT", section: "发包单位（我方）情况摸排", group: "对外包分包单位的安全教育培训", label: "人员变动情况备案", value: "已备案、已培训考核", required: true, type: "select", options: ["已备案、已培训考核", "未备案", "已备案、未培训或未考核"] },
    { col: "AU", section: "发包单位（我方）情况摸排", group: "对外包分包单位的安全教育培训", label: "对外包分包单位安全教育培训情况予以监督检查", value: "已检查、符合要求", required: true, type: "select", options: ["已检查、符合要求", "已检查、不符合要求", "未检"] },
    { col: "AV", section: "发包单位（我方）情况摸排", group: "对外包分包单位的安全教育培训", label: "日常安全教育培训", value: "已组织，但未记录", type: "select", options: ["已组织，且有记录", "已组织，但未记录", "未组织/未有记录"] },
    { col: "AW", section: "发包单位（我方）情况摸排", group: "对外包分包单位的安全教育培训", label: "培训档案", value: "已建立，且档案完整准确", type: "select", options: ["已建立，且档案完整准确", "已建立，但档案有缺陷", "未建立"] },
    { col: "AX", section: "发包单位（我方）情况摸排", group: "应急管理", label: "应急预案是否与本单位预案衔接", value: "已衔接，存在偏差", required: true, type: "select", options: ["已衔接", "未衔接", "已衔接，存在偏差", "执行我方预案"] },
    { col: "AY", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "危险作业纳入本单位审批监管范围", value: "暂不涉及", required: true, type: "select", options: ["已纳入", "未纳入", "暂不涉及"] },
    { col: "AZ", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "生产设备、工具的监督检查", value: "已监管，无记录", required: true, type: "select", options: ["已监管，并有记录", "已监管，无记录", "未监管", "不涉及"] },
    { col: "BA", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "安全管理台账", value: "未建立", type: "select", options: ["已建立，且档案完整准确", "已建立，但档案有缺陷", "未建立"] },
    { col: "BB", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "是否落实", value: "不定期考核", type: "select", options: ["不定期考核", "定期考核", "未考核"] },
    { col: "BC", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "考核周期", value: "季度", type: "select", options: ["月度", "季度", "年度", "合同期内", "无", "其他（备注写明）"] },
    { col: "BD", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "安全业绩", value: "符合要求", required: true, type: "select", options: ["发生过事故（公司内部）", "发生过事故（公司外部）", "有被公司处罚（含亮灯）", "有被政府处罚", "符合要求"] },
    { col: "BE", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "有无机制", value: "有", type: "select", options: ["有", "无"] },
    { col: "BF", section: "发包单位（我方）情况摸排", group: "对供应商的日常监管及考核", label: "黑名单管理", value: "有", required: true, type: "select", options: ["有", "无"] },

    { col: "PROBLEM_EXISTS", section: "存在问题及举措建议", group: "存在问题及举措建议", label: "是否存在问题/难点", value: "", required: true, type: "select", options: ["是", "否"] },
    { col: "BG", section: "存在问题及举措建议", group: "存在问题及举措建议", label: "存在问题/难点", value: "", required: true, type: "textarea", wide: true },
    { col: "BH", section: "存在问题及举措建议", group: "存在问题及举措建议", label: "改进举措", value: "", required: true, type: "textarea", wide: true },
    { col: "BI", section: "备注", group: "备注", label: "备注（如未按照“统一标准、统一培训、统一检查、统一考核”请说明，哪一项未按照统一要求，目前采取的是何种管理方式）", value: "", type: "textarea", wide: true }
  ];

  fields.forEach(function (field) {
    field.required = field.col !== "BI";
  });

  var sectionOrder = [
    "项目及单位信息",
    "安全生产高风险业务情况",
    "外包分包单位情况摸排",
    "发包单位（我方）情况摸排",
    "存在问题及举措建议",
    "备注"
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function controlHtml(field) {
    var id = "rpnField" + field.col;
    var value = String(field.value == null ? "" : field.value).replace(/[\r\n]+/g, " ").trim();
    var controlValue = field.type === "select" ? "" : value;
    var common = ' id="' + id + '" class="rpn-control' + (controlValue ? '' : ' rpn-empty') + '"' +
      ' data-excel-column="' + field.col + '" aria-label="' + escapeHtml(field.label) + '"' +
      (field.required ? ' required aria-required="true"' : '');

    if (field.type === "select") {
      return '<select' + common + '><option value="" selected>请选择</option>' + field.options.map(function (option) {
        return '<option value="' + escapeHtml(option) + '">' + escapeHtml(option) + '</option>';
      }).join("") + '</select>';
    }
    if (field.type === "textarea") {
      return '<textarea' + common + ' placeholder="请输入">' + escapeHtml(value) + '</textarea>';
    }
    return '<input' + common + ' type="' + (field.type === "number" ? "number" : "text") + '"' +
      (field.type === "number" ? ' min="0" step="' + escapeHtml(field.step || "1") + '"' + (field.max ? ' max="' + escapeHtml(field.max) + '"' : '') : '') +
      (field.readonly ? ' readonly aria-readonly="true"' : '') +
      ' value="' + escapeHtml(value) + '" placeholder="请输入">';
  }

  function fieldHtml(field) {
    return '<div class="rpn-field' + (field.wide ? ' rpn-field--wide' : '') + '">' +
      '<label class="rpn-field-label" for="rpnField' + field.col + '">' +
      (field.required ? '<span class="rpn-required">*</span>' : '') + escapeHtml(field.label) + '：</label>' +
      controlHtml(field) + '</div>';
  }

  function panelHtml() {
    return '<div class="rpn-page">' +
      '<div id="rpnRelatedToolbarMount"></div>' + sectionOrder.filter(function (section) {
      return fields.some(function (field) { return field.section === section && !field.hidden; });
    }).map(function (section) {
      var sectionFields = fields.filter(function (field) { return field.section === section && !field.hidden; });
      var groups = [];
      sectionFields.forEach(function (field) {
        if (groups.indexOf(field.group) === -1) groups.push(field.group);
      });
      return '<section class="rpn-section" data-section="' + escapeHtml(section) + '">' +
        '<div class="rpn-section-title">' + escapeHtml(section) + '</div>' +
        '<div class="rpn-groups">' + groups.map(function (group) {
          var groupFields = sectionFields.filter(function (field) { return field.group === group; });
          if ((section === "项目及单位信息" && group === "基本信息") ||
              (section === "安全生产高风险业务情况" && group === "安全生产高风险业务情况")) {
            return groupFields.map(fieldHtml).join("");
          }
          if (groupFields.length === 1 && groupFields[0].label === group) {
            return fieldHtml(groupFields[0]);
          }
          return '<div class="rpn-group" data-group="' + escapeHtml(group) + '">' +
            '<div class="rpn-group-title">' + escapeHtml(group) + '</div>' +
            '<div class="rpn-field-grid">' + groupFields.map(fieldHtml).join("") + '</div></div>';
        }).join("") + '</div></section>';
    }).join("") + '</div>';
  }

  function createUi() {
    var oldRelatedTab = document.getElementById("u9651");
    var button = document.createElement("button");
    var panel = document.createElement("section");
    var oldTabStyle;

    button.id = "rpnTabButton";
    button.type = "button";
    button.textContent = "相关方管理（新）";
    button.setAttribute("aria-controls", "rpnTabPanel");
    button.setAttribute("aria-selected", "false");

    if (oldRelatedTab) {
      oldTabStyle = window.getComputedStyle(oldRelatedTab);
      button.style.left = oldTabStyle.left;
      button.style.top = oldTabStyle.top;
      button.style.width = oldTabStyle.width;
      button.style.height = oldTabStyle.height;
    }

    panel.id = "rpnTabPanel";
    panel.setAttribute("aria-label", "相关方管理（新）");
    panel.innerHTML = panelHtml();

    document.body.appendChild(button);
    document.body.appendChild(panel);
    return { button: button, panel: panel };
  }

  function init() {
    if (document.getElementById("rpnTabButton")) return;
    var ui = createUi();
    var recordStates = {};
    var activeRecordId = "1";

    function setConditionalField(control, visible) {
      var field = control && control.closest(".rpn-field");
      if (!control || !field) return;
      field.classList.toggle("rpn-conditional-hidden", !visible);
      control.disabled = !visible;
      if (visible) {
        control.required = control.getAttribute("data-conditional-required") === "true";
        if (control.required) control.setAttribute("aria-required", "true");
      } else {
        if (!control.hasAttribute("data-conditional-required")) {
          control.setAttribute("data-conditional-required", control.required ? "true" : "false");
        }
        control.required = false;
        control.removeAttribute("aria-required");
      }
    }

    function setConditionalSection(section, visible) {
      if (!section) return;
      section.classList.toggle("rpn-conditional-hidden", !visible);
      Array.prototype.forEach.call(section.querySelectorAll("[data-excel-column]"), function (control) {
        if (!control.hasAttribute("data-section-required")) {
          control.setAttribute("data-section-required", control.required ? "true" : "false");
        }
        control.disabled = !visible;
        control.required = visible && control.getAttribute("data-section-required") === "true";
        if (control.required) control.setAttribute("aria-required", "true");
        else control.removeAttribute("aria-required");
      });
    }

    function setCalculatedValue(control, value) {
      if (!control) return;
      control.value = value;
      control.classList.toggle("rpn-empty", !value && value !== 0);
    }

    function numberValue(control) {
      var value = control ? parseFloat(control.value) : 0;
      return Number.isFinite(value) ? value : 0;
    }

    function refreshCalculatedFields() {
      var outsourcedAmount = ui.panel.querySelector("#rpnFieldN");
      var totalAmount = ui.panel.querySelector("#rpnFieldO");
      var percentage = ui.panel.querySelector("#rpnFieldP");
      var longTermWorkers = ui.panel.querySelector("#rpnFieldAD");
      var temporaryWorkers = ui.panel.querySelector("#rpnFieldAE");
      var workerTotal = ui.panel.querySelector("#rpnFieldWORKER_TOTAL");
      var amountTotal = numberValue(totalAmount);
      var hasAmount = outsourcedAmount && totalAmount && (outsourcedAmount.value !== "" || totalAmount.value !== "");
      var hasWorkers = longTermWorkers && temporaryWorkers && (longTermWorkers.value !== "" || temporaryWorkers.value !== "");

      setCalculatedValue(percentage, hasAmount && amountTotal > 0 ?
        (numberValue(outsourcedAmount) / amountTotal * 100).toFixed(2) : "");
      setCalculatedValue(workerTotal, hasWorkers ?
        String(numberValue(longTermWorkers) + numberValue(temporaryWorkers)) : "");
    }

    function refreshConditionalFields() {
      var riskOutsourcing = ui.panel.querySelector("#rpnFieldM");
      var assessmentMode = ui.panel.querySelector("#rpnFieldBB");
      var assessmentCycle = ui.panel.querySelector("#rpnFieldBC");
      var problemExists = ui.panel.querySelector("#rpnFieldPROBLEM_EXISTS");
      var problemDetail = ui.panel.querySelector("#rpnFieldBG");
      var improvement = ui.panel.querySelector("#rpnFieldBH");
      var showSurvey = !riskOutsourcing || riskOutsourcing.value !== "否";

      ui.panel.classList.toggle("rpn-survey-hidden", !showSurvey);

      Array.prototype.forEach.call(ui.panel.querySelectorAll(".rpn-section"), function (section) {
        if (section.getAttribute("data-section") !== "安全生产高风险业务情况") {
          setConditionalSection(section, showSurvey);
        }
      });

      if (showSurvey) {
        setConditionalField(assessmentCycle, assessmentMode && assessmentMode.value === "定期考核");
        setConditionalField(problemDetail, problemExists && problemExists.value === "是");
        setConditionalField(improvement, problemExists && problemExists.value === "是");
      }
      refreshCalculatedFields();
    }

    function captureRecordState() {
      var state = {};
      Array.prototype.forEach.call(ui.panel.querySelectorAll("[data-excel-column]"), function (control) {
        state[control.getAttribute("data-excel-column")] = control.value;
      });
      return state;
    }

    function restoreRecordState(state) {
      Array.prototype.forEach.call(ui.panel.querySelectorAll("[data-excel-column]"), function (control) {
        var col = control.getAttribute("data-excel-column");
        control.value = Object.prototype.hasOwnProperty.call(state, col) ? state[col] : "";
        control.classList.toggle("rpn-empty", !control.value);
      });
      refreshConditionalFields();
    }

    recordStates["1"] = captureRecordState();
    recordStates["2"] = captureRecordState();

    ["rpnFieldM", "rpnFieldBB", "rpnFieldPROBLEM_EXISTS"].forEach(function (id) {
      var controller = ui.panel.querySelector("#" + id);
      if (controller) controller.addEventListener("change", refreshConditionalFields);
    });
    ["rpnFieldN", "rpnFieldO", "rpnFieldAD", "rpnFieldAE"].forEach(function (id) {
      var controller = ui.panel.querySelector("#" + id);
      if (controller) controller.addEventListener("input", refreshCalculatedFields);
    });
    refreshConditionalFields();

    Array.prototype.forEach.call(ui.panel.querySelectorAll(".rpn-record-tab"), function (recordTab) {
      recordTab.addEventListener("click", function () {
        var nextRecordId = recordTab.getAttribute("data-record-id");
        if (nextRecordId === activeRecordId) return;
        recordStates[activeRecordId] = captureRecordState();
        restoreRecordState(recordStates[nextRecordId]);
        activeRecordId = nextRecordId;
        Array.prototype.forEach.call(ui.panel.querySelectorAll(".rpn-record-tab"), function (tab) {
          var isActive = tab === recordTab;
          tab.classList.toggle("active", isActive);
          tab.setAttribute("aria-selected", isActive ? "true" : "false");
        });
      });
    });

    function closeNewTab() {
      ui.button.classList.remove("active");
      ui.button.setAttribute("aria-selected", "false");
      ui.panel.classList.remove("active");
    }

    function closeOtherCustomTabs() {
      ["pvTabButton", "haTabButton"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove("active");
      });
      ["pvTabPanel", "haTabPanel"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove("active");
      });
    }

    ui.button.addEventListener("click", function () {
      closeOtherCustomTabs();
      ui.button.classList.add("active");
      ui.button.setAttribute("aria-selected", "true");
      ui.panel.classList.add("active");
      window.scrollTo({ left: 0, top: 210, behavior: "smooth" });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[selectiongroup="Tab标签"]'), function (tab) {
      tab.addEventListener("click", closeNewTab);
    });
    ["pvTabButton", "haTabButton"].forEach(function (id) {
      var customTab = document.getElementById(id);
      if (customTab) customTab.addEventListener("click", closeNewTab);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
