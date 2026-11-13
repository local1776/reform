
(function(){
"use strict";

var SRC = window.SOURCES;

var ERAS = [
  {id:"era-before", short:"Before", name:"Before bargaining", yrs:"1883 to 1961", intro:"For most of a century federal workers could join a union but had no right to bargain. For a decade they could not even write to Congress."},
  {id:"era-orders", short:"Orders", name:"Bargaining by executive order", yrs:"1962 to 1977", intro:"A Democrat started it. Two Republicans expanded it. For 16 years bargaining existed only as long as a president allowed it."},
  {id:"era-statute", short:"Statute", name:"Written into law", yrs:"1978 to 1979", intro:"Congress made bargaining a matter of law, with trade-offs: no strikes, no bargaining over pay, broad management rights. It also left one door open."},
  {id:"era-attacks", short:"Attacks", name:"45 years of attacks", yrs:"1981 to 2024", intro:"Each administration that wanted less bargaining found a different lever: firings, exclusions, new personnel systems, executive orders, and empty seats at the agency that enforces the law."},
  {id:"era-now", short:"2025-26", name:"The door kicked open", yrs:"2025 to 2026", intro:"The national security exception goes from a handful of intelligence offices to most of the government."}
];

/* d: gain | loss | mixed.  t: decimal year for the meter.  p: presidents.  pend: source still to pull. */
var EV = [
 {era:0,t:1883.0,y:"1883",d:"mixed",w:"Congress",p:["Arthur"],h:"The Pendleton Act creates the merit civil service",s:"Jobs go by merit instead of political favors. The law says nothing about unions or bargaining.",b:"This is the starting line. Federal employees get protection from the spoils system, but no say in their working conditions.",src:["flra"]},
 {era:0,t:1902.1,y:"1902",m:"to 1909",d:"loss",w:"President",p:["T. Roosevelt","Taft"],h:"The gag orders",s:"Theodore Roosevelt and then Taft forbid federal employees from asking Congress for anything, alone or through an association. The penalty is dismissal.",b:"Roosevelt's first order came January 31, 1902, with another in 1906. Taft followed in 1909. Postal workers pushing for better pay and safer conditions were the main target.",c:["EO 163","EO 402","EO 1142"],img:"National Archives: text of the 1902 order",src:["knight","nalc"]},
 {era:0,t:1912.65,y:"1912",m:"Aug. 24",d:"gain",w:"Congress",p:["Taft"],h:"The Lloyd-La Follette Act overturns the gag orders",s:"Congress guarantees federal workers the right to petition Congress and to join unions that do not strike.",b:"A Republican senator, Robert La Follette, led it, a Democrat co-sponsored it, and a Republican president signed it. It also set the first just-cause standard for removals.",c:["37 Stat. 555"],img:"Library of Congress: Sen. Robert M. La Follette portrait",src:["knight"]},
 {era:0,t:1937.62,y:"1937",m:"Aug. 16",d:"mixed",w:"President",p:["F. Roosevelt"],h:"FDR's letter to the federal employees union",s:"The letter opponents still quote. It is mostly about strikes, and it praises the union's no-strike pledge.",b:"Roosevelt wrote that bargaining “as usually understood” could not be carried into public service, largely because Congress sets federal pay. He also said employee organizations had a logical place in government. Strikes are still illegal for federal workers today.",img:"FDR Library: the 1937 letter",src:["fdr"]},
 {era:0,t:1947.5,y:"1947",m:"and 1955",d:"loss",w:"Congress",p:["Truman","Eisenhower"],h:"Congress bans federal strikes, then makes striking a felony",s:"The no-strike rule that still applies today is locked in.",b:"Taft-Hartley barred strikes by federal employees in 1947. A 1955 law added criminal penalties.",src:["usc7311","usc1918"]},

 {era:1,t:1961.47,y:"1961",m:"June 22",d:"gain",w:"President",p:["Kennedy"],h:"Kennedy orders a task force on employee-management relations",s:"Its findings become the first federal bargaining program.",b:"The task force was created by a memo to every department and agency head.",src:["flra50"]},
 {era:1,t:1962.05,y:"1962",m:"Jan. 17",d:"gain",w:"President",p:["Kennedy"],feature:true,h:"Executive Order 10988: federal workers can bargain",s:"For the first time, federal employees can bargain collectively through a union of their choice.",b:"The order allowed limited advisory arbitration of grievances and reserved core decisions to management. It was a start, and it could be erased by any later president.",c:["EO 10988"],img:"JFK Library: White House photograph of the signing",src:["flra","flra50"]},
 {era:1,t:1969.83,y:"1969",d:"gain",w:"President",p:["Nixon"],h:"Nixon expands the program",s:"Executive Order 11491 defines unfair labor practices, allows binding arbitration, and creates a council and an impasses panel to run the system.",b:"A Republican president took Kennedy's program and built the machinery that Congress would later copy into law.",c:["EO 11491"],img:"Nixon Library: White House photograph",src:["flra","flra50"]},
 {era:1,t:1970.6,y:"1970",d:"gain",w:"Congress",p:["Nixon"],seal:"USPS",h:"Postal strike, then the Postal Reorganization Act",s:"Postal workers get their own bargaining law, one that covers pay.",b:"After a nationwide postal strike, Congress moved postal employees to a separate system. That is why postal workers are not part of this fight.",src:["usc39_1209"]},
 {era:1,t:1975.1,y:"1975",d:"gain",w:"President",p:["Ford"],h:"Ford widens bargaining again",s:"Executive Order 11838 adds agency regulations and mid-contract changes to what can be bargained, and requires secret ballot elections.",b:"The second Republican president in a row to expand the program.",c:["EO 11838"],src:["flra50"]},

 {era:2,t:1978.78,y:"1978",m:"Oct. 13",d:"gain",w:"Congress",p:["Carter"],feature:true,h:"Congress makes it law",s:"Title VII of the Civil Service Reform Act puts bargaining rights in the U.S. Code and finds that unions and bargaining in the civil service “are in the public interest.”",b:"The law took effect January 11, 1979. It replaced a council of agency heads with an independent, bipartisan Federal Labor Relations Authority, an independent General Counsel to prosecute unfair labor practices, and review by the courts. The price: no strikes, no bargaining over pay and benefits set by law, no mandatory dues, and broad management rights.",c:["5 U.S.C. §§ 7101-7135","Pub. L. 95-454"],img:"Carter Library: White House photograph of the signing",src:["flra","statute"]},
 {era:2,t:1979.88,y:"1979",m:"Nov. 19",d:"mixed",w:"President",p:["Carter"],h:"The exception is used the way it was written",s:"Carter signs the first national security exclusions: intelligence and security offices, mostly in Defense and Treasury.",b:"Section 7103(b)(1) lets a president exclude an agency or subdivision whose primary function is intelligence, counterintelligence, investigative or national security work. Carter's list included the Defense Intelligence Agency. For the next 45 years every president kept the list short.",c:["5 U.S.C. § 7103(b)(1)","EO 12171"],img:"Federal Register: first page of EO 12171",src:["flra","crs"]},

 {era:3,t:1981.6,y:"1981",m:"Aug. 3 to Oct. 22",d:"loss",w:"President",p:["Reagan"],seal:"FAA",h:"PATCO: 11,345 air traffic controllers fired",s:"Controllers strike in violation of federal law. Reagan gives them 48 hours, fires those who stay out, and bans them from federal service.",b:"The Federal Labor Relations Authority decertified the union on October 22. The union had endorsed Reagan in 1980. The rehiring ban lasted until President Clinton lifted it on August 12, 1993.",img:"Reagan Library: Rose Garden statement, Aug. 3, 1981",src:["aba"]},
 {era:3,t:1986.5,y:"1986",m:"to 1989",d:"loss",w:"Courts",p:["Reagan"],seal:"USMS",h:"AFGE v. Reagan: courts will assume the president followed the law",s:"Reagan excludes parts of the U.S. Marshals Service. The union sues, and the D.C. Circuit upholds the order under a “presumption of regularity.”",b:"This case is the root of the problem. If a court presumes the president made a proper national security finding, the standard in the statute means whatever the president says it means.",c:["EO 12559","870 F.2d 723 (D.C. Cir. 1989)"],src:["crs"]},
 {era:3,t:1993.75,y:"1993",d:"gain",w:"President",p:["Clinton"],h:"Clinton orders labor-management partnerships",s:"Executive Order 12871 creates a National Partnership Council and tells agencies to work with their unions.",b:"In a later survey, 63 percent of management and union officials said relationships had improved.",c:["EO 12871"],src:["vlex"]},
 {era:3,t:2001.13,y:"2001",d:"loss",w:"President",p:["G.W. Bush"],h:"Bush revokes the partnership order",s:"One of the first acts of the new administration.",b:"Executive Order 13203, signed February 17, 2001, revoked the Clinton partnership order and dissolved the National Partnership Council.",src:["eo13203"]},
 {era:3,t:2002.04,y:"2002",m:"Jan.",d:"loss",w:"President",p:["G.W. Bush"],seal:"DOJ",h:"Justice Department offices excluded",s:"Bush uses the national security exception on several agencies and subdivisions inside Justice.",b:"The exclusions came four months after September 11.",src:["flra"]},
 {era:3,t:2002.9,y:"2002",m:"to 2009",d:"mixed",w:"Congress",p:["G.W. Bush","Obama"],h:"MaxHR and NSPS: two departments try to write their own labor rules",s:"After September 11, Congress lets Homeland Security and the Pentagon build personnel systems outside the 1978 law. A unanimous appeals court strikes down the Homeland Security version in 2006. Congress repeals the Pentagon's NSPS in 2009.",b:"Homeland Security's MaxHR would have let managers cancel signed contracts. The court said that made collective bargaining meaningless. The Pentagon's system survived a 2 to 1 appeals ruling in 2007, so the unions went to Congress, which restored bargaining in 2008 and repealed the system the next year.",c:["452 F.3d 839 (D.C. Cir. 2006)","486 F.3d 1316 (D.C. Cir. 2007)"],src:["chertoff","gates","nsps"]},
 {era:3,t:2003.05,y:"2003",d:"loss",w:"Agencies",p:["G.W. Bush"],seal:"TSA",h:"TSA screeners barred from bargaining",s:"Using a separate law that created the agency, TSA chief James Loy decides airport screeners cannot bargain.",b:"TSA officers sit outside the 1978 statute, so their rights depend on whoever runs the agency.",src:["tsa"]},
 {era:3,t:2011.45,y:"2011",m:"and 2022",d:"gain",w:"Agencies",p:["Obama","Biden"],seal:"TSA",h:"TSA reverses course",s:"After ten years, TSA finds that poor morale is threatening security and grants limited bargaining. The agency expands those rights in 2022.",b:"A seven-year contract was signed in May 2024. The national security argument ran the other way here: the agency decided bargaining made the workforce more stable.",src:["tsa"]},
 {era:3,t:2017.7,y:"2017",d:"loss",w:"President",p:["Trump"],h:"Labor-management forums revoked",s:"The Obama-era forums are ended by executive order.",b:"Executive Order 13812, signed September 29, 2017, revoked the 2009 order that created the forums.",src:["eo13812"]},
 {era:3,t:2017.9,y:"2017",m:"onward",d:"loss",w:"President",p:["Trump","Biden"],seal:"FLRA",h:"The prosecutor's chair sits empty",s:"The Federal Labor Relations Authority has had no Senate-confirmed General Counsel since 2017. Without one, unfair labor practice complaints stall.",b:"The vacancy has run through three presidential terms. A law that depends on one official to bring cases can be switched off by leaving the seat open.",src:["blaw"]},
 {era:3,t:2018.4,y:"2018",m:"May 25",d:"loss",w:"President",p:["Trump"],h:"Three executive orders hit bargaining, official time and discipline",s:"Agencies are told to bargain harder and faster, cut official time, and strip protections from contracts.",b:"The orders were drafted to push the limits of what a president can dictate inside a bargaining system created by Congress.",c:["EO 13836","EO 13837","EO 13839"],src:["ballot"]},
 {era:3,t:2018.65,y:"2018",m:"Aug.",d:"gain",w:"Courts",p:["Trump"],h:"A federal judge strikes down key provisions",s:"Judge Ketanji Brown Jackson rules the orders conflict with the bargaining law.",b:"",src:["ballot"]},
 {era:3,t:2019.54,y:"2019",m:"July 16",d:"loss",w:"Courts",p:["Trump"],h:"The appeals court throws the case out on jurisdiction",s:"The D.C. Circuit says unions cannot go straight to federal court. They must go through the Federal Labor Relations Authority first.",b:"This is the forum trap. The agency that unions are sent to can be left without a prosecutor or a full board.",c:["929 F.3d 748 (D.C. Cir. 2019)"],src:["ballot"]},
 {era:3,t:2020.8,y:"2020",m:"Oct.",d:"loss",w:"President",p:["Trump"],h:"Schedule F",s:"An executive order creates a new job category that would strip civil service protections from employees in policy-related roles.",b:"",c:["EO 13957"],src:["eo14003"]},
 {era:3,t:2020.75,y:"2020",m:"Sept. 30",d:"loss",w:"Agencies",p:["Trump"],seal:"FLRA",h:"The labor board rewrites the bargaining rules",s:"In its first policy statements in 35 years, the board raises the threshold for bargaining and lets agencies demand an end to mid-contract bargaining.",b:"A federal appeals court vacated both in early 2022, finding the board had not explained why it was abandoning decades of precedent.",src:["flra22"]},
 {era:3,t:2021.06,y:"2021",m:"Jan. 22",d:"gain",w:"President",p:["Biden"],h:"Biden revokes all four orders",s:"The 2018 orders and Schedule F are cancelled in the first week.",b:"What one president does by order, the next can undo by order. That cuts both ways, which is the case for fixing the statute.",c:["EO 14003"],src:["eo14003"]},

 {era:3,t:2023.3,y:"2023",d:"loss",w:"Outside groups",p:["Biden"],h:"Project 2025 publishes the blueprint",s:"The Heritage Foundation's plan for the next administration calls for bringing back the 2018 orders and Schedule F, and asks whether public-sector unions should exist at all.",b:"The personnel chapter was co-written by Donald Devine, who ran OPM under Reagan. Heritage has published a Mandate for Leadership series since 1981.",q:"Congress should also consider whether public-sector unions are appropriate in the first place.",qc:"Project 2025, Mandate for Leadership, chapter 3",src:["p25"]},
 {era:4,t:2025.11,y:"2025",m:"Feb.",d:"loss",w:"President",p:["Trump"],seal:"FLRA",h:"The chair of the labor board is fired",s:"Susan Grundmann is removed mid-term with no stated cause, the first such firing in the agency's history.",b:"A federal judge ruled the removal unlawful. An appeals court let it stand while the case continued.",src:["grund","blaw"]},
 {era:4,t:2025.18,y:"2025",m:"Mar. 7",d:"loss",w:"Agencies",p:["Trump"],seal:"TSA",h:"TSA bargaining ended for about 47,000 officers",s:"The Homeland Security secretary voids the 2024 contract and withdraws recognition of the union.",b:"A federal judge blocked the move in June 2025, finding no explanation of how bargaining threatened security.",src:["tsa"]},
 {era:4,t:2025.235,y:"2025",m:"Mar. 27",d:"loss",w:"President",p:["Trump"],feature:true,h:"Executive Order 14251: one signature, most of the government",s:"More than 40 agencies and subdivisions are declared to have a primary function of national security work, including Veterans Affairs, EPA, and the Bureau of Land Management.",b:"Police, firefighters and security guards keep their bargaining rights. Customs and Border Protection, whose Border Patrol union endorsed the president, is left out of the order. The government sued unions in Texas and Kentucky the same week to get its order blessed in advance. Both suits were dismissed.",q:"Certain Federal unions have declared war on President Trump’s agenda.",qc:"White House fact sheet, March 27, 2025",c:["EO 14251","5 U.S.C. § 7103(b)(1)","22 U.S.C. § 4103(b)"],img:"Federal Register page of EO 14251, and the fact sheet passage highlighted",src:["eo14251","fact","npr","crs"]},
 {era:4,t:2025.4,y:"2025",m:"Apr. to June",d:"gain",w:"Courts",p:["Trump"],h:"Trial judges block the order",s:"Judges in Washington and San Francisco find the order likely unlawful or retaliatory and issue injunctions.",b:"Judge Paul Friedman ruled for the Treasury employees union on April 25. Judge James Donato ruled for a coalition led by AFGE on June 24.",src:["clear","crs"]},
 {era:4,t:2025.5,y:"2025",m:"May 16, Aug. 1",d:"loss",w:"Courts",p:["Trump"],h:"Appeals courts put the injunctions on hold",s:"The D.C. Circuit, 2 to 1, and then the Ninth Circuit let the order take effect while the cases continue.",b:"Both courts leaned on deference to the president on national security.",src:["clear","crs"]},
 {era:4,t:2025.6,y:"2025",m:"Aug. 6",d:"loss",w:"Agencies",p:["Trump"],seal:"VA",h:"VA cancels contracts covering more than 350,000 employees",s:"EPA follows two days later. About 4,000 VA police, firefighters and guards keep their contracts.",b:"VA also spared several smaller unions. Its stated reason is on the record.",q:"posed no or minimal hinderance to VA operations",qc:"VA's explanation for sparing smaller unions, as cited by Judge Melissa DuBose",img:"Agency photo library: VA nurses and staff",src:["fnnva","geva"]},
 {era:4,t:2025.66,y:"2025",m:"Aug. 28",d:"loss",w:"President",p:["Trump"],seal:"NWS",h:"Executive Order 14343 adds more agencies",s:"The National Weather Service, patent examiners, and parts of NOAA and Commerce are added to the list.",b:"",c:["EO 14343"],src:["eo14343","crs"]},
 {era:4,t:2025.87,y:"2025",m:"Nov. 14",d:"gain",w:"Courts",p:["Trump"],seal:"USAGM",h:"A judge restores bargaining at the U.S. Agency for Global Media",s:"The court finds the cancellation was likely retaliation against the unions.",b:"",src:["usagm"]},
 {era:4,t:2025.945,y:"2025",m:"Dec. 11",d:"gain",w:"Congress",p:["Trump"],h:"The House votes 231 to 195 to cancel the orders",s:"Twenty Republicans join every Democrat to pass the Protect America's Workforce Act after a discharge petition forces the vote.",b:"The bill reached the Senate on December 15 and has not moved. It would cancel the two orders. It would not change the section of law that allowed them.",c:["H.R. 2550","S. 2837"],src:["hr2550","mdm"]},
 {era:4,t:2025.95,y:"2025",m:"Dec. 12",d:"loss",w:"Agencies",p:["Trump"],seal:"TSA",h:"Homeland Security terminates the TSA contract a second time",s:"The day after the House vote, and with a court order still in place.",b:"A federal judge later ruled the June injunction still blocks the move.",src:["epi"]},
 {era:4,t:2026.12,y:"2026",m:"Feb. 12",d:"loss",w:"Agencies",p:["Trump"],seal:"OPM",h:"OPM tells every covered agency to finish the job",s:"Agencies are told to terminate or modify their contracts and to disregard grievances. The IRS cancels its agreement on February 27.",b:"",src:["opm","crs"]},
 {era:4,t:2026.155,y:"2026",m:"Feb. 26",d:"loss",w:"Courts",p:["Trump"],h:"The Ninth Circuit vacates the San Francisco injunction",s:"The panel finds the government likely to win on the retaliation claim.",b:"The court noted this is not a final ruling on whether the order is legal.",src:["ca9"]},
 {era:4,t:2026.2,y:"2026",m:"Mar. to May",d:"gain",w:"Courts",p:["Trump"],seal:"VA",h:"A judge orders VA to restore its contract",s:"Judge Melissa DuBose in Rhode Island finds likely First Amendment and procedural violations. In May the First Circuit refuses to block her order.",b:"Appeals courts are now split, which leaves the question to the Supreme Court or to Congress.",src:["geva","fs1"]},
 {era:4,t:2026.27,y:"2026",m:"Apr. 9",d:"loss",w:"Agencies",p:["Trump"],seal:"DOD",h:"The Defense Secretary orders every union contract terminated in 24 hours",s:"The Department had kept honoring its agreements for a year after the executive order. Secretary Hegseth directs that all of them be cancelled, except where a court order stands in the way. Unions sue in July.",b:"Hundreds of contracts end at once, some of them more than 50 years old.",src:["ge26","mm26"]},
 {era:4,t:2026.36,y:"2026",m:"May 11",d:"loss",w:"Agencies",p:["Trump"],seal:"NGB",h:"The Pentagon asks Congress to end the National Guard technician program",s:"Its proposal would replace about nine of every ten technician positions with military personnel, who are barred by law from bargaining. The House adds it to the defense bill in July.",b:"An executive order can be reversed. A position converted to military status is outside the bargaining law for good.",src:["crs13300"]},
 {era:4,t:2026.49,y:"2026",m:"June 29",d:"loss",w:"Courts",p:["Trump"],h:"Trump v. Slaughter: independent boards lose their protection",s:"The Supreme Court, 6 to 3, overrules a 1935 precedent that let Congress shield board members from being fired without cause.",b:"The ruling was about the Federal Trade Commission, but the reasoning reaches the labor board too. Any fix to the bargaining law has to work even if the president controls the board.",src:["slaughter"]},
 {era:4,t:2026.84,y:"2026",m:"Nov. 3",d:"mixed",w:"Congress",p:["Trump"],h:"Voters hand both chambers of Congress to the Democrats",s:"The new Congress is seated January 3, 2027. The president keeps the veto.",b:"Twenty House Republicans voted to restore bargaining rights in 2025. Susan Collins, one of two Republican senators cosponsoring the bill, lost her seat.",src:["cbs"]}
];

/* ---------- coverage meter data ---------- */
var SEALIMG={FLRA:["{{IMG:flra}}","Seal of the Federal Labor Relations Authority"],DOD:["{{IMG:dod}}","Seal of the Department of Defense"],NGB:["{{IMG:ngb}}","Seal of the National Guard Bureau"]};
var PTS = [[1997.0,59],[2014.75,60],[2025.05,56],[2026.02,38],[2026.45,34.8]];
function coverage(t){
  if(t < 1962.04) return {txt:"No bargaining rights", pct:0};
  if(t < 1997) return {txt:"Bargaining under way. No figures compiled for these years.", pct:null};
  if(t < 2014.75) return {txt:"About 59% of the workforce (1997)", pct:59};
  if(t < 2025.05) return {txt:"About 60% of the workforce (2014)", pct:60};
  if(t < 2026.02) return {txt:"About 56% at the start of 2025, and falling", pct:56};
  if(t < 2026.45) return {txt:"About 38% (January 2026)", pct:38};
  return {txt:"34.8% (June 2026)", pct:34.8};
}
function lineY(t){ // position of the marker along the drawn line (placeholder included)
  var pts=[[1962.04,0]].concat(PTS);
  if(t<=pts[0][0]) return 0;
  for(var i=1;i<pts.length;i++){ if(t<=pts[i][0]){ var a=pts[i-1],b=pts[i]; return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0]); } }
  return pts[pts.length-1][1];
}
var X0=1955,X1=2027,CL=34,CR=284,CT=14,CB=146;
function cx(t){return CL+(Math.max(X0,t)-X0)/(X1-X0)*(CR-CL);}
function cy(p){return CB-p/70*(CB-CT);}

