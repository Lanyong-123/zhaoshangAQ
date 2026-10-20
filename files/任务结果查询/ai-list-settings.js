(function () {
  'use strict';

  var columns = [
    { headerId: 'u79604', label: '评估编号', checked: true },
    { headerId: 'u79605', label: '所属组织/业态', checked: true },
    { headerId: 'u79606', label: '组织/项目名称', checked: true },
    { headerId: 'u79607', label: '评估形式', checked: true },
    { headerId: 'u79608', label: '评估得分（%）', checked: true },
    { headerId: 'u79609', label: '加权评估得分（%）', checked: false },
    { headerId: 'u79610', label: '评估内容', checked: false },
    { headerId: 'u79611', label: '第三方检查', checked: false },
    { headerId: 'u79612', label: '发布人', checked: false },
    { headerId: 'u79613', label: '流程节点', checked: true },
    { headerId: 'u79614', label: '流程状态', checked: true },
    { headerId: 'u79615', label: '任务有效期', checked: true },
    { headerId: 'u79616', label: '频率', checked: true },
    { headerId: 'u79617', label: '进度', checked: false },
    { headerId: 'u79618', label: '最后更新时间', checked: true },
    { headerId: 'u79619', label: '操作', checked: true }
  ];

  function initListSettings() {
    var gear = document.getElementById('u79886');
    var table = document.getElementById('u79587');
    var host = gear && gear.parentElement;
    if (!gear || !table || !host || document.getElementById('ai-list-settings')) return;

    var panel = document.createElement('section');
    var selectedCount = document.createElement('span');
    var optionsContainer = document.createElement('div');

    panel.id = 'ai-list-settings';
    panel.className = 'ai-list-settings';
    panel.setAttribute('aria-label', '列表设置');
    panel.innerHTML = '<div class="ai-list-settings-header"><span>列表设置</span></div>';
    selectedCount.className = 'ai-list-settings-count';
    panel.querySelector('.ai-list-settings-header').appendChild(selectedCount);
    optionsContainer.className = 'ai-list-settings-options';
    panel.appendChild(optionsContainer);

    columns.forEach(function (column) {
      var option = document.createElement('label');
      var checkbox = document.createElement('input');
      var label = document.createElement('span');
      option.className = 'ai-list-settings-option';
      option.title = column.label;
      checkbox.type = 'checkbox';
      checkbox.checked = column.checked;
      checkbox.setAttribute('data-column-index', String(columns.indexOf(column)));
      label.textContent = column.label;
      option.appendChild(checkbox);
      option.appendChild(label);
      optionsContainer.appendChild(option);
    });

    function updateSelectedCount() {
      var selected = optionsContainer.querySelectorAll('input:checked').length;
      selectedCount.textContent = '已选 ' + selected + '/' + columns.length;
    }

    function setOpen(open) {
      panel.classList.toggle('ai-open', open);
      gear.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    panel.style.left = (gear.offsetLeft + gear.offsetWidth - 520) + 'px';
    panel.style.top = (gear.offsetTop + gear.offsetHeight + 7) + 'px';
    host.appendChild(panel);

    gear.setAttribute('role', 'button');
    gear.setAttribute('tabindex', '0');
    gear.setAttribute('aria-label', '列表设置');
    gear.setAttribute('aria-controls', panel.id);
    gear.setAttribute('aria-expanded', 'false');

    gear.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(!panel.classList.contains('ai-open'));
    }, true);
    gear.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!panel.classList.contains('ai-open'));
      }
    });
    optionsContainer.addEventListener('change', updateSelectedCount);
    panel.addEventListener('click', function (event) { event.stopPropagation(); });
    document.addEventListener('click', function () { setOpen(false); });

    updateSelectedCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListSettings);
  } else {
    initListSettings();
  }
}());
