(function () {
  var MESSAGE = '经纬度与所在城市不一致请调整；';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function hasMismatchFlag() {
    return /(?:\?|&)coordCityMismatch=1(?:&|$)/.test(window.location.search);
  }

  ready(function () {
    if (!hasMismatchFlag()) return;

    var coordinateInput = document.getElementById('u4456_input');
    var coordinateBox = document.getElementById('u4456');
    var coordinateDiv = document.getElementById('u4456_div');
    if (!coordinateInput || !coordinateBox) return;

    coordinateInput.style.color = '#D9001B';
    coordinateInput.style.borderColor = '#D9001B';
    coordinateInput.style.boxShadow = '0 0 0 1px #D9001B inset';
    if (coordinateDiv) {
      coordinateDiv.style.borderColor = '#D9001B';
    }

    var tip = document.createElement('div');
    tip.id = 'ai_coord_city_mismatch_tip';
    tip.textContent = MESSAGE;
    tip.style.cssText = [
      'position:absolute',
      'left:232px',
      'top:463px',
      'width:400px',
      'line-height:20px',
      'font-size:12px',
      'font-family:PingFangSC-Regular, "PingFang SC", Arial, sans-serif',
      'color:#D9001B',
      'z-index:9999',
      'pointer-events:none'
    ].join(';');

    var base = document.getElementById('base') || document.body;
    base.appendChild(tip);
  });
})();
