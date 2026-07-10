(function () {
  function inject() {
    if (document.getElementById("ai-nonconformity-report-tab")) return;
    var anchor = document.createElement("a");
    anchor.id = "ai-nonconformity-report-tab";
    anchor.href = "不符合项统计.html";
    anchor.textContent = "不符合项统计";
    anchor.style.cssText = "position:absolute;left:1124px;top:94px;width:150px;height:40px;z-index:99999;display:flex;align-items:center;justify-content:center;background:#fff;color:#333;text-decoration:none;font:14px 'PingFang SC','Microsoft YaHei',sans-serif;box-sizing:border-box;border-bottom:2px solid transparent;white-space:nowrap";
    anchor.onmouseenter = function () { anchor.style.color = "#1777ed"; anchor.style.borderBottomColor = "#1777ed"; };
    anchor.onmouseleave = function () { anchor.style.color = "#333"; anchor.style.borderBottomColor = "transparent"; };
    document.body.appendChild(anchor);
  }
  if (document.readyState === "complete") inject();
  else window.addEventListener("load", inject);
})();
