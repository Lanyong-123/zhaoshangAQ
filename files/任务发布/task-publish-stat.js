(function () {
  "use strict";

  var statData = {
    shouldProject: {
      title: "应发项目数",
      value: 42,
      rows: [
        ["产业园区", "蛇口网谷项目"],
        ["在建工程", "青羊158亩项目部"],
        ["物业管理", "招商局海南区域总部写字楼"],
        ["邮轮母港", "深圳邮轮母港"],
        ["商业管理", "招商蛇口项目-商业裙楼"]
      ]
    },
    unpubProject: {
      title: "未发项目数",
      value: 5,
      rows: [
        ["产业园区", "招商蛇口项目-1号楼"],
        ["物业管理", "招商蛇口项目-综合楼"],
        ["商业管理", "招商蛇口项目-商业裙楼"],
        ["交通枢纽", "深圳邮轮母港停车楼"],
        ["办公物业", "总部写字楼"]
      ]
    },
    shouldOrg: {
      title: "应发组织数",
      value: 18,
      rows: [
        ["区域公司", "华南区域"],
        ["专业公司", "招商积余"],
        ["城市公司", "深圳公司"],
        ["城市公司", "广州公司"],
        ["城市公司", "珠海公司"]
      ]
    },
    unpubOrg: {
      title: "未发组织数",
      value: 3,
      rows: [
        ["区域公司", "华中区域"],
        ["城市公司", "湛江公司"],
        ["专业公司", "邮轮母港事业部"]
      ]
    }
  };

  function createStatBar() {
    if (document.getElementById("aiTaskPublishStat")) return;

    var bar = document.createElement("div");
    bar.id = "aiTaskPublishStat";
    bar.className = "ai-task-publish-stat";
    bar.innerHTML =
      '<div class="ai-task-publish-stat__tip" title="剔除不参与HSE监测评估的组织、项目，根据查询条件统计去重后的组织、项目已发布数和未发布数">' +
      "统计提示：剔除不参与HSE监测评估的组织、项目，根据查询条件统计去重后的组织、项目已发布数和未发布数" +
      "</div>" +
      '<div class="ai-task-publish-stat__items">' +
      createItem("shouldProject") +
      createItem("unpubProject") +
      createItem("shouldOrg") +
      createItem("unpubOrg") +
      "</div>";

    var base = document.getElementById("base");
    (base || document.body).appendChild(bar);
  }

  function createItem(key) {
    var item = statData[key];
    return (
      '<span class="ai-task-publish-stat__item">' +
      item.title +
      "：" +
      '<button type="button" class="ai-task-publish-stat__num" data-stat-key="' +
      key +
      '">' +
      item.value +
      "</button>" +
      "</span>"
    );
  }

  function createModal() {
    if (document.getElementById("aiTaskPublishModalMask")) return;

    var mask = document.createElement("div");
    mask.id = "aiTaskPublishModalMask";
    mask.className = "ai-task-publish-modal-mask";
    mask.innerHTML =
      '<div class="ai-task-publish-modal" role="dialog" aria-modal="true">' +
      '<div class="ai-task-publish-modal__header">' +
      '<div class="ai-task-publish-modal__title" id="aiTaskPublishModalTitle">明细列表</div>' +
      '<button type="button" class="ai-task-publish-modal__close" aria-label="关闭">×</button>' +
      "</div>" +
      '<div class="ai-task-publish-modal__body">' +
      '<div class="ai-task-publish-modal__toolbar">' +
      '<span id="aiTaskPublishModalCount">共 0 条记录</span>' +
      '<button type="button" class="ai-task-publish-modal__export">导出</button>' +
      "</div>" +
      "<table>" +
      "<thead><tr><th>所属组织/业态</th><th>组织/项目名称</th></tr></thead>" +
      '<tbody id="aiTaskPublishModalBody"></tbody>' +
      "</table>" +
      "</div>" +
      "</div>";

    document.body.appendChild(mask);

    mask.addEventListener("click", function (event) {
      if (event.target === mask || event.target.classList.contains("ai-task-publish-modal__close")) {
        closeModal();
      }
    });

    mask.querySelector(".ai-task-publish-modal__export").addEventListener("click", exportCurrentRows);
  }

  var currentKey = "";

  function openModal(key) {
    currentKey = key;
    var data = statData[key];
    if (!data) return;

    document.getElementById("aiTaskPublishModalTitle").textContent = data.title + "明细";
    document.getElementById("aiTaskPublishModalCount").textContent = "共 " + data.rows.length + " 条记录";
    document.getElementById("aiTaskPublishModalBody").innerHTML = data.rows
      .map(function (row) {
        return "<tr><td>" + escapeHtml(row[0]) + "</td><td>" + escapeHtml(row[1]) + "</td></tr>";
      })
      .join("");

    document.getElementById("aiTaskPublishModalMask").classList.add("is-open");
  }

  function closeModal() {
    var mask = document.getElementById("aiTaskPublishModalMask");
    if (mask) mask.classList.remove("is-open");
  }

  function exportCurrentRows() {
    var data = statData[currentKey];
    if (!data) return;

    var csv = "所属组织/业态,组织/项目名称\n" + data.rows.map(function (row) {
      return row.map(csvCell).join(",");
    }).join("\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = data.title + "明细.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function csvCell(value) {
    var text = String(value == null ? "" : value);
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.classList && target.classList.contains("ai-task-publish-stat__num")) {
        openModal(target.getAttribute("data-stat-key"));
      }
    });
  }

  function makeRoomForStatBar() {
    var base = document.getElementById("base");
    if (!base || base.getAttribute("data-ai-task-publish-stat-shifted") === "1") return;

    var shiftY = 74;
    Array.prototype.forEach.call(base.children, function (el) {
      if (!el || el.id === "aiTaskPublishStat") return;
      if (!/^u\d+/.test(el.id || "")) return;

      var top = parseFloat(window.getComputedStyle(el).top);
      if (isNaN(top)) return;

      if (top >= 203) {
        el.style.top = top + shiftY + "px";
      }
    });

    base.setAttribute("data-ai-task-publish-stat-shifted", "1");
  }

  function init() {
    createStatBar();
    createModal();
    makeRoomForStatBar();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
