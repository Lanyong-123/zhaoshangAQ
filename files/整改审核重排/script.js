(function () {
  var mount = document.getElementById("rectifyRebuildApp");
  if (!mount) return;
  document.body.classList.add("rectify-rebuild-ready");

  function linkHref(item) {
    var map = {
      "分配详情": "任务分配详情.html",
      "审核详情": "审核详页.html",
      "整改报告": "整改报告.html",
      "整改详情": "整改详情.html",
      "评估报告": "评估报告.html",
      "实施详情": "任务实施详情.html",
      "扣分项": "扣分详情-存在总结.html",
      "加分项": "加分项.html",
      "审核": "审核详页.html"
    };
    return map[item] || "整改详情.html";
  }

  function links(list) {
    return list.map(function (item) {
      return '<a class="rr-link" href="' + linkHref(item) + '">' + item + "</a>";
    }).join("");
  }

  function infoBlock(type) {
    var rectifyLine = type === "rectify"
      ? '<label>整改有效期：</label><div>2026-08-12 - 2026-08-12</div>'
      : "";
    return '<div class="rr-info"><label>评估编号：</label><div>20260812-047</div><label>任务名称：</label><div>北京湾里物业管理中心项目HSE管理制度适用性与消防末端设备点位一致性专项排查任务</div><label>任务有效期：</label><div>2026-08-12 - 2026-08-31</div>' + rectifyLine + '</div>';
  }

  function scoreTable(includeAction) {
    return '<div class="rr-table-wrap"><table class="rr-table"><thead><tr><th>组织/项目名称</th><th>所属业态</th><th>评估得分%</th><th>监督评估得分%</th><th>监督评估时间</th>' + (includeAction ? '<th>操作</th>' : '') + '</tr></thead><tbody><tr><td>北京湾里</td><td>物业管理</td><td>98.96% 达标（一级）<span class="rr-info-dot">i</span>' + links(["评估报告", "整改报告"]) + '</td><td>94% 达标（二级）<span class="rr-info-dot">i</span>' + links(["评估报告", "整改报告"]) + '</td><td>2022-05-06</td>' + (includeAction ? '<td></td>' : '') + '</tr></tbody></table></div>';
  }

  function assignTable(rows) {
    return '<div class="rr-table-wrap"><table class="rr-table"><thead><tr><th>评估组织/项目名称</th><th>类型</th><th>管控组织/部门</th><th>管控角色</th><th>任务实施人</th><th>分配时间</th><th>评估任务</th><th>操作</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td>' + r.project + '</td><td>' + r.type + '</td><td>' + r.dept + '</td><td>' + r.role + '</td><td>' + r.executor + '</td><td>' + r.time + '</td><td>' + r.task + '</td><td>' + links(r.actions) + '</td></tr>';
      }).join("") + '</tbody></table></div>';
  }

  function auditTable(step) {
    return '<div class="rr-table-wrap"><table class="rr-table"><thead><tr>' +
      (step.selectable ? '<th style="width:44px"><input type="checkbox"></th>' : '') +
      '<th>组织/项目名称</th><th>所属业态</th><th>申请时间</th><th>申请人</th><th>联系电话</th><th>审核状态</th><th>审核时间</th><th>审核意见</th><th>操作</th></tr></thead><tbody>' +
      step.rows.map(function (r) {
        return '<tr>' + (step.selectable ? '<td><input type="checkbox"></td>' : '') + '<td>' + r.project + '</td><td>' + r.business + '</td><td>' + r.applyTime + '</td><td>' + r.applicant + '</td><td>' + (r.phone || "") + '</td><td>' + r.status + '</td><td>' + r.auditTime + '</td><td>' + r.opinion + '</td><td>' + links(r.actions) + '</td></tr>';
      }).join("") + '</tbody></table></div>';
  }

  function reportAssignTable(rows) {
    var heads = ["评估组织/项目名称", "类型", "管控组织/部门", "管控角色", "实施总分", "实际扣分", "附加扣分", "实际加分", "附加加分", "附加扣分%", "附加加分%", "综合评分次数", "综合扣分(数值)", "综合加分(数值)", "综合加分%", "综合扣分%", "任务实施人", "操作"];
    return '<div class="rr-table-wrap"><table class="rr-table rr-report-wide"><thead><tr>' + heads.map(function (h) { return '<th>' + h + '</th>'; }).join("") + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td>' + r.project + '</td><td>' + r.type + '</td><td>' + r.dept + '</td><td>' + r.role + '</td><td>' + r.total + '</td><td>' + r.realDeduct + '</td><td>' + r.extraDeduct + '</td><td>' + r.realAdd + '</td><td>' + r.extraAdd + '</td><td>' + r.extraDeductRate + '</td><td>' + r.extraAddRate + '</td><td>' + r.scoreTimes + '</td><td>' + r.totalDeduct + '</td><td>' + r.totalAdd + '</td><td>' + r.totalAddRate + '</td><td>' + r.totalDeductRate + '</td><td>' + r.executor + '</td><td>' + links(r.actions) + '</td></tr>';
      }).join("") + '</tbody></table></div>';
  }

  function stepHtml(step) {
    var tableHtml = step.type === "assign" ? assignTable(step.rows) : auditTable(step);
    return '<section class="rr-step"><div class="rr-step-arrow"></div><div><div class="rr-step-head"><span class="rr-step-name done">' + step.name + '</span><span class="rr-person">' + step.person + '</span></div>' + tableHtml + '</div></section>';
  }

  function reportStepHtml(step) {
    var tableHtml = step.type === "reportAssign" ? reportAssignTable(step.rows) : auditTable(step);
    return '<section class="rr-step"><div class="rr-step-arrow"></div><div><div class="rr-step-head"><span class="rr-step-name done">' + step.name + '</span><span class="rr-person">' + step.person + '</span></div>' + tableHtml + '</div></section>';
  }

  var currentSteps = [
    { name: "任务分配", person: "分配人：李斯", type: "assign", rows: [{ project: "XXX项目", type: "---", dept: "---", role: "---", executor: "李三", time: "2022-05-06 10:11", task: "监测评估", actions: ["整改详情"] }, { project: "XXX", type: "---", dept: "---", role: "---", executor: "张思", time: "2022-05-04 10:11", task: "重大不符合项评估", actions: ["整改详情"] }, { project: "XXX", type: "---", dept: "---", role: "---", executor: "XX", time: "2022-05-04 10:11", task: "监测评估", actions: ["整改详情"] }] },
    { name: "标准化管理员", person: "审核人：李斯", rows: [{ project: "XXX项目", business: "酒店", applyTime: "2022-05-06 10:11", applicant: "李三", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改详情", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "张思", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改详情", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "XX", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "无", actions: ["整改详情", "审核详情"] }] },
    { name: "分管领导", person: "审核人：李胜", rows: [{ project: "XXX项目", business: "酒店", applyTime: "2022-05-06 10:11", applicant: "李三", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改报告", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "张思", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改报告", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "XX", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "无", actions: ["整改报告", "审核详情"] }] },
    { name: "主要负责人", person: "审核人：张一", rows: [{ project: "XXX项目", business: "酒店", applyTime: "2022-05-06 10:11", applicant: "李三", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改报告", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "张思", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改报告", "审核详情"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "XX", phone: "13734328761", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "无", actions: ["整改报告", "审核详情"] }] },
    { name: "监督实施人", person: "审核人：张X", selectable: true, rows: [{ project: "XXX项目", business: "酒店", applyTime: "2022-05-06 10:11", applicant: "李三、张思", phone: "", status: "待审核", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改详情", "审核详情", "审核"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "张思", phone: "", status: "待审核", auditTime: "2022-05-04 10:11", opinion: "", actions: ["整改详情", "审核详情", "审核"] }, { project: "XXX", business: "酒店", applyTime: "2022-05-04 10:11", applicant: "XX", phone: "", status: "审核通过", auditTime: "2022-05-04 10:11", opinion: "无", actions: ["整改详情", "审核详情"] }] }
  ];

  var reportSteps = [
    { name: "任务分配", person: "分配人：张猛", type: "reportAssign", rows: [{ project: "北京湾里", type: "---", dept: "---", role: "---", total: "193", realDeduct: "-2", extraDeduct: "0", realAdd: "0", extraAdd: "0", extraDeductRate: "0", extraAddRate: "0", scoreTimes: "-", totalDeduct: "-0", totalAdd: "+0", totalAddRate: "+0%", totalDeductRate: "-0%", executor: "张猛", actions: ["分配详情"] }] },
    { name: "监督管理员", person: "审核人：张猛", selectable: true, rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-08-12 17:01:30", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-08-12 17:02:14", opinion: "评估结果正确", actions: ["实施详情", "审核详情"] }] },
    { name: "项目安全分管领导", person: "审核人：程琪", selectable: true, rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-08-12 17:02:14", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-08-12 17:08:42", opinion: "评估结果正确", actions: ["评估报告", "扣分项", "加分项", "审核详情"] }] },
    { name: "项目负责人", person: "审核人：程琪", selectable: true, rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-08-12 17:08:42", applicant: "程琪", phone: "18612251885", status: "审核通过", auditTime: "2026-08-12 17:09:02", opinion: "评估结果正确", actions: ["评估报告", "扣分项", "加分项", "审核详情"] }] }
  ];

  var historyBatches = [
    { title: "20260712整改审核", date: "2026-07-12 17:28:08", collapsed: false, steps: [
      { name: "任务分配", person: "分配人：张猛", type: "assign", rows: [{ project: "北京湾里", type: "---", dept: "---", role: "---", executor: "张猛", time: "2026-07-12 17:24:33", task: "监测评估", actions: ["分配详情"] }] },
      { name: "监测管理员", person: "审核人：张猛", rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:25:56", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-07-12 17:25:56", opinion: "整改符合实际", actions: ["整改详情", "审核详情"] }] },
      { name: "项目安全分管领导", person: "审核人：程琪", rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:26:24", applicant: "张猛", phone: "13718225356", status: "审核通过", auditTime: "2026-07-12 17:26:24", opinion: "整改符合实际", actions: ["整改报告", "审核详情"] }] },
      { name: "项目负责人", person: "审核人：程琪", selectable: true, rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-12 17:28:08", applicant: "程琪", phone: "18612251885", status: "审核通过", auditTime: "2026-07-12 17:28:21", opinion: "整改符合实际", actions: ["整改报告", "审核详情"] }] }
    ] },
    { title: "20260701整改审核", date: "2026-07-01 16:42:18", collapsed: true, steps: [
      { name: "任务分配", person: "分配人：李斯", type: "assign", rows: [{ project: "北京湾里", type: "---", dept: "---", role: "---", executor: "李斯", time: "2026-07-01 16:35:12", task: "监测评估", actions: ["分配详情"] }] },
      { name: "监测管理员", person: "审核人：李斯", rows: [{ project: "北京湾里", business: "物业管理", applyTime: "2026-07-01 16:37:31", applicant: "李斯", phone: "13718225356", status: "审核不通过", auditTime: "2026-07-01 16:42:18", opinion: "整改资料不完整，退回重新整改", actions: ["整改详情", "审核详情"] }] }
    ] }
  ];

  function batchHtml(batch) {
    return '<section class="rr-batch ' + (batch.collapsed ? "collapsed" : "") + '"><div class="rr-batch-summary"><button class="rr-batch-toggle" type="button"></button><span class="rr-batch-title">' + batch.title + '</span><span class="rr-batch-tag">历史整改审核</span><span class="rr-batch-date">整改提交时间：' + batch.date + '</span></div><div class="rr-batch-body">' + batch.steps.map(stepHtml).join("") + '</div></section>';
  }

  var rectifyPanel = '<div class="rr-panel rr-rectify-panel active">' + infoBlock("rectify") + scoreTable(false) + '<div class="rr-flow-title">整改处理流程</div><div class="rr-flow">' + currentSteps.map(stepHtml).join("") + '</div><div class="rr-history-block"><div class="rr-flow-title">历史整改审核流程<span class="rr-flow-note">按整改提交时间倒序展示，点击左侧箭头展开/收起</span></div>' + historyBatches.map(batchHtml).join("") + '</div></div>';

  var reportPanel = '<div class="rr-panel rr-report-panel">' + infoBlock("report") + scoreTable(true) + '<div class="rr-flow-title">处理流程：</div><div class="rr-flow rr-report-flow">' + reportSteps.map(reportStepHtml).join("") + '</div></div>';

  mount.innerHTML =
    '<div class="rectify-rebuild-page"><aside class="rr-sidebar"><div class="rr-logo">招商蛇口</div><div class="rr-menu-section"><div class="rr-menu-title">基础信息管理</div><div class="rr-menu-item">组织信息</div><div class="rr-menu-item">项目信息</div><div class="rr-menu-item">应急资源</div><div class="rr-menu-item">特种设备</div><div class="rr-menu-item">危险作业</div></div><div class="rr-menu-section"><div class="rr-menu-title">风险评估管理</div><div class="rr-menu-item">组织风险</div><div class="rr-menu-item">项目风险</div><div class="rr-menu-item">风险评估模板</div><div class="rr-menu-item">风险配置管理</div></div><div class="rr-menu-section"><div class="rr-menu-title">HSE监测评估</div><div class="rr-menu-item">模板管理</div><div class="rr-menu-item">任务发布</div><div class="rr-menu-item active">任务处理</div><div class="rr-menu-item">任务结果查询</div><div class="rr-menu-item">不符合项管理</div></div></aside><main class="rr-main"><div class="rr-topbar"><div class="rr-location">当前位置：HSE监测管理 / 任务处理 / 整改审核</div><button class="rr-back" onclick="history.back()">返回</button></div><div class="rr-content"><section class="rr-card"><div class="rr-tabs"><button class="rr-tab active" data-tab="rectify" type="button">整改审核</button><button class="rr-tab" data-tab="report" type="button">报告审核</button></div>' + rectifyPanel + reportPanel + '</section></div></main></div>';

  mount.querySelectorAll(".rr-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      mount.querySelectorAll(".rr-tab").forEach(function (item) { item.classList.remove("active"); });
      tab.classList.add("active");
      var name = tab.getAttribute("data-tab");
      mount.querySelector(".rr-rectify-panel").classList.toggle("active", name === "rectify");
      mount.querySelector(".rr-report-panel").classList.toggle("active", name === "report");
    });
  });

  mount.querySelectorAll(".rr-batch-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.closest(".rr-batch").classList.toggle("collapsed");
    });
  });
})();
