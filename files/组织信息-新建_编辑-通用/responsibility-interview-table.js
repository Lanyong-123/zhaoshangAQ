(function () {
  "use strict";

  var rowControlIds = [
    "u36992", "u36993", "u36994", "u36995", "u36996", "u36997", "u36998", "u36999",
    "u37004", "u37005", "u37006", "u37007", "u37008", "u37009", "u37010", "u37011",
    "u37012", "u37013", "u37014", "u37015", "u37016", "u37017", "u37018", "u37019",
    "u37020", "u37021", "u37022", "u37023", "u37024", "u37025", "u37026", "u37027"
  ];

  function resultSelect(rowNumber) {
    return '<select aria-label="第' + rowNumber + '行访谈结果">' +
      '<option value="" selected>请选择</option>' +
      '<option value="合格">合格</option>' +
      '<option value="不合格">不合格</option>' +
      '</select>';
  }

  function personMultiSelect(rowNumber, field, label, people) {
    return '<div class="org-interview-multi" data-row="' + rowNumber + '" data-field="' + field + '">' +
      '<button class="org-interview-multi-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">' +
        '<span>请选择</span><i aria-hidden="true"></i>' +
      '</button>' +
      '<div class="org-interview-multi-menu" role="listbox" aria-label="第' + rowNumber + '行' + label + '" aria-multiselectable="true">' +
        people.map(function (person, index) {
          var id = 'orgInterview' + field + rowNumber + '_' + index;
          return '<label for="' + id + '"><input id="' + id + '" type="checkbox" value="' + person + '"><span>' + person + '</span></label>';
        }).join("") +
      '</div>' +
    '</div>';
  }

  function rowHtml(rowNumber) {
    return '<tr>' +
      '<td><input type="date" aria-label="第' + rowNumber + '行访谈时间"></td>' +
      '<td>' + personMultiSelect(rowNumber, "Interviewer", "访谈人", ["陈XX", "吴XX", "周XX", "郑XX"]) + '</td>' +
      '<td>' + personMultiSelect(rowNumber, "Interviewee", "被访谈人", ["张XX（深圳区域公司）", "李XX（华南区域公司）", "王XX（XX项目公司）", "赵XX（XX商业公司）"]) + '</td>' +
      '<td>' + resultSelect(rowNumber) + '</td>' +
      '<td><input type="number" min="0" value="2" aria-label="第' + rowNumber + '行访谈数量" disabled></td>' +
      '<td><input type="number" min="0" step="0.01" value="88.22" aria-label="第' + rowNumber + '行访谈得分"></td>' +
      '<td><input type="file" aria-label="第' + rowNumber + '行附件"></td>' +
      '<td class="org-interview-action"><button type="button">修改</button><span>|</span><button type="button">删除</button></td>' +
      '</tr>';
  }

  function init() {
    var originalTable = document.getElementById("u36951");
    if (!originalTable || document.getElementById("orgInterviewTable")) return;

    originalTable.style.display = "none";
    rowControlIds.forEach(function (id) {
      var element = document.getElementById(id);
      if (element) element.style.display = "none";
    });

    var table = document.createElement("div");
    table.id = "orgInterviewTable";
    table.setAttribute("aria-label", "责任制访谈列表");
    table.innerHTML = '<table>' +
      '<colgroup>' +
        '<col style="width:180px"><col style="width:210px"><col style="width:260px">' +
        '<col style="width:170px"><col style="width:150px"><col style="width:140px">' +
        '<col style="width:340px"><col style="width:210px">' +
      '</colgroup>' +
      '<thead><tr>' +
        '<th>访谈时间</th><th>访谈人</th><th>被访谈人</th>' +
        '<th>访谈结果</th><th>访谈数量（人）</th><th>访谈得分</th><th>附件</th><th>操作</th>' +
      '</tr></thead>' +
      '<tbody>' + [1, 2, 3, 4].map(rowHtml).join("") + '</tbody>' +
      '</table>';

    originalTable.parentNode.insertBefore(table, originalTable.nextSibling);

    table.addEventListener("click", function (event) {
      var trigger = event.target.closest(".org-interview-multi-trigger");
      if (!trigger) return;

      var current = trigger.closest(".org-interview-multi");
      table.querySelectorAll(".org-interview-multi.is-open").forEach(function (item) {
        if (item !== current) {
          item.classList.remove("is-open");
          item.querySelector(".org-interview-multi-trigger").setAttribute("aria-expanded", "false");
        }
      });

      var willOpen = !current.classList.contains("is-open");
      current.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });

    table.addEventListener("change", function (event) {
      if (!event.target.matches(".org-interview-multi-menu input[type='checkbox']")) return;
      var current = event.target.closest(".org-interview-multi");
      var selected = Array.prototype.map.call(
        current.querySelectorAll("input[type='checkbox']:checked"),
        function (checkbox) { return checkbox.value; }
      );
      current.querySelector(".org-interview-multi-trigger span").textContent = selected.length ? selected.join("、") : "请选择";
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(".org-interview-multi")) return;
      table.querySelectorAll(".org-interview-multi.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        item.querySelector(".org-interview-multi-trigger").setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
