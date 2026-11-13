(function(){
"use strict";
function $(id){return document.getElementById(id);}
function each(list,fn){Array.prototype.forEach.call(list,fn);}

/* ---------- pages: one section shown at a time, routed on the hash ---------- */
var nav=$("nav"), links=nav.querySelectorAll("a"), order=[], tab={}, cur=null, hero=$("hero");
each(links,function(a){var id=a.getAttribute("href").slice(1); if($("v-"+id)){order.push(id);tab[id]=a;}});
function go(id,setHash){
  if(!tab[id]) id=order[0];
  if(id===cur) return; cur=id;
  order.forEach(function(k){$("v-"+k).hidden=k!==id; tab[k].setAttribute("aria-current",k===id?"true":"false");});
  if(hero) hero.hidden=id!==order[0];
  var w=nav.firstElementChild,a=tab[id]; w.scrollLeft=Math.max(0,a.offsetLeft-w.clientWidth/2+a.offsetWidth/2);
  try{window.scrollTo({top:0,left:0,behavior:"instant"});}catch(e){window.scrollTo(0,0);}
  if(setHash){try{location.hash=id;}catch(e){}}
  window.dispatchEvent(new Event("resize"));
}
document.addEventListener("click",function(ev){
  var a=ev.target.closest?ev.target.closest('a[href^="#"]'):null; if(!a) return;
  var id=a.getAttribute("href").slice(1); if(!tab[id]) return;
  ev.preventDefault(); go(id,true);
});
window.addEventListener("hashchange",function(){var id=location.hash.slice(1); if(tab[id]) go(id,false);});
order.forEach(function(id,i){
  var p=order[i-1], n=order[i+1], h='<div class="wrap"><div class="pager">';
  h+=p?'<a href="#'+p+'"><span>Previous page</span>'+tab[p].textContent+'</a>':'<span></span>';
  h+=n?'<a class="nx" href="#'+n+'"><span>Next page</span>'+tab[n].textContent+'</a>':'<span></span>';
  $("v-"+id).insertAdjacentHTML("beforeend",h+'</div></div>');
});

var ISSUE={"Coverage":[1,"Who is covered"],"Scope of bargaining":[2,"What can be bargained"],"The referees":[3,"The referees"],"Enforcement":[4,"Enforcement"],"Contracts and grievances":[5,"Contracts and arbitration"],"Union operations":[6,"Union operations"],"Interpretation":[7,"Restoration and purpose"]};

/* ---------- who was hit ---------- */
var AG=[
 ["State","The entire department, including embassies, consulates and Foreign Service offices","14251"],
 ["Defense","The entire department, except units the Secretary chooses to restore","14251"],
 ["Treasury","The entire department, except the Bureau of Engraving and Printing","14251","Includes the Internal Revenue Service"],
 ["Veterans Affairs","The entire department, except units the Secretary chooses to restore","14251"],
 ["Justice","The entire department","14251"],
 ["Health and Human Services","Food and Drug Administration","14251"],
 ["Health and Human Services","Centers for Disease Control and Prevention","14251"],
 ["Health and Human Services","National Institute of Allergy and Infectious Diseases","14251","Part of the National Institutes of Health"],
 ["Health and Human Services","Administration for Strategic Preparedness and Response","14251"],
 ["Health and Human Services","Office of Refugee Resettlement","14251"],
 ["Health and Human Services","Office of the Secretary and Office of the General Counsel","14251"],
 ["Homeland Security","U.S. Citizenship and Immigration Services","14251"],
 ["Homeland Security","U.S. Immigration and Customs Enforcement","14251"],
 ["Homeland Security","U.S. Coast Guard","14251","Civilian employees"],
 ["Homeland Security","Federal Emergency Management Agency","14251"],
 ["Homeland Security","Cybersecurity and Infrastructure Security Agency","14251"],
 ["Homeland Security","Management Directorate and Science and Technology Directorate","14251"],
 ["Homeland Security","Office of the Secretary, General Counsel, Strategy and Policy, Health Security, Situational Awareness","14251"],
 ["Interior","Bureau of Land Management","14251"],
 ["Interior","Bureau of Safety and Environmental Enforcement","14251"],
 ["Interior","Bureau of Ocean Energy Management","14251"],
 ["Interior","Office of the Secretary","14251"],
 ["Interior","Bureau of Reclamation units that run hydropower dams","14343"],
 ["Energy","The entire department, except the Federal Energy Regulatory Commission","14251"],
 ["Agriculture","Food Safety and Inspection Service","14251"],
 ["Agriculture","Animal and Plant Health Inspection Service","14251"],
 ["Commerce","International Trade Administration","14251"],
 ["Commerce","National Weather Service","14343","Part of NOAA"],
 ["Commerce","National Environmental Satellite, Data, and Information Service","14343","Part of NOAA"],
 ["Commerce","Office of the Commissioner for Patents and its units","14343","Part of the Patent and Trademark Office"],
 ["Environmental Protection Agency","The entire agency","14251"],
 ["NASA","The entire agency","14343"],
 ["National Science Foundation","The entire agency","14251"],
 ["Nuclear Regulatory Commission","The entire agency","14251"],
 ["General Services Administration","The entire agency","14251"],
 ["Federal Communications Commission","The entire agency","14251"],
 ["U.S. International Trade Commission","The entire agency","14251"],
 ["U.S. Agency for International Development","The entire agency","14251"],
 ["U.S. Agency for Global Media","The entire agency","14343","Voice of America's parent agency"],
 ["Every cabinet department","Office of the Chief Information Officer and any unit whose main duty is information technology","14251"],
 ["Social Security Administration","Office of the Chief Information Officer and information technology units","14251"],
 ["Office of Personnel Management","Office of the Chief Information Officer and information technology units","14251"]
];
var agF={q:"",o:"all"};
function agRender(){
  var q=agF.q.toLowerCase(), n=0, h="";
  AG.forEach(function(r){
    var txt=(r[0]+" "+r[1]+" "+(r[3]||"")).toLowerCase();
    if((agF.o==="all"||agF.o===r[2])&&(!q||txt.indexOf(q)>=0)){
      n++; h+="<tr><td>"+r[0]+"</td><td>"+r[1]+(r[3]?'<span class="sm">'+r[3]+"</span>":"")+'</td><td><span class="tag">'+(r[2]==="14251"?"Mar. 2025":"Aug. 2025")+"</span></td></tr>";
    }
  });
  $("agBody").innerHTML=h||'<tr><td colspan="3" style="font-weight:400;white-space:normal">Nothing on the list matches that search. If your agency is not here, it was not named in either order.</td></tr>';
  $("agCount").textContent="Showing "+n+" of "+AG.length+" entries";
}
$("agq").addEventListener("input",function(){agF.q=this.value.trim();agRender();});
$("agOrder").addEventListener("click",function(ev){
  var b=ev.target.closest("button"); if(!b) return; agF.o=b.dataset.v;
  each(this.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");}); agRender();
});
agRender();

/* ---------- figures ---------- */
(function(){
  var lost=1066423,total=1303181,kept=total-lost,r=62,c=2*Math.PI*r,p=lost/total;
  $("figDonut").innerHTML='<svg viewBox="0 0 160 160" role="img" aria-label="81.8 percent lost bargaining rights"><circle cx="80" cy="80" r="'+r+'" fill="none" stroke="var(--rule)" stroke-width="22"/><circle cx="80" cy="80" r="'+r+'" fill="none" stroke="var(--red)" stroke-width="22" stroke-dasharray="'+(c*p).toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 80 80)"/><text x="80" y="78" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-size="27" font-weight="700" fill="var(--ink)">81.8%</text><text x="80" y="96" text-anchor="middle" font-size="10" fill="var(--muted)">lost rights</text></svg>'+
   '<div class="key"><div><b>'+lost.toLocaleString("en-US")+'</b><span>lost bargaining rights</span></div><div><b style="color:var(--muted)">'+kept.toLocaleString("en-US")+'</b><span>still covered</span></div></div>';
})();
function hbars(id,rows,max,cls){
  $(id).innerHTML=rows.map(function(r){
    var w=Math.max(0.4,r[1]/max*100), inside=w>70;
    return '<div class="row"><span>'+r[0]+'</span><span class="bar'+(r[3]?" red":(cls||""))+'"><i style="width:'+w.toFixed(1)+'%"></i><em style="'+(inside?"right:"+(100-w+1).toFixed(1)+"%;color:#fff;padding:0":"left:"+w.toFixed(1)+"%")+'">'+r[2]+'</em></span></div>';
  }).join("");
}
hbars("figScale",[["1981",11345,"11,345 air traffic controllers fired"],["2025",1066423,"1,066,423 lost bargaining rights",true]],1066423);
hbars("figOT",[["FY 2012",157.2,"$157 million"],["FY 2014",162.5,"$163 million"],["FY 2016",177.2,"$177 million"],["FY 2019",135.0,"$135 million"]],260);
(function(){
  var P=[[1997,59,"59%"],[2014.75,60,"60%"],[2025.05,56,"56%"],[2026.02,38,"38%"],[2026.45,34.8,"34.8%"]];
  var L=38,R=392,T=18,B=178,x0=1995,x1=2028.5;
  function x(t){return L+(t-x0)/(x1-x0)*(R-L);} function y(v){return B-v/70*(B-T);}
  var s="";
  [0,20,40,60].forEach(function(v){s+='<line x1="'+L+'" x2="'+R+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="var(--rule)"/><text x="'+(L-6)+'" y="'+(y(v)+4)+'" text-anchor="end" font-size="11" fill="var(--muted)">'+v+'%</text>';});
  [1997,2005,2014,2020,2026].forEach(function(t){s+='<line x1="'+x(t)+'" x2="'+x(t)+'" y1="'+B+'" y2="'+(B+4)+'" stroke="var(--muted)"/><text x="'+x(t)+'" y="'+(B+18)+'" text-anchor="middle" font-size="11" fill="var(--muted)">'+t+'</text>';});
  var d=P.map(function(p,i){return (i?"L":"M")+x(p[0]).toFixed(1)+" "+y(p[1]).toFixed(1);}).join(" ");
  s+='<path d="'+d+' L'+x(2026.45).toFixed(1)+' '+y(0)+' L'+x(1997)+' '+y(0)+' Z" fill="var(--navy)" opacity=".07"/>';
  s+='<path d="'+d+'" fill="none" stroke="var(--navy)" stroke-width="2.5" stroke-linejoin="round"/>';
  P.forEach(function(p,i){var last=i===P.length-1;
    s+='<circle cx="'+x(p[0])+'" cy="'+y(p[1])+'" r="'+(last?5:3.5)+'" fill="'+(last?"var(--red)":"var(--navy)")+'"/>';
  });
  s+='<text x="'+x(1997)+'" y="'+(y(59)-10)+'" text-anchor="start" font-size="12" font-weight="700" fill="var(--ink)">59%</text>';
  s+='<text x="'+x(2014.75)+'" y="'+(y(60)-10)+'" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">60%</text>';
  s+='<text x="'+(x(2025.05)-8)+'" y="'+(y(56)+18)+'" text-anchor="end" font-size="12" font-weight="700" fill="var(--ink)">56% in early 2025</text>';
  s+='<text x="'+(x(2026.45)-10)+'" y="'+(y(34.8)+5)+'" text-anchor="end" font-size="13" font-weight="700" fill="var(--ink)">34.8% in June 2026</text>';
  $("figLine").innerHTML=s;
})();

/* ---------- the audit of Chapter 71 ---------- */
var AUDIT=/*AUDIT*/[], PLAY=/*PLAY*/[], auF="all";
function auRender(){
  var n=0;
  $("holesList").innerHTML=AUDIT.map(function(h,i){
    if(auF!=="all"&&h.c!==auF) return "";
    n++;
    return '<details class="hole"><summary><span class="n">'+(i+1)+'</span><span><span class="cat">Issue '+ISSUE[h.c][0]+' &middot; '+ISSUE[h.c][1]+' &middot; '+h.s+(h.k?' <span class="pending">Source pending</span>':'')+'</span><h3>'+h.t+'</h3><span class="one">'+h.o+'</span></span><span class="tg">How it was used</span></summary><div class="hb2"><div><h4>How it was used</h4><p>'+h.u+fn(h.r)+'</p></div><div><h4>The fix</h4><p>'+h.f+'</p></div></div></details>';
  }).join("");
  $("auCount").textContent="Showing "+n+" of "+AUDIT.length;
}
(function(){
  var cats=[]; AUDIT.forEach(function(h){if(cats.indexOf(h.c)<0)cats.push(h.c);}); cats.sort(function(a,b){return ISSUE[a][0]-ISSUE[b][0];});
  var SHORT={"Scope of bargaining":"Scope","The referees":"Referees","Contracts and grievances":"Contracts","Union operations":"Operations","Interpretation":"Purpose"};
  $("auCats").innerHTML='<button type="button" data-v="all" aria-pressed="true"><span class="sn">All</span><span class="sc">'+AUDIT.length+'</span></button>'+cats.map(function(c){
    var k=AUDIT.filter(function(h){return h.c===c;}).length;
    return '<button type="button" data-v="'+c+'" aria-pressed="false" title="Issue '+ISSUE[c][0]+': '+ISSUE[c][1]+'"><span class="sn"><span class="pfx">'+ISSUE[c][0]+' &middot; </span>'+(SHORT[c]||c)+'</span><span class="sc">'+k+'</span></button>';}).join("");
  $("auCats").addEventListener("click",function(ev){
    var b=ev.target.closest("button"); if(!b) return; auF=b.dataset.v;
    each(this.children,function(x){x.setAttribute("aria-pressed",x===b?"true":"false");}); auRender();
  });
  each(document.querySelectorAll(".auN"),function(e){e.textContent=AUDIT.length;});
})();
auRender();
$("holesOpen").addEventListener("click",function(){each(document.querySelectorAll(".hole"),function(d){d.open=true;});});
$("holesClose").addEventListener("click",function(){each(document.querySelectorAll(".hole"),function(d){d.open=false;});});

/* ---------- the playbook ---------- */
$("playList").innerHTML=PLAY.map(function(p,i){
  return '<div class="play"><span class="n">Tactic '+(i+1)+'</span><h3>'+p.t+'</h3><p>'+p.o+'</p><ul>'+p.e.map(function(x,xi){return '<li>'+x+fn((p.r||[])[xi])+'</li>';}).join("")+'</ul><span class="fixin">Answered in the fix: '+(ISSUE[p.l]?"Issue "+ISSUE[p.l][0]+", "+ISSUE[p.l][1]:p.l)+'</span></div>';
}).join("");

/* ---------- fix tabs ---------- */
$("fixTabs").addEventListener("click",function(ev){
  var b=ev.target.closest("button"); if(!b) return;
  each(this.children,function(c){c.setAttribute("aria-selected",c===b?"true":"false"); $(c.dataset.p).hidden=c!==b;});
});

/* ---------- myths ---------- */
var MYTHS=[
 ["Nobody lost the right to join a union. Only collective bargaining ended.","Argument from the Heritage Foundation, April 2025","A union that cannot bargain, file a grievance or go to arbitration is a club. Agencies were told to stop honoring grievances and stop deducting dues. Membership without bargaining changes nothing about how a worker is treated on the job."],
 ["Official time is a taxpayer subsidy for unions that costs more than $300 million a year.","Argument from the Heritage Foundation, April 2025","OPM's own reports put the payroll cost between $135 million and $177 million a year from fiscal 2012 through 2019, and OPM described that as about one-tenth of one percent of federal pay and benefits. Its fiscal 2024 report shows the cost up by about half since 2019, still a sliver of the payroll. Official time exists because the law requires a union to represent every employee in the unit, members or not, and forbids it from charging them. It cannot be used for internal union business."],
 ["Federal unions protect poor performers.","Argument from the Heritage Foundation, April 2025","The procedures for removing a federal employee, and the right to appeal, come from Title 5 of the U.S. Code. They apply to employees with no union at all. The bargaining law reserves to management the right to discipline and remove. A union's job is to make sure the agency follows its own rules."],
 ["Even FDR opposed collective bargaining in the federal government.","A common talking point","The 1937 letter was about strikes, which are still illegal for federal workers. In the same letter Roosevelt said employee organizations have a logical place in government. Congress then watched bargaining work under Kennedy, Johnson, Nixon and Ford for 16 years and chose to make it law."],
 ["Federal unions cannot bargain over pay, so their contracts mostly get in management's way.","Argument from the Heritage Foundation, April 2025","That is an argument that their power is small. What they bargain is schedules, safety, fair procedures and how changes are carried out. The law leaves hiring, firing, assignments, budget and mission to management."],
 ["This is about national security.","White House fact sheet, March 2025","The same fact sheet complains that unions were fighting the president's agenda. Law enforcement unions kept their rights. And when TSA granted bargaining in 2011, it did so because poor morale was hurting security."],
 ["Unions should not be able to obstruct an elected president's management of the government.","White House fact sheet, March 2025","Congress is elected too, and Congress wrote the bargaining law. That law already gives managers the right to act first in an emergency. Following a statute is not obstruction."],
 ["Congress should also consider whether public-sector unions are appropriate in the first place.","Project 2025, Mandate for Leadership, chapter 3","Take them at their word. The goal is to end federal unions, and national security is the tool that happened to be within reach.",false,true]
];
var MYTHSRC=[["heritage25","fnnva"],["heritage25","opm24","fedweek","fedsmith19"],["heritage25","usc7513","usc7106"],["politifact","fdr"],["heritage25","statute"],["fact","tsa"],["fact","statute"],["p25","p25csea"]];
$("mythList").innerHTML=MYTHS.map(function(m,mi){
  return '<details class="myth"><summary><span class="lbl">'+(m[4]?"They wrote":"The claim")+'</span><h3>'+(m[4]?"“"+m[0]+"”":m[0])+'</h3><span class="who2">'+m[1]+fn(MYTHSRC[mi][0])+'</span><br><span class="tg">The record</span></summary><div class="rec-b"><span class="lbl rec">The record</span>'+(m[3]?' <span class="pending" style="font-size:10.5px;letter-spacing:.1em;text-transform:uppercase">More sources pending</span>':'')+'<p>'+m[2]+fn(MYTHSRC[mi].slice(1))+'</p></div></details>';
}).join("");

/* ---------- footnotes: number every source in the order it is first cited ---------- */
(function(){
  var S=window.SOURCES, list=[], PN={};
  order.forEach(function(k){PN[k]=tab[k].textContent;});
  function esc(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
  Array.prototype.forEach.call(document.querySelectorAll("sup.fn[data-k]"),function(el){
    var s=S[el.getAttribute("data-k")]; if(!s){el.parentNode.removeChild(el);return;}
    if(!s._n){s._n=list.push(s); s._p=[];}
    var sec=el.closest(".sec"), pg=sec?sec.id.slice(2):null; if(pg&&s._p.indexOf(pg)<0) s._p.push(pg);
    el.innerHTML='<a href="#sources" data-n="'+s._n+'" title="'+esc(s[0])+'" aria-label="Source '+s._n+': '+esc(s[0])+'">'+s._n+'</a>';
  });
  Array.prototype.forEach.call(document.querySelectorAll("b.fnn[data-k]"),function(el){var s=S[el.getAttribute("data-k")]; if(s&&s._n) el.textContent=s._n+".";});
  function lab(s){return s[1]?'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a>':s[0];}
  $("srcList").innerHTML=list.map(function(s){
    return '<li id="fn-'+s._n+'"><span class="n">'+s._n+'</span><div>'+lab(s)+'<span class="on">Cited on '+s._p.map(function(k){return '<a href="#'+k+'">'+PN[k]+'</a>';}).join(", ")+'</span></div></li>';
  }).join("");
  var rest=[]; Object.keys(S).forEach(function(k){var s=S[k]; if(!s._n&&rest.indexOf(s)<0) rest.push(s);});
  rest.sort(function(a,b){return a[0].localeCompare(b[0]);});
  if(rest.length){$("srcRest").innerHTML=rest.map(function(s){return '<li>'+lab(s)+'</li>';}).join(""); $("srcRestWrap").hidden=false;}
  document.addEventListener("click",function(ev){
    var a=ev.target.closest?ev.target.closest("sup.fn a"):null; if(!a) return;
    ev.preventDefault(); var n=a.getAttribute("data-n"); go("sources",true);
    setTimeout(function(){var li=$("fn-"+n); if(!li) return; li.scrollIntoView({block:"center"}); li.classList.add("hit"); setTimeout(function(){li.classList.remove("hit");},2600);},60);
  });
  window.FN_COUNT=[list.length,rest.length];
})();

go(location.hash.slice(1)||order[0],false);
})();
