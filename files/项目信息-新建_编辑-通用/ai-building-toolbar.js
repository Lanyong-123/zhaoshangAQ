(function () {
  'use strict';

  function initBuildingToolbar() {
    var techPanel = document.getElementById('u4329_state10');
    var summaryTab = document.getElementById('u7304');
    var buildingTab = document.getElementById('u7305');
    var combo = document.getElementById('ai-building-combobox');
    var search = document.getElementById('ai-building-search');
    var toggle = document.getElementById('ai-building-toggle');
    var options = document.getElementById('ai-building-options');
    var count = document.getElementById('ai-building-count');
    var toast = document.getElementById('ai-building-toast');
    var addButton = document.getElementById('ai-building-add');
    var deleteButton = document.getElementById('ai-building-delete');
    var buildings = [];
    var toastTimer;

    if (!techPanel || !summaryTab || !buildingTab || !combo || !search || !options) return;

    for (var i = 1; i <= 23; i += 1) buildings.push(i + '栋');

    function showToast(message) {
      window.clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add('ai-show');
      toastTimer = window.setTimeout(function () {
        toast.classList.remove('ai-show');
      }, 1600);
    }

    function setOpen(open) {
      combo.classList.toggle('ai-open', open);
      combo.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) renderOptions(search.value);
    }

    function selectBuilding(name) {
      search.value = name;
      setOpen(false);
      search.blur();
    }

    function renderOptions(keyword) {
      var normalized = String(keyword || '').trim().toLowerCase();
      var matched = buildings.filter(function (name) {
        return !normalized || name.toLowerCase().indexOf(normalized) !== -1;
      });
      options.innerHTML = '';

      if (!matched.length) {
        var empty = document.createElement('div');
        empty.className = 'ai-building-empty';
        empty.textContent = '未找到匹配楼栋';
        options.appendChild(empty);
        return;
      }

      matched.forEach(function (name) {
        var option = document.createElement('div');
        option.className = 'ai-building-option';
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', search.value === name ? 'true' : 'false');
        option.textContent = name;
        option.addEventListener('mousedown', function (event) {
          event.preventDefault();
          selectBuilding(name);
        });
        options.appendChild(option);
      });
    }

    function activateBuilding() {
      techPanel.classList.add('ai-building-active');
      buildingTab.classList.add('ai-active');
      summaryTab.classList.remove('ai-active');
    }

    function activateSummary() {
      techPanel.classList.remove('ai-building-active');
      summaryTab.classList.add('ai-active');
      buildingTab.classList.remove('ai-active');
      setOpen(false);
    }

    buildingTab.addEventListener('click', function () {
      window.setTimeout(activateBuilding, 0);
    });
    summaryTab.addEventListener('click', function () {
      window.setTimeout(activateSummary, 0);
    });

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      setOpen(!combo.classList.contains('ai-open'));
      search.focus();
      search.select();
    });
    search.addEventListener('focus', function () { setOpen(true); });
    search.addEventListener('click', function (event) {
      event.stopPropagation();
      setOpen(true);
    });
    search.addEventListener('input', function () {
      setOpen(true);
      renderOptions(search.value);
    });
    search.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Enter') {
        var firstMatch = options.querySelector('.ai-building-option');
        if (firstMatch) selectBuilding(firstMatch.textContent);
        event.preventDefault();
        window.setTimeout(function () { setOpen(false); }, 0);
      }
    });

    addButton.addEventListener('click', function () {
      var maxNumber = buildings.reduce(function (max, name) {
        var value = parseInt(name, 10);
        return isNaN(value) ? max : Math.max(max, value);
      }, 0);
      var newName = (maxNumber + 1) + '栋';
      buildings.push(newName);
      count.textContent = '共' + buildings.length + '栋';
      selectBuilding(newName);
      showToast('已新增' + newName);
    });

    deleteButton.addEventListener('click', function () {
      var current = search.value;
      var index = buildings.indexOf(current);
      if (index === -1) {
        showToast('请先选择楼栋');
        return;
      }
      if (buildings.length === 1) {
        showToast('至少保留一个楼栋信息');
        return;
      }
      buildings.splice(index, 1);
      count.textContent = '共' + buildings.length + '栋';
      search.value = buildings[Math.min(index, buildings.length - 1)];
      renderOptions(search.value);
      showToast('已删除' + current);
    });

    document.getElementById('ai-building-import').addEventListener('click', function () {
      showToast('请选择楼栋信息导入文件');
    });
    document.getElementById('ai-building-export').addEventListener('click', function () {
      showToast('楼栋信息导出任务已创建');
    });
    document.addEventListener('click', function (event) {
      if (!combo.contains(event.target)) setOpen(false);
    });

    renderOptions('');
    activateSummary();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuildingToolbar);
  } else {
    initBuildingToolbar();
  }
}());
