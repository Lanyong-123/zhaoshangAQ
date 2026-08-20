(function () {
  var app = document.getElementById("rectifyAuditFlowApp");
  if (!app) return;

  document.body.classList.add("rectify-flow-enhanced");

  var isSupervise = app.getAttribute("data-page") === "supervise";
  if (isSupervise) app.classList.add("supervise");

  var batches = [
    {
      id: "20260712",
      title: "20260712整改审核",
      date: "2026-07-12 17:28:08",
      steps: [
        {
          label: "处理流程：",
          name: "任务分配",
          personLabel: "分配人：张猛",
          type: "assign",
          rows: [{ project: "北京湾里", type: "---", dept: "---", role: "---", executor: "张猛", time: "2026-07-12 17:24:33", task: "", actions: ["分配详情"] }]
        },
        {
          name: "监测管理员",
          personLabel: "审核人：张猛",
          rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:25:56", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-07-12 17:25:56", opinion: "整改符合实际", actions: ["整改详情", "审核详情"] }]
        },
        {
          name: "项目安全分管领导",
          personLabel: "审核人：程琪",
          rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:26:24", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-07-12 17:26:24", opinion: "整改符合实际", actions: ["整改报告", "审核详情"] }]
        },
        {
          name: "项目负责人",
          personLabel: "审核人：程琪",
          selectable: true,
          rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:28:08", applicant: "程琪", phone: "18612251885", status: "待审核", auditTime: "2026-07-12 17:28:08", opinion: "整改符合实际", actions: ["整改报告", "审核详情"] }]
        }
      ]
    },
    {
      id: "20260701",
      title: "20260701整改审核",
      date: "2026-07-01 16:42:18",
      collapsed: true,
      steps: [
        {
          label: "历史流程：",
          name: "任务分配",
          personLabel: "分配人：李斯",
          type: "assign",
          rows: [{ project: "北京湾里", type: "---", dept: "---", role: "---", executor: "李斯", time: "2026-07-01 16:35:12", task: "", actions: ["分配详情"] }]
        },
        {
          name: "监测管理员",
          personLabel: "审核人：李斯",
          rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-01 16:37:31", applicant: "李斯", phone: "13718225356", status: "审核不通过", auditTime: "2026-07-01 16:42:18", opinion: "整改资料不完整，退回重新整改", actions: ["整改详情", "审核详情"] }]
        }
      ]
    }
  ];

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function actionLinks(actions) {
    return actions.map(function (text) {
      var href = text === "分配详情" ? "任务分配详情.html" : text === "审核详情" ? "审核详页.html" : "整改详情.html";
      return '<a href="' + href + '">' + esc(text) + "</a>";
    }).join("");
  }

  function assignTable(rows) {
    return '<table class="rectify-step-table"><thead><tr>' +
      '<th style="width:18%">评估组织/项目名称</th><th style="width:9%">类型</th><th style="width:11%">管控组织/部门</th><th style="width:9%">管控角色</th><th>任务实施人</th><th style="width:12%">分配时间</th><th style="width:8%">评估任务</th><th class="center" style="width:12%">操作</th>' +
      '</tr></thead><tbody>' + rows.map(function (r) {
        return '<tr><td>' + esc(r.project) + '</td><td>' + esc(r.type) + '</td><td>' + esc(r.dept) + '</td><td>' + esc(r.role) + '</td><td>' + esc(r.executor) + '</td><td>' + esc(r.time) + '</td><td>' + esc(r.task) + '</td><td class="center">' + actionLinks(r.actions) + '</td></tr>';
      }).join("") + '</tbody></table>';
  }

  function auditTable(step) {
    return '<table class="rectify-step-table"><thead><tr>' +
      (step.selectable ? '<th class="center" style="width:42px"><input type="checkbox"></th>' : '') +
      '<th style="width:14%">组织/项目名称</th><th style="width:10%">所属业态</th><th style="width:14%">申请时间</th><th style="width:10%">申请人</th><th style="width:10%">联系电话</th><th style="width:10%">审核状态</th><th style="width:12%">审核时间</th><th style="width:10%">审核意见</th><th class="center" style="width:18%">操作</th>' +
      '</tr></thead><tbody>' + step.rows.map(function (r) {
        return '<tr>' + (step.selectable ? '<td class="center"><input type="checkbox"></td>' : '') + '<td class="center">' + esc(r.project) + '</td><td class="center">' + esc(r.business) + '</td><td class="center">' + esc(r.applyTime) + '</td><td class="center">' + esc(r.applicant) + '</td><td class="center">' + esc(r.phone) + '</td><td class="center">' + esc(r.status) + '</td><td class="center">' + esc(r.auditTime) + '</td><td class="center">' + esc(r.opinion) + '</td><td class="center">' + actionLinks(r.actions) + '</td></tr>';
      }).join("") + '</tbody></table>';
  }

  function stepHtml(step) {
    return '<div class="rectify-step">' +
      '<div class="rectify-step-label">' + esc(step.label || "") + '</div>' +
      '<div class="rectify-step-content">' +
      '<div class="rectify-step-head"><span class="rectify-step-name done">' + esc(step.name) + '</span><span class="rectify-step-person">' + esc(step.personLabel) + '</span></div>' +
      (step.type === "assign" ? assignTable(step.rows) : auditTable(step)) +
      '</div></div>';
  }

  function batchHtml(batch) {
    return '<section class="rectify-flow-batch ' + (batch.collapsed ? "collapsed" : "") + '">' +
      '<div class="rectify-flow-rail"><button class="rectify-flow-toggle" type="button" aria-label="' + esc(batch.title) + '展开收起"></button></div>' +
      '<div class="rectify-flow-card ' + (batch.current ? "current" : "") + '">' +
      '<div class="rectify-flow-summary"><span class="rectify-flow-title done">' + esc(batch.title) + '</span><span class="rectify-flow-auditor">' + (batch.current ? "最近一次整改审核" : "历史整改审核") + '</span><span class="rectify-flow-date">整改提交时间：' + esc(batch.date) + '</span><span class="rectify-flow-status">' + (batch.current ? "当前展示" : "已归档") + '</span></div>' +
      '<div class="rectify-flow-body">' + batch.steps.map(stepHtml).join("") + '</div>' +
      '</div></section>';
  }

  app.innerHTML =
    '<div class="rectify-history-title">历史整改审核流程<span class="rectify-history-note">按整改提交时间倒序展示，点击左侧箭头可展开/收起</span></div>' +
    '<div class="rectify-flow-list">' + batches.map(batchHtml).join("") + '</div>';

  Array.prototype.forEach.call(app.querySelectorAll(".rectify-flow-toggle"), function (btn) {
    btn.addEventListener("click", function () {
      var batch = btn.closest(".rectify-flow-batch");
      batch.classList.toggle("collapsed");
    });
  });
})();
