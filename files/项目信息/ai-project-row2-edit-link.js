(function () {
  var TARGET_URL = '项目信息-新建_编辑-物业.html';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var actionCell = document.getElementById('u2695');
    if (!actionCell || actionCell.dataset.aiRow2EditBound === '1') return;
    actionCell.dataset.aiRow2EditBound = '1';

    actionCell.style.position = actionCell.style.position || 'absolute';

    function goEdit(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      }
      window.location.href = TARGET_URL;
      return false;
    }

    var modifyHotspot = document.createElement('a');
    modifyHotspot.href = TARGET_URL;
    modifyHotspot.title = '修改';
    modifyHotspot.setAttribute('aria-label', '第二行修改');
    modifyHotspot.style.cssText = [
      'position:absolute',
      'left:48px',
      'top:0',
      'width:46px',
      'height:30px',
      'z-index:2147483647',
      'display:block',
      'background:rgba(255,255,255,0)',
      'cursor:pointer'
    ].join(';');
    modifyHotspot.addEventListener('click', goEdit, true);
    actionCell.appendChild(modifyHotspot);

    actionCell.addEventListener('click', function (event) {
      var rect = actionCell.getBoundingClientRect();
      var x = event.clientX - rect.left;
      if (x >= 42 && x <= 100) {
        return goEdit(event);
      }
    }, true);
  });
})();
