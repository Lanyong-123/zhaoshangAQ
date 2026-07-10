(function(){
  function normalizedText(node){return (node.textContent||"").replace(/\s+/g,"")}
  function injectMenu(){
    if(document.getElementById("ai-nonconformity-entry")) return;
    var base=document.getElementById("base");
    if(!base) return;
    var children=Array.prototype.slice.call(base.children);
    var anchor=null;
    for(var i=0;i<children.length;i++){
      var item=children[i];
      if(item.offsetLeft<=20&&item.offsetWidth>=210&&normalizedText(item)==="任务结果查询"){
        anchor=item;break;
      }
    }
    if(!anchor) return;
    var insertTop=anchor.offsetTop+anchor.offsetHeight;
    for(var j=0;j<children.length;j++){
      var child=children[j];
      if(child!==anchor&&child.offsetLeft<=231&&child.offsetTop>=insertTop){
        child.style.top=(child.offsetTop+40)+"px";
      }
    }
    var entry=document.createElement("a");
    entry.id="ai-nonconformity-entry";
    entry.href="不符合项管理.html";
    entry.textContent="不符合项管理";
    entry.style.cssText="position:absolute;left:"+anchor.offsetLeft+"px;top:"+insertTop+"px;z-index:99999;width:"+anchor.offsetWidth+"px;height:40px;padding:0 2px 0 64px;display:flex;align-items:center;background:#1777ed;color:#f2f2f2;text-decoration:none;font:16px 'PingFang SC','Microsoft YaHei',sans-serif;box-sizing:border-box;white-space:nowrap";
    entry.onmouseenter=function(){entry.style.background="#006aec"};
    entry.onmouseleave=function(){entry.style.background="#1777ed"};
    document.body.appendChild(entry);
    var labels=document.querySelectorAll(".text");
    for(var k=0;k<labels.length;k++){
      if(normalizedText(labels[k])==="HSE监测评估") labels[k].innerHTML="<p><span style=\"font-family:'ArialMT','Arial',sans-serif;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"font-family:'PingFangSC-Regular','PingFang SC',sans-serif;\">HSE监测管理</span></p>";
    }
  }
  if(document.readyState==="complete") setTimeout(injectMenu,0);
  else window.addEventListener("load",function(){setTimeout(injectMenu,0)});
})();
