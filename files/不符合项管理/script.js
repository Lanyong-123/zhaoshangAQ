(function(){
  var rows=[
    {cycle:"2025-04-15 至 2025-04-30",l1No:"一",l1:"工作目标",l2No:"（二）",l2:"业务管理",l3No:"1",l3:"部门权责事项",l4No:"",l4:"",l5No:"",l5:"",standard:"制定企业安全生产方针、目标和不低于上级下达的安全控制指标",required:"是（1星）",scoring:"无安全工作方针与目标，或安全工作方针与目标不符合国家法律法规要求",date:"2025-03-28",material:"图片1.png、图片2.png",note:"已按要求整改",status:"已完成"},
    {cycle:"2025-04-15 至 2025-04-30",l1No:"一、",l1:"安全目标",l2No:"1.1",l2:"资质",l3No:"",l3:"",l4No:"",l4:"",l5No:"",standard:"制定企业安全生产方针、目标和不低于上级下达的安全控制指标",required:"是（1星）",scoring:"安全工作方针与目标未文件化",date:"",material:"—",note:"",status:"未完成"},
    {cycle:"2025-04-15 至 2025-04-30",l1No:"一、",l1:"安全目标",l2No:"1.1",l2:"资质",l3No:"",l3:"",l4No:"",l4:"",l5No:"",standard:"制定企业安全生产方针、目标和不低于上级下达的安全控制指标",required:"是（3星）",scoring:"安全工作目标和指标与企业职业安全健康风险不相适应",date:"2025-03-28",material:"整改报告.pdf",note:"已按要求整改",status:"已完成"},
    {cycle:"2025-04-15 至 2025-04-30",l1No:"一、",l1:"安全目标",l2No:"1.1",l2:"资质",l3No:"",l3:"",l4No:"",l4:"",l5No:"",standard:"制定企业安全生产方针、目标和不低于上级下达的安全控制指标",required:"是（1星）",scoring:"安全生产目标和指标不能体现持续改进",date:"2025-03-28",material:"图片3.png",note:"整改资料待复核",status:"整改中"},
    {cycle:"2025-05-01 至 2025-05-31",l1No:"二、",l1:"组织机构和职责",l2No:"2.1",l2:"安全管理机构",l3No:"2.1.1",l3:"机构设置",l4No:"",l4:"",l5No:"",standard:"建立设置安全管理机构、配备安全管理人员的管理制度",required:"否",scoring:"未按规定设置安全管理机构或配备专职安全管理人员",date:"2025-05-18",material:"组织架构图.png",note:"已补充机构设置文件",status:"已完成"},
    {cycle:"2025-05-01 至 2025-05-31",l1No:"三、",l1:"安全投入",l2No:"3.1",l2:"费用保障",l3No:"3.1.2",l3:"使用记录",l4No:"3.1.2.1",l4:"费用台账",l5No:"",l5:"",standard:"按规定提取和使用安全生产费用并建立使用台账",required:"是（2星）",scoring:"安全费用使用记录与实际支出凭证不一致",date:"2025-05-25",material:"费用台账.xlsx",note:"正在核对相关凭证",status:"整改中"},
    {cycle:"2025-05-01 至 2025-05-31",l1No:"四、",l1:"法律法规与安全管理制度",l2No:"4.2",l2:"操作规程",l3No:"4.2.1",l3:"规程编制",l4No:"4.2.1.3",l4:"风险控制",l5No:"4.2.1.3.1",l5:"特定风险",standard:"岗位操作规程应覆盖主要岗位和特定风险",required:"是（3星）",scoring:"内容没有基于特定风险分析、评估和控制",date:"2025-05-29",material:"修订规程.docx",note:"已完成规程修订",status:"已完成"},
    {cycle:"2025-05-01 至 2025-05-31",l1No:"一、",l1:"安全目标",l2No:"1.2",l2:"监测与考核",l3No:"1.2.1",l3:"执行监测",l4No:"",l4:"",l5No:"",standard:"对安全生产目标和指标实施计划的执行情况进行监测并保存记录",required:"否",scoring:"未保存安全目标执行情况的监测记录",date:"",material:"—",note:"",status:"未完成"}
  ];
  var extraFields=[
    {assessmentNo:"20260709-001",orgType:"产业园区",orgName:"蛇口网谷项目",orgUnit:"招商蛇口数字城市科技有限公司",orgLevel:"4",problemType:"公司管理红线",planDate:"2026-07-08"},
    {assessmentNo:"20260709-002",orgType:"在建工程",orgName:"青羊158亩项目部",orgUnit:"郑州公司",orgLevel:"4",problemType:"重大隐患",planDate:"2026-07-10"},
    {assessmentNo:"20260709-003",orgType:"物业管理",orgName:"招商局海南区域总部写字楼",orgUnit:"招商海南",orgLevel:"3",problemType:"公司管理红线",planDate:"2026-07-12"},
    {assessmentNo:"20260709-004",orgType:"邮轮母港",orgName:"深圳邮轮母港",orgUnit:"深圳市前海蛇口自贸投资发展有限公司",orgLevel:"4",problemType:"公司管理红线",planDate:"2026-07-15"},
    {assessmentNo:"20260710-001",orgType:"商业管理",orgName:"海上世界文化艺术中心",orgUnit:"东莞公司",orgLevel:"3",problemType:"重大隐患",planDate:"2026-07-18"},
    {assessmentNo:"20260710-002",orgType:"在建工程",orgName:"成都天府项目部",orgUnit:"西安公司",orgLevel:"4",problemType:"公司管理红线",planDate:"2026-07-20"},
    {assessmentNo:"20260710-003",orgType:"产业园区",orgName:"上海智慧城项目",orgUnit:"招商产园",orgLevel:"3",problemType:"重大隐患",planDate:"2026-07-22"},
    {assessmentNo:"20260710-004",orgType:"物业管理",orgName:"北京招商公园服务中心",orgUnit:"招商积余产业运营服务有限公司",orgLevel:"4",problemType:"公司管理红线",planDate:"2026-07-25"}
  ];
  var rectifyDates=["2026-07-08","","2026-07-11","2026-07-14","2026-07-18","2026-07-21","2026-07-22",""];
  var auditStatuses=["审核通过","待处理","审核通过","审核不通过","审核通过","审核不通过","待审核","待处理"];
  var assessmentForms=["监测评审","监测评审","自评监测","监测评审","自评监测","监测评审","自评监测","监测评审"];
  var publishers=["张伟","李娜","王强","赵敏","陈磊","刘洋","周静","黄凯"];
  var publisherOrgs=["安全生产监督管理部","郑州公司","招商海南","深圳市前海蛇口自贸投资发展有限公司","东莞公司","西安公司","招商产园","招商积余产业运营服务有限公司"];
  var implementDates=["2026-07-05","2026-07-06","2026-07-08","2026-07-10","2026-07-12","2026-07-16","2026-07-18","2026-07-20"];
  function getDueStatus(date){return date&&date<="2026-07-10"?"已到期":"未到期"}
  rows=rows.map(function(row,index){Object.assign(row,extraFields[index]);row.cycle=index<4?"2026-07-01 至 2026-07-15":"2026-07-16 至 2026-07-31";row.assessmentForm=assessmentForms[index];row.publisher=publishers[index];row.publisherOrg=publisherOrgs[index];row.implementDate=implementDates[index];row.date=rectifyDates[index];row.auditStatus=auditStatuses[index];row.dueStatus=getDueStatus(row.planDate);return row});

  var dataStatuses=["草稿","数据可用","数据可用","数据不可用","数据可用","退出","数据不可用","数据可用"];
  rows=rows.map(function(row,index){row.dataStatus=dataStatuses[index]||"数据可用";return row});

  var current=rows.slice(), selectedOrg="", activeTab="list", tbody=document.getElementById("resultBody"), empty=document.getElementById("emptyState"), statsBody=document.getElementById("statsBody"), statsEmpty=document.getElementById("statsEmptyState");
  var keys=["assessmentNo","orgType","orgName","cycle","assessmentForm","publisher","publisherOrg","l1No","l1","l2No","l2","l3No","l3","l4No","l4","l5No","l5","standard","required","scoring","problemType","planDate","dueStatus","date","material","note","status"];
  var headers=["评估编号","所属组织/业态","组织/项目名称","评估周期","评估形式","任务发布人","任务发布人所属组织","一级要素序号","一级要素名称","二级要素序号","二级要素名称","三级要素序号","三级要素名称","四级要素序号","四级要素名称","五级要素序号","五级要素名称","达标标准","必须项","评分方式","隐患类型","计划整改完成时间","到期状态","整改时间","整改资料","整改说明","整改完成情况"];
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function bindElementRow(row){Array.prototype.forEach.call(row.querySelectorAll("input[data-level]"),function(input){input.onkeydown=function(e){if(e.key==="Enter")query()}});var remove=row.querySelector(".element-remove");if(remove)remove.onclick=function(){row.remove();query()}}
  function createElementRow(){var row=document.createElement("div");row.className="element-row";row.innerHTML='<input data-level="l1" placeholder="一级要素名称"><input data-level="l2" placeholder="二级要素名称"><input data-level="l3" placeholder="三级要素名称"><input data-level="l4" placeholder="四级要素名称"><input data-level="l5" placeholder="五级要素名称"><button class="element-remove" type="button" aria-label="删除要素名称条件">−</button>';bindElementRow(row);return row}
  function initElementRows(){var root=document.getElementById("elementRows"),add=root.querySelector(".element-add");bindElementRow(root.querySelector(".element-row"));add.onclick=function(){root.appendChild(createElementRow())}}
  function resetElementRows(){var root=document.getElementById("elementRows"),first=root.querySelector(".element-row");Array.prototype.forEach.call(first.querySelectorAll("input[data-level]"),function(input){input.value=""});Array.prototype.forEach.call(root.querySelectorAll(".element-row"),function(row,index){if(index>0)row.remove()})}
  function getElementConditions(){return Array.prototype.map.call(document.querySelectorAll("#elementRows .element-row"),function(row){var condition={};Array.prototype.forEach.call(row.querySelectorAll("input[data-level]"),function(input){condition[input.dataset.level]=input.value.trim().toLowerCase()});return condition}).filter(function(condition){return Object.keys(condition).some(function(key){return condition[key]})})}
  function rowMatchesElementConditions(row,conditions){if(!conditions.length)return true;return conditions.some(function(c){return(!c.l1||String(row.l1||"").toLowerCase().indexOf(c.l1)>-1)&&(!c.l2||String(row.l2||"").toLowerCase().indexOf(c.l2)>-1)&&(!c.l3||String(row.l3||"").toLowerCase().indexOf(c.l3)>-1)&&(!c.l4||String(row.l4||"").toLowerCase().indexOf(c.l4)>-1)&&(!c.l5||String(row.l5||"").toLowerCase().indexOf(c.l5)>-1)})}
  function statusClass(s){return s==="未完成"?"wait":s==="整改中"?"doing":"done"}
  function auditStatusClass(s){return s==="待处理"?"doing":s==="待审核"?"audit":s==="审核通过"?"done":"wait"}
  function dueStatusClass(s){return s==="已到期"?"wait":"done"}
  function statLink(value,type,metric,org){var params="type="+encodeURIComponent(type)+"&metric="+encodeURIComponent(metric)+(org?"&org="+encodeURIComponent(org):"");return '<a class="stat-link" href="不符合项管理.html?'+params+'">'+esc(value)+'</a>'}
  function updateSelectionCount(){var checked=document.querySelectorAll(".row-check:checked").length,all=document.querySelectorAll(".row-check").length;document.getElementById("selectedCount").textContent=checked;document.getElementById("checkAll").checked=!!all&&checked===all}
  function render(data){
    current=data;
    tbody.innerHTML=data.map(function(r,index){
      var cells=keys.map(function(key){if(key==="material"&&r[key]!=="—")return '<td><a class="link" href="整改详情.html">'+esc(r[key])+'</a></td>';if(key==="status")return '<td><span class="tag '+statusClass(r[key])+'">'+esc(r[key])+'</span></td>';if(key==="dueStatus")return '<td><span class="tag '+dueStatusClass(r[key])+'">'+esc(r[key])+'</span></td>';var cls=(key==="standard"||key==="scoring"||key==="note")?' class="problem-cell"':'';return '<td'+cls+'>'+esc(r[key])+'</td>'}).join("");
      return '<tr><td><input class="row-check" type="checkbox" data-id="'+esc(r.assessmentNo)+'" aria-label="选择第'+(index+1)+'条"></td>'+cells+'</tr>';
    }).join("");
    var total=document.getElementById("totalCount");if(total)total.textContent=data.length;
    document.getElementById("footerCount").textContent=data.length;
    empty.hidden=data.length!==0;
    document.getElementById("checkAll").checked=false;
    updateSelectionCount();
    Array.prototype.forEach.call(document.querySelectorAll(".row-check"),function(input){input.onchange=updateSelectionCount});
    renderStats(data);
  }
  function emptyStats(){return {total:0,due:0,dueCompleted:0,notDue:0,notDueCompleted:0}}
  function isCompleted(row){return row.status==="已完成"||!!row.date}
  function normalizeProblemType(type){return type==="重大隐患"?"重大事故隐患":type}
  function addStatsItem(target,row){
    target.total+=1;
    if(row.dueStatus==="已到期"){
      target.due+=1;
      if(isCompleted(row))target.dueCompleted+=1;
    }else{
      target.notDue+=1;
      if(isCompleted(row))target.notDueCompleted+=1;
    }
  }
  function renderStats(data){
    var typeOrder=["重大事故隐患","集团负面清单","公司管理红线"], orgMap={};
    data.forEach(function(row){
      var org=row.orgUnit||row.orgName||"—", type=normalizeProblemType(row.problemType);
      if(!orgMap[org])orgMap[org]={org:org,types:{}};
      typeOrder.forEach(function(t){if(!orgMap[org].types[t])orgMap[org].types[t]=emptyStats()});
      if(!orgMap[org].types[type])orgMap[org].types[type]=emptyStats();
      addStatsItem(orgMap[org].types[type],row);
    });
    var orgRows=Object.keys(orgMap).map(function(org){return orgMap[org]});
    statsBody.innerHTML=orgRows.map(function(row){
      var total=typeOrder.reduce(function(sum,type){return sum+row.types[type].total},0);
      var cells=typeOrder.map(function(type){
        var item=row.types[type];
        return '<td>'+statLink(item.total,type,type+"数",row.org)+'</td><td>'+statLink(item.due,type,type+"到期应整改数",row.org)+'</td><td>'+statLink(item.dueCompleted,type,type+"到期已整改数",row.org)+'</td><td>'+statLink(item.notDue,type,type+"未到期数",row.org)+'</td><td>'+statLink(item.notDueCompleted,type,type+"未到期已整改数",row.org)+'</td>';
      }).join("");
      return '<tr><td>'+esc(row.org)+'</td><td>'+statLink(total,"全部","累计重大不符合总数",row.org)+'</td>'+cells+'</tr>';
    }).join("");
    statsEmpty.hidden=orgRows.length!==0;
  }
  function setActiveTab(tab){
    activeTab=tab;
    document.querySelectorAll(".result-tabs button").forEach(function(btn){var isActive=btn.dataset.tab===tab;btn.classList.toggle("active",isActive);btn.setAttribute("aria-selected",isActive?"true":"false")});
    document.getElementById("listView").hidden=tab!=="list";
    document.getElementById("statsView").hidden=tab!=="stats";
  }
  function query(){
    var keyword=document.getElementById("keyword").value.trim().toLowerCase(),orgType=document.getElementById("orgType").value,orgLevel=document.getElementById("orgLevel").value,problemType=document.getElementById("problemType").value,assessmentForm=document.getElementById("assessmentForm").value,publisherOrg=document.getElementById("publisherOrg").value,cycleStart=document.getElementById("cycleStart").value,cycleEnd=document.getElementById("cycleEnd").value,required=document.getElementById("required").value,scoring=document.getElementById("scoring").value.trim().toLowerCase(),status=document.getElementById("status").value,dueStatus=document.getElementById("dueStatus").value,dataStatus=document.getElementById("dataStatus").value,elementConditions=getElementConditions(),dueDate=document.getElementById("planEndDate").value,implementStart=document.getElementById("implementStartDate").value,implementEnd=document.getElementById("implementEndDate").value,start=document.getElementById("startDate").value,end=document.getElementById("endDate").value;
    render(rows.filter(function(r){var text=(r.assessmentNo+r.orgName+r.orgUnit+r.publisher+r.publisherOrg+r.l1+r.l2+r.l3+r.l4+r.l5+r.standard+r.scoring+r.note).toLowerCase(),rowCycleStart=r.cycle.slice(0,10),rowCycleEnd=r.cycle.slice(-10),implementMatch=!(implementStart||implementEnd)||(r.implementDate&&(!implementStart||r.implementDate>=implementStart)&&(!implementEnd||r.implementDate<=implementEnd)),rectifyMatch=!(start||end)||(r.date&&(!start||r.date>=start)&&(!end||r.date<=end)),treeMatch=!selectedOrg||r.orgUnit===selectedOrg||r.orgName.indexOf(selectedOrg)>-1,elementMatch=rowMatchesElementConditions(r,elementConditions);return treeMatch&&elementMatch&&(!keyword||text.indexOf(keyword)>-1)&&(!orgType||r.orgType===orgType)&&(!orgLevel||r.orgLevel===orgLevel)&&(!problemType||r.problemType===problemType)&&(!assessmentForm||r.assessmentForm===assessmentForm)&&(!publisherOrg||r.publisherOrg===publisherOrg)&&(!cycleStart||rowCycleEnd>=cycleStart)&&(!cycleEnd||rowCycleStart<=cycleEnd)&&(!required||r.required===required)&&(!scoring||r.scoring.toLowerCase().indexOf(scoring)>-1)&&(!status||r.status===status)&&(!dueStatus||r.dueStatus===dueStatus)&&(!dataStatus||r.dataStatus===dataStatus)&&(!dueDate||r.planDate<=dueDate)&&implementMatch&&rectifyMatch}));
    toast("查询完成，共 "+current.length+" 条记录");
  }
  function today(){var d=new Date(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return d.getFullYear()+"-"+m+"-"+day}
  function setDefaultDueDate(){document.getElementById("planEndDate").value=today()}
  function reset(){["keyword","orgType","orgLevel","problemType","assessmentForm","publisherOrg","cycleStart","cycleEnd","required","scoring","status","dueStatus","dataStatus","planEndDate","implementStartDate","implementEndDate","startDate","endDate"].forEach(function(id){document.getElementById(id).value=""});resetElementRows();setDefaultDueDate();selectedOrg="";document.querySelectorAll(".tree-node.active").forEach(function(node){node.classList.remove("active")});document.querySelector(".tree-node[data-org='']").classList.add("active");render(rows);toast("查询条件已重置")}
  function exportCsv(){if(!current.length){toast("当前没有可导出的记录");return}var csv="\ufeff"+headers.join(",")+"\n"+current.map(function(r){return keys.map(function(k){return '"'+String(r[k]||"").replace(/"/g,'""')+'"'}).join(",")}).join("\n"),blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="不符合项管理_"+new Date().toISOString().slice(0,10)+".csv";a.click();URL.revokeObjectURL(a.href);toast("已导出 "+current.length+" 条记录")}
  function toast(msg){var el=document.getElementById("toast");el.textContent=msg;el.style.display="block";clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(function(){el.style.display="none"},1800)}
  function initTree(){
    document.querySelector(".tree-node[data-org='']").classList.add("active");
    document.querySelectorAll(".tree-node button").forEach(function(btn){btn.onclick=function(){var node=btn.parentNode;selectedOrg=node.getAttribute("data-org")||"";document.querySelectorAll(".tree-node.active").forEach(function(el){el.classList.remove("active")});node.classList.add("active");query()}});
    document.getElementById("orgTreeKeyword").oninput=function(){var value=this.value.trim().toLowerCase();document.querySelectorAll(".tree-node").forEach(function(node){var text=node.textContent.toLowerCase();node.style.display=!value||text.indexOf(value)>-1?"flex":"none"})};
  }
  document.getElementById("searchBtn").onclick=query;
  document.getElementById("resetBtn").onclick=reset;
  document.getElementById("exportBtn").onclick=exportCsv;
  document.getElementById("checkAll").onchange=function(){var checked=this.checked;Array.prototype.forEach.call(document.querySelectorAll(".row-check"),function(c){c.checked=checked});updateSelectionCount()};
  document.getElementById("keyword").onkeydown=function(e){if(e.key==="Enter")query()};
  document.querySelectorAll(".result-tabs button").forEach(function(btn){btn.onclick=function(){setActiveTab(btn.dataset.tab)}});
  initElementRows();
  initTree();
  setDefaultDueDate();
  render(rows);
})();
