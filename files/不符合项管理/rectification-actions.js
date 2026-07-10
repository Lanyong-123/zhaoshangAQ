(function () {
  function toast(message) {
    var old = document.getElementById("ai-rectification-toast");
    if (old) old.remove();
    var el = document.createElement("div");
    el.id = "ai-rectification-toast";
    el.textContent = message;
    el.style.cssText = "position:fixed;top:82px;left:50%;transform:translateX(-50%);z-index:999999;padding:10px 20px;border-radius:3px;background:rgba(44,55,68,.94);color:#fff;font:14px 'PingFang SC','Microsoft YaHei',sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.2)";
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1800);
  }

  function bind(id, handler) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.cursor = "pointer";
    el.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      handler();
    }, true);
  }

  function init() {
    bind("u74754", function () {
      if (document.referrer && document.referrer.indexOf("不符合项管理") > -1) history.back();
      else location.href = "不符合项管理.html";
    });
    bind("u74756", function () { location.href = "不符合项管理.html"; });
    bind("u74755", function () { location.href = "不符合项管理.html"; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
