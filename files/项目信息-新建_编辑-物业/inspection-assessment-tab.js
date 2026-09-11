(function () {
  var tabId = 'u17422';
  var panelId = 'u12974';
  var stateId = 'u12974_state15';
  var tabText = '检验检测（评估）';

  function byId(id) {
    return document.getElementById(id);
  }

  function showElement(el) {
    if (!el) return;
    el.style.display = '';
    el.style.visibility = 'visible';
  }

  function hideElement(el) {
    if (!el) return;
    el.style.visibility = 'hidden';
  }

  function setTabText() {
    var textNode = byId(tabId + '_text');
    if (!textNode) return;
    textNode.innerHTML = '<p><span>' + tabText + '</span></p>';
  }

  function clearTabSelected() {
    var tabs = document.querySelectorAll('[selectiongroup="Tab标签"]');
    tabs.forEach(function (tab) {
      tab.classList.remove('selected');
      tab.classList.remove('ai-tab-selected');
      var div = byId(tab.id + '_div');
      if (div) div.classList.remove('selected');
    });
  }

  function showInspectionPanel() {
    var panel = byId(panelId);
    var target = byId(stateId);
    if (!panel || !target) return;

    Array.prototype.forEach.call(panel.children, function (child) {
      if (child.classList && child.classList.contains('panel_state')) {
        hideElement(child);
      }
    });

    target.style.display = '';
    target.style.visibility = 'visible';
  }

  function selectInspectionTab() {
    var tab = byId(tabId);
    var tabDiv = byId(tabId + '_div');
    if (!tab) return;
    clearTabSelected();
    tab.classList.add('selected');
    tab.classList.add('ai-tab-selected');
    if (tabDiv) tabDiv.classList.add('selected');
    showInspectionPanel();
  }

  function bindTab() {
    var tab = byId(tabId);
    if (!tab || tab.dataset.aiInspectionBound === '1') return;
    tab.dataset.aiInspectionBound = '1';
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      selectInspectionTab();
    }, true);
  }

  function init() {
    document.body.classList.add('ai-inspection-tab-ready');
    var tab = byId(tabId);
    if (!tab) return;
    tab.classList.remove('ax_default_hidden');
    tab.removeAttribute('style');
    showElement(tab);
    setTabText();
    bindTab();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init);
})();