function drawChart(){
  var s='';
  [0,20,40,60].forEach(function(v){
    s+='<line x1="'+CL+'" x2="'+CR+'" y1="'+cy(v)+'" y2="'+cy(v)+'" stroke="var(--rule)" stroke-width="1"/>';
    s+='<text x="'+(CL-6)+'" y="'+(cy(v)+4)+'" text-anchor="end" font-size="10" fill="var(--muted)">'+v+'%</text>';
  });
  [[1962,"1962"],[1978,"1978"],[1997,"1997"],[2014.75,"2014"],[2026.45,"2026"]].forEach(function(a){
    s+='<line x1="'+cx(a[0])+'" x2="'+cx(a[0])+'" y1="'+CB+'" y2="'+(CB+4)+'" stroke="var(--muted)"/>';
    s+='<text x="'+cx(a[0])+'" y="'+(CB+16)+'" text-anchor="middle" font-size="10" fill="var(--muted)">'+a[1]+'</text>';
  });
  s+='<line x1="'+cx(1955)+'" y1="'+cy(0)+'" x2="'+cx(1962.04)+'" y2="'+cy(0)+'" stroke="var(--ink)" stroke-width="2.5"/>';
  s+='<line x1="'+cx(1962.04)+'" y1="'+cy(0)+'" x2="'+cx(1997)+'" y2="'+cy(59)+'" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 4"/>';
  var d='',area='';
  PTS.forEach(function(p,i){d+=(i?'L':'M')+cx(p[0]).toFixed(1)+' '+cy(p[1]).toFixed(1)+' ';});
  area=d+'L'+cx(PTS[PTS.length-1][0]).toFixed(1)+' '+cy(0)+' L'+cx(PTS[0][0]).toFixed(1)+' '+cy(0)+' Z';
  s+='<path d="'+area+'" fill="var(--accent)" opacity=".12"/>';
  s+='<path d="'+d+'" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>';
  s+='<circle cx="'+cx(1997)+'" cy="'+cy(59)+'" r="3" fill="var(--accent)"/>';
  s+='<circle cx="'+cx(2014.75)+'" cy="'+cy(60)+'" r="3" fill="var(--accent)"/>';
  s+='<text x="'+cx(2005)+'" y="'+(cy(60)-8)+'" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">about 60%</text>';
  s+='<circle cx="'+cx(2026.45)+'" cy="'+cy(34.8)+'" r="4.5" fill="var(--loss)"/>';
  s+='<text x="'+(cx(2026.45)-8)+'" y="'+(cy(34.8)+4)+'" text-anchor="end" font-size="11" font-weight="700" fill="var(--ink)">34.8%</text>';
  s+='<g id="mk"><line id="mkLine" y1="'+CT+'" y2="'+CB+'" stroke="var(--gold)" stroke-width="1.5"/><circle id="mkDot" r="5" fill="#fff" stroke="var(--gold)" stroke-width="2.5"/></g>';
  document.getElementById("chart").innerHTML=s;
}

