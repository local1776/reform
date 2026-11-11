(function(){
"use strict";
function $(id){return document.getElementById(id);}

/* reserve the bold width of each menu label so the bar does not shift when a tab is selected */
Array.prototype.forEach.call(document.querySelectorAll("#nav a"),function(a){a.setAttribute("data-t",a.textContent);});

/* ---------- facts: represented vs members ---------- */
(function(){
  var rows=[["Represented by a union",1286,""],["Union members",1124," lt"]], max=1286;
  $("figJoin").innerHTML='<div class="jb" role="img" aria-label="1,286 thousand federal workers were represented by a union in 2025 and 1,124 thousand were members">'+rows.map(function(r){
    return '<div title="'+r[0]+': '+r[1].toLocaleString("en-US")+',000"><div class="jlab"><span>'+r[0]+'</span><b>'+r[1].toLocaleString("en-US")+'</b></div><div class="jbar'+r[2]+'" style="width:'+(r[1]/max*100).toFixed(1)+'%"></div></div>';
  }).join("")+'</div>';
})();

/* ---------- facts: one in a thousand ---------- */
(function(){
  var h="",i; for(i=0;i<1000;i++){h+='<i'+(i===499?' class="on"':'')+'></i>';}
  $("figDime").innerHTML='<div class="dime" role="img" aria-label="One square in one thousand is highlighted">'+h+'</div>';
})();

/* ---------- guard: two estimates, grouped bars ---------- */
(function(){
  var yrs=["FY2028","FY2029","FY2030","FY2031","FY2032"], A=[10,25,46,69,98], B=[0,28,56,85,113];
  var W=460,H=262,L=34,B0=30,T=20,max=125,pw=(W-L-6)/yrs.length,bw=27,gap=2;
  var s='<div class="clg"><span><i style="background:#0b2a55"></i>Pentagon resource table</span><span><i style="background:#b8891a"></i>Local 1776, conservative model</span></div>';
  s+='<svg class="vb" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Net added cost by fiscal year. Pentagon: 10, 25, 46, 69 and 98 million dollars. Local 1776 conservative model: 0, 28, 56, 85 and 113 million dollars.">';
  [0,25,50,75,100,125].forEach(function(v){var y=T+(H-T-B0)*(1-v/max);
    s+='<line x1="'+L+'" x2="'+(W-6)+'" y1="'+y+'" y2="'+y+'" stroke="'+(v?"#e6e9ee":"#121212")+'" stroke-width="1"/><text x="'+(L-6)+'" y="'+(y+3.5)+'" text-anchor="end" font-size="10.5" fill="#5f6672">'+v+'</text>';});
  function bar(x,v,fill,lab){var h=(H-T-B0)*v/max,y=H-B0-h; if(v<=0) return '<text x="'+(x+bw/2)+'" y="'+(H-B0-6)+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="#121212">$0</text>';
    return '<path d="M'+x+' '+(H-B0)+'V'+(y+4)+'a4 4 0 0 1 4-4h'+(bw-8)+'a4 4 0 0 1 4 4V'+(H-B0)+'z" fill="'+fill+'"><title>'+lab+': $'+v+' million</title></path><text x="'+(x+bw/2)+'" y="'+(y-5)+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="#121212">$'+v+'</text>';}
  yrs.forEach(function(yr,i){var x0=L+pw*i+(pw-(bw*2+gap))/2;
    s+=bar(x0,A[i],"#0b2a55","Pentagon, "+yr)+bar(x0+bw+gap,B[i],"#b8891a","Local 1776, "+yr)+'<text x="'+(x0+bw+gap/2)+'" y="'+(H-B0+16)+'" text-anchor="middle" font-size="11" fill="#5f6672">'+yr+'</text>';});
  $("figAgr").innerHTML=s+'</svg>';
})();

/* ---------- guard: Local 1776 model, annual cost to FY2038 ---------- */
(function(){
  var n=[0,0,1,2,3,4,5,6,7,8,9,10], C=n.map(function(k){return 28.21211*k;}), S=n.map(function(k){return 45.139376*k;});
  var W=460,H=270,L=36,R=58,B0=30,T=16,max=500,x=function(i){return L+(W-L-R)*i/11;},y=function(v){return T+(H-T-B0)*(1-v/max);};
  var s='<div class="clg"><span><i style="background:#0b2a55"></i>Conservative, $10,000 per position</span><span><i style="background:#b8891a"></i>Sensitivity, $16,000 per position</span></div>';
  s+='<svg class="vb" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Added cost per year rises from zero in fiscal 2028 to 282 million dollars in fiscal 2038 in the conservative scenario and 451 million in the sensitivity scenario.">';
  [0,100,200,300,400,500].forEach(function(v){s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="'+(v?"#e6e9ee":"#121212")+'" stroke-width="1"/><text x="'+(L-6)+'" y="'+(y(v)+3.5)+'" text-anchor="end" font-size="10.5" fill="#5f6672">'+v+'</text>';});
  [[0,"FY27"],[2,"FY29"],[5,"FY32"],[8,"FY35"],[11,"FY38"]].forEach(function(a){s+='<text x="'+x(a[0])+'" y="'+(H-B0+16)+'" text-anchor="middle" font-size="11" fill="#5f6672">'+a[1]+'</text>';});
  function line(D,c){return '<polyline fill="none" stroke="'+c+'" stroke-width="2" stroke-linejoin="round" points="'+D.map(function(v,i){return x(i).toFixed(1)+","+y(v).toFixed(1);}).join(" ")+'"/>';}
  s+=line(S,"#b8891a")+line(C,"#0b2a55");
  s+='<circle cx="'+x(11)+'" cy="'+y(S[11])+'" r="4" fill="#b8891a" stroke="#fff" stroke-width="2"/><circle cx="'+x(11)+'" cy="'+y(C[11])+'" r="4" fill="#0b2a55" stroke="#fff" stroke-width="2"/>';
  s+='<text x="'+(x(11)+9)+'" y="'+(y(S[11])+4)+'" font-size="12" font-weight="700" fill="#121212">$451M</text><text x="'+(x(11)+9)+'" y="'+(y(C[11])+4)+'" font-size="12" font-weight="700" fill="#121212">$282M</text>';
  n.forEach(function(k,i){s+='<rect x="'+(x(i)-13)+'" y="'+T+'" width="26" height="'+(H-T-B0)+'" fill="transparent"><title>FY'+(2027+i)+': $'+Math.round(C[i])+' million conservative, $'+Math.round(S[i])+' million sensitivity</title></rect>';});
  $("figModel").innerHTML=s+'</svg>';
})();

/* ---------- guard: timeline ---------- */
var S=window.SOURCES;
var G=[
 ["1916","","mixed","Congress pays for &ldquo;caretakers&rdquo; and leaves them to the states","The National Defense Act funds civilian caretakers to look after the federal equipment issued to each state's Guard. Washington pays them. The state adjutant general hires, supervises and fires them. That split is the root of everything that follows.",["md65"]],
 ["1965","","loss","The Supreme Court says they are state employees","In Maryland v. United States the Court holds that Guard civilian caretakers are employees of the states. They are paid with federal money and work under federal rules, but they have no federal retirement and no federal employee rights.",["md65","ford"]],
 ["1968","Aug. 13","gain","The National Guard Technicians Act makes them federal employees","Effective January 1, 1969, technicians become employees of the Army and the Air Force with federal pay, benefits and retirement. Two conditions come with it: they must belong to the Guard, and the state adjutant general still runs the program.",["pl90","ngb50"]],
 ["1969","Oct. 29","gain","Executive Order 11491 covers them","Nixon's order gives federal employees organizing and bargaining rights. Technicians are federal employees now, so it covers them. They organize across the country and begin bargaining with the adjutants general.",["brief"]],
 ["1971","Apr. 2","gain","Mississippi says the order does not apply to its Guard, and loses","The adjutant general argues that technicians are not federal employees, that the order does not bind a state official and that bargaining would violate state law. The Assistant Secretary of Labor rejects all of it in the Thompson Field case. Ohio recognizes its technicians' union the same year.",["scotus","brief"]],
 ["1977 to 1978","","mixed","The adjutants general ask Congress to ban technician unions","A Senate bill to outlaw unions in the military is written to reach technicians too. The National Guard Association, speaking for 53 adjutants general, asks that technicians be taken out of the bargaining program. The House committee refuses. The law that passes on November 8, 1978, bans unions for military members, including Guard members on full-time duty, and leaves technicians' civilian rights alone.",["brief","usc976"]],
 ["1978","Oct. 13","gain","The Civil Service Reform Act puts their rights in statute","Technicians are covered by Chapter 71 like other federal employees, and the new labor board takes jurisdiction over the adjutants general. The catch is section 709, which leaves the adjutant general's decision final on separations and other matters and keeps them out of the grievance process.",["alj","usc709"]],
 ["1980s","","loss","The uniform fight","Unions bargain for the option of civilian clothes during civilian work and win before the Impasses Panel. The Guard refuses to comply. The courts end up holding that the uniform is negotiable only if the Guard chooses to bargain it, and Congress later writes the uniform requirement into section 709.",["act2d","usc709"]],
 ["1997","","mixed","Congress defines non-dual-status technicians","These are civilians working in technician jobs with no military membership. Congress writes the category into law and caps it at 1,950 for the National Guard.",["usc10217"]],
 ["2013 to 2015","","mixed","The Guard Bureau tries to move discrimination complaints into military channels","Three times in two years, by internal direction, in a defense bill and in a reorganization plan, the Bureau seeks to take technician complaints out of the civilian EEO process, where a technician has the EEOC and a union representative. LIUNA and the Association of Civilian Technicians oppose each attempt, and none takes effect.",["l1776"]],
 ["2015 to 2017","","mixed","Title 5 employees arrive","The fiscal 2016 defense bill orders 20 percent of technician positions and every non-dual-status technician converted to ordinary Title 5 civil service jobs. Governors and adjutants general fight it. The Pentagon reports that only 4.8 percent of positions are suitable, and Congress settles on 12.6 percent. The conversions take effect October 1, 2017. This is where the Guard's Title 5 employees come from.",["nga","nga2","usc10217"]],
 ["2016","Sept. 28","loss","Ohio's adjutant general walks away","After 45 years of bargaining, the Ohio Guard announces that the bargaining law does not apply to technicians, declares the contract dead and cuts off dues deductions.",["alj","crsohio"]],
 ["2016","Dec. 23","gain","Technicians win the right to appeal outside the state","Until now a fired technician's appeal stopped at the adjutant general who ordered the firing. The fiscal 2017 defense bill opens the Merit Systems Protection Board and the EEOC to technicians on civilian matters. The adjutant general stays final only on military matters.",["mspb","usc709"]],
 ["2017","August","mixed","The Pentagon studies replacing technicians with AGRs","Congress orders a report on converting the remaining technicians to AGR. The Institute for Defense Analyses finds it would cost the same or more in every component. It also notes that AGRs are barred from unions and warns about technician bargaining over military matters.",["ida"]],
 ["2018","August","loss","The Air Guard converts 3,183 technician positions to AGR","The Air National Guard directs the states to convert the positions. Its leadership tells the states that swapping positions back would undermine the case for &ldquo;future military technician to AGR initiatives.&rdquo;",["act"]],
 ["2023","May 18","gain","The Supreme Court rules for the technicians, 7 to 2","In Ohio Adjutant General's Department v. FLRA, Justice Thomas writes that an adjutant general acts as a federal agency when hiring and supervising technicians, so the labor board has jurisdiction. Justices Alito and Gorsuch dissent. The question the adjutants general had been raising since 1971 is closed.",["scotus","ge23"]],
 ["2025","Mar. 27","loss","Executive Order 14251 takes the Defense Department out of the law","The order excludes the entire Department. Technicians and Title 5 Guard employees are Defense civilians. The Secretary restores bargaining only for wage-grade units at four depots and test centers.",["ge26"]],
 ["2026","Apr. 9","loss","The Secretary orders every Defense contract terminated in 24 hours","After honoring its agreements for a year, the Department cancels them, except where a court order stands in the way. Unions sue in July.",["ge26","war","mm26"]],
 ["2026","May 11","loss","The Pentagon asks Congress to end the technician program","Legislative proposal 291 would freeze technician hiring in 2028 and repeal section 709 in 2038, leaving a full-time force that is 89 percent AGR and 11 percent Title 5 civilian.",["crs13300","lp291"]],
 ["2026","July to December","mixed","The House says yes. The final answer comes in the lame duck","The House passes its defense bill 216 to 212 with the phaseout as section 1105. The Senate committee's bill has a similar section 513 but demands a cost and readiness report. AFGE and IFPTE ask negotiators to strike both. A final bill is expected in December.",["ndaa","sasc","afge26"]]
];
function lk(k){return S[k][1]?'<a href="'+S[k][1]+'" target="_blank" rel="noopener">'+S[k][0]+'</a>':S[k][0];}
$("guardTl").innerHTML=G.map(function(e){
  return '<li class="'+e[2]+'"><div class="yr">'+e[0]+(e[1]?'<small>'+e[1]+'</small>':'')+'</div><div class="bd"><h4>'+e[3]+'</h4><p>'+e[4]+fn(e[5])+'</p></div></li>';
}).join("");
$("guardSrc").innerHTML="The small numbers in the text point to the numbered list on the <a href=\"#sources\">Sources</a> page. The brief cited for the early history is one side's account. We rely on it for dates and citations.";


})();

/* handouts: preview dialog and PDF download */
(function(){
  var lb=document.getElementById("lb"); if(!lb) return;
  var img=document.getElementById("lbI"), ttl=document.getElementById("lbT"), dl=document.getElementById("lbDl"),
      x=document.getElementById("lbX"), body=document.getElementById("lbB"), msg=document.getElementById("hoMsg"), last=null;
  function card(n){var b=document.querySelector('.ho-prev[data-ho="'+n+'"]'); return b?b.closest(".ho"):null;}
  function open(n,from){
    var c=card(n); if(!c) return;
    var a=c.querySelector(".ho-dl");
    img.src=c.querySelector("img").src; img.alt=c.querySelector("img").alt; img.className="";
    ttl.textContent=c.querySelector(".ho-k").textContent+": "+c.querySelector("h4").textContent;
    dl.setAttribute("href",a.getAttribute("href")); dl.setAttribute("download",a.getAttribute("download"));
    last=from||null; lb.hidden=false; document.documentElement.style.overflow="hidden"; body.scrollTop=0; body.scrollLeft=0;
    try{x.focus();}catch(e){}
  }
  function close(){ if(lb.hidden) return; lb.hidden=true; document.documentElement.style.overflow=""; if(last){try{last.focus();}catch(e){}} }
  function say(t){ if(msg) msg.textContent=t; }
  function save(a){
    var name=a.getAttribute("download");
    a.setAttribute("aria-busy","true"); say("Preparing the PDF.");
    function done(t){a.removeAttribute("aria-busy"); say(t||"");}
    Promise.all([window.claude.use("downloads"), fetch(a.getAttribute("href")).then(function(r){if(!r.ok) throw {code:"missing"}; return r.blob();})])
      .then(function(v){ if(!v[0]) throw {code:"unavailable"}; return v[0].save({filename:name,data:v[1]}); })
      .then(function(){done("Saved "+name+".");})
      .catch(function(e){
        var c=e&&e.code;
        if(c==="declined") done("");
        else if(c==="rate_limited") done("A download prompt is already open. Answer it, then try again.");
        else done("The PDF could not be downloaded in this view. Use View to read the handout here.");
      });
  }
  document.addEventListener("click",function(ev){
    var t=ev.target; if(!t.closest) return;
    var v=t.closest(".ho-prev,.ho-view");
    if(v){ev.preventDefault(); open(v.getAttribute("data-ho"),v); return;}
    var a=t.closest("a.ho-dl");
    if(a){
      if(window.claude&&typeof window.claude.use==="function"){ev.preventDefault(); save(a);}
      return; /* on an ordinary web host the link downloads the file itself */
    }
    if(t.closest("#lbX")){close(); return;}
    if(t===img){img.classList.toggle("z"); return;}
    if(t===body){close(); return;}
    var s=t.closest("a[data-scroll]");
    if(s){var id=s.getAttribute("data-scroll"); setTimeout(function(){var el=document.getElementById(id); if(el) el.scrollIntoView({block:"start"});},60);}
  });
  document.addEventListener("keydown",function(ev){ if(ev.key==="Escape") close(); });
})();
