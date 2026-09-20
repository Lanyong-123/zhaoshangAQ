(function () {
  "use strict";

  var orgRows = {
    available: [["区域公司", "华南区域"], ["专业公司", "招商积余"], ["城市公司", "深圳公司"], ["城市公司", "广州公司"], ["城市公司", "珠海公司"]],
    draft: [["城市公司", "湛江公司"], ["专业公司", "邮轮母港事业部"]],
    unavailable: [["区域公司", "华中区域"], ["城市公司", "惠州公司"], ["专业公司", "海外发展事业部"]],
    exited: [["专业公司", "海外发展事业部"]]
  };

  var projectRows = {
    available: [["产业园区", "蛇口网谷项目"], ["在建工程", "青羊158亩项目部"], ["物业管理", "招商局海南区域总部写字楼"], ["邮轮母港", "深圳邮轮母港"], ["商业管理", "招商蛇口项目-商业裙楼"]],
    draft: [["产业园区", "招商蛇口项目-1号楼"], ["物业管理", "招商蛇口项目-综合楼"], ["交通枢纽", "深圳邮轮母港停车楼"], ["办公物业", "总部写字楼"]],
    unavailable: [["产业园区", "低风险仓储项目"], ["商业管理", "临时闭店商铺"], ["物业管理", "已退出管理项目"], ["办公物业", "空置办公楼"], ["在建工程", "停工项目"]],
    exited: [["物业管理", "已退出管理项目"], ["商业管理", "已退出项目"]]
  };

  function createStatData(group, category, title, value, rows) {
    return { group: group + "-" + category, title: title, value: value, rows: rows, detailType: getDetailType(category) };
  }

  function createTotalData(group, title, value, rows) {
    return { group: group, title: title, value: value, rows: rows, detailType: getDetailType(title) };
  }

  function getDetailType(title) {
    if (title === "已发布任务数") return "published";
    if (title === "未发布任务数") return "unpublished";
    return "default";
  }

  var statData = {
    orgCurrentTotal: createTotalData("组织数据", "当前组织数", 18, orgRows.available.concat(orgRows.draft, orgRows.unavailable, orgRows.exited)),
    orgPublishedTotal: createTotalData("组织数据", "已发布任务数", 13, orgRows.available.concat(orgRows.draft, orgRows.unavailable, orgRows.exited)),
    orgUnpublishedTotal: createTotalData("组织数据", "未发布任务数", 3, orgRows.available.concat(orgRows.draft)),
    orgNoEvalTotal: createTotalData("组织数据", "不参与评估数", 2, orgRows.available.concat(orgRows.unavailable, orgRows.exited)),
    orgCurrentAvailable: createStatData("组织数据", "当前组织数", "数据可用数", 13, orgRows.available),
    orgCurrentDraft: createStatData("组织数据", "当前组织数", "草稿数", 2, orgRows.draft),
    orgCurrentUnavailable: createStatData("组织数据", "当前组织数", "数据不可用数", 2, orgRows.unavailable),
    orgCurrentExited: createStatData("组织数据", "当前组织数", "退出数", 1, orgRows.exited),
    orgPublishedAvailable: createStatData("组织数据", "已发布任务数", "数据可用数", 10, orgRows.available),
    orgPublishedDraft: createStatData("组织数据", "已发布任务数", "草稿数", 1, orgRows.draft),
    orgPublishedUnavailable: createStatData("组织数据", "已发布任务数", "数据不可用数", 1, orgRows.unavailable),
    orgPublishedExited: createStatData("组织数据", "已发布任务数", "退出数", 1, orgRows.exited),
    orgUnpublishedAvailable: createStatData("组织数据", "未发布任务数", "数据可用数", 2, orgRows.available),
    orgUnpublishedDraft: createStatData("组织数据", "未发布任务数", "草稿数", 1, orgRows.draft),
    orgUnpublishedUnavailable: createStatData("组织数据", "未发布任务数", "数据不可用数", 0, orgRows.unavailable),
    orgUnpublishedExited: createStatData("组织数据", "未发布任务数", "退出数", 0, orgRows.exited),
    orgNoEvalAvailable: createStatData("组织数据", "不参与评估数", "数据可用数", 1, orgRows.available),
    orgNoEvalDraft: createStatData("组织数据", "不参与评估数", "草稿数", 0, orgRows.draft),
    orgNoEvalUnavailable: createStatData("组织数据", "不参与评估数", "数据不可用数", 1, orgRows.unavailable),
    orgNoEvalExited: createStatData("组织数据", "不参与评估数", "退出数", 0, orgRows.exited),
    projectCurrentTotal: createTotalData("项目数据", "当前项目数", 42, projectRows.available.concat(projectRows.draft, projectRows.unavailable, projectRows.exited)),
    projectPublishedTotal: createTotalData("项目数据", "已发布任务数", 31, projectRows.available.concat(projectRows.draft, projectRows.unavailable, projectRows.exited)),
    projectUnpublishedTotal: createTotalData("项目数据", "未发布任务数", 5, projectRows.available.concat(projectRows.draft)),
    projectNoEvalTotal: createTotalData("项目数据", "不参与评估数", 6, projectRows.available.concat(projectRows.draft, projectRows.unavailable, projectRows.exited)),
    projectCurrentAvailable: createStatData("项目数据", "当前项目数", "数据可用数", 33, projectRows.available),
    projectCurrentDraft: createStatData("项目数据", "当前项目数", "草稿数", 4, projectRows.draft),
    projectCurrentUnavailable: createStatData("项目数据", "当前项目数", "数据不可用数", 3, projectRows.unavailable),
    projectCurrentExited: createStatData("项目数据", "当前项目数", "退出数", 2, projectRows.exited),
    projectPublishedAvailable: createStatData("项目数据", "已发布任务数", "数据可用数", 26, projectRows.available),
    projectPublishedDraft: createStatData("项目数据", "已发布任务数", "草稿数", 2, projectRows.draft),
    projectPublishedUnavailable: createStatData("项目数据", "已发布任务数", "数据不可用数", 2, projectRows.unavailable),
    projectPublishedExited: createStatData("项目数据", "已发布任务数", "退出数", 1, projectRows.exited),
    projectUnpublishedAvailable: createStatData("项目数据", "未发布任务数", "数据可用数", 4, projectRows.available),
    projectUnpublishedDraft: createStatData("项目数据", "未发布任务数", "草稿数", 1, projectRows.draft),
    projectUnpublishedUnavailable: createStatData("项目数据", "未发布任务数", "数据不可用数", 0, projectRows.unavailable),
    projectUnpublishedExited: createStatData("项目数据", "未发布任务数", "退出数", 0, projectRows.exited),
    projectNoEvalAvailable: createStatData("项目数据", "不参与评估数", "数据可用数", 3, projectRows.available),
    projectNoEvalDraft: createStatData("项目数据", "不参与评估数", "草稿数", 1, projectRows.draft),
    projectNoEvalUnavailable: createStatData("项目数据", "不参与评估数", "数据不可用数", 1, projectRows.unavailable),
    projectNoEvalExited: createStatData("项目数据", "不参与评估数", "退出数", 1, projectRows.exited)
  };

  function createStatBar() {
    if (document.getElementById("aiTaskPublishStat")) return;

    var bar = document.createElement("div");
    bar.id = "aiTaskPublishStat";
    bar.className = "ai-task-publish-stat";
    bar.innerHTML =
      '<div class="ai-task-publish-stat__tip" title="根据查询条件统计去重后的组织、项目数据状态及任务发布情况">' +
      "统计提示：根据查询条件统计去重后的组织、项目数据状态及任务发布情况" +
      "</div>" +
      createStatGroup("组织数据", [
        ["当前组织数", "orgCurrentTotal", ["orgCurrentAvailable", "orgCurrentDraft", "orgCurrentUnavailable", "orgCurrentExited"]],
        ["已发布任务数", "orgPublishedTotal", ["orgPublishedAvailable", "orgPublishedDraft", "orgPublishedUnavailable", "orgPublishedExited"]],
        ["未发布任务数", "orgUnpublishedTotal", ["orgUnpublishedAvailable", "orgUnpublishedDraft", "orgUnpublishedUnavailable", "orgUnpublishedExited"]],
        ["不参与评估数", "orgNoEvalTotal", ["orgNoEvalAvailable", "orgNoEvalDraft", "orgNoEvalUnavailable", "orgNoEvalExited"]]
      ]) +
      createStatGroup("项目数据", [
        ["当前项目数", "projectCurrentTotal", ["projectCurrentAvailable", "projectCurrentDraft", "projectCurrentUnavailable", "projectCurrentExited"]],
        ["已发布任务数", "projectPublishedTotal", ["projectPublishedAvailable", "projectPublishedDraft", "projectPublishedUnavailable", "projectPublishedExited"]],
        ["未发布任务数", "projectUnpublishedTotal", ["projectUnpublishedAvailable", "projectUnpublishedDraft", "projectUnpublishedUnavailable", "projectUnpublishedExited"]],
        ["不参与评估数", "projectNoEvalTotal", ["projectNoEvalAvailable", "projectNoEvalDraft", "projectNoEvalUnavailable", "projectNoEvalExited"]]
      ]);

    var base = document.getElementById("base");
    (base || document.body).appendChild(bar);
  }

  function createEvalObjectFilter() {
    if (document.getElementById("aiTaskPublishEvalObject")) return;

    var wrap = document.createElement("div");
    wrap.id = "aiTaskPublishEvalObject";
    wrap.className = "ai-task-publish-eval-object";
    wrap.innerHTML =
      '<div class="ai-task-publish-eval-object__label">评估对象</div>' +
      '<select class="ai-task-publish-eval-object__select" id="aiTaskPublishEvalObjectSelect">' +
      '<option value="组织+项目" selected>组织+项目</option>' +
      '<option value="组织">组织</option>' +
      '<option value="项目">项目</option>' +
      "</select>";

    var base = document.getElementById("base");
    (base || document.body).appendChild(wrap);
  }

  function syncEvalObjectFilter() {
    var select = document.getElementById("aiTaskPublishEvalObjectSelect");
    var industryLabel = document.getElementById("u52458");
    var industrySelect = document.getElementById("u52457");
    if (!select || !industryLabel || !industrySelect) return;

    var showIndustry = select.value !== "组织";
    industryLabel.style.display = showIndustry ? "flex" : "none";
    industryLabel.style.visibility = showIndustry ? "visible" : "hidden";
    industrySelect.style.display = showIndustry ? "flex" : "none";
    industrySelect.style.visibility = showIndustry ? "visible" : "hidden";
  }

  function createStatGroup(title, columns) {
    return (
      '<div class="ai-task-publish-stat__group-block">' +
      '<span class="ai-task-publish-stat__group">' +
      title +
      "：</span>" +
      '<div class="ai-task-publish-stat__matrix">' +
      columns.map(createStatColumn).join("") +
      "</div>" +
      "</div>"
    );
  }

  function createStatColumn(column) {
    var total = statData[column[1]];
    return (
      '<div class="ai-task-publish-stat__column">' +
      '<div class="ai-task-publish-stat__column-title"><span>' + column[0] + "：</span>" +
      '<button type="button" class="ai-task-publish-stat__num ai-task-publish-stat__total-num" data-stat-key="' +
      column[1] + '">' + total.value + "</button></div>" +
      '<div class="ai-task-publish-stat__breakdown">' + column[2].map(createItem).join("") + "</div>" +
      "</div>"
    );
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
      '<thead><tr id="aiTaskPublishModalHead"></tr></thead>' +
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

    mask.addEventListener("mouseover", function (event) {
      if (event.target.classList && event.target.classList.contains("ai-task-publish-modal__column-tip")) {
        event.target.classList.add("is-visible");
      }
    });

    mask.addEventListener("mouseout", function (event) {
      if (event.target.classList && event.target.classList.contains("ai-task-publish-modal__column-tip")) {
        event.target.classList.remove("is-visible");
      }
    });

    mask.addEventListener("focusin", function (event) {
      if (event.target.classList && event.target.classList.contains("ai-task-publish-modal__column-tip")) {
        event.target.classList.add("is-visible");
      }
    });

    mask.addEventListener("focusout", function (event) {
      if (event.target.classList && event.target.classList.contains("ai-task-publish-modal__column-tip")) {
        event.target.classList.remove("is-visible");
      }
    });
  }

  var currentKey = "";

  function openModal(key) {
    currentKey = key;
    var data = statData[key];
    if (!data) return;

    document.getElementById("aiTaskPublishModalTitle").textContent = data.group + "-" + data.title + "明细";
    document.getElementById("aiTaskPublishModalCount").textContent = "共 " + data.value + " 条记录";
    document.getElementById("aiTaskPublishModalHead").innerHTML = getDetailColumns(data)
      .map(function (column) {
        return createDetailHeader(column);
      })
      .join("");
    document.getElementById("aiTaskPublishModalBody").innerHTML = buildDetailRows(data)
      .map(function (row) {
        return "<tr>" + row.map(function (cell) {
          return "<td>" + escapeHtml(cell) + "</td>";
        }).join("") + "</tr>";
      })
      .join("");

    var modal = document.querySelector(".ai-task-publish-modal");
    modal.classList.remove("is-published", "is-unpublished");
    if (data.detailType === "published") modal.classList.add("is-published");
    if (data.detailType === "unpublished") modal.classList.add("is-unpublished");

    document.getElementById("aiTaskPublishModalMask").classList.add("is-open");
  }

  function getDetailColumns(data) {
    var columns = ["所属组织/业态", "组织/项目名称"];
    if (data.detailType === "published") {
      columns.push("评估编号", "报告审核状态", "整改审核状态");
    } else if (data.detailType === "unpublished") {
      columns.push("评估编号", "未发布原因");
    }
    return columns;
  }

  function createDetailHeader(column) {
    if (column !== "评估编号") return "<th>" + escapeHtml(column) + "</th>";
    var tip = "多个评估任务取最近一次的评估任务";
    return (
      "<th>" + escapeHtml(column) +
      '<span class="ai-task-publish-modal__column-tip" title="' + escapeHtml(tip) +
      '" data-tip="' + escapeHtml(tip) + '" aria-label="' + escapeHtml(tip) +
      '" tabindex="0">i</span></th>'
    );
  }

  function buildDetailRows(data) {
    var reportStatuses = ["审核通过", "审核不通过", "待审核"];
    var rectificationStatuses = ["整改实施", "待审核", "审核通过", "审核不通过"];
    var unpublishedReasons = ["无监测管理员", "无模板内容", "未发布任务"];

    return normalizeRows(data).map(function (row, index) {
      var detailRow = row.slice(0, 2);
      if (data.detailType === "published") {
        detailRow.push(createEvaluationNo(index));
        detailRow.push(reportStatuses[index % reportStatuses.length]);
        detailRow.push(rectificationStatuses[index % rectificationStatuses.length]);
      } else if (data.detailType === "unpublished") {
        var reason = unpublishedReasons[index % unpublishedReasons.length];
        detailRow.push(reason === "未发布任务" ? "" : createEvaluationNo(index));
        detailRow.push(reason);
      }
      return detailRow;
    });
  }

  function createEvaluationNo(index) {
    return "HSE2026-" + String(index + 1).padStart(3, "0");
  }

  function normalizeRows(data) {
    var count = Math.max(0, Number(data.value) || 0);
    if (!count || !data.rows.length) return [];

    var rows = [];
    for (var index = 0; index < count; index += 1) {
      rows.push(data.rows[index % data.rows.length].slice(0, 2));
    }
    return rows;
  }

  function closeModal() {
    var mask = document.getElementById("aiTaskPublishModalMask");
    if (mask) mask.classList.remove("is-open");
  }

  function exportCurrentRows() {
    var data = statData[currentKey];
    if (!data) return;

    var csv = getDetailColumns(data).map(csvCell).join(",") + "\n" + buildDetailRows(data).map(function (row) {
      return row.map(csvCell).join(",");
    }).join("\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = (data.group || "") + data.title + "明细.csv";
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

    document.addEventListener("change", function (event) {
      if (event.target && event.target.id === "aiTaskPublishEvalObjectSelect") {
        syncEvalObjectFilter();
      }
    });
  }

  function makeRoomForStatBar() {
    var base = document.getElementById("base");
    if (!base || base.getAttribute("data-ai-task-publish-stat-shifted") === "1") return;

    var shiftY = 198;
    Array.prototype.forEach.call(base.children, function (el) {
      if (!el || el.id === "aiTaskPublishStat") return;
      if (!/^u\d+/.test(el.id || "")) return;

      var computedStyle = window.getComputedStyle(el);
      var top = parseFloat(computedStyle.top);
      var left = parseFloat(computedStyle.left);
      var dataTop = parseFloat(el.getAttribute("data-top"));
      var dataLeft = parseFloat(el.getAttribute("data-left"));
      var layoutTop = isNaN(dataTop) ? top : dataTop;
      var layoutLeft = isNaN(dataLeft) ? left : dataLeft;
      if (isNaN(layoutTop) || isNaN(layoutLeft)) return;

      if (layoutTop >= 203 && layoutLeft >= 438) {
        if (el.offsetWidth === 0 && el.offsetHeight === 0 && top === 0 && left === 0) {
          el.style.top = shiftY + "px";
        } else {
          el.style.top = top + shiftY + "px";
        }
      }
    });

    base.setAttribute("data-ai-task-publish-stat-shifted", "1");
  }

  function init() {
    createEvalObjectFilter();
    syncEvalObjectFilter();
    createStatBar();
    createModal();
    makeRoomForStatBar();
    bindEvents();
    window.setInterval(syncEvalObjectFilter, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
