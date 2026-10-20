(function () {
  'use strict';

  function initMicroFireStation() {
    var settingSelect = document.getElementById('u6425_input');
    var countInput = document.getElementById('u6432_input');
    var memberSection = document.getElementById('ai-micro-fire-members');
    var tableBody = document.getElementById('ai-micro-fire-tbody');
    var addButton = document.getElementById('ai-micro-fire-add');

    if (!settingSelect || !countInput || !memberSection || !tableBody || !addButton) return;

    var conditionalIds = ['u6427', 'u6428', 'u6429', 'u6430', 'u6431', 'u6432', 'u6433', 'u6434'];

    countInput.readOnly = true;
    countInput.tabIndex = -1;
    countInput.placeholder = '自动计算';
    countInput.setAttribute('aria-readonly', 'true');

    function updateCount() {
      countInput.value = String(tableBody.querySelectorAll('tr').length);
    }

    function addRow(values) {
      var row = document.createElement('tr');
      var fields = [
        { name: 'duty', placeholder: '请输入职务', value: values && values.duty ? values.duty : '' },
        { name: 'name', placeholder: '请输入姓名', value: values && values.name ? values.name : '' },
        { name: 'phone', placeholder: '请输入电话', value: values && values.phone ? values.phone : '' }
      ];

      fields.forEach(function (field) {
        var cell = document.createElement('td');
        var input = document.createElement('input');
        input.type = field.name === 'phone' ? 'tel' : 'text';
        input.name = 'microFireMember_' + field.name + '[]';
        input.placeholder = field.placeholder;
        input.value = field.value;
        input.autocomplete = 'off';
        cell.appendChild(input);
        row.appendChild(cell);
      });

      var actionCell = document.createElement('td');
      var deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'ai-micro-fire-delete';
      deleteButton.textContent = '删除';
      deleteButton.addEventListener('click', function () {
        row.remove();
        updateCount();
      });
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
      tableBody.appendChild(row);
      updateCount();
    }

    function updateVisibility() {
      var isConfigured = settingSelect.value === '是';
      conditionalIds.forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
          element.classList.toggle('ai-micro-fire-hidden', !isConfigured);
          element.setAttribute('aria-hidden', String(!isConfigured));
        }
      });
      memberSection.classList.toggle('ai-micro-fire-hidden', !isConfigured);
      memberSection.setAttribute('aria-hidden', String(!isConfigured));
    }

    addButton.addEventListener('click', function () { addRow(); });
    settingSelect.addEventListener('change', updateVisibility);

    addRow();
    updateVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMicroFireStation);
  } else {
    initMicroFireStation();
  }
}());