/* ---------- render ---------- */
var DIR={gain:["▲","Rights gained"],loss:["▼","Rights lost"],mixed:["◆","Mixed or neutral"]};
var tl=document.getElementById("tlMain"), erasNav=document.getElementById("eras");

function card(e,i){
  var cls="ev "+e.d+(e.feature?" feature":"");
  var h='<article class="'+cls+'" id="ev-'+i+'" data-i="'+i+'">';
  h+='<div class="ev-date">'+e.y+(e.m?'<span>'+e.m+'</span>':'')+'</div><div class="ev-node"></div>';
  h+='<details class="ev-card"><summary>'+(e.seal?(SEALIMG[e.seal]?'<img class="seal simg" src="'+SEALIMG[e.seal][0]+'" alt="'+SEALIMG[e.seal][1]+'">':'<span class="seal" title="Seal slot: '+e.seal+'">'+e.seal+'</span>'):'')+'<span class="ev-meta"><span class="dir"><i>'+DIR[e.d][0]+'</i> '+DIR[e.d][1]+'</span><span class="who">'+e.w+' &middot; '+e.p.join(", ")+'</span>'+(e.pend?'<span class="pending">Source pending</span>':'')+'</span>';
  h+='<h3>'+e.h+'</h3><span class="ev-sum">'+e.s+fn(e.src)+'</span><span class="ev-toggle">Details and sources</span></summary><div class="ev-body">';
  if(e.b) h+='<p>'+e.b+'</p>';
  if(e.q) h+='<blockquote>&ldquo;'+e.q+'&rdquo;<cite>'+e.qc+'</cite></blockquote>';
  if(e.c) h+='<div class="cites">'+e.c.map(function(c){return '<code>'+c+'</code>';}).join("")+'</div>';
  if(e.img) h+='<div class="slot"><b>Image slot</b>'+e.img+' (public domain, to confirm)</div>';
  if(e.src&&e.src.length) h+='<div class="src">Sources: '+e.src.map(function(k){return '<b class="fnn" data-k="'+k+'"></b><a href="'+SRC[k][1]+'" target="_blank" rel="noopener">'+SRC[k][0]+'</a>';}).join("; ")+'</div>';
  return h+'</div></details></article>';
}

