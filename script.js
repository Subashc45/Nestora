/* ===== Nestora shared script ===== */
const P=[
{id:1,img:"images/image1.jpeg",t:"Sea-facing 3BHK apartment",type:"Apartment",city:"Chennai",area:"Besant Nagar",price:18500000,beds:3,baths:3,sqft:1650,tag:"New",c:"#0e6b73",am:["Lift","Gym","Covered parking","24/7 security"],d:"Bright corner apartment on the 9th floor with an open balcony and sea breeze through the day."},
{id:2,img:"images/image2.jpeg",t:"Courtyard villa with garden",type:"Villa",city:"Coimbatore",area:"Saibaba Colony",price:32000000,beds:4,baths:4,sqft:3200,tag:"Featured",c:"#3b5b8c",am:["Private garden","Solar power","Home office","2 car parking"],d:"Single-owner villa built around a central courtyard, close to schools and the city market."},
{id:3,img:"images/image4.jpeg",t:"Compact 1BHK near the IT corridor",type:"Apartment",city:"Chennai",area:"Sholinganallur",price:4800000,beds:1,baths:1,sqft:640,c:"#7a4e8c",am:["Lift","Power backup","Visitor parking"],d:"Ready to move in, ten minutes from the main office parks."},
{id:4,img:"images/image5.jpeg",t:"Heritage-style family house",type:"House",city:"Madurai",area:"Anna Nagar",price:12500000,beds:4,baths:3,sqft:2400,c:"#a4532f",am:["Veranda","Borewell","Terrace","Parking"],d:"Teak doors and red-oxide floors, updated with modern plumbing and wiring."},
{id:5,img:"images/image6.jpeg",t:"Corner plot, DTCP approved",type:"Plot",city:"Coimbatore",area:"Vadavalli",price:6200000,beds:0,baths:0,sqft:2400,tag:"Plot",c:"#4f7a3a",am:["DTCP approved","Tarred road","Water connection"],d:"Level corner plot in a gated layout with clear title and utilities at the boundary."},
{id:6,img:"images/image3.jpeg",t:"Backwater-view 2BHK",type:"Apartment",city:"Kochi",area:"Marine Drive",price:14200000,beds:2,baths:2,sqft:1250,tag:"New",c:"#0e7a9b",am:["Lift","Pool","Gym","Covered parking"],d:"Floor-to-ceiling windows facing the backwaters, with a rooftop pool in the building."},
{id:7,img:"images/image7.jpeg",t:"Modern 3BHK villa",type:"Villa",city:"Bengaluru",area:"Sarjapur Road",price:38500000,beds:3,baths:3,sqft:2700,c:"#2a3f54",am:["Clubhouse","Private terrace","EV charging"],d:"Contemporary villa in a gated community with a clubhouse and walking trails."},
{id:8,img:"images/image8.jpeg",t:"Starter home for first-time buyers",type:"House",city:"Madurai",area:"K. Pudur",price:4500000,beds:2,baths:2,sqft:1100,c:"#c1703b",am:["Parking","Borewell","Near school"],d:"Two-bedroom independent house with a small front yard on a quiet street."},
{id:9,img:"images/image9.jpeg",t:"Penthouse with private terrace",type:"Apartment",city:"Bengaluru",area:"Indiranagar",price:42000000,beds:4,baths:4,sqft:3100,tag:"Featured",c:"#1f2f3a",am:["Terrace","Lift","Gym","2 car parking"],d:"Top-floor residence with a 900 sq ft terrace and open views of the neighbourhood."}];

const $=(s,r=document)=>r.querySelector(s);
const inr=n=>n>=1e7?"₹"+(n/1e7).toFixed(2)+" crore":"₹"+Math.round(n/1e5)+" lakh";
let favs=new Set();
try{favs=new Set(JSON.parse(localStorage.getItem("nestora-favs")||"[]"))}catch(e){}
const saveFavs=()=>{try{localStorage.setItem("nestora-favs",JSON.stringify([...favs]))}catch(e){}};

/* ----- header and footer ----- */
const page=location.pathname.split("/").pop()||"index.html";
const NAV=[["index.html","Home"],["properties.html","Properties"],["services.html","Services"],["about.html","About"],["contact.html","Contact Us"]];
$("#site-header").outerHTML=`<header><div class="wrap"><a class="logo" href="index.html" aria-label="Nestora home"><svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><path d="M3 14 14 4l11 10v10H3z" fill="var(--accent)"/><circle cx="14" cy="16" r="3.4" fill="var(--sun)"/></svg>Nestora</a>
<nav id="nav" aria-label="Main">${NAV.map(([h,l])=>`<a href="${h}"${h===page?' class="active" aria-current="page"':""}>${l}</a>`).join("")}</nav>
<button class="menu" id="menu" aria-label="Open menu" aria-expanded="false">☰</button></div></header>`;
$("#site-footer").outerHTML=`<footer><div class="wrap"><div>© 2026 Nestora. Find a place to belong.</div><div>${NAV.map(([h,l])=>`<a href="${h}">${l}</a>`).join("")}</div></div></footer>`;
$("#menu").onclick=e=>{const o=$("#nav").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};

