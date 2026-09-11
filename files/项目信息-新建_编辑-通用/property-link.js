(function () {
  "use strict";

  var buildingNames = [
    "招商蛇口项目-1号楼",
    "招商蛇口项目-2号楼",
    "招商蛇口项目-3号楼",
    "招商蛇口项目-综合楼",
    "招商蛇口项目-商业裙楼",
    "招商蛇口项目-地下车库"
  ];

  var propertyLinkTip = "按来源物业分别保存。保存当前物业不会覆盖其他物业的选择。关联后以物业为准，物业删除业主信息不联动删除";
  var relatedPropertySourceTip = "来源于关联的物业信息，以物业维护为主，关联后需删除关联信息通过取消关联勾选或手动删除";

  var emergencyResources = [
    { name: "XX公安局", type: "公安救援机构", contact: "张三", phone: "0755-88888888", address: "广东省深圳市南山区海运路1号" },
    { name: "XX交通救援站", type: "交通救援机构", contact: "张三", phone: "075588888888", address: "江苏南京栖霞区燕城大道1号" },
    { name: "xxxx医院", type: "医疗救援机构", contact: "张三", phone: "0755-88888888", address: "广东省深圳市南山区海运路1号" },
    { name: "xxx消防站", type: "消防救援机构", contact: "张三", phone: "075588888888", address: "江苏南京栖霞区燕城大道1号" },
    { name: "xxx环境救援机构", type: "环境救援机构", contact: "张三", phone: "0755-88888888", address: "广东省深圳市南山区海运路1号" },
    { name: "xxxx特种设备救援机构", type: "特种设备救援机构", contact: "张三", phone: "075588888888", address: "江苏南京栖霞区燕城大道1号" },
    { name: "xxxx", type: "其他机构", contact: "张三", phone: "075588888888", address: "江苏南京栖霞区燕城大道1号" }
  ];

  var emergencyMaterials = [
    { name: "防火服", category: "防护用品", quantity: "8", status: "完好", risk: "火灾风险", valid: "是", equipped: "否" },
    { name: "防毒面具", category: "防护用品", quantity: "12", status: "完好", risk: "火灾风险", valid: "是", equipped: "否" },
    { name: "救生缆索", category: "生命救助", quantity: "14", status: "完好", risk: "火灾风险", valid: "是", equipped: "否" },
    { name: "救生圈", category: "生命救助", quantity: "8", status: "待修", risk: "水域风险", valid: "是", equipped: "是" },
    { name: "应急照明灯", category: "器材工具", quantity: "10", status: "完好", risk: "停电风险", valid: "是", equipped: "是" },
    { name: "棉被", category: "临时食宿", quantity: "30", status: "完好", risk: "极端天气", valid: "是", equipped: "是" },
    { name: "水下呼吸器", category: "防护用品", quantity: "4", status: "待修", risk: "水域风险", valid: "否", equipped: "否" }
  ];

  var emergencyTeams = [
    { name: "招商城科现场应急组织", total: "5", level: "企业级", property: "企业兼职应急队伍", type: "消防救援队", risk: "火灾,触电", nearby: "否", external: "否", standard: "是" },
    { name: "蛇口网谷应急队伍", total: "12", level: "企业级", property: "企业专职应急队伍", type: "消防救援队", risk: "火灾风险", nearby: "是", external: "否", standard: "是" },
    { name: "青羊项目应急队伍", total: "8", level: "企业级", property: "企业兼职应急队伍", type: "路桥抢修队", risk: "高处坠落风险", nearby: "否", external: "否", standard: "是" },
    { name: "深圳区域抢险队", total: "20", level: "地市级", property: "专业应急队伍", type: "抢险打捞队", risk: "淹溺风险", nearby: "是", external: "是", standard: "是" },
    { name: "港航分局救援队", total: "16", level: "省级", property: "外部协议应急队伍", type: "海上搜救队", risk: "水域风险", nearby: "是", external: "是", standard: "是" },
    { name: "危化品事故处置队", total: "10", level: "企业级", property: "企业专职应急队伍", type: "危险化学品事故救援队", risk: "危险化学品风险", nearby: "否", external: "否", standard: "是" }
  ];

  function numberValue(value, fallback) {
    var parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  function createOption(value, isAll) {
    return '<label class="ai-property-option">' +
      '<input type="checkbox" ' + (isAll ? 'data-all="true"' : '') + ' value="' + value + '">' +
      '<span>' + value + '</span>' +
      '</label>';
  }

  function updateSelectedText(root) {
    var all = root.querySelector('input[data-all="true"]');
    var items = Array.prototype.slice.call(root.querySelectorAll('input:not([data-all="true"])'));
    var visibleItems = items.filter(function (input) {
      var option = input.closest(".ai-property-option");
      return option && option.style.display !== "none";
    });
    var checked = items.filter(function (input) { return input.checked; });
    var visibleChecked = visibleItems.filter(function (input) { return input.checked; });
    all.checked = visibleItems.length > 0 && visibleChecked.length === visibleItems.length;
    all.indeterminate = visibleChecked.length > 0 && visibleChecked.length < visibleItems.length;
    root.querySelector(".ai-property-selected").textContent = checked.length ?
      "已选择：" + checked.map(function (input) { return input.value; }).join("、") :
      "请选择需关联的项目名称-楼栋";
  }

  function syncChecked(root, selectedValues) {
    Array.prototype.forEach.call(root.querySelectorAll('input:not([data-all="true"])'), function (input) {
      input.checked = selectedValues.indexOf(input.value) > -1;
    });
    updateSelectedText(root);
  }

  function createPropertyLink(config) {
    if (document.getElementById(config.rootId)) return;

    var anchorButton = null;
    config.anchorIds.some(function (id) {
      anchorButton = document.getElementById(id);
      return !!anchorButton;
    });
    if (!anchorButton || !anchorButton.parentElement) return;

    var left = numberValue(anchorButton.style.left || window.getComputedStyle(anchorButton).left, config.fallbackLeft);
    var top = numberValue(anchorButton.style.top || window.getComputedStyle(anchorButton).top, config.fallbackTop);
    var width = numberValue(anchorButton.style.width || window.getComputedStyle(anchorButton).width, config.fallbackWidth || 92);

    var root = document.createElement("div");
    root.id = config.rootId;
    root.className = "ai-property-link";
    root.style.left = (left + width + 10) + "px";
    root.style.top = top + "px";
    root.innerHTML =
      '<button class="ai-property-link-button" type="button" aria-expanded="false">物业信息关联</button>' +
      '<span class="ai-property-summary"></span>' +
      '<div class="ai-property-mask" aria-hidden="true">' +
      '<div class="ai-property-modal" role="dialog" aria-modal="true" aria-label="物业信息关联">' +
      '<div class="ai-property-modal-title">物业信息关联</div>' +
      '<div class="ai-property-modal-tip">' + propertyLinkTip + '</div>' +
      '<div class="ai-property-modal-body">' +
      '<div class="ai-property-modal-label">项目名称-楼栋</div>' +
      '<input class="ai-property-search" type="text" placeholder="请输入项目名称或楼栋名称搜索">' +
      '<div class="ai-property-check-list">' +
      createOption("全选", true) +
      '<div class="ai-property-divider"></div>' +
      buildingNames.map(function (name) { return createOption(name, false); }).join("") +
      '<div class="ai-property-no-result" hidden>未找到匹配的项目名称-楼栋</div>' +
      '</div>' +
      '<div class="ai-property-selected">请选择需关联的项目名称-楼栋</div>' +
      '</div>' +
      '<div class="ai-property-modal-footer">' +
      '<button type="button" class="ai-property-cancel">取消</button>' +
      '<button type="button" class="ai-property-confirm">确定</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    anchorButton.parentElement.appendChild(root);

    var trigger = root.querySelector(".ai-property-link-button");
    var mask = root.querySelector(".ai-property-mask");
    var summary = root.querySelector(".ai-property-summary");
    var confirm = root.querySelector(".ai-property-confirm");
    var cancel = root.querySelector(".ai-property-cancel");
    var searchInput = root.querySelector(".ai-property-search");
    var noResult = root.querySelector(".ai-property-no-result");
    var all = root.querySelector('input[data-all="true"]');
    var items = Array.prototype.slice.call(root.querySelectorAll('input:not([data-all="true"])'));
    var selectedValues = [];

    function getVisibleItems() {
      return items.filter(function (input) {
        var option = input.closest(".ai-property-option");
        return option && option.style.display !== "none";
      });
    }

    function filterBuildings() {
      var keyword = searchInput.value.replace(/^\s+|\s+$/g, "").toLowerCase();
      var matchCount = 0;
      items.forEach(function (input) {
        var matched = !keyword || input.value.toLowerCase().indexOf(keyword) > -1;
        var option = input.closest(".ai-property-option");
        if (option) option.style.display = matched ? "" : "none";
        if (matched) matchCount += 1;
      });
      noResult.hidden = matchCount !== 0;
      updateSelectedText(root);
    }

    function openModal() {
      syncChecked(root, selectedValues);
      searchInput.value = "";
      filterBuildings();
      root.classList.add("open");
      mask.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () { searchInput.focus(); }, 0);
    }

    function closeModal() {
      root.classList.remove("open");
      mask.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      openModal();
    });

    all.addEventListener("change", function () {
      getVisibleItems().forEach(function (input) { input.checked = all.checked; });
      updateSelectedText(root);
    });

    searchInput.addEventListener("input", filterBuildings);

    items.forEach(function (input) {
      input.addEventListener("change", function () {
        updateSelectedText(root);
      });
    });

    root.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    confirm.addEventListener("click", function () {
      selectedValues = items.filter(function (input) { return input.checked; }).map(function (input) { return input.value; });
      summary.textContent = selectedValues.length ? "已关联：" + selectedValues.join("、") : "";
      closeModal();
    });

    cancel.addEventListener("click", function () {
      syncChecked(root, selectedValues);
      closeModal();
    });

    mask.addEventListener("click", function (event) {
      if (event.target === mask) {
        syncChecked(root, selectedValues);
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("open")) {
        syncChecked(root, selectedValues);
        closeModal();
      }
    });
  }

  function createEmergencyResourceRows() {
    return emergencyResources.map(function (item, index) {
      return '<tr data-name="' + item.name + '" data-type="' + item.type + '">' +
        '<td><input type="checkbox" value="' + index + '"></td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.type + '</td>' +
        '<td>' + item.contact + '</td>' +
        '<td>' + item.phone + '</td>' +
        '<td>' + item.address + '</td>' +
        '</tr>';
    }).join("");
  }

  function createEmergencyMaterialRows() {
    return emergencyMaterials.map(function (item, index) {
      return '<tr data-name="' + item.name + '" data-type="' + item.category + '">' +
        '<td><input type="checkbox" value="' + index + '"></td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.category + '</td>' +
        '<td>' + item.quantity + '</td>' +
        '<td>' + item.status + '</td>' +
        '<td>' + item.risk + '</td>' +
        '<td>' + item.valid + '</td>' +
        '<td>' + item.equipped + '</td>' +
        '</tr>';
    }).join("");
  }

  function createEmergencyTeamRows() {
    return emergencyTeams.map(function (item, index) {
      return '<tr data-name="' + item.name + '" data-type="' + item.type + '">' +
        '<td><input type="checkbox" value="' + index + '"></td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.total + '</td>' +
        '<td>' + item.level + '</td>' +
        '<td>' + item.property + '</td>' +
        '<td>' + item.type + '</td>' +
        '<td>' + item.risk + '</td>' +
        '<td>' + item.nearby + '</td>' +
        '<td>' + item.external + '</td>' +
        '<td>' + item.standard + '</td>' +
        '</tr>';
    }).join("");
  }

  function createEmergencyTeamLink(config) {
    if (document.getElementById(config.rootId)) return;
    var anchorButton = null;
    config.anchorIds.some(function (id) {
      anchorButton = document.getElementById(id);
      return !!anchorButton;
    });
    if (!anchorButton || !anchorButton.parentElement) return;

    var left = numberValue(anchorButton.style.left || window.getComputedStyle(anchorButton).left, config.fallbackLeft);
    var top = numberValue(anchorButton.style.top || window.getComputedStyle(anchorButton).top, config.fallbackTop);
    var width = numberValue(anchorButton.style.width || window.getComputedStyle(anchorButton).width, config.fallbackWidth || 92);

    var root = document.createElement("div");
    root.id = config.rootId;
    root.className = "ai-property-link ai-emergency-link ai-emergency-team-link";
    root.style.left = (left + width + 10) + "px";
    root.style.top = top + "px";
    root.innerHTML =
      '<button class="ai-property-link-button" type="button" aria-expanded="false">物业信息关联</button>' +
      '<span class="ai-property-summary"></span>' +
      '<div class="ai-property-mask" aria-hidden="true">' +
      '<div class="ai-property-modal ai-emergency-modal ai-emergency-team-modal" role="dialog" aria-modal="true" aria-label="物业信息关联">' +
      '<div class="ai-property-modal-title">物业信息关联</div>' +
      '<div class="ai-property-modal-tip">' + propertyLinkTip + '</div>' +
      '<div class="ai-emergency-filter">' +
      '<label>队伍类型</label>' +
      '<select class="ai-emergency-type">' +
      '<option value="">全部</option>' +
      '<option value="危险化学品事故救援队">危险化学品事故救援队</option>' +
      '<option value="海上搜救队">海上搜救队</option>' +
      '<option value="抢险打捞队">抢险打捞队</option>' +
      '<option value="路桥抢修队">路桥抢修队</option>' +
      '<option value="消防救援队">消防救援队</option>' +
      '<option value="其它专业救援队伍">其它专业救援队伍</option>' +
      '</select>' +
      '<label>队伍名称</label>' +
      '<input class="ai-emergency-name" type="text" placeholder="请输入队伍名称">' +
      '<button type="button" class="ai-emergency-search">查询</button>' +
      '</div>' +
      '<div class="ai-emergency-table-wrap">' +
      '<table class="ai-emergency-table ai-emergency-team-table">' +
      '<thead><tr>' +
      '<th><input type="checkbox" class="ai-emergency-check-all"></th>' +
      '<th>队伍名称</th><th>总人数</th><th>队伍级别</th><th>队伍属性</th><th>队伍类型</th><th>队伍主要应对事故风险类型</th><th>是否承担周边单位救援职责</th><th>是否具备对外救援能力</th><th>是否按适用法规标准设置队伍或人员</th>' +
      '</tr></thead>' +
      '<tbody>' + createEmergencyTeamRows() + '</tbody>' +
      '</table>' +
      '<div class="ai-emergency-no-result" hidden>未找到匹配的应急队伍</div>' +
      '</div>' +
      '<div class="ai-property-selected">请选择需关联的应急队伍</div>' +
      '<div class="ai-property-modal-footer">' +
      '<button type="button" class="ai-property-cancel">取消</button>' +
      '<button type="button" class="ai-property-confirm">确定关联</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    anchorButton.parentElement.appendChild(root);

    var trigger = root.querySelector(".ai-property-link-button");
    var mask = root.querySelector(".ai-property-mask");
    var summary = root.querySelector(".ai-property-summary");
    var confirm = root.querySelector(".ai-property-confirm");
    var cancel = root.querySelector(".ai-property-cancel");
    var typeSelect = root.querySelector(".ai-emergency-type");
    var nameInput = root.querySelector(".ai-emergency-name");
    var searchButton = root.querySelector(".ai-emergency-search");
    var checkAll = root.querySelector(".ai-emergency-check-all");
    var rows = Array.prototype.slice.call(root.querySelectorAll(".ai-emergency-table tbody tr"));
    var selected = [];

    function rowCheckboxes() {
      return rows.map(function (row) {
        return row.querySelector('input[type="checkbox"]');
      });
    }

    function visibleRows() {
      return rows.filter(function (row) {
        return row.style.display !== "none";
      });
    }

    function updateSelectedTeamsText() {
      var checkedRows = rows.filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      var visibleCheckedRows = visibleRows().filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      checkAll.checked = visibleRows().length > 0 && visibleCheckedRows.length === visibleRows().length;
      checkAll.indeterminate = visibleCheckedRows.length > 0 && visibleCheckedRows.length < visibleRows().length;
      root.querySelector(".ai-property-selected").textContent = checkedRows.length ?
        "已选择：" + checkedRows.map(function (row) { return row.getAttribute("data-name"); }).join("、") :
        "请选择需关联的应急队伍";
    }

    function filterTeamRows() {
      var type = typeSelect.value;
      var keyword = nameInput.value.replace(/^\s+|\s+$/g, "").toLowerCase();
      var matchCount = 0;
      rows.forEach(function (row) {
        var nameMatched = !keyword || row.getAttribute("data-name").toLowerCase().indexOf(keyword) > -1;
        var typeMatched = !type || row.getAttribute("data-type") === type;
        var matched = nameMatched && typeMatched;
        row.style.display = matched ? "" : "none";
        if (matched) matchCount += 1;
      });
      root.querySelector(".ai-emergency-no-result").hidden = matchCount !== 0;
      updateSelectedTeamsText();
    }

    function syncTeamChecked() {
      rowCheckboxes().forEach(function (checkbox) {
        checkbox.checked = selected.indexOf(checkbox.value) > -1;
      });
      updateSelectedTeamsText();
    }

    function openModal() {
      typeSelect.value = "";
      nameInput.value = "";
      syncTeamChecked();
      filterTeamRows();
      root.classList.add("open");
      mask.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () { nameInput.focus(); }, 0);
    }

    function closeModal() {
      root.classList.remove("open");
      mask.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      openModal();
    });

    typeSelect.addEventListener("change", filterTeamRows);
    nameInput.addEventListener("input", filterTeamRows);
    searchButton.addEventListener("click", filterTeamRows);

    checkAll.addEventListener("change", function () {
      visibleRows().forEach(function (row) {
        row.querySelector('input[type="checkbox"]').checked = checkAll.checked;
      });
      updateSelectedTeamsText();
    });

    rowCheckboxes().forEach(function (checkbox) {
      checkbox.addEventListener("change", updateSelectedTeamsText);
    });

    confirm.addEventListener("click", function () {
      selected = rowCheckboxes().filter(function (checkbox) { return checkbox.checked; }).map(function (checkbox) { return checkbox.value; });
      var selectedNames = selected.map(function (index) { return emergencyTeams[index].name; });
      summary.textContent = selectedNames.length ? "已关联：" + selectedNames.join("、") : "";
      closeModal();
    });

    cancel.addEventListener("click", function () {
      syncTeamChecked();
      closeModal();
    });

    root.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    mask.addEventListener("click", function (event) {
      if (event.target === mask) {
        syncTeamChecked();
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("open")) {
        syncTeamChecked();
        closeModal();
      }
    });
  }

  function createEmergencyMaterialLink(config) {
    if (document.getElementById(config.rootId)) return;
    var anchorButton = null;
    config.anchorIds.some(function (id) {
      anchorButton = document.getElementById(id);
      return !!anchorButton;
    });
    if (!anchorButton || !anchorButton.parentElement) return;

    var left = numberValue(anchorButton.style.left || window.getComputedStyle(anchorButton).left, config.fallbackLeft);
    var top = numberValue(anchorButton.style.top || window.getComputedStyle(anchorButton).top, config.fallbackTop);
    var width = numberValue(anchorButton.style.width || window.getComputedStyle(anchorButton).width, config.fallbackWidth || 92);

    var root = document.createElement("div");
    root.id = config.rootId;
    root.className = "ai-property-link ai-emergency-link ai-emergency-material-link";
    root.style.left = (left + width + 10) + "px";
    root.style.top = top + "px";
    root.innerHTML =
      '<button class="ai-property-link-button" type="button" aria-expanded="false">物业信息关联</button>' +
      '<span class="ai-property-summary"></span>' +
      '<div class="ai-property-mask" aria-hidden="true">' +
      '<div class="ai-property-modal ai-emergency-modal ai-emergency-material-modal" role="dialog" aria-modal="true" aria-label="物业信息关联">' +
      '<div class="ai-property-modal-title">物业信息关联</div>' +
      '<div class="ai-property-modal-tip">' + propertyLinkTip + '</div>' +
      '<div class="ai-emergency-filter">' +
      '<label>资源类型</label>' +
      '<select class="ai-emergency-type">' +
      '<option value="">全部</option>' +
      '<option value="防护用品">防护用品</option>' +
      '<option value="生命救助">生命救助</option>' +
      '<option value="临时食宿">临时食宿</option>' +
      '<option value="器材工具">器材工具</option>' +
      '</select>' +
      '<label>应急物资名称</label>' +
      '<input class="ai-emergency-name" type="text" placeholder="请输入应急物资名称">' +
      '<button type="button" class="ai-emergency-search">查询</button>' +
      '</div>' +
      '<div class="ai-emergency-table-wrap">' +
      '<table class="ai-emergency-table ai-emergency-material-table">' +
      '<thead><tr>' +
      '<th><input type="checkbox" class="ai-emergency-check-all"></th>' +
      '<th>应急物资名称</th><th>资源分类</th><th>资源数量</th><th>资源状态</th><th>主要事故风险</th><th>是否在有效期内</th><th>是否按适用法规标准进行配备</th>' +
      '</tr></thead>' +
      '<tbody>' + createEmergencyMaterialRows() + '</tbody>' +
      '</table>' +
      '<div class="ai-emergency-no-result" hidden>未找到匹配的应急物资</div>' +
      '</div>' +
      '<div class="ai-property-selected">请选择需关联的应急物资</div>' +
      '<div class="ai-property-modal-footer">' +
      '<button type="button" class="ai-property-cancel">取消</button>' +
      '<button type="button" class="ai-property-confirm">确定关联</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    anchorButton.parentElement.appendChild(root);

    var trigger = root.querySelector(".ai-property-link-button");
    var mask = root.querySelector(".ai-property-mask");
    var summary = root.querySelector(".ai-property-summary");
    var confirm = root.querySelector(".ai-property-confirm");
    var cancel = root.querySelector(".ai-property-cancel");
    var typeSelect = root.querySelector(".ai-emergency-type");
    var nameInput = root.querySelector(".ai-emergency-name");
    var searchButton = root.querySelector(".ai-emergency-search");
    var checkAll = root.querySelector(".ai-emergency-check-all");
    var rows = Array.prototype.slice.call(root.querySelectorAll(".ai-emergency-table tbody tr"));
    var selected = [];

    function rowCheckboxes() {
      return rows.map(function (row) {
        return row.querySelector('input[type="checkbox"]');
      });
    }

    function visibleRows() {
      return rows.filter(function (row) {
        return row.style.display !== "none";
      });
    }

    function updateSelectedMaterialsText() {
      var checkedRows = rows.filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      var visibleCheckedRows = visibleRows().filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      checkAll.checked = visibleRows().length > 0 && visibleCheckedRows.length === visibleRows().length;
      checkAll.indeterminate = visibleCheckedRows.length > 0 && visibleCheckedRows.length < visibleRows().length;
      root.querySelector(".ai-property-selected").textContent = checkedRows.length ?
        "已选择：" + checkedRows.map(function (row) { return row.getAttribute("data-name"); }).join("、") :
        "请选择需关联的应急物资";
    }

    function filterMaterialRows() {
      var type = typeSelect.value;
      var keyword = nameInput.value.replace(/^\s+|\s+$/g, "").toLowerCase();
      var matchCount = 0;
      rows.forEach(function (row) {
        var nameMatched = !keyword || row.getAttribute("data-name").toLowerCase().indexOf(keyword) > -1;
        var typeMatched = !type || row.getAttribute("data-type") === type;
        var matched = nameMatched && typeMatched;
        row.style.display = matched ? "" : "none";
        if (matched) matchCount += 1;
      });
      root.querySelector(".ai-emergency-no-result").hidden = matchCount !== 0;
      updateSelectedMaterialsText();
    }

    function syncMaterialChecked() {
      rowCheckboxes().forEach(function (checkbox) {
        checkbox.checked = selected.indexOf(checkbox.value) > -1;
      });
      updateSelectedMaterialsText();
    }

    function openModal() {
      typeSelect.value = "";
      nameInput.value = "";
      syncMaterialChecked();
      filterMaterialRows();
      root.classList.add("open");
      mask.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () { nameInput.focus(); }, 0);
    }

    function closeModal() {
      root.classList.remove("open");
      mask.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      openModal();
    });

    typeSelect.addEventListener("change", filterMaterialRows);
    nameInput.addEventListener("input", filterMaterialRows);
    searchButton.addEventListener("click", filterMaterialRows);

    checkAll.addEventListener("change", function () {
      visibleRows().forEach(function (row) {
        row.querySelector('input[type="checkbox"]').checked = checkAll.checked;
      });
      updateSelectedMaterialsText();
    });

    rowCheckboxes().forEach(function (checkbox) {
      checkbox.addEventListener("change", updateSelectedMaterialsText);
    });

    confirm.addEventListener("click", function () {
      selected = rowCheckboxes().filter(function (checkbox) { return checkbox.checked; }).map(function (checkbox) { return checkbox.value; });
      var selectedNames = selected.map(function (index) { return emergencyMaterials[index].name; });
      summary.textContent = selectedNames.length ? "已关联：" + selectedNames.join("、") : "";
      closeModal();
    });

    cancel.addEventListener("click", function () {
      syncMaterialChecked();
      closeModal();
    });

    root.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    mask.addEventListener("click", function (event) {
      if (event.target === mask) {
        syncMaterialChecked();
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("open")) {
        syncMaterialChecked();
        closeModal();
      }
    });
  }

  function createEmergencyResourceLink(config) {
    if (document.getElementById(config.rootId)) return;
    var anchorButton = null;
    config.anchorIds.some(function (id) {
      anchorButton = document.getElementById(id);
      return !!anchorButton;
    });
    if (!anchorButton || !anchorButton.parentElement) return;

    var left = numberValue(anchorButton.style.left || window.getComputedStyle(anchorButton).left, config.fallbackLeft);
    var top = numberValue(anchorButton.style.top || window.getComputedStyle(anchorButton).top, config.fallbackTop);
    var width = numberValue(anchorButton.style.width || window.getComputedStyle(anchorButton).width, config.fallbackWidth || 92);

    var root = document.createElement("div");
    root.id = config.rootId;
    root.className = "ai-property-link ai-emergency-link";
    root.style.left = (left + width + 10) + "px";
    root.style.top = top + "px";
    root.innerHTML =
      '<button class="ai-property-link-button" type="button" aria-expanded="false">物业信息关联</button>' +
      '<span class="ai-property-summary"></span>' +
      '<div class="ai-property-mask" aria-hidden="true">' +
      '<div class="ai-property-modal ai-emergency-modal" role="dialog" aria-modal="true" aria-label="物业信息关联">' +
      '<div class="ai-property-modal-title">物业信息关联</div>' +
      '<div class="ai-property-modal-tip">' + propertyLinkTip + '</div>' +
      '<div class="ai-emergency-filter">' +
      '<label>资源类型</label>' +
      '<select class="ai-emergency-type">' +
      '<option value="">全部</option>' +
      '<option value="公安救援机构">公安救援机构</option>' +
      '<option value="交通救援机构">交通救援机构</option>' +
      '<option value="医疗救援机构">医疗救援机构</option>' +
      '<option value="消防救援机构">消防救援机构</option>' +
      '<option value="环境救援机构">环境救援机构</option>' +
      '<option value="特种设备救援机构">特种设备救援机构</option>' +
      '<option value="其他机构">其他机构</option>' +
      '</select>' +
      '<label>应急资源名称</label>' +
      '<input class="ai-emergency-name" type="text" placeholder="请输入应急资源名称">' +
      '<button type="button" class="ai-emergency-search">查询</button>' +
      '</div>' +
      '<div class="ai-emergency-table-wrap">' +
      '<table class="ai-emergency-table">' +
      '<thead><tr>' +
      '<th><input type="checkbox" class="ai-emergency-check-all"></th>' +
      '<th>应急资源名称</th><th>资源类型</th><th>联系人</th><th>联系电话</th><th>地址</th>' +
      '</tr></thead>' +
      '<tbody>' + createEmergencyResourceRows() + '</tbody>' +
      '</table>' +
      '<div class="ai-emergency-no-result" hidden>未找到匹配的应急资源</div>' +
      '</div>' +
      '<div class="ai-property-selected">请选择需关联的应急资源</div>' +
      '<div class="ai-property-modal-footer">' +
      '<button type="button" class="ai-property-cancel">取消</button>' +
      '<button type="button" class="ai-property-confirm">确定关联</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    anchorButton.parentElement.appendChild(root);

    var trigger = root.querySelector(".ai-property-link-button");
    var mask = root.querySelector(".ai-property-mask");
    var summary = root.querySelector(".ai-property-summary");
    var confirm = root.querySelector(".ai-property-confirm");
    var cancel = root.querySelector(".ai-property-cancel");
    var typeSelect = root.querySelector(".ai-emergency-type");
    var nameInput = root.querySelector(".ai-emergency-name");
    var searchButton = root.querySelector(".ai-emergency-search");
    var checkAll = root.querySelector(".ai-emergency-check-all");
    var rows = Array.prototype.slice.call(root.querySelectorAll(".ai-emergency-table tbody tr"));
    var selected = [];

    function rowCheckboxes() {
      return rows.map(function (row) {
        return row.querySelector('input[type="checkbox"]');
      });
    }

    function visibleRows() {
      return rows.filter(function (row) {
        return row.style.display !== "none";
      });
    }

    function updateEmergencySelectedText() {
      var checkedRows = rows.filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      var visibleCheckedRows = visibleRows().filter(function (row) {
        return row.querySelector('input[type="checkbox"]').checked;
      });
      checkAll.checked = visibleRows().length > 0 && visibleCheckedRows.length === visibleRows().length;
      checkAll.indeterminate = visibleCheckedRows.length > 0 && visibleCheckedRows.length < visibleRows().length;
      root.querySelector(".ai-property-selected").textContent = checkedRows.length ?
        "已选择：" + checkedRows.map(function (row) { return row.getAttribute("data-name"); }).join("、") :
        "请选择需关联的应急资源";
    }

    function filterEmergencyRows() {
      var type = typeSelect.value;
      var keyword = nameInput.value.replace(/^\s+|\s+$/g, "").toLowerCase();
      var matchCount = 0;
      rows.forEach(function (row) {
        var nameMatched = !keyword || row.getAttribute("data-name").toLowerCase().indexOf(keyword) > -1;
        var typeMatched = !type || row.getAttribute("data-type") === type;
        var matched = nameMatched && typeMatched;
        row.style.display = matched ? "" : "none";
        if (matched) matchCount += 1;
      });
      root.querySelector(".ai-emergency-no-result").hidden = matchCount !== 0;
      updateEmergencySelectedText();
    }

    function syncEmergencyChecked() {
      rowCheckboxes().forEach(function (checkbox) {
        checkbox.checked = selected.indexOf(checkbox.value) > -1;
      });
      updateEmergencySelectedText();
    }

    function openModal() {
      typeSelect.value = "";
      nameInput.value = "";
      syncEmergencyChecked();
      filterEmergencyRows();
      root.classList.add("open");
      mask.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () { nameInput.focus(); }, 0);
    }

    function closeModal() {
      root.classList.remove("open");
      mask.setAttribute("aria-hidden", "true");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      openModal();
    });

    typeSelect.addEventListener("change", filterEmergencyRows);
    nameInput.addEventListener("input", filterEmergencyRows);
    searchButton.addEventListener("click", filterEmergencyRows);

    checkAll.addEventListener("change", function () {
      visibleRows().forEach(function (row) {
        row.querySelector('input[type="checkbox"]').checked = checkAll.checked;
      });
      updateEmergencySelectedText();
    });

    rowCheckboxes().forEach(function (checkbox) {
      checkbox.addEventListener("change", updateEmergencySelectedText);
    });

    confirm.addEventListener("click", function () {
      selected = rowCheckboxes().filter(function (checkbox) { return checkbox.checked; }).map(function (checkbox) { return checkbox.value; });
      var selectedNames = selected.map(function (index) { return emergencyResources[index].name; });
      summary.textContent = selectedNames.length ? "已关联：" + selectedNames.join("、") : "";
      closeModal();
    });

    cancel.addEventListener("click", function () {
      syncEmergencyChecked();
      closeModal();
    });

    root.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    mask.addEventListener("click", function (event) {
      if (event.target === mask) {
        syncEmergencyChecked();
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("open")) {
        syncEmergencyChecked();
        closeModal();
      }
    });
  }

  function setSelectFirstOption(selectId, text) {
    var select = document.getElementById(selectId);
    if (!select || !select.options.length) return;
    select.options[0].text = text;
    select.options[0].value = text;
  }

  function moveWidget(id, left, top) {
    var widget = document.getElementById(id);
    if (!widget) return;
    widget.style.left = left + "px";
    if (typeof top === "number") widget.style.top = top + "px";
  }

  function hideWidget(id) {
    var widget = document.getElementById(id);
    if (!widget) return;
    widget.style.display = "none";
    widget.style.visibility = "hidden";
  }

  function createInlineLabel(config) {
    if (document.getElementById(config.id)) return;
    var parent = document.getElementById(config.parentId) ||
      document.getElementById("u7834_state0_content") ||
      document.getElementById("u7834_state0");
    if (!parent) return;
    var label = document.createElement("div");
    label.id = config.id;
    label.className = "ai-special-query-label";
    label.style.left = config.left + "px";
    label.style.top = config.top + "px";
    label.textContent = config.text;
    parent.appendChild(label);
  }

  function adjustSpecialEquipmentFilters() {
    setSelectFirstOption("u8028_input", "请选择");
    setSelectFirstOption("u8032_input", "请选择");
    moveWidget("u8028", 700, 0);
    moveWidget("u8031", 890, 0);
    createInlineLabel({ id: "aiSpecialStatusLabel", parentId: "u7834_state0_content", text: "状态", left: 620, top: 6 });
    createInlineLabel({ id: "aiSpecialDeviceTypeLabel", parentId: "u7834_state0_content", text: "设备类型", left: 805, top: 6 });
  }

  function adjustOtherEquipmentFilters() {
    setSelectFirstOption("u8250_input", "请选择");
    moveWidget("u8250", 700, 0);
    hideWidget("u8252");
    hideWidget("u8253");
    hideWidget("u8278");
    createInlineLabel({ id: "aiOtherSpecialStatusLabel", parentId: "u7834_state1_content", text: "状态", left: 620, top: 6 });
  }

  function textOf(node) {
    return (node && (node.innerText || node.textContent) || "").replace(/\s+/g, "").replace(/\u00a0/g, "");
  }

  function numericStyle(element, prop, fallback) {
    var value = numberValue(element.style[prop] || window.getComputedStyle(element)[prop], fallback);
    return isNaN(value) ? fallback : value;
  }

  function createRelatedProjectCell(parent, sourceCell, text, width, className) {
    var cell = document.createElement("div");
    cell.className = "ax_default table_cell ai-related-project-cell " + (className || "");
    cell.style.left = numericStyle(sourceCell, "left", 0) + "px";
    cell.style.top = numericStyle(sourceCell, "top", 0) + "px";
    cell.style.width = width + "px";
    cell.style.height = numericStyle(sourceCell, "height", 30) + "px";
    if (className && className.indexOf("ai-related-project-header") > -1) {
      cell.innerHTML = '<div class="text"><p><span>' + text + '</span><span class="ai-related-tip-wrap"><button type="button" class="ai-related-tip">?</button><span class="ai-related-tooltip">' + relatedPropertySourceTip + '</span></span></p></div>';
    } else {
      cell.innerHTML = '<div class="text"><p><span>' + text + '</span></p></div>';
    }
    parent.appendChild(cell);
  }

  function insertRelatedProjectColumn(config) {
    var parent = document.getElementById(config.tableId);
    if (!parent || parent.dataset.aiRelatedProjectColumn === "yes") return;

    var cells = Array.prototype.slice.call(parent.children).filter(function (child) {
      return child.classList && child.classList.contains("table_cell");
    });
    var operationHeader = cells.find(function (cell) {
      return textOf(cell) === "操作";
    });
    if (!operationHeader) return;

    var insertWidth = config.width || 160;
    var operationLeft = numericStyle(operationHeader, "left", 0);
    var operationCells = cells.filter(function (cell) {
      return Math.abs(numericStyle(cell, "left", -9999) - operationLeft) < 2;
    });
    var valueRows = operationCells
      .filter(function (cell) {
        return numericStyle(cell, "top", 0) > numericStyle(operationHeader, "top", 0);
      })
      .sort(function (a, b) {
        return numericStyle(a, "top", 0) - numericStyle(b, "top", 0);
      });

    createRelatedProjectCell(parent, operationHeader, "关联物业来源", insertWidth, "ai-related-project-header");
    valueRows.forEach(function (cell, index) {
      createRelatedProjectCell(parent, cell, config.values[index] || "-", insertWidth, "");
    });
    operationCells.forEach(function (cell) {
      cell.style.left = (numericStyle(cell, "left", 0) + insertWidth) + "px";
    });
    parent.style.width = (numericStyle(parent, "width", parent.offsetWidth || 0) + insertWidth) + "px";

    parent.dataset.aiRelatedProjectColumn = "yes";
  }

  function addRelatedProjectColumns() {
    insertRelatedProjectColumn({
      tableId: "u7313",
      width: 170,
      values: ["招商蛇口项目-1号楼", "招商蛇口项目-2号楼", "招商蛇口项目-综合楼", "-"]
    });
    insertRelatedProjectColumn({
      tableId: "u7853",
      width: 170,
      values: ["招商蛇口项目-1号楼", "-", "招商蛇口项目-综合楼", "-", "招商蛇口项目-商业裙楼", "-", "-"]
    });
    insertRelatedProjectColumn({
      tableId: "u6477",
      width: 170,
      values: ["招商蛇口项目-1号楼", "招商蛇口项目-2号楼", "-", "招商蛇口项目-综合楼", "-", "招商蛇口项目-商业裙楼", "-"]
    });
    insertRelatedProjectColumn({
      tableId: "u8318",
      width: 170,
      values: ["招商蛇口项目-1号楼", "-", "招商蛇口项目-综合楼", "招商蛇口项目-商业裙楼", "-", "-", "-"]
    });
    insertRelatedProjectColumn({
      tableId: "u8431",
      width: 170,
      values: ["招商蛇口项目-1号楼", "招商蛇口项目-2号楼", "-", "招商蛇口项目-综合楼", "-", "招商蛇口项目-商业裙楼", "-"]
    });
    Array.prototype.slice.call(document.querySelectorAll(".ax_default")).forEach(function (parent) {
      if (parent.dataset.aiRelatedProjectColumn === "yes") return;
      var content = textOf(parent);
      if (content.indexOf("设备名称") === -1 || content.indexOf("楼栋名称") === -1 || content.indexOf("操作") === -1) return;
      insertRelatedProjectColumn({
        tableId: parent.id,
        width: 170,
        values: ["招商蛇口项目-1号楼", "-", "招商蛇口项目-综合楼", "-", "-"]
      });
    });
  }

  function bindRelatedTooltips() {
    if (document.body.dataset.aiRelatedTooltipBound === "yes") return;
    document.body.dataset.aiRelatedTooltipBound = "yes";
    document.addEventListener("click", function (event) {
      var tip = event.target.closest(".ai-related-tip");
      Array.prototype.forEach.call(document.querySelectorAll(".ai-related-tip-wrap.open"), function (wrap) {
        if (!tip || !wrap.contains(tip)) wrap.classList.remove("open");
      });
      if (!tip) return;
      event.preventDefault();
      event.stopPropagation();
      tip.closest(".ai-related-tip-wrap").classList.toggle("open");
    });
  }

  function init() {
    createPropertyLink({
      rootId: "aiPropertyLink",
      anchorIds: ["u7437", "u4855"],
      fallbackLeft: 327,
      fallbackTop: 20,
      fallbackWidth: 92
    });

    createPropertyLink({
      rootId: "aiSpecialEquipmentPropertyLink",
      anchorIds: ["u8055"],
      fallbackLeft: 394,
      fallbackTop: 0,
      fallbackWidth: 83
    });

    createPropertyLink({
      rootId: "aiOtherEquipmentPropertyLink",
      anchorIds: ["u8277"],
      fallbackLeft: 394,
      fallbackTop: 0,
      fallbackWidth: 83
    });

    createEmergencyResourceLink({
      rootId: "aiEmergencyResourcePropertyLink",
      anchorIds: ["u8417"],
      fallbackLeft: 331,
      fallbackTop: 0,
      fallbackWidth: 92
    });

    createEmergencyMaterialLink({
      rootId: "aiEmergencyMaterialPropertyLink",
      anchorIds: ["u8543"],
      fallbackLeft: 331,
      fallbackTop: 0,
      fallbackWidth: 92
    });

    createEmergencyTeamLink({
      rootId: "aiEmergencyTeamPropertyLink",
      anchorIds: ["u6613"],
      fallbackLeft: 329,
      fallbackTop: 17,
      fallbackWidth: 92
    });

    adjustSpecialEquipmentFilters();
    adjustOtherEquipmentFilters();
    addRelatedProjectColumns();
    bindRelatedTooltips();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