ERAS.forEach(function(er,ei){
  var b=document.createElement("button"); b.type="button"; b.dataset.era=er.id;
  b.innerHTML="<b>"+er.short+"</b><span>"+er.yrs+"</span>"; b.setAttribute("aria-label",er.name+", "+er.yrs);
  b.addEventListener("click",function(){document.getElementById(er.id).scrollIntoView();});
  erasNav.appendChild(b);
  var sec='<section class="era" id="'+er.id+'"><div class="era-head"><h2>'+er.name+'</h2><span class="yrs">'+er.yrs+'</span></div><p class="era-intro">'+er.intro+'</p><div class="era-list">';
  EV.forEach(function(e,i){ if(e.era===ei) sec+=card(e,i); });
  tl.insertAdjacentHTML("beforeend",sec+'</div></section>');
});
tl.insertAdjacentHTML("beforeend",'<div class="empty" id="empty" hidden>No events match these filters. <button type="button" class="linkbtn" id="reset2">Reset filters</button></div>');
tl.insertAdjacentHTML("beforeend",'<section class="next"><h2>The next entry is up to Congress</h2><p>Cancelling the 2025 orders puts things back where they were on March 26, 2025, with the same door still open. The next pages lay out <a href="#holes">each hole in the law</a> and <a href="#fix">the language that closes it</a>.</p></section>');

