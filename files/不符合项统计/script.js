(function () {
  var rows = [
    {org:"上海公司",level:3,type:"重大隐患",total:13,due:13,completed:0,overdue:13,excluded:0,date:"2026-01-15"},
    {org:"上海公司",level:3,type:"公司管理红线",total:17,due:17,completed:0,overdue:17,excluded:0,date:"2026-02-20"},
    {org:"合肥公司",level:3,type:"重大隐患",total:4,due:4,completed:2,overdue:2,excluded:0,date:"2026-03-12"},
    {org:"合肥公司",level:3,type:"公司管理红线",total:7,due:7,completed:6,overdue:1,excluded:0,date:"2026-03-26"},
    {org:"安全生产监督管理部",level:2,type:"重大隐患",total:24,due:24,completed:18,overdue:6,excluded:0,date:"2026-04-08"},
    {org:"安全生产监督管理部",level:2,type:"集团负面清单",total:9,due:6,completed:4,overdue:2,excluded:3,date:"2026-04-22"},
    {org:"安全生产监督管理部",level:2,type:"公司管理红线",total:51,due:45,completed:40,overdue:5,excluded:6,date:"2026-05-06"},
    {org:"成都公司",level:3,type:"重大隐患",total:4,due:0,completed:0,overdue:0,excluded:4,date:"2026-05-18"},
    {org:"成都公司",level:3,type:"集团负面清单",total:2,due:1,completed:1,overdue:0,excluded:1,date:"2026-05-29"},
    {org:"成都公司",level:3,type:"公司管理红线",total:4,due:0,completed:0,overdue:0,excluded:4,date:"2026-06-03"},
    {org:"招商产园",level:2,type:"重大隐患",total:2,due:2,completed:2,overdue:0,excluded:0,date:"2026-06-16"},
    {org:"招商产园",level:2,type:"集团负面清单",total:8,due:6,completed:6,overdue:0,excluded:2,date:"2026-06-28"},
    {org:"深圳公司",level:3,type:"重大隐患",total:104,due:91,completed:38,overdue:53,excluded:13,date:"2026-07-02"},
    {org:"华南区域",level:2,type:"公司管理红线",total:244,due:220,completed:99,overdue:121,excluded:24,date:"2026-07-05"},
    {org:"上海公司",level:3,type:"集团负面清单",total:97,due:83,completed:42,overdue:41,excluded:14,date:"2026-07-08"}
  ];
  var current = rows.slice();
  var activeTaskScope = "all";
  var taskScopeTips = {
    all: "选中的统计范围和层级，将该组织层级下所有的隐患汇总，如选中三层则将三层至九层所有的隐患汇总",
    published: "选中的统计范围和层级，发出去的任务产生的隐患统计，如：选中三层则统计三层组织发出的监督评审产生的隐患",
    implemented: "选中的统计范围和层级，接收到的任务产生的隐患统计，如：选中三层则统计三层组织接收的监督评审产生的隐患"
  };
  function rate(a,b){return b ? (a*100/b).toFixed(2)+"%" : "0.00%"}
  function esc(s){return String(s).replace(/[&<>\"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[c]})}
  function statLink(value,type,metric,org){var params="source=report&type="+encodeURIComponent(type)+"&metric="+encodeURIComponent(metric)+(org?"&org="+encodeURIComponent(org):"");return '<a class="stat-link" href="不符合项管理.html?'+params+'">'+esc(value)+'</a>'}
  function emptyStats(){return {total:0,due:0,completed:0,notDue:0,notDueCompleted:0}}
  function orgSummary(data){
    var map={};
    data.forEach(function(r){
      if(!map[r.org])map[r.org]={org:r.org,level:r.level,date:r.date,types:{}};
      if(!map[r.org].types[r.type])map[r.org].types[r.type]=emptyStats();
      var item=map[r.org].types[r.type],notDue=r.total-r.due,notDueCompleted=Math.max(r.completed-r.due,0);
      item.total+=r.total;
      item.due+=r.due;
      item.completed+=r.completed;
      item.notDue+=notDue;
      item.notDueCompleted+=notDueCompleted;
    });
    return Object.keys(map).map(function(org){return map[org]});
  }
  function typeCells(row,type){
    var item=row.types[type]||emptyStats();
    return '<td>'+statLink(item.total,type,type+"数",row.org)+'</td><td>'+statLink(item.due,type,type+"到期应整改数",row.org)+'</td><td>'+statLink(item.completed,type,type+"到期已整改数",row.org)+'</td><td>'+statLink(item.notDue,type,type+"未到期数",row.org)+'</td><td>'+statLink(item.notDueCompleted,type,type+"未到期已整改数",row.org)+'</td>';
  }
  function render(data){
    current=data;
    var types=["公司管理红线","集团负面清单","重大隐患"];
    document.getElementById("summaryBody").innerHTML=types.map(function(type){
      var items=data.filter(function(r){return r.type===type}),
        total=items.reduce(function(n,r){return n+r.total},0),
        dueCompleted=items.reduce(function(n,r){return n+Math.min(r.completed,r.due)},0),
        notDueCompleted=items.reduce(function(n,r){return n+Math.max(r.completed-r.due,0)},0),
        overdueUnfinished=items.reduce(function(n,r){return n+r.overdue},0),
        notDueUnfinished=items.reduce(function(n,r){return n+Math.max((r.total-r.due)-Math.max(r.completed-r.due,0),0)},0);
      return '<tr><td>'+type+'</td><td>'+statLink(total,type,"隐患总数")+'</td><td>'+statLink(dueCompleted,type,"到期已整改数")+'</td><td>'+statLink(notDueCompleted,type,"未到期已整改数")+'</td><td>'+statLink(overdueUnfinished,type,"超期未完成数")+'</td><td>'+statLink(notDueUnfinished,type,"未到期未完成数")+'</td></tr>';
    }).join("");
    var orgRows=orgSummary(data);
    document.getElementById("detailBody").innerHTML=orgRows.length?orgRows.map(function(r){var total=["重大隐患","集团负面清单","公司管理红线"].reduce(function(sum,type){return sum+((r.types[type]&&r.types[type].total)||0)},0);return '<tr><td>'+esc(r.org)+'</td><td>'+statLink(total,"全部","累计重大不符合总数",r.org)+'</td>'+typeCells(r,"重大隐患")+typeCells(r,"集团负面清单")+typeCells(r,"公司管理红线")+'</tr>'}).join(""):'<tr><td class="empty" colspan="17">未查询到符合条件的统计数据</td></tr>';
    var recordCount=document.getElementById("recordCount");
    if(recordCount)recordCount.textContent=orgRows.length;
  }
  var scopeMap={"scope:华东区域":["上海公司","合肥公司"],"scope:总部职能":["安全生产监督管理部"],"scope:西南区域":["成都公司"],"scope:产业园区":["招商产园"],"scope:华南区域":["深圳公司","华南区域"]};
  function checkedValues(id){return Array.from(document.querySelectorAll("#"+id+" input:checked")).map(function(input){return input.value})}
  function matchesScope(row,selected){if(!selected.length||selected.indexOf("all")>-1)return true;return selected.some(function(value){if(value.indexOf("org:")===0)return row.org===value.slice(4);return scopeMap[value]&&scopeMap[value].indexOf(row.org)>-1})}
  function rowTaskScope(row,index){return row.taskScope||(index<7?"published":"implemented")}
  function query(){var org=document.getElementById("orgName").value.trim().toLowerCase(),type=document.getElementById("issueType").value,assessmentForm=document.getElementById("assessmentForm").value,start=document.getElementById("statStart").value,end=document.getElementById("statEnd").value,dueDate=document.getElementById("dueDate").value,implementStart=document.getElementById("implementStart").value,implementEnd=document.getElementById("implementEnd").value,scopes=checkedValues("orgTreeSelect"),level=document.getElementById("orgLevel").value;render(rows.filter(function(r,index){var implementDate=r.implementDate||r.date,form=r.assessmentForm||"监督评审",taskScope=rowTaskScope(r,index);return(!activeTaskScope||activeTaskScope==="all"||taskScope===activeTaskScope)&&(!org||r.org.toLowerCase().indexOf(org)>-1)&&(!type||r.type===type)&&(!assessmentForm||form===assessmentForm)&&(!start||r.date>=start)&&(!end||r.date<=end)&&(!dueDate||r.date<=dueDate)&&(!implementStart||implementDate>=implementStart)&&(!implementEnd||implementDate<=implementEnd)&&matchesScope(r,scopes)&&(!level||String(r.level)===level)}))}
  function setActiveTaskScope(scope,runQuery){activeTaskScope=scope;document.querySelectorAll(".task-scope-tabs button").forEach(function(btn){var active=btn.dataset.scope===scope;btn.classList.toggle("active",active);btn.setAttribute("aria-selected",active?"true":"false")});document.getElementById("taskScopeTip").textContent=taskScopeTips[scope]||"";if(runQuery)query()}
  function syncTaskScopeTabs(runQuery){var form=document.getElementById("assessmentForm").value,onlyAll=!form,allBtn=document.querySelector('.task-scope-tabs button[data-scope="all"]'),publishedBtn=document.querySelector('.task-scope-tabs button[data-scope="published"]'),implementedBtn=document.querySelector('.task-scope-tabs button[data-scope="implemented"]');allBtn.hidden=!onlyAll;publishedBtn.hidden=onlyAll;implementedBtn.hidden=onlyAll;if(onlyAll){setActiveTaskScope("all",runQuery)}else if(activeTaskScope==="all"){setActiveTaskScope("published",runQuery)}else{setActiveTaskScope(activeTaskScope,runQuery)}}
  function today(){var d=new Date(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return d.getFullYear()+"-"+m+"-"+day}
  function setDefaultDueDate(){document.getElementById("dueDate").value=today()}
  function setDefaultAssessmentForm(){document.getElementById("assessmentForm").value=""}
  function reset(){["orgName","issueType","statStart","statEnd","orgLevel","dueDate","implementStart","implementEnd"].forEach(function(id){document.getElementById(id).value=""});setDefaultDueDate();setDefaultAssessmentForm();syncTaskScopeTabs(false);document.querySelectorAll(".multi-panel input").forEach(function(input){input.checked=false});updateMultiLabel("orgTreeSelect","请选择组织范围");render(rows)}
  function exportCsv(){var headers=["组织名称","累计重大不符合总数（累计求和，动态更新）","重大事故隐患数","重大事故隐患到期应整改数","重大事故隐患到期已整改数","重大事故隐患未到期数","重大事故隐患未到期已整改数","集团负面清单数","集团负面清单到期应整改数","集团负面清单到期已整改数","集团负面清单未到期数","集团负面清单未到期已整改数","公司管理红线数","公司管理红线到期应整改数","公司管理红线到期已整改数","公司管理红线未到期数","公司管理红线未到期已整改数"],orgRows=orgSummary(current),rowValues=function(row){var result=[row.org],total=["重大隐患","集团负面清单","公司管理红线"].reduce(function(sum,type){return sum+((row.types[type]&&row.types[type].total)||0)},0);result.push(total);["重大隐患","集团负面清单","公司管理红线"].forEach(function(type){var item=row.types[type]||emptyStats();result.push(item.total,item.due,item.completed,item.notDue,item.notDueCompleted)});return result},csv="\ufeff"+headers.join(",")+"\n"+orgRows.map(function(r){return rowValues(r).map(function(v){return '"'+String(v).replace(/"/g,'""')+'"'}).join(",")}).join("\n"),blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="不符合项统计_"+new Date().toISOString().slice(0,10)+".csv";a.click();URL.revokeObjectURL(a.href)}
  function exportListCsv(){if(!current.length){return}var headers=["组织名称","组织层级","评估形式","隐患类型","隐患总数","到期应整改数","到期已整改数","未到期数","未到期已整改数","超期未完成数","未到期未完成数","任务发布时间","任务实施时间"],csv="\ufeff"+headers.join(",")+"\n"+current.map(function(r){var notDue=r.total-r.due,notDueCompleted=Math.max(r.completed-r.due,0),notDueUnfinished=Math.max(notDue-notDueCompleted,0),implementDate=r.implementDate||r.date,form=r.assessmentForm||"监督评审",values=[r.org,r.level+"级",form,r.type,r.total,r.due,Math.min(r.completed,r.due),notDue,notDueCompleted,r.overdue,notDueUnfinished,r.date,implementDate];return values.map(function(v){return '"'+String(v==null?"":v).replace(/"/g,'""')+'"'}).join(",")}).join("\n"),blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="不符合项清单_"+new Date().toISOString().slice(0,10)+".csv";a.click();URL.revokeObjectURL(a.href)}
  function updateMultiLabel(id,placeholder){var root=document.getElementById(id),checked=root.querySelectorAll("input:checked"),trigger=root.querySelector(".multi-trigger");trigger.textContent=checked.length?"已选择 "+checked.length+" 项":placeholder}
  document.querySelectorAll(".multi-select").forEach(function(root){var trigger=root.querySelector(".multi-trigger");trigger.onclick=function(event){event.stopPropagation();var open=!root.classList.contains("open");document.querySelectorAll(".multi-select.open").forEach(function(el){el.classList.remove("open");el.querySelector(".multi-trigger").setAttribute("aria-expanded","false")});root.classList.toggle("open",open);trigger.setAttribute("aria-expanded",open?"true":"false")};root.querySelectorAll("input").forEach(function(input){input.onchange=function(){updateMultiLabel(root.id,"请选择组织范围")}})});
  document.addEventListener("click",function(event){if(!event.target.closest(".multi-select"))document.querySelectorAll(".multi-select.open").forEach(function(el){el.classList.remove("open");el.querySelector(".multi-trigger").setAttribute("aria-expanded","false")})});
  document.querySelectorAll(".task-scope-tabs button").forEach(function(btn){btn.onclick=function(){setActiveTaskScope(btn.dataset.scope,true)}});
  document.getElementById("assessmentForm").onchange=function(){syncTaskScopeTabs(true)};document.getElementById("queryBtn").onclick=query;document.getElementById("resetBtn").onclick=reset;document.getElementById("exportBtn").onclick=exportCsv;document.getElementById("exportListBtn").onclick=exportListCsv;document.getElementById("orgName").onkeydown=function(e){if(e.key==="Enter")query()};setDefaultDueDate();setDefaultAssessmentForm();syncTaskScopeTabs(false);render(rows);
})();
