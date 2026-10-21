(function () {
  "use strict";

  var fields = [
    { col: "E", group: "岗位信息", label: "岗位名称", type: "text" },
    { col: "F", group: "职业病危害因素识别", label: "职业病危害因素名称", type: "text" },
    { col: "G", group: "职业病危害因素识别", label: "危害因素类别", type: "multiselect", options: ["粉尘", "化学因素", "物理因素", "生物因素", "放射性因素", "其他"] },
    { col: "H", group: "职业病危害因素识别", label: "危害来源", type: "textarea", wide: true },
    { col: "I", group: "职业病危害因素识别", label: "接触方式", type: "multiselect", options: ["定点", "巡检", "其他"] },
    { col: "J", group: "职业病危害因素识别", label: "接触人数(总数)", type: "number" },
    { col: "K", group: "职业病危害因素识别", label: "接触人数（女性）", type: "number" },
    { col: "L", group: "接触与检测评价", label: "暴露时长", type: "text" },
    { col: "M", group: "接触与检测评价", label: "暴露频次", type: "select", options: ["连续", "间断", "偶尔", "其他"] },
    { col: "N", group: "接触与检测评价", label: "检测结果(浓度/强度)", type: "text" },
    { col: "O", group: "接触与检测评价", label: "职业接触限值", type: "text" },
    { col: "P", group: "接触与检测评价", label: "超标情况", type: "select", options: ["未超标", "超标", "未检测"] },
    { col: "Q", group: "接触与检测评价", label: "风险等级", type: "select", options: ["低风险", "中风险", "高风险"] },
    { col: "R", group: "防护措施", label: "工程防护设施", type: "textarea", wide: true },
    { col: "S", group: "防护措施", label: "个体防护用品", type: "textarea", wide: true },
    { col: "T", group: "防护措施", label: "警示标识", type: "select", options: ["有（GBZ158）", "无", "不适用"] },
    { col: "U", group: "职业健康监护", label: "需开展体检类型", type: "multiselect", options: ["岗前", "在岗", "离岗", "不涉及"] },
    { col: "V", group: "职业健康监护", label: "在岗体检周期", type: "select", options: ["1次/年", "1次/2年", "1次/3年", "按需开展", "不涉及"] },
    { col: "W", group: "管控与依据", label: "辨识依据", type: "text" },
    { col: "X", group: "管控与依据", label: "辨识状态", type: "select", options: ["已辨识", "辨识中", "待辨识"] },
    { col: "Y", group: "管控与依据", label: "治理/整改措施及责任单位", type: "textarea", wide: true },
    { col: "Z", group: "管控与依据", label: "备注", type: "textarea", wide: true, optional: true }
  ];

  var groupOrder = ["岗位信息", "职业病危害因素识别", "接触与检测评价", "防护措施", "职业健康监护", "管控与依据"];
  var records = [
    { E: "破碎岗位", F: "矽尘(SiO2)", G: "粉尘", H: "矿石破碎/筛分", I: "定点+巡检", J: "8", K: "2", L: "每日8h", M: "连续", N: "0.8mg/m³", O: "PC-TWA 1.0mg/m³(GBZ2.1)", P: "未超标", Q: "高风险", R: "密闭+湿式作业+局部通风", S: "防尘口罩(N95)", T: "有（GBZ158）", U: "岗前+在岗+离岗", V: "1次/年", W: "GBZ188-2025", X: "已辨识", Y: "加装袋式除尘器/生产一部", Z: "" },
    { E: "冲压岗位", F: "噪声", G: "物理因素", H: "冲压设备运行", I: "定点", J: "", K: "", L: "每日8h", M: "连续", N: "88dB(A)", O: "LEX,8h≤85dB(A)(GBZ2.2)", P: "超标", Q: "中风险", R: "隔声罩+减振", S: "护听器(耳塞/耳罩)", T: "有（GBZ158）", U: "岗前+在岗+离岗", V: "1次/年", W: "GBZ188-2025", X: "已辨识", Y: "加装隔声罩、轮换作业/生产二部", Z: "" },
    { E: "喷漆岗位", F: "苯、甲苯、二甲苯", G: "化学因素", H: "油漆喷枪/溶剂挥发", I: "定点", J: "", K: "", L: "每日4h", M: "间断", N: "苯 3.5mg/m³", O: "苯 PC-TWA 6mg/m³(GBZ2.1)", P: "未超标", Q: "高风险", R: "喷漆房+局部排风+密闭", S: "防毒面具+耐溶剂手套", T: "有（GBZ158）", U: "岗前+在岗+离岗", V: "1次/年", W: "GBZ188-2025", X: "已辨识", Y: "完善排风系统、年度复检/涂装车间", Z: "" },
    { E: "手工电弧焊", F: "电焊烟尘、紫外线、锰", G: "粉尘+物理+化学", H: "焊接作业", I: "定点+巡检", J: "", K: "", L: "每日6h", M: "间断", N: "电焊烟尘 2.1mg/m³", O: "电焊烟尘 PC-TWA 4mg/m³(GBZ2.1)", P: "未超标", Q: "中风险", R: "焊接烟尘净化器+局部通风", S: "防尘口罩+焊接面罩+防护手套", T: "有（GBZ158）", U: "岗前+在岗+离岗", V: "1次/年", W: "GBZ188-2025", X: "已辨识", Y: "增设移动式烟尘净化器/焊接车间", Z: "" }
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function selectedMultiValues(value, options) {
    var aliases = {
      "化学": "化学因素",
      "物理": "物理因素",
      "生物": "生物因素",
      "放射性": "放射性因素"
    };
    var values = String(value || "").split(/[+、,，]/).map(function (item) {
      var normalized = item.trim();
      return aliases[normalized] || normalized;
    }).filter(Boolean);
    return options.filter(function (option) { return values.indexOf(option) !== -1; });
  }

  function multiselectHtml(field, value, common) {
    var selected = selectedMultiValues(value, field.options);
    var displayValue = selected.length ? selected.join("、") : "请选择";
    return '<div class="hp-multiselect" data-multiselect>' +
      '<input type="hidden"' + common + ' value="' + escapeHtml(selected.join("、")) + '">' +
      '<button class="hp-multiselect-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">' +
        '<span class="hp-multiselect-text">' + escapeHtml(displayValue) + '</span><span class="hp-multiselect-arrow" aria-hidden="true"></span>' +
      '</button><div class="hp-multiselect-menu" role="listbox" aria-multiselectable="true">' +
        field.options.map(function (item) {
          return '<label class="hp-multiselect-option"><input type="checkbox" value="' + escapeHtml(item) + '"' +
            (selected.indexOf(item) !== -1 ? ' checked' : '') + '><span>' + escapeHtml(item) + '</span></label>';
        }).join("") +
      '</div></div>';
  }

  function controlHtml(field) {
    var required = field.optional ? "" : " required aria-required=\"true\"";
    var common = ' class="hp-control" data-column="' + field.col + '" aria-label="' + escapeHtml(field.label) + '"' + required;
    if (field.type === "multiselect") {
      return multiselectHtml(field, "", common);
    }
    if (field.type === "select") {
      return '<select' + common + '><option value="">请选择</option>' + field.options.map(function (item) {
        return '<option value="' + escapeHtml(item) + '">' + escapeHtml(item) + '</option>';
      }).join("") + '</select>';
    }
    if (field.type === "textarea") {
      return '<textarea' + common + ' placeholder="请输入"></textarea>';
    }
    return '<input' + common + ' type="' + field.type + '"' + (field.type === "number" ? ' min="0" step="1"' : '') + ' placeholder="请输入">';
  }

  function fieldHtml(field) {
    return '<div class="hp-field' + (field.wide ? ' hp-field--wide' : '') + '">' +
      '<label class="hp-field-label">' + (field.optional ? '' : '<span class="hp-required">*</span>') + escapeHtml(field.label) + '：</label>' +
      controlHtml(field) + '</div>';
  }

  function tableControlHtml(field, value, rowIndex) {
    var common = ' class="hp-table-control" data-table-row="' + rowIndex + '" data-table-column="' + field.col + '" aria-label="第' + (rowIndex + 1) + '行' + escapeHtml(field.label) + '"';
    if (field.type === "multiselect") {
      return multiselectHtml(field, value, common);
    }
    if (field.type === "select") {
      return '<select' + common + '><option value="">请选择</option>' + field.options.map(function (item) {
        return '<option value="' + escapeHtml(item) + '"' + (String(value || "") === item ? ' selected' : '') + '>' + escapeHtml(item) + '</option>';
      }).join("") + '</select>';
    }
    if (field.type === "textarea") {
      return '<textarea' + common + ' placeholder="请输入">' + escapeHtml(value) + '</textarea>';
    }
    return '<input' + common + ' type="' + field.type + '"' + (field.type === "number" ? ' min="0" step="1"' : '') + ' value="' + escapeHtml(value) + '" placeholder="请输入">';
  }

  function tableSectionHtml() {
    return '<section id="hpTableSection" class="hp-table-section" aria-label="危害岗位表格录入">' +
      '<div class="hp-table-heading"><span>危害岗位表格录入</span><button id="hpTableAdd" class="hp-table-add" type="button">新增</button></div>' +
      '<div class="hp-table-wrap"><table class="hp-entry-table"><thead><tr>' +
        fields.map(function (field) { return '<th scope="col">' + escapeHtml(field.label) + '</th>'; }).join("") +
        '<th class="hp-table-action" scope="col">操作</th></tr></thead><tbody id="hpTableBody"></tbody></table></div>' +
      '</section>';
  }

  function tileControlHtml(field, value, rowIndex) {
    var common = ' class="hp-tile-control" data-tile-row="' + rowIndex + '" data-tile-column="' + field.col + '" aria-label="第' + (rowIndex + 1) + '条' + escapeHtml(field.label) + '"';
    if (field.type === "multiselect") {
      return multiselectHtml(field, value, common);
    }
    if (field.type === "select") {
      return '<select' + common + '><option value="">请选择</option>' + field.options.map(function (item) {
        return '<option value="' + escapeHtml(item) + '"' + (String(value || "") === item ? ' selected' : '') + '>' + escapeHtml(item) + '</option>';
      }).join("") + '</select>';
    }
    if (field.type === "textarea") {
      return '<textarea' + common + ' placeholder="请输入">' + escapeHtml(value) + '</textarea>';
    }
    return '<input' + common + ' type="' + field.type + '"' + (field.type === "number" ? ' min="0" step="1"' : '') + ' value="' + escapeHtml(value) + '" placeholder="请输入">';
  }

  function tileSectionHtml() {
    return '<section id="hpTileSection" class="hp-tile-section" aria-label="危害岗位平铺录入">' +
      '<div class="hp-tile-heading"><span>危害岗位平铺录入</span><small>方案二：全部字段按两列平铺展示</small></div>' +
      '<div id="hpTileList" class="hp-tile-list"></div></section>';
  }

  function panelHtml() {
    return '<div class="hp-page">' +
      '<div id="hpToolbar" class="hp-toolbar" aria-label="危害岗位操作区">' +
        '<div class="hp-toolbar-main"><label for="hpSearch">岗位名称</label>' +
          '<div id="hpCombobox" class="hp-combobox" role="combobox" aria-haspopup="listbox" aria-expanded="false">' +
            '<span class="hp-search-icon" aria-hidden="true"></span>' +
            '<input id="hpSearch" type="text" autocomplete="off" aria-autocomplete="list" aria-controls="hpOptions">' +
            '<button id="hpToggle" class="hp-toggle" type="button" aria-label="展开岗位列表"><span></span></button>' +
            '<div id="hpOptions" class="hp-options" role="listbox"></div>' +
          '</div>' +
          '<span id="hpCount" class="hp-count"></span>' +
          '<button id="hpAdd" class="hp-button hp-button--primary" type="button"><span class="hp-plus">+</span>新增危害岗位</button>' +
          '<button id="hpDelete" class="hp-button hp-button--danger" type="button">删除当前危害岗位</button>' +
        '</div>' +
        '<div class="hp-toolbar-transfer"><button id="hpImport" class="hp-button hp-button--primary" type="button">导入</button>' +
          '<button id="hpExport" class="hp-button hp-button--primary" type="button">导出</button></div>' +
        '<div id="hpToast" class="hp-toast" role="status" aria-live="polite"></div>' +
      '</div>' +
      groupOrder.map(function (group) {
        var groupFields = fields.filter(function (field) { return field.group === group; });
        return '<section class="hp-section" data-group="' + escapeHtml(group) + '">' +
          '<div class="hp-section-title">' + escapeHtml(group) + '</div>' +
          '<div class="hp-field-grid">' + groupFields.map(fieldHtml).join("") + '</div></section>';
      }).join("") + tableSectionHtml() + tileSectionHtml() + '</div>';
  }

  function shiftFollowingTabs() {
    var spans = Array.prototype.slice.call(document.querySelectorAll("span"));
    var label = spans.find(function (span) { return (span.textContent || "").trim() === "项目周期"; });
    var widget = label && label.parentElement && label.parentElement.parentElement && label.parentElement.parentElement.parentElement;
    if (!widget || widget.dataset.hpShifted === "yes") return;
    var left = parseFloat(window.getComputedStyle(widget).left);
    if (!isNaN(left)) widget.style.left = (left + 112) + "px";
    widget.dataset.hpShifted = "yes";
  }

  function init() {
    if (document.getElementById("hpTabButton")) return;
    shiftFollowingTabs();

    var button = document.createElement("button");
    var panel = document.createElement("section");
    var activeIndex = 0;
    var toastTimer;

    button.id = "hpTabButton";
    button.type = "button";
    button.textContent = "危害岗位";
    button.setAttribute("aria-controls", "hpTabPanel");
    button.setAttribute("aria-selected", "false");
    panel.id = "hpTabPanel";
    panel.setAttribute("aria-label", "危害岗位");
    panel.innerHTML = panelHtml();
    document.body.appendChild(button);
    document.body.appendChild(panel);

    var search = panel.querySelector("#hpSearch");
    var combo = panel.querySelector("#hpCombobox");
    var options = panel.querySelector("#hpOptions");
    var count = panel.querySelector("#hpCount");
    var toast = panel.querySelector("#hpToast");
    var tableBody = panel.querySelector("#hpTableBody");
    var tileList = panel.querySelector("#hpTileList");

    function showToast(message) {
      window.clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add("hp-show");
      toastTimer = window.setTimeout(function () { toast.classList.remove("hp-show"); }, 1600);
    }

    function syncMultiselectControl(control, value) {
      var wrapper = control && control.closest(".hp-multiselect");
      if (!wrapper) return;
      var field = fields.find(function (item) {
        return item.col === (control.getAttribute("data-column") || control.getAttribute("data-table-column") || control.getAttribute("data-tile-column"));
      });
      var selected = field ? selectedMultiValues(value, field.options) : [];
      control.value = selected.join("、");
      Array.prototype.forEach.call(wrapper.querySelectorAll('input[type="checkbox"]'), function (checkbox) {
        checkbox.checked = selected.indexOf(checkbox.value) !== -1;
      });
      var text = wrapper.querySelector(".hp-multiselect-text");
      if (text) text.textContent = selected.length ? selected.join("、") : "请选择";
    }

    function setControlValue(control, value) {
      if (!control) return;
      control.value = value || "";
      if (control.closest(".hp-multiselect")) syncMultiselectControl(control, value);
    }

    function closeMultiselects(except) {
      Array.prototype.forEach.call(panel.querySelectorAll(".hp-multiselect.hp-open"), function (wrapper) {
        if (wrapper === except) return;
        wrapper.classList.remove("hp-open");
        var trigger = wrapper.querySelector(".hp-multiselect-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    function setComboOpen(open) {
      combo.classList.toggle("hp-open", open);
      combo.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) renderOptions(search.value);
    }

    function updateCount() {
      count.textContent = "共" + records.length + "个";
    }

    function blankRecord() {
      var blank = {};
      fields.forEach(function (field) { blank[field.col] = ""; });
      blank.E = "新增危害岗位" + (records.length + 1);
      return blank;
    }

    function renderTable() {
      tableBody.innerHTML = records.map(function (record, rowIndex) {
        return '<tr' + (rowIndex === activeIndex ? ' class="hp-table-row-active"' : '') + '>' +
          fields.map(function (field) {
            return '<td data-column-name="' + escapeHtml(field.label) + '">' + tableControlHtml(field, record[field.col] || "", rowIndex) + '</td>';
          }).join("") +
          '<td class="hp-table-action"><button class="hp-table-delete" type="button" data-delete-row="' + rowIndex + '">删除</button></td></tr>';
      }).join("");
    }

    function renderTiles() {
      tileList.innerHTML = records.map(function (record, rowIndex) {
        return '<article class="hp-tile-card' + (rowIndex === activeIndex ? ' hp-tile-card-active' : '') + '" data-tile-record="' + rowIndex + '">' +
          '<div class="hp-tile-fields">' + fields.map(function (field) {
            return '<div class="hp-tile-field"><label>' + (field.optional ? '' : '<span class="hp-required">*</span>') + escapeHtml(field.label) + '：</label>' +
              tileControlHtml(field, record[field.col] || "", rowIndex) + '</div>';
          }).join("") + '</div>' +
          '<div class="hp-tile-actions" aria-label="第' + (rowIndex + 1) + '条岗位操作">' +
            '<button class="hp-tile-delete" type="button" data-tile-delete="' + rowIndex + '">删除</button>' +
          '</div></article>';
      }).join("");
    }

    function captureRecord() {
      var record = records[activeIndex];
      if (!record) return;
      Array.prototype.forEach.call(panel.querySelectorAll("[data-column]"), function (control) {
        record[control.getAttribute("data-column")] = control.value;
      });
    }

    function restoreRecord(index) {
      var record = records[index];
      if (!record) return;
      activeIndex = index;
      Array.prototype.forEach.call(panel.querySelectorAll("[data-column]"), function (control) {
        setControlValue(control, record[control.getAttribute("data-column")] || "");
      });
      search.value = record.E || ("危害岗位" + (index + 1));
      renderOptions("");
      renderTable();
      renderTiles();
    }

    function selectRecord(index) {
      captureRecord();
      restoreRecord(index);
      setComboOpen(false);
      search.blur();
    }

    function renderOptions(keyword) {
      var normalized = String(keyword || "").trim().toLowerCase();
      options.innerHTML = "";
      records.forEach(function (record, index) {
        var name = record.E || ("危害岗位" + (index + 1));
        if (normalized && name.toLowerCase().indexOf(normalized) === -1) return;
        var option = document.createElement("div");
        option.className = "hp-option";
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
        option.textContent = name;
        option.addEventListener("mousedown", function (event) {
          event.preventDefault();
          selectRecord(index);
        });
        options.appendChild(option);
      });
      if (!options.children.length) {
        options.innerHTML = '<div class="hp-empty">未找到匹配岗位</div>';
      }
    }

    function closeOtherTabs() {
      ["rpnTabButton", "pvTabButton", "haTabButton"].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
          element.classList.remove("active");
          element.setAttribute("aria-selected", "false");
        }
      });
      ["rpnTabPanel", "pvTabPanel", "haTabPanel"].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) element.classList.remove("active");
      });
    }

    function closeHazard() {
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
      tab.addEventListener("click", closeHazard);
    });
    ["rpnTabButton", "pvTabButton", "haTabButton"].forEach(function (id) {
      var otherButton = document.getElementById(id);
      if (otherButton) otherButton.addEventListener("click", closeHazard);
    });

    panel.querySelector("#hpToggle").addEventListener("click", function (event) {
      event.stopPropagation();
      setComboOpen(!combo.classList.contains("hp-open"));
      search.focus();
      search.select();
    });
    search.addEventListener("focus", function () { setComboOpen(true); });
    search.addEventListener("click", function (event) { event.stopPropagation(); setComboOpen(true); });
    search.addEventListener("input", function () { setComboOpen(true); renderOptions(search.value); });
    search.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setComboOpen(false);
      if (event.key === "Enter") {
        var first = options.querySelector(".hp-option");
        if (first) first.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        event.preventDefault();
      }
    });
    panel.addEventListener("input", function (event) {
      var col = event.target.getAttribute("data-column");
      if (!col || !records[activeIndex]) return;
      records[activeIndex][col] = event.target.value;
      var tableControl = tableBody.querySelector('[data-table-row="' + activeIndex + '"][data-table-column="' + col + '"]');
      setControlValue(tableControl, event.target.value);
      var tileControl = tileList.querySelector('[data-tile-row="' + activeIndex + '"][data-tile-column="' + col + '"]');
      setControlValue(tileControl, event.target.value);
      if (col === "E") {
        search.value = event.target.value;
        renderOptions("");
      }
    });
    panel.querySelector("#hpAdd").addEventListener("click", function () {
      captureRecord();
      records.push(blankRecord());
      restoreRecord(records.length - 1);
      updateCount();
      showToast("已新增危害岗位");
    });
    panel.querySelector("#hpDelete").addEventListener("click", function () {
      if (records.length === 1) {
        showToast("至少保留一条危害岗位信息");
        return;
      }
      records.splice(activeIndex, 1);
      restoreRecord(Math.min(activeIndex, records.length - 1));
      updateCount();
      showToast("已删除当前危害岗位");
    });
    panel.querySelector("#hpTableAdd").addEventListener("click", function () {
      captureRecord();
      records.push(blankRecord());
      restoreRecord(records.length - 1);
      updateCount();
      showToast("已新增一行危害岗位");
    });
    tableBody.addEventListener("input", function (event) {
      var rowIndex = Number(event.target.getAttribute("data-table-row"));
      var col = event.target.getAttribute("data-table-column");
      if (!Number.isFinite(rowIndex) || !col || !records[rowIndex]) return;
      records[rowIndex][col] = event.target.value;
      if (rowIndex === activeIndex) {
        var formControl = panel.querySelector('[data-column="' + col + '"]');
        setControlValue(formControl, event.target.value);
        if (col === "E") {
          search.value = event.target.value;
          renderOptions("");
        }
      }
      var tileControl = tileList.querySelector('[data-tile-row="' + rowIndex + '"][data-tile-column="' + col + '"]');
      setControlValue(tileControl, event.target.value);
    });
    tableBody.addEventListener("click", function (event) {
      var button = event.target.closest("[data-delete-row]");
      if (!button) return;
      var rowIndex = Number(button.getAttribute("data-delete-row"));
      if (records.length === 1) {
        showToast("至少保留一条危害岗位信息");
        return;
      }
      records.splice(rowIndex, 1);
      if (rowIndex < activeIndex) activeIndex -= 1;
      activeIndex = Math.min(activeIndex, records.length - 1);
      restoreRecord(activeIndex);
      updateCount();
      showToast("已删除该行危害岗位");
    });
    tileList.addEventListener("input", function (event) {
      var rowIndex = Number(event.target.getAttribute("data-tile-row"));
      var col = event.target.getAttribute("data-tile-column");
      if (!Number.isFinite(rowIndex) || !col || !records[rowIndex]) return;
      records[rowIndex][col] = event.target.value;
      var tableControl = tableBody.querySelector('[data-table-row="' + rowIndex + '"][data-table-column="' + col + '"]');
      setControlValue(tableControl, event.target.value);
      if (rowIndex === activeIndex) {
        var formControl = panel.querySelector('[data-column="' + col + '"]');
        setControlValue(formControl, event.target.value);
        if (col === "E") {
          search.value = event.target.value;
          renderOptions("");
        }
      }
    });
    tileList.addEventListener("click", function (event) {
      var deleteButton = event.target.closest("[data-tile-delete]");
      if (!deleteButton) return;
      var rowIndex = Number(deleteButton.getAttribute("data-tile-delete"));
      if (records.length === 1) {
        showToast("至少保留一条危害岗位信息");
        return;
      }
      records.splice(rowIndex, 1);
      if (rowIndex < activeIndex) activeIndex -= 1;
      activeIndex = Math.min(activeIndex, records.length - 1);
      restoreRecord(activeIndex);
      updateCount();
      showToast("已删除该条危害岗位");
    });
    panel.querySelector("#hpImport").addEventListener("click", function () { showToast("请选择危害岗位信息导入文件"); });
    panel.querySelector("#hpExport").addEventListener("click", function () { showToast("危害岗位信息导出任务已创建"); });
    panel.addEventListener("click", function (event) {
      var trigger = event.target.closest(".hp-multiselect-trigger");
      if (!trigger) return;
      event.stopPropagation();
      var wrapper = trigger.closest(".hp-multiselect");
      var open = !wrapper.classList.contains("hp-open");
      closeMultiselects(wrapper);
      wrapper.classList.toggle("hp-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.addEventListener("change", function (event) {
      if (!event.target.matches('.hp-multiselect-option input[type="checkbox"]')) return;
      var wrapper = event.target.closest(".hp-multiselect");
      var hidden = wrapper.querySelector('input[type="hidden"]');
      var checkboxes = Array.prototype.slice.call(wrapper.querySelectorAll('.hp-multiselect-option input[type="checkbox"]'));
      if (event.target.value === "不涉及" && event.target.checked) {
        checkboxes.forEach(function (checkbox) { if (checkbox !== event.target) checkbox.checked = false; });
      } else if (event.target.checked) {
        checkboxes.forEach(function (checkbox) { if (checkbox.value === "不涉及") checkbox.checked = false; });
      }
      var selected = checkboxes.filter(function (checkbox) { return checkbox.checked; }).map(function (checkbox) { return checkbox.value; });
      hidden.value = selected.join("、");
      wrapper.querySelector(".hp-multiselect-text").textContent = selected.length ? selected.join("、") : "请选择";
      hidden.dispatchEvent(new Event("input", { bubbles: true }));
    });
    document.addEventListener("click", function (event) {
      if (!combo.contains(event.target)) setComboOpen(false);
      if (!event.target.closest(".hp-multiselect")) closeMultiselects();
    });

    updateCount();
    restoreRecord(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