/* president list */
var pres=[], sel=document.getElementById("fPres");
EV.forEach(function(e){e.p.forEach(function(p){if(pres.indexOf(p)<0)pres.push(p);});});
pres.forEach(function(p){var o=document.createElement("option");o.value=p;o.textContent=p;sel.appendChild(o);});

/* ---------- filters ---------- */
var F={dir:"all",who:"all",pres:"all"};
function chipGroup(id,key){
  var g=document.getElementById(id);
  g.addEventListener("click",function(ev){
    var b=ev.target.closest("button"); if(!b) return;
    F[key]=b.dataset.v;
    Array.prototype.forEach.call(g.children,function(c){c.setAttribute("aria-pressed",c===b?"true":"false");});
    apply();
  });
}
chipGroup("fDir","dir"); chipGroup("fWho","who");
sel.addEventListener("change",function(){F.pres=sel.value;apply();});
function resetF(){
  F={dir:"all",who:"all",pres:"all"}; sel.value="all";
  ["fDir","fWho"].forEach(function(id){Array.prototype.forEach.call(document.getElementById(id).children,function(c){c.setAttribute("aria-pressed",c.dataset.v==="all"?"true":"false");});});
  apply();
}
document.getElementById("reset").addEventListener("click",resetF);
document.getElementById("reset2").addEventListener("click",resetF);
document.getElementById("openAll").addEventListener("click",function(){setAll(true);});
document.getElementById("closeAll").addEventListener("click",function(){setAll(false);});
function setAll(v){Array.prototype.forEach.call(document.querySelectorAll(".ev:not([hidden]) details"),function(d){d.open=v;});}

function apply(){
  var n=0;
  EV.forEach(function(e,i){
    var ok=(F.dir==="all"||e.d===F.dir)&&(F.who==="all"||e.w===F.who)&&(F.pres==="all"||e.p.indexOf(F.pres)>=0);
    document.getElementById("ev-"+i).hidden=!ok; if(ok)n++;
  });
  ERAS.forEach(function(er){
    var s=document.getElementById(er.id); s.hidden=!s.querySelector(".ev:not([hidden])");
  });
  document.getElementById("empty").hidden=n>0;
  document.getElementById("count").textContent="Showing "+n+" of "+EV.length+" events";
  spy();
}

/* ---------- scroll tracking ---------- */
var pin=document.getElementById("pin"), cur=-1, ticking=false;
function navH(){var n=document.getElementById("nav");return n?n.offsetHeight:0;}
function setBar(){var nh=navH();document.documentElement.style.setProperty("--nav-h",nh+"px");document.documentElement.style.setProperty("--bar-h",(nh+pin.offsetHeight)+"px");}
function spy(){
  ticking=false;
  var line=navH()+pin.offsetHeight+Math.min(220,window.innerHeight*0.3), best=-1, first=-1;
  var list=document.querySelectorAll(".ev:not([hidden])");
  for(var k=0;k<list.length;k++){
    var i=+list[k].dataset.i; if(first<0)first=i;
    if(list[k].getBoundingClientRect().top<=line) best=i; else break;
  }
  if(best<0) best=first;
  if(best<0||best===cur) return;
  if(cur>=0){var o=document.getElementById("ev-"+cur); if(o)o.classList.remove("is-current");}
  cur=best; var e=EV[cur];
  document.getElementById("ev-"+cur).classList.add("is-current");
  Array.prototype.forEach.call(erasNav.children,function(b,bi){b.setAttribute("aria-current",bi===e.era?"true":"false");});
  var c=coverage(e.t);
  document.getElementById("mYear").textContent=e.y;
  document.getElementById("mVal").textContent=c.txt;
  document.getElementById("stripYear").textContent=e.y;
  document.getElementById("stripTxt").textContent=c.txt;
  var g=document.getElementById("stripGauge");
  g.className="gauge"+(c.pct===null?" unknown":""); g.firstElementChild.style.width=(c.pct===null?100:Math.round(c.pct/70*100))+"%";
  var x=cx(e.t), y=cy(lineY(e.t));
  var ml=document.getElementById("mkLine"), md=document.getElementById("mkDot");
  ml.setAttribute("x1",x); ml.setAttribute("x2",x); md.setAttribute("cx",x); md.setAttribute("cy",y);
}
function onScroll(){ if(!ticking){ticking=true;requestAnimationFrame(spy);} }
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",function(){setBar();onScroll();});

window.TL_SRC=SRC; drawChart(); setBar(); apply();
})();