/* ----- property art (generated SVG, no image files needed) ----- */
function art(p){
if(p.img)return `<img src="${p.img}" alt="${p.t}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">`;
const a=p.c,b="#f2b134";let body;
if(p.type==="Plot")body=`<path d="M0 150 90 110 200 135 320 100V200H0z" fill="${a}" opacity=".7"/><path d="M60 200 130 140 260 200z" fill="#d9cfa8"/><path d="M130 140v-24M146 140v-24M162 140v-24" stroke="${b}" stroke-width="3"/>`;
else if(p.type==="Apartment")body=`<rect x="110" y="40" width="100" height="140" fill="${a}"/>`+[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${122+c*30}" y="${52+r*30}" width="16" height="18" fill="${(r+c)%2?b:"#fff"}" opacity=".85"/>`).join("")).join("");
else body=`<path d="M80 180V100l80-56 80 56v80z" fill="${a}"/><rect x="146" y="124" width="28" height="56" fill="${b}"/><rect x="100" y="112" width="28" height="24" fill="#fff" opacity=".85"/><rect x="192" y="112" width="28" height="24" fill="#fff" opacity=".85"/>${p.type==="Villa"?`<rect x="40" y="130" width="40" height="50" fill="${a}" opacity=".7"/>`:""}`;
return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="200" fill="${a}" opacity=".2"/><circle cx="64" cy="48" r="22" fill="${b}"/>${body}<rect y="180" width="320" height="20" fill="${a}" opacity=".5"/></svg>`}

/* ----- cards ----- */
const card=p=>`<article class="card"><div class="pic"><button class="open" data-open="${p.id}" aria-label="View ${p.t}">${art(p)}</button>${p.tag?`<span class="tag">${p.tag}</span>`:""}
<button class="fav" data-fav="${p.id}" aria-pressed="${favs.has(p.id)}" aria-label="${favs.has(p.id)?"Remove from saved":"Save property"}">${favs.has(p.id)?"♥":"♡"}</button></div>
<div class="body"><div class="price">${inr(p.price)}</div><h3 style="font-size:19px">${p.t}</h3><div class="muted">${p.area}, ${p.city}</div>
<div class="facts">${p.beds?`<span>${p.beds} bed</span><span>${p.baths} bath</span>`:"<span>Residential plot</span>"}<span>${p.sqft.toLocaleString("en-IN")} sq ft</span></div></div></article>`;

function openDlg(id){
const p=P.find(x=>x.id===id);let d=$("#dlg");
if(!d){d=document.createElement("dialog");d.id="dlg";document.body.append(d);d.onclick=e=>{if(e.target===d)d.close()}}
d.setAttribute("aria-label",p.t);
d.innerHTML=`<div style="position:relative;max-height:300px;overflow:hidden">${art(p)}<button class="x" aria-label="Close">✕</button></div>
<div class="dbody"><div class="price">${inr(p.price)}</div><h2 style="font-size:28px">${p.t}</h2>
<div class="muted">${p.area}, ${p.city} · ${p.type}${p.beds?` · ${p.beds} bed · ${p.baths} bath`:""} · ${p.sqft.toLocaleString("en-IN")} sq ft</div>
<p style="margin:4px 0">${p.d}</p><div class="amen">${p.am.map(a=>`<span>${a}</span>`).join("")}</div>
<div style="margin-top:10px"><a class="btn" href="contact.html?property=${encodeURIComponent(p.t+", "+p.area)}">Book a visit</a></div></div>`;
$(".x",d).onclick=()=>d.close();d.showModal()}

function bindCards(root,rerender){
root.addEventListener("click",e=>{
const f=e.target.closest("[data-fav]"),o=e.target.closest("[data-open]");
if(f){const id=+f.dataset.fav;favs.has(id)?favs.delete(id):favs.add(id);saveFavs();rerender()}
if(o)openDlg(+o.dataset.open)})}

/* ----- home: featured ----- */
const feat=$("#featured");
if(feat){const r=()=>feat.innerHTML=P.filter(p=>[1,2,6].includes(p.id)).map(card).join("");r();bindCards(feat,r)}

/* home: quick search sends to properties page */
const qs=$("#quick");
if(qs)qs.onsubmit=e=>{e.preventDefault();location.href=`properties.html?q=${encodeURIComponent($("#q",qs).value)}&type=${encodeURIComponent($("#type",qs).value)}`};

/* ----- properties: filters ----- */
const grid=$("#grid");
if(grid){
const url=new URLSearchParams(location.search);
$("#q").value=url.get("q")||"";$("#type").value=url.get("type")||"";
const run=()=>{
const q=$("#q").value.trim().toLowerCase(),t=$("#type").value,bud=+$("#budget").value,beds=+$("#beds").value,s=$("#sort").value;
const r=P.filter(p=>(!t||p.type===t)&&(!q||(p.city+" "+p.area+" "+p.t).toLowerCase().includes(q))&&(!bud||p.price<=bud)&&p.beds>=beds);
if(s==="lo")r.sort((a,b)=>a.price-b.price);else if(s==="hi")r.sort((a,b)=>b.price-a.price);else if(s==="area")r.sort((a,b)=>b.sqft-a.sqft);
grid.innerHTML=r.length?r.map(card).join(""):`<div class="empty"><b>No properties match these filters.</b><br>Try a higher budget, fewer bedrooms or a different city.</div>`;
$("#count").textContent=r.length+(r.length===1?" property":" properties")};
["q","type","budget","beds","sort"].forEach(i=>$("#"+i).addEventListener(i==="q"?"input":"change",run));
bindCards(grid,run);run()}

/* ----- contact form ----- */
const form=$("#contactForm");
if(form){
const pre=new URLSearchParams(location.search).get("property");
if(pre)$("#msg").value="I would like to visit: "+pre+".";
form.onsubmit=e=>{e.preventDefault();
const n=$("#name").value.trim(),m=$("#email").value.trim(),note=$("#note");
if(!n||!/^\S+@\S+\.\S+$/.test(m)){note.className="note err";note.textContent="Enter your name and a valid email address.";return}
note.className="note";note.textContent="Thanks, "+n+". An advisor will contact you within 24 hours.";form.reset()}}