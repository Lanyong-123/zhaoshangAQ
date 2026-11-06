(function () {
  'use strict';

  function setupSearchableRecords(config) {
    var panel = document.getElementById(config.panelId);
    var toolbar = document.getElementById(config.toolbarId);
    var combo = document.getElementById(config.prefix + '-combobox');
    var search = document.getElementById(config.prefix + '-search');
    var toggle = document.getElementById(config.prefix + '-toggle');
    var options = document.getElementById(config.prefix + '-options');
    var count = document.getElementById(config.prefix + '-count');
    var toast = document.getElementById(config.prefix + '-toast');
    var records = config.records.slice();
    var toastTimer;

    if (!panel || !toolbar || !combo || !search || !toggle || !options) return;

    function updateCount() {
      count.textContent = '共' + records.length + config.unit;
    }

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

    function selectRecord(name) {
      search.value = name;
      setOpen(false);
      search.blur();
    }

    function renderOptions(keyword) {
      var normalized = String(keyword || '').trim().toLowerCase();
      var matched = records.filter(function (name) {
        return !normalized || name.toLowerCase().indexOf(normalized) !== -1;
      });
      options.innerHTML = '';

      if (!matched.length) {
        var empty = document.createElement('div');
        empty.className = 'ai-building-empty';
        empty.textContent = '未找到匹配' + config.itemLabel;
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
          selectRecord(name);
        });
        options.appendChild(option);
      });
    }

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
        if (firstMatch) selectRecord(firstMatch.textContent);
        event.preventDefault();
        window.setTimeout(function () { setOpen(false); }, 0);
      }
    });

    document.getElementById(config.prefix + '-add').addEventListener('click', function () {
      var newName = '新增' + config.itemLabel + (records.length + 1);
      records.push(newName);
      updateCount();
      selectRecord(newName);
      showToast('已新增' + config.itemLabel);
    });

    document.getElementById(config.prefix + '-delete').addEventListener('click', function () {
      var current = search.value;
      var index = records.indexOf(current);
      if (index === -1) {
        showToast('请先选择' + config.itemLabel);
        return;
      }
      if (records.length === 1) {
        showToast('至少保留一条' + config.itemLabel + '信息');
        return;
      }
      records.splice(index, 1);
      updateCount();
      search.value = records[Math.min(index, records.length - 1)];
      renderOptions(search.value);
      showToast('已删除当前' + config.itemLabel);
    });

    document.getElementById(config.prefix + '-import').addEventListener('click', function () {
      showToast('请选择' + config.itemLabel + '信息导入文件');
    });
    document.getElementById(config.prefix + '-export').addEventListener('click', function () {
      showToast(config.itemLabel + '信息导出任务已创建');
    });
    document.addEventListener('click', function (event) {
      if (!combo.contains(event.target)) setOpen(false);
    });

    renderOptions('');
    updateCount();
  }

  function initTenantToolbar() {
    var panel = document.getElementById('u4329_state12');
    var summaryTab = document.getElementById('u7739');
    var tenantTab = document.getElementById('u7740');
    if (!panel || !summaryTab || !tenantTab) return;

    function activateSummary() {
      panel.classList.remove('ai-tenant-active');
      summaryTab.classList.add('ai-active');
      tenantTab.classList.remove('ai-active');
    }

    function activateTenant() {
      panel.classList.add('ai-tenant-active');
      tenantTab.classList.add('ai-active');
      summaryTab.classList.remove('ai-active');
    }

    summaryTab.addEventListener('click', function () { window.setTimeout(activateSummary, 0); });
    tenantTab.addEventListener('click', function () { window.setTimeout(activateTenant, 0); });
    activateSummary();

    setupSearchableRecords({
      panelId: 'u4329_state12',
      toolbarId: 'ai-tenant-toolbar',
      prefix: 'ai-tenant',
      itemLabel: '租户',
      unit: '户',
      records: ['星巴克（12号铺）', '盒马鲜生', '海底捞', '华为体验店', '招商银行', '永辉超市', '屈臣氏', '肯德基']
    });
  }

  function initRelatedToolbar() {
    var newPanel = document.getElementById('rpnTabPanel');
    var toolbarMount = document.getElementById('rpnRelatedToolbarMount');
    var toolbar = document.getElementById('ai-related-toolbar');
    if (!newPanel || !toolbarMount || !toolbar) return;

    toolbarMount.appendChild(toolbar);

    setupSearchableRecords({
      panelId: 'rpnTabPanel',
      toolbarId: 'ai-related-toolbar',
      prefix: 'ai-related',
      itemLabel: '相关方',
      unit: '家',
      records: ['深圳市安保服务有限公司', '华南保洁服务有限公司', '粤安消防维保有限公司', '招商电梯维保有限公司', '南方工程施工有限公司', '城市餐饮供应有限公司']
    });
  }

  function init() {
    initTenantToolbar();
    initRelatedToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
