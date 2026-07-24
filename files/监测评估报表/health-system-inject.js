(function () {
  var stats = [
    { name: "一级", value: 90, percent: 55, color: "#ff7f50" },
    { name: "二级", value: 23, percent: 15, color: "#ff7f50" },
    { name: "三级", value: 33, percent: 19, color: "#ff7f50" },
    { name: "企业内部达标", value: 83, percent: 20, color: "#ff7f50" }
  ];

  var regions = [
    { name: "华南区域", lv1: 98, lv2: 5, lv3: 3 },
    { name: "招商邮轮", lv1: 97, lv2: 5, lv3: 3 },
    { name: "西南区域", lv1: 90, lv2: 6, lv3: 12 },
    { name: "深圳区域", lv1: 85, lv2: 9, lv3: 12 },
    { name: "海南区域", lv1: 78, lv2: 12, lv3: 5 },
    { name: "招商积余", lv1: 72, lv2: 16, lv3: 6 },
    { name: "港航分局", lv1: 66, lv2: 17, lv3: 21 },
    { name: "华中区域", lv1: 57, lv2: 17, lv3: 22 },
    { name: "江南区域", lv1: 24, lv2: 15, lv3: 11 }
  ];

  function createStyle() {
    if (document.getElementById("ai-health-system-style")) return;
    var style = document.createElement("style");
    style.id = "ai-health-system-style";
    style.textContent = [
      "#ai-health-system-statistics{position:absolute;left:255px;top:910px;width:1668px;height:560px;background:#fff;border:1px solid #dcdfe6;box-sizing:border-box;z-index:9990;font-family:'PingFang SC','Microsoft YaHei',Arial,sans-serif;color:#333;}",
      "#ai-health-system-statistics *{box-sizing:border-box;}",
      ".ai-health-usable-filter{position:absolute;width:318px;height:32px;z-index:9991;font-family:'PingFang SC','Microsoft YaHei',Arial,sans-serif;color:#333;}",
      ".ai-health-usable-filter label{position:absolute;left:0;top:6px;width:72px;height:20px;line-height:20px;font-size:13px;text-align:right;color:#333;}",
      ".ai-health-usable-filter select{position:absolute;left:82px;top:0;width:180px;height:30px;padding:2px 6px;border:1px solid #797979;background:#fff;color:#333;font-size:13px;outline:none;}",
      "#ai-health-usable-filter-task-release{width:250px;}",
      "#ai-health-usable-filter-task-release select{width:160px;}",
      "#ai-self-implemented-breakdown,#ai-supervise-implemented-breakdown{position:absolute;width:973px;height:120px;display:flex;gap:28px;background:#fff;z-index:9993;font-family:'PingFang SC','Microsoft YaHei',Arial,sans-serif;color:#333;}",
      "#ai-self-implemented-breakdown{left:184px;top:108px;}",
      "#ai-supervise-implemented-breakdown{left:200px;top:109px;}",
      ".ai-self-implemented-group{height:120px;display:grid;grid-template-columns:1fr 192px;border:1px solid #d9d9d9;background:#fff;}",
      ".ai-self-implemented-group.org{width:457px;}",
      ".ai-self-implemented-group.project{width:488px;}",
      ".ai-self-implemented-total{display:flex;align-items:center;justify-content:center;gap:54px;text-align:center;font-size:13px;line-height:20px;border-right:1px solid #d9d9d9;}",
      ".ai-self-implemented-help{display:inline-flex;width:20px;height:20px;align-items:center;justify-content:center;border-radius:50%;background:#000;color:#fff;font-size:14px;font-weight:700;}",
      ".ai-self-implemented-rows{display:grid;grid-template-rows:repeat(4,30px);}",
      ".ai-self-implemented-row{display:grid;grid-template-columns:1fr 42px;align-items:center;padding:0 8px;border-bottom:1px dotted #cfcfcf;font-size:13px;}",
      ".ai-self-implemented-row:last-child{border-bottom:none;}",
      ".ai-self-implemented-row .ratio{display:flex;align-items:center;justify-content:center;width:31px;height:22px;border:2px solid #9bb4c4;border-radius:50%;font-size:12px;justify-self:end;}",
      "#u88529.ai-health-note-bottom{z-index:9992!important;}",
      "#u88529.ai-health-note-bottom,#u88529.ai-health-note-bottom #u88529_div{width:1500px!important;height:72px!important;}",
      ".ai-hs-title{position:absolute;left:8px;top:10px;font-size:18px;font-weight:700;color:#333;}",
      ".ai-hs-summary{position:absolute;left:36px;right:36px;top:44px;height:96px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #dcdfe6;}",
      ".ai-hs-item{position:relative;display:flex;align-items:center;justify-content:center;gap:72px;border-right:1px solid #dcdfe6;}",
      ".ai-hs-item:last-child{border-right:none;}",
      ".ai-hs-info{min-width:108px;text-align:left;}",
      ".ai-hs-name{font-size:15px;font-weight:700;color:#606266;margin-bottom:12px;}",
      ".ai-hs-value{font-size:16px;font-weight:700;color:#303133;}",
      ".ai-hs-donut{width:74px;height:74px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:conic-gradient(#ff7f50 var(--p),#9bb4c4 0);box-shadow:0 0 0 5px #f5f7fa inset;}",
      ".ai-hs-donut::after{content:attr(data-percent);width:48px;height:48px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#606266;box-shadow:0 0 0 1px #e5e7eb;}",
      ".ai-hs-back{position:absolute;right:8px;top:156px;width:80px;height:30px;border:none;background:#1f7ae0;color:#fff;font-size:14px;cursor:pointer;}",
      ".ai-hs-chart{position:absolute;left:36px;right:0;top:210px;height:306px;}",
      ".ai-hs-yaxis{position:absolute;left:0;top:0;width:34px;height:244px;color:#606266;font-size:12px;}",
      ".ai-hs-yaxis span{position:absolute;right:6px;transform:translateY(50%);}",
      ".ai-hs-grid{position:absolute;left:34px;right:0;top:0;height:244px;border-bottom:2px solid #c0c4cc;}",
      ".ai-hs-grid-line{position:absolute;left:0;right:0;height:1px;background:#ebeef5;}",
      ".ai-hs-bars{position:absolute;left:34px;right:0;top:0;height:244px;display:flex;align-items:flex-end;justify-content:space-between;padding:0 52px;}",
      ".ai-hs-bar-wrap{height:244px;width:88px;display:flex;align-items:flex-end;justify-content:center;}",
      ".ai-hs-bar{width:88px;display:flex;flex-direction:column-reverse;opacity:.92;}",
      ".ai-hs-seg-1{background:#5b8ff9;}",
      ".ai-hs-seg-2{background:#5ad8a6;}",
      ".ai-hs-seg-3{background:#65789b;}",
      ".ai-hs-xaxis{position:absolute;left:34px;right:0;top:258px;display:flex;justify-content:space-between;padding:0 32px;color:#606266;font-size:13px;}",
      ".ai-hs-xaxis span{width:128px;text-align:center;white-space:nowrap;}",
      ".ai-hs-legend{position:absolute;left:690px;top:294px;display:flex;gap:34px;align-items:center;color:#606266;font-size:13px;}",
      ".ai-hs-legend i{display:inline-block;width:10px;height:10px;margin-right:8px;vertical-align:-1px;}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function summaryHtml() {
    return stats.map(function (item) {
      return [
        '<div class="ai-hs-item">',
        '<div class="ai-hs-info"><div class="ai-hs-name">' + item.name + '</div><div class="ai-hs-value">' + item.value + '</div></div>',
        '<div class="ai-hs-donut" style="--p:' + item.percent + '%" data-percent="' + item.percent + '%"></div>',
        '</div>'
      ].join("");
    }).join("");
  }

  function chartHtml() {
    var max = 120;
    var bars = regions.map(function (item) {
      var lv1 = item.lv1 / max * 244;
      var lv2 = item.lv2 / max * 244;
      var lv3 = item.lv3 / max * 244;
      return [
        '<div class="ai-hs-bar-wrap">',
        '<div class="ai-hs-bar" title="' + item.name + '">',
        '<div class="ai-hs-seg-3" style="height:' + lv3 + 'px"></div>',
        '<div class="ai-hs-seg-2" style="height:' + lv2 + 'px"></div>',
        '<div class="ai-hs-seg-1" style="height:' + lv1 + 'px"></div>',
        '</div></div>'
      ].join("");
    }).join("");
    var labels = regions.map(function (item) { return "<span>" + item.name + "</span>"; }).join("");
    return [
      '<div class="ai-hs-yaxis"><span style="top:0">120</span><span style="top:61px">90</span><span style="top:122px">60</span><span style="top:183px">30</span><span style="top:244px">0</span></div>',
      '<div class="ai-hs-grid"><div class="ai-hs-grid-line" style="top:0"></div><div class="ai-hs-grid-line" style="top:61px"></div><div class="ai-hs-grid-line" style="top:122px"></div><div class="ai-hs-grid-line" style="top:183px"></div></div>',
      '<div class="ai-hs-bars">' + bars + '</div>',
      '<div class="ai-hs-xaxis">' + labels + '</div>',
      '<div class="ai-hs-legend"><span><i class="ai-hs-seg-1"></i>一级</span><span><i class="ai-hs-seg-2"></i>二级</span><span><i class="ai-hs-seg-3"></i>三级</span></div>'
    ].join("");
  }

  function inject() {
    if (document.getElementById("ai-health-system-statistics")) return;
    createStyle();
    injectUsableFilter();
    injectImplementedTaskBreakdown();
    injectSuperviseTaskBreakdown();
    var card = document.createElement("div");
    card.id = "ai-health-system-statistics";
    card.innerHTML = [
      '<div class="ai-hs-title">健康管理体系统计</div>',
      '<div class="ai-hs-summary">' + summaryHtml() + '</div>',
      '<button type="button" class="ai-hs-back">返回</button>',
      '<div class="ai-hs-chart">' + chartHtml() + '</div>'
    ].join("");
    card.querySelector(".ai-hs-back").onclick = function () {
      if (window.history.length > 1) window.history.back();
    };
    document.body.appendChild(card);
    positionReportBlocks(card);
    window.addEventListener("load", function () { positionReportBlocks(card); });
    window.addEventListener("resize", function () { positionReportBlocks(card); });
  }

  function injectUsableFilter() {
    var configs = [
      { id: "ai-health-usable-filter-standard", panel: "u88429_state0_content", left: 970, top: 10 },
      {
        id: "ai-health-usable-filter-task-release",
        panel: "u88429_state3_content",
        left: 880,
        top: 5,
        options: ["请选择", "草稿", "数据可用", "数据不可用", "退出", "删除"]
      },
      {
        id: "ai-health-usable-filter-supervise",
        panel: "u88429_state9_content",
        left: 1748,
        top: 50,
        options: ["请选择", "草稿", "数据可用", "数据不可用", "退出", "删除"]
      },
      {
        id: "ai-health-usable-filter-self",
        panel: "u88429_state10_content",
        left: 1748,
        top: 50,
        options: ["请选择", "草稿", "数据可用", "数据不可用", "退出", "删除"]
      },
      {
        id: "ai-health-usable-filter-element",
        panel: "u88429_state11_content",
        left: 760,
        top: 72,
        options: ["请选择", "草稿", "数据可用", "数据不可用", "退出", "删除"]
      }
    ];
    configs.forEach(function (config) {
      var targetPanel = document.getElementById(config.panel);
      if (!targetPanel || document.getElementById(config.id)) return;
      targetPanel.appendChild(createUsableFilter(config));
    });
  }

  function injectImplementedTaskBreakdown() {
    var targetPanel = document.getElementById("u91516_state1_content");
    if (!targetPanel || document.getElementById("ai-self-implemented-breakdown")) return;

    function groupHtml(type, title, total) {
      return [
        '<div class="ai-self-implemented-group ' + type + '">',
        '<div class="ai-self-implemented-total"><span>' + title + '<br>' + total + '</span><span class="ai-self-implemented-help">?</span></div>',
        '<div class="ai-self-implemented-rows">',
        '<div class="ai-self-implemented-row"><span>实施已完成数&nbsp;&nbsp;&nbsp;30</span><span class="ratio">40%</span></div>',
        '<div class="ai-self-implemented-row"><span>实施未完成数&nbsp;&nbsp;&nbsp;20</span><span class="ratio">40%</span></div>',
        '<div class="ai-self-implemented-row"><span>' + (type === "org" ? "组织" : "项目") + '删除数&nbsp;&nbsp;&nbsp;5</span><span class="ratio">10%</span></div>',
        '<div class="ai-self-implemented-row"><span>' + (type === "org" ? "组织" : "项目") + '退出数&nbsp;&nbsp;&nbsp;5</span><span class="ratio">10%</span></div>',
        '</div></div>'
      ].join("");
    }

    var breakdown = document.createElement("div");
    breakdown.id = "ai-self-implemented-breakdown";
    breakdown.innerHTML = groupHtml("org", "组织实施任务数", "80") +
      groupHtml("project", "项目实施任务数", "100");
    targetPanel.appendChild(breakdown);
  }

  function injectSuperviseTaskBreakdown() {
    var targetPanel = document.getElementById("u90550_state1_content");
    if (!targetPanel || document.getElementById("ai-supervise-implemented-breakdown")) return;

    function groupHtml(type, title, total) {
      return [
        '<div class="ai-self-implemented-group ' + type + '">',
        '<div class="ai-self-implemented-total"><span>' + title + '<br>' + total + '</span><span class="ai-self-implemented-help">?</span></div>',
        '<div class="ai-self-implemented-rows">',
        '<div class="ai-self-implemented-row"><span>实施已完成数&nbsp;&nbsp;&nbsp;30</span><span class="ratio">40%</span></div>',
        '<div class="ai-self-implemented-row"><span>实施未完成数&nbsp;&nbsp;&nbsp;20</span><span class="ratio">40%</span></div>',
        '<div class="ai-self-implemented-row"><span>' + (type === "org" ? "组织" : "项目") + '删除数&nbsp;&nbsp;&nbsp;5</span><span class="ratio">10%</span></div>',
        '<div class="ai-self-implemented-row"><span>' + (type === "org" ? "组织" : "项目") + '退出数&nbsp;&nbsp;&nbsp;5</span><span class="ratio">10%</span></div>',
        '</div></div>'
      ].join("");
    }

    var breakdown = document.createElement("div");
    breakdown.id = "ai-supervise-implemented-breakdown";
    breakdown.innerHTML = groupHtml("org", "组织实施任务数", "80") +
      groupHtml("project", "项目实施任务数", "100");
    targetPanel.appendChild(breakdown);
  }

  function createUsableFilter(config) {
    var filter = document.createElement("div");
    var options = config.options || ["请选择", "草稿", "数据可用", "数据不可用", "退出"];
    filter.id = config.id;
    filter.className = "ai-health-usable-filter";
    filter.style.left = config.left + "px";
    filter.style.top = config.top + "px";
    filter.innerHTML = [
      '<label for="' + config.id + '-select">可用状态：</label>',
      '<select id="' + config.id + '-select">',
      options.map(function (option, index) {
        return '<option value="' + (index === 0 ? "" : option) + '">' + option + '</option>';
      }).join(""),
      '</select>'
    ].join("");
    return filter;
  }

  function positionReportBlocks(card) {
    var mainPanel = document.getElementById("u88429");
    var panelBottom = 880;
    if (mainPanel) {
      var panelRect = mainPanel.getBoundingClientRect();
      panelBottom = Math.ceil(panelRect.bottom + window.scrollY);
    }
    var cardTop = Math.max(900, panelBottom + 18);
    card.style.top = cardTop + "px";

    var note = document.getElementById("u88529");
    if (note) {
      if (note.parentNode !== document.body) {
        document.body.appendChild(note);
      }
      note.className = (note.className || "").replace(/\s*ai-health-note-bottom/g, "") + " ai-health-note-bottom";
      note.style.position = "absolute";
      note.style.left = "270px";
      note.style.top = (cardTop + card.offsetHeight + 24) + "px";
      note.style.width = "1500px";
      note.style.height = "72px";
    }

    var bottom = cardTop + card.offsetHeight + 120;
    if (note) bottom = Math.max(bottom, parseInt(note.style.top, 10) + 120);
    document.body.style.minHeight = bottom + "px";
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(inject, 0);
  } else {
    window.addEventListener("DOMContentLoaded", inject);
  }
})();
