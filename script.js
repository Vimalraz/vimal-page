/* ─── FEATURES CARD ACCORDION ─── */
const FC_DURATION = 6000;
let _fcTimer    = null;   /* setTimeout or setInterval handle */
let _fcStartTime = 0;     /* when current item started (ms) */
let _fcPauseStart = 0;    /* when hover-pause began */
let _fcPausedMs  = 0;     /* total ms spent paused during current item */

function fcSelect(idx) {
  /* expand the chosen one using clean flexbox css styling */
  document.querySelectorAll('.fc-item').forEach((item, i) => {
    if (i === idx) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  /* swap images */
  document.querySelectorAll('.fc-img').forEach((el, i) => el.classList.toggle('active', i === idx));

  /* restart progress bars — animate only the divider after the active item */
  document.querySelectorAll('.fc-progress').forEach((p, i) => {
    p.style.animation = 'none';
    p.offsetWidth; /* force reflow so animation truly restarts */
    p.style.animationPlayState = 'running';
    p.style.animation = (i === idx) ? `fcProgress ${FC_DURATION}ms linear forwards` : 'none';
  });

  _fcStartTime = Date.now();
  _fcPausedMs  = 0;
}

function _fcNext() {
  const items = document.querySelectorAll('.fc-item');
  let cur = 0;
  items.forEach((el, i) => { if (el.classList.contains('active')) cur = i; });
  fcSelect((cur + 1) % items.length);
}

function _fcSchedule(delay) {
  clearTimeout(_fcTimer);
  clearInterval(_fcTimer);
  _fcTimer = setTimeout(() => {
    _fcNext();
    _fcTimer = setInterval(_fcNext, FC_DURATION);
  }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.features-card');
  if (!card) return;

  fcSelect(0);
  _fcSchedule(FC_DURATION);
});

/* ─── WHATSAPP ─── */
const WA_PHONE = '919819052944';
const WA_MESSAGES = {
  home:    'Hello, I have a question about Trishul Biotech.',
  tech:    'Hello, I have a question about UPCROP\u00ae science and technology.',
  labs:    'Hello, I have a question about Trishul Biotech lab services.',
  india:   'Hello, I have a question about Trishul Biotech products.',
  gallery: 'Hello, I have a question about Trishul Biotech.',
  contact: 'Hello, I would like to get in touch with Trishul Biotech.'
};
let _currentSection = 'home';
function openWA(){
  const msg = WA_MESSAGES[_currentSection] || WA_MESSAGES.home;
  window.open('https://wa.me/'+WA_PHONE+'?text='+encodeURIComponent(msg),'_blank');
}

/* ─── NAVIGATION ─── */
/* pages with a light/white background — nav starts dark */
const lightBgPages = ['india','gallery'];

function navTo(id,e){
  if(e)e.preventDefault();
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const sec=document.getElementById(id);
  if(sec){sec.classList.add('active');window.scrollTo(0,0);}
  const btn=document.querySelector(`.nav-btn[onclick*="'${id}'"]`);
  if(btn)btn.classList.add('active');
  /* update header theme for the destination page */
  const hdr=document.getElementById('main-header');
  if(hdr){
    hdr.classList.remove('scrolled'); /* reset — we're back at top */
    if(lightBgPages.includes(id)) hdr.classList.add('light-page');
    else hdr.classList.remove('light-page');
  }
  _currentSection = id;
  observeReveal();
}

/* ─── SCROLL REVEAL ─── */
function observeReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>{
    el.classList.remove('visible');
    obs.observe(el);
  });
}
window.addEventListener('load',observeReveal);

/* ─── LAB TABS ─── */
const labContent={
  chennai:{tag:'Biomarker Validation & Microbiology Centre',city:'Chennai Research Centre',img:'img/fertilizer-analysis-lab.jpg',body:'Our core analytical hub specializes in biomarker validation, phytochemical profiling, and microbiology — identifying and verifying the marine algae functional components that power every UPCROP® formulation. This centre anchors the quality intelligence of our entire product line.'},
  noida:{tag:'Crop Physiology, Biochemistry & Product Development',city:'Noida Research Centre',img:'img/agricultural-rd.jpg',body:'Our Noida laboratory conducts crop physiology and biochemistry research — evaluating the agronomic performance of our formulations across crop species and growth stages. In addition to validating pillar system outcomes, this centre drives active product development research, translating bioactive science into new and improved biological input formulations.'},
  pune:{tag:'Field Research, Validation & Abiotic Stress Studies',city:'Pune Field Station',img:'img/crop-health-analysis.jpg',body:'Located in one of India\'s key horticultural belts, our Pune field station conducts multi-season, multi-crop agronomic trials — translating laboratory findings into real-world field validation data across diverse soil types and agroclimatic conditions. The station also undertakes dedicated abiotic stress performance studies, evaluating crop response to drought, heat, salinity, and other environmental stressors under controlled and field conditions.'},
  hyderabad:{tag:'Biotic Stress, Soil Interaction & Microbiological Studies',city:'Hyderabad Research Centre',img:'img/trishul-biotech-soil-health-testing-lab.jpg',body:'Our Hyderabad centre focuses on three interconnected research areas: biotic stress studies — examining how biological inputs influence crop response to disease and pest pressure; soil interaction studies — understanding how our formulations interact with soil chemistry, structure, and biology; and microbiological studies — investigating the role of soil and plant microbiomes in biological input efficacy and crop health.'}
};
function showLab(key,btn){
  document.querySelectorAll('.lab-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const d=labContent[key];
  document.getElementById('lab-content').innerHTML=`<img src="${d.img}" alt="${d.city}" style="width:100%;height:200px;object-fit:cover;border-radius:2px;margin-bottom:20px;opacity:0.85;" loading="lazy"><div class="lab-tag">${d.tag}</div><h3>${d.city}</h3><p>${d.body}</p>`;
}

/* ─── PORTFOLIO TABS ─── */
function showIndia(key,btn){
  document.querySelectorAll('.port-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.port-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  const el=document.getElementById('india-'+key);
  if(el)el.classList.add('active');
}

/* ─── FLYWHEEL PILLAR SELECTION ─── */
const allCropParts=['crop-sun','crop-rain','crop-fruit','crop-stem','crop-leaves','crop-flower','crop-soil','crop-roots','crop-water','crop-shield'];
const pillarCropMap={raiz:['crop-roots','crop-soil'],phyto:['crop-leaves','crop-stem'],nutri:['crop-stem','crop-water'],stress:['crop-rain','crop-shield','crop-leaves'],quali:['crop-fruit','crop-flower','crop-sun'],bioguard:['crop-shield'],bioflow:['crop-leaves','crop-stem','crop-rain']};

function hoverPillar(key){
  const active=allCropParts;
  const lit=pillarCropMap[key]||[];
  active.forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    if(lit.includes(id)){el.classList.add('highlighted');el.classList.remove('dimmed');}
    else{el.classList.add('dimmed');el.classList.remove('highlighted');}
  });
  const lbl=document.getElementById('crop-label');
  if(lbl)lbl.setAttribute('fill','transparent');
  document.querySelectorAll('.p-label').forEach(l=>l.classList.remove('active-label'));
  const activeLbl=document.getElementById('lbl-'+key);
  if(activeLbl)activeLbl.classList.add('active-label');
}
function unhoverPillar(){
  allCropParts.forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.classList.remove('highlighted','dimmed');}
  });
  const lbl=document.getElementById('crop-label');
  if(lbl)lbl.setAttribute('fill','rgba(255,255,255,0.18)');
  document.querySelectorAll('.p-label').forEach(l=>l.classList.remove('active-label'));
}

const pillarData={
  raiz:{color:'#6B4423',label:'Pillar 01 — RaizUp',name:'RaizUp',tagline:'Root Architecture & Seedling Vigour',objective:"The crop begins its story underground. RaizUp is designed to win the establishment battle — ensuring every seed develops the root density and lateral architecture that determines how well the plant can feed, anchor, and ultimately perform for its entire season.",ingredients:'Tropical and temperate marine algae extracts',bioactive:'Natural auxins, cytokinins, low-MW polysaccharides',mechanism:'Auxin-mediated cell elongation drives lateral root proliferation, while cytokinins stimulate meristematic activity — together creating a dense, high-surface-area root system from the earliest growth stages.',application:'Seed treatment and early-stage soil drench',alignment:'Root development stage — the invisible foundation of every yield outcome',arriving:true,products:[]},
  phyto:{color:'#2A5C1E',label:'Pillar 02 — PhytoBoost',name:'PhytoBoost',tagline:'Accelerated Vigour & Canopy Building',objective:"A dense, high-functioning canopy is the crop's solar panel. PhytoBoost is engineered to accelerate canopy establishment — driving rapid cell division, lateral shoot growth, and early photosynthetic capacity so the crop reaches its productive phase faster and stronger.",ingredients:'<em>Kappaphycus alvarezii</em> & <em>Sargassum</em> (Tropical)',bioactive:'Cytokinins (Zeatin-type), glycine betaine, low-molecular-weight polysaccharides',mechanism:'Cytokinins stimulate rapid cell division and lateral growth, while low-MW polysaccharides act as fast carbon and signalling molecules to accelerate early vegetative development.',application:'Foliar spray and drip irrigation',alignment:'Canopy stage — establishing a high-efficiency photosynthetic foundation',quality:'Supports dense, high-turgor, uniform canopy growth — the physiological base for consistent size, colour, and quality development.',arriving:false,products:[{id:'pb201',sku:'UPC PB 201 P',desc:'Powder · Kappaphycus alvarezii'},{id:'pb261',sku:'UPC PB 261 L',desc:'Liquid · foliar growth stimulant'}]},
  nutri:{color:'#1A3570',label:'Pillar 05 — NutriSpike',name:'NutriSpike',tagline:'Metabolic Fueling & Nutrient Efficiency',objective:"Fertilizer in the soil means nothing if the crop cannot move it. NutriSpike exists to solve the last-metre problem of plant nutrition — enhancing the metabolic and transport machinery inside the crop so every unit of applied nutrient reaches where it creates yield.",ingredients:'<em>Gracilaria edulis</em> WSP (Tropical)',bioactive:'Ribitol, mannitol (polyols), glutamic acid',mechanism:'Polyols support cellular energy balance and carbon metabolism, enhancing ATP-driven nutrient transport even under low-energy conditions.',application:'Foliar & drip during fruit or root development',alignment:'Nutrient assimilation stage — maximising biomass and sugar density',quality:'Improves internal nutrient distribution and metabolic efficiency, supporting dense, uniform, high-quality produce outcomes.',arriving:false,products:[{id:'ns501',sku:'UPC NS 501 P',desc:'Powder · nutrient uptake enhancer'}]},
  stress:{color:'#7A3D10',label:'Pillar 03 — Stressilient',name:'Stressilient',tagline:'Abiotic Stress Shield & Recovery',objective:"Climate unpredictability is agriculture's most dangerous variable. Stressilient is Trishul Biotech's answer — a marine algae formulation engineered to activate the crop's own stress-response systems before stress strikes, and accelerate recovery after it passes.",ingredients:'<em>Gracilaria edulis</em> (Tropical) & <em>Ascophyllum nodosum</em> (Temperate)',bioactive:'Phlorotannins, glycine betaine, salicylic acid precursors',mechanism:'Phlorotannins provide UV and oxidative protection, while glycine betaine maintains cellular water balance and prevents stress-induced tissue collapse.',application:'Foliar spray and drip application, ideally 48 hours before predicted stress',alignment:'Protection stage — maintaining metabolic continuity under abiotic stress',quality:'Preserves structural integrity and visual quality during stress, reducing physiological disorders and stabilising yield expression.',primaryCrops:'Apples, Grapes, Strawberries, Potatoes, Tomatoes, Carrots, Asparagus, Onions',arriving:false,products:[{id:'st351',sku:'UPC ST 351 L',desc:'Liquid · foliar & drip abiotic stress management'}]},
  quali:{color:'#4A1A6E',label:'Pillar 04 — QualiGain',name:'QualiGain',tagline:'Harvest Quality & Post-Harvest Value',objective:"Export markets don't just buy crops — they buy consistency, firmness, shelf life, and appearance. QualiGain is the final UPCROP® layer that transforms field yield into market-ready, export-grade produce with the structural strength to survive cold chains and long supply routes.",ingredients:'<em>Gracilaria edulis</em> (Tropical), enzymatically hydrolysed <em>Ecklonia maxima</em> (Temperate), and soy protein hydrolysate',bioactive:'Natural auxins, cytokinins, salicylic acid, soy peptides',mechanism:'Auxins expand root systems, peptides support protein synthesis, and salicylic acid signalling strengthens cell walls and tissue firmness.',application:'Foliar spray and drip application from flowering through harvest',alignment:'Shelf-life & harvest stage — building physically stronger, uniform produce',quality:'Enhances structural strength, uniformity, and post-harvest durability aligned with export-grade quality expectations.',arriving:false,products:[{id:'qg451',sku:'UPC QG 451 L',desc:'Liquid · pre-harvest to post-harvest application'}]},
  bioguard:{color:'#C0392B',label:'Pillar 06 — BioGuard',name:'BioGuard',tagline:'Biological Plant Protection',objective:"What if crops could defend themselves more intelligently? BioGuard is our next frontier — exploring how marine algae-derived bioactive compounds can activate and amplify the plant's own immune and defense signalling pathways, reducing dependence on synthetic protection chemistry.",ingredients:'Under advanced R&D',bioactive:'Under advanced R&D',mechanism:'BioGuard targets the priming of systemic resistance pathways using novel marine algae bioactives. The science is in development — the outcomes we are working toward are significant.',application:'To be confirmed post-development',alignment:'Plant immunity & protection stage',arriving:true,products:[]},
  bioflow:{color:'#00B4C5',label:'Pillar 07 — BioFlow',name:'BioFlow',tagline:'Foliar Spray Optimisation & Adjuvant Science',objective:"Not all biological inputs reach the crop the way they should. BioFlow is our adjuvant science pillar — engineered to solve the fundamental problem of foliar spray delivery: ensuring that biostimulants and crop inputs actually stick, spread, and penetrate the leaf surface rather than rolling off or drying before absorption. When the input reaches the target, every application works harder.",ingredients:'Adjuvant actives — under development',bioactive:'Spreaders, stickers, penetration enhancers, wetting agents',mechanism:'BioFlow adjuvant formulations reduce the surface tension of spray droplets, improve leaf surface contact and retention, and enhance stomatal penetration — maximising the efficacy of any biostimulant or crop input applied as a foliar spray, particularly on waxy or hydrophobic leaf surfaces.',application:'Tank-mixed with foliar biostimulants and crop inputs at point of spray application',alignment:'Foliar delivery optimisation — improving the efficiency of every spray application across all crop stages',arriving:true,products:[]}
};

function selectPillar(key){
  const d=pillarData[key];
  document.getElementById('pillar-placeholder').style.display='none';
  const c=document.getElementById('pillar-detail-content');
  c.style.display='block';
  document.querySelectorAll('.swirl-seg path.swirl-path').forEach(p=>{p.style.opacity='0.45';p.style.filter='none';});
  const seg=document.querySelector('#seg-'+key+' path.swirl-path');
  if(seg){seg.style.opacity='1';seg.style.filter='brightness(1.4) saturate(1.2)';}
  hoverPillar(key);
  let productsHTML='';
  if(d.arriving){
    productsHTML=`<div class="pp-arriving">🌿 Products Arriving Soon — R&D in Progress</div>`;
  }else if(d.products&&d.products.length){
    productsHTML=`<div class="pp-products"><div class="pp-prod-label">Products — Click to View Full Details</div><ul class="pp-prod-list">${d.products.map(p=>`<li onclick="openModal('${p.id}')"><span><strong>${p.sku}</strong> — ${p.desc}</span><span>→</span></li>`).join('')}</ul></div>`;
  }
  c.innerHTML=`
    <div class="pp-header">
      <div class="pp-color-bar" style="background:${d.color}"></div>
      <div class="pp-titles">
        <div class="pp-pillar-label">${d.label}</div>
        <div class="pp-name">${d.name}</div>
        <div class="pp-tagline">${d.tagline}</div>
      </div>
    </div>
    <div class="pp-objective">${d.objective}</div>
    ${productsHTML}`;
}

/* ─── MODAL DATA ─── */
const specTables={
  'specs-seamix':`<table class="spec-table"><tr><td>Alginic acid</td><td>0.02% min</td></tr><tr><td>Total Organic Carbon</td><td>11% min</td></tr><tr><td>Total Dissolved Solids</td><td>28% min</td></tr><tr><td>pH</td><td>6.0 – 9.0</td></tr><tr><td>Solubility</td><td>≥ 99%</td></tr></table>`,
  'specs-humi-l':`<table class="spec-table"><tr><td>Free Amino Acids</td><td>0.69% min</td></tr><tr><td>Alginic acid</td><td>0.02% min</td></tr><tr><td>Humic acid</td><td>4.10% min</td></tr><tr><td>Total Organic Carbon</td><td>2% min</td></tr><tr><td>Total Dissolved Solids</td><td>7.5% min</td></tr><tr><td>pH</td><td>7.0 – 9.0</td></tr><tr><td>Solubility</td><td>&gt; 99% min</td></tr></table>`,
  'specs-humi-p':`<table class="spec-table"><tr><td>Humic acid</td><td>70% min</td></tr><tr><td>Fulvic acid</td><td>8% min</td></tr><tr><td>Alginic acid</td><td>0.02% min</td></tr><tr><td>Organic Carbon</td><td>11% min</td></tr><tr><td>pH</td><td>6.5 – 9.5</td></tr><tr><td>Solubility</td><td>85% min</td></tr></table>`,
  'specs-humi-g':`<table class="spec-table"><tr><td>Alginic acid</td><td>0.02% min</td></tr><tr><td>Free Amino Acids</td><td>0.74% min</td></tr><tr><td>Humic acid</td><td>0.83% min</td></tr><tr><td>Total Organic Carbon</td><td>6% min</td></tr><tr><td>pH</td><td>7 – 9</td></tr></table>`
};

const modalData={
  'seamix':{sku:'UPC Seamix Pro',pillar:'Gazette Biostimulant · Item 8',pillarColor:'#C0392B',mockup:{bg:'#C0392B',label:'Seaweed\nLiquid'},rows:[{label:'Category',val:'Seaweed Liquid — FCO Schedule VI, S.O. 2346(E), 26 May 2025 — Part A, Sub-heading (ii), Item 8'},{label:'Ingredients',val:'<em>Kappaphycus alvarezii</em> & <em>Sargassum swartzii</em> extracts in ratio 1:1 (No Humic acid)'},{label:'Specifications',val:'specs-seamix'},{label:'Dose',val:'3 foliar applications at <strong>506 mL/Acre</strong> (equivalent to 1.25 L/hectare)'},{label:'Application',val:'Foliar spray during vegetative and reproductive stages'}]},
  'humi-l':{sku:'UPC Humi Sea L',pillar:'Gazette Biostimulant · Mixed Formulation Item 5',pillarColor:'#27AE60',mockup:{bg:'#27AE60',label:'Humic+\nSeaweed L'},rows:[{label:'Category',val:'Humic acid + Seaweed Extract Liquid — FCO Schedule VI, S.O. 2346(E), 26 May 2025 — Part A, Sub-heading (4), Item (5)'},{label:'Ingredients',val:'Humic acid (Source: Leonardite) + <em>Kappaphycus alvarezii</em> & <em>Sargassum swartzii</em> extracts in ratio 1:1'},{label:'Specifications',val:'specs-humi-l'},{label:'Dose',val:'3 foliar applications at <strong>506 mL/Acre</strong> (equivalent to 1.25 L/hectare)'},{label:'Application',val:'Foliar spray and soil drench for broad-spectrum crop enhancement'}]},
  'humi-p':{sku:'UPC Humi Sea P',pillar:'Gazette Biostimulant · Mixed Formulation Item 6',pillarColor:'#C2185B',mockup:{bg:'#C2185B',label:'Humic+\nSeaweed P'},rows:[{label:'Category',val:'Humic acid + Seaweed Extract Powder — FCO Schedule VI, S.O. 2346(E), 26 May 2025 — Part A, Sub-heading (4), Item (6)'},{label:'Ingredients',val:'Humic acid (Source: Leonardite) + <em>Kappaphycus alvarezii</em> & <em>Sargassum swartzii</em> extracts in ratio 1:1'},{label:'Specifications',val:'specs-humi-p'},{label:'Dose',val:'3 foliar applications at <strong>506 g/Acre</strong> (equivalent to 1.25 kg/hectare)'},{label:'Application',val:'Dissolve and apply as foliar spray or fertigation'}]},
  'humi-g':{sku:'UPC Humi Sea G',pillar:'Gazette Biostimulant · Mixed Formulation Item 7',pillarColor:'#1B5E20',mockup:{bg:'#1B5E20',label:'Humic+\nSeaweed G'},rows:[{label:'Category',val:'Humic acid + Seaweed Extract Granules — FCO Schedule VI, S.O. 2346(E), 26 May 2025 — Part A, Sub-heading (4), Item (7)'},{label:'Ingredients',val:'Humic acid (Source: Leonardite) + <em>Kappaphycus alvarezii</em> & <em>Sargassum swartzii</em> extracts in ratio 1:1'},{label:'Specifications',val:'specs-humi-g'},{label:'Dose',val:'2 soil applications at <strong>10.12 kg/Acre</strong> (equivalent to 25 kg/hectare)'},{label:'Application',val:'Soil application — basal or top dressing; compatible with drip irrigation systems'}]},
  'rk20':{sku:'UPC RK20',pillar:'PDR Series — Grade 1',pillarColor:'#AAC32D',mockup:{bg:'#AAC32D',label:'Bio-\nPotash'},rows:[{label:'Classification',val:'<strong>Potash Derived from Rhodophytes (PDR)</strong> — FCO Grade Organic Fertilizer'},{label:'Source',val:'Red marine algae — <em>Kappaphycus</em> (Rhodophyta) — water-soluble powder'},{label:'Grade',val:'<strong>PDR Grade 1</strong> — Premium specification'},{label:'Soluble Potash (K₂O)',val:'<strong>&gt;30%</strong> (water soluble)'},{label:'Sulphur (S)',val:'<strong>≥ 2.5%</strong>'},{label:'Application',val:'Foliar spray, drip fertigation, and soil application'},{label:'Benefit',val:'Bioavailable potassium with organic sulphur; supports fruit quality, stress tolerance, and enzyme activation'}]},
  'shatabdi':{sku:'Seetang Shatabdi',pillar:'PDR Series — Grade 2',pillarColor:'#D4500A',mockup:{bg:'#D4500A',label:'Bio-\nPotash 2'},rows:[{label:'Classification',val:'<strong>Potash Derived from Rhodophytes (PDR)</strong> — FCO Grade Organic Fertilizer'},{label:'Source',val:'Red marine algae — <em>Kappaphycus</em> (Rhodophyta) — water-soluble powder'},{label:'Grade',val:'<strong>PDR Grade 2</strong>'},{label:'Soluble Potash (K₂O)',val:'<strong>&gt;25%</strong> (water soluble)'},{label:'Sulphur (S)',val:'<strong>≥ 2.5%</strong>'},{label:'Application',val:'Soil application and fertigation; suitable for broad agroclimatic conditions'},{label:'Benefit',val:'Cost-effective organic potash for diverse crop requirements and large-scale field applications'}]},
  'hs60':{sku:'UPC HS60',pillar:'Technical / B2B',pillarColor:'#0A1A4A',mockup:{bg:'#0A1A4A',label:'HS60\nWSP'},rows:[{label:'Type',val:'Water Soluble Powder (WSP) — Raw material for own UPC Humi Sea L formulation'},{label:'Concentration',val:'<strong>10× the strength</strong> of UPC Humi Sea L — allows on-site dilution formulation'},{label:'Form',val:'Water-soluble powder; high active content'},{label:'Use',val:'Industrial raw material for biostimulant manufacturing — base for Humi Sea L equivalent products'},{label:'Supply',val:'Bulk supply with full quality certification and traceability documentation'}]},
  'sp4g':{sku:'UPC SP4G',pillar:'Technical / B2B',pillarColor:'#0A2A0A',mockup:{bg:'#0A2A0A',label:'SP4G\nPremix'},rows:[{label:'Type',val:'Premix Powder — Raw material for own UPC Humi Sea G formulation'},{label:'Concentration',val:'<strong>23× the strength</strong> of UPC Humi Sea G — allows on-site granular formulation'},{label:'Form',val:'Free-flowing premix powder for granular biostimulant blending'},{label:'Use',val:'Industrial raw material for granular biostimulant manufacturing — base for Humi Sea G equivalent products'},{label:'Supply',val:'Bulk supply with full quality certification; available with technical-grade specification sheets'}]},
  'bp15x':{sku:'UPC BP15X',pillar:'Technical / B2B',pillarColor:'#3A3A3A',mockup:{bg:'#3A3A3A',label:'BP15X\n15%'},rows:[{label:'Type',val:'Water Soluble Black Powder — Seaweed raw material for formulation'},{label:'Seaweed Bioactive',val:'<strong>15%</strong> seaweed bioactive content'},{label:'Form',val:'Fine water-soluble black powder; suitable for liquid and powder biostimulant manufacturing'},{label:'Use',val:'Base raw material for seaweed biostimulant product formulation'},{label:'Supply',val:'Bulk industrial supply; available with full spec sheet and Certificate of Analysis'}]},
  'bp15x2':{sku:'UPC BP15X2',pillar:'Technical / B2B',pillarColor:'#0D0D0D',mockup:{bg:'#0D0D0D',label:'BP15X2\n30%'},rows:[{label:'Type',val:'Water Soluble Black Powder — Seaweed raw material for formulation'},{label:'Seaweed Bioactive',val:'<strong>30%</strong> seaweed bioactive content — double the bioactive concentration of BP15X'},{label:'Form',val:'Fine water-soluble black powder; high-potency for premium formulations'},{label:'Use',val:'Base raw material for high-strength seaweed biostimulant product formulation'},{label:'Supply',val:'Bulk industrial supply; available with full spec sheet and Certificate of Analysis'}]},
  'pb261':{sku:'UPC PB 261 L',pillar:'PhytoBoost — Pillar 2',pillarColor:'#2A5C1E',mockup:{bg:'#2A5C1E',label:'PB 261\nLiquid'},rows:[{label:'Product Tagline',val:'The Foundation of Vigor — Liquid'},{label:'Marine Algae Ingredients',val:'<em>Kappaphycus alvarezii</em> & <em>Sargassum</em> (Tropical)'},{label:'Bio-active Profile',val:'Cytokinins (Zeatin-type), glycine betaine, low-molecular-weight polysaccharides'},{label:'Mechanism',val:'Cytokinins stimulate rapid cell division and lateral growth, while low-MW polysaccharides act as fast carbon and signalling molecules to accelerate early vegetative development.'},{label:'Pillar Alignment',val:'Canopy stage — establishing a high-efficiency photosynthetic foundation'},{label:'Quality Impact',val:'Supports dense, high-turgor, uniform canopy growth — creating the physiological base for consistent size, colour, and quality development.'},{label:'Application',val:'Foliar spray and drip irrigation'}]},
  'pb201':{sku:'UPC PB 201 P',pillar:'PhytoBoost — Pillar 2',pillarColor:'#3A7A28',mockup:{bg:'#3A7A28',label:'PB 201\nPowder'},rows:[{label:'Product Tagline',val:'The Foundation of Vigor — Powder'},{label:'Marine Algae Ingredients',val:'<em>Kappaphycus alvarezii</em> (Tropical Red Marine Algae)'},{label:'Bio-active Profile',val:'Cytokinins (Zeatin-type), glycine betaine, low-molecular-weight polysaccharides'},{label:'Mechanism',val:'Cytokinins stimulate rapid cell division and lateral growth, while low-MW polysaccharides act as fast carbon and signalling molecules to accelerate early vegetative development.'},{label:'Pillar Alignment',val:'Canopy stage — establishing a high-efficiency photosynthetic foundation'},{label:'Quality Impact',val:'Supports dense, high-turgor, uniform canopy growth — creating the physiological base for consistent size, colour, and quality development.'},{label:'Application',val:'Dissolve and apply as foliar spray or drip fertigation'}]},
  'ns501':{sku:'UPC NS 501 P',pillar:'NutriSpike — Pillar 5',pillarColor:'#1A3570',mockup:{bg:'#1A3570',label:'NS 501\nPowder'},rows:[{label:'Product Tagline',val:'The Energy Fuel'},{label:'Marine Algae Ingredients',val:'<em>Gracilaria edulis</em> WSP (Tropical)'},{label:'Bio-active Profile',val:'Ribitol, mannitol (polyols), glutamic acid'},{label:'Mechanism',val:'Polyols support cellular energy balance and carbon metabolism, enhancing ATP-driven nutrient transport even under low-energy conditions.'},{label:'Pillar Alignment',val:'Nutrient assimilation stage — maximising biomass and sugar density'},{label:'Quality Impact',val:'Improves internal nutrient distribution and metabolic efficiency, supporting dense, uniform, high-quality produce outcomes.'},{label:'Application',val:'Foliar & drip during fruit or root development'}]},
  'st351':{sku:'UPC ST 351 L',pillar:'Stressilient — Pillar 3',pillarColor:'#7A3D10',mockup:{bg:'#7A3D10',label:'ST 351\nLiquid'},rows:[{label:'Product Tagline',val:'Protecting Yield Integrity'},{label:'Marine Algae Ingredients',val:'<em>Gracilaria edulis</em> (Tropical) & <em>Ascophyllum nodosum</em> (Temperate)'},{label:'Bio-active Profile',val:'Phlorotannins, glycine betaine, salicylic acid precursors'},{label:'Mechanism',val:'Phlorotannins provide UV and oxidative protection, while glycine betaine maintains cellular water balance and prevents stress-induced tissue collapse.'},{label:'Pillar Alignment',val:'Protection stage — maintaining metabolic continuity under abiotic stress'},{label:'Quality Impact',val:'Preserves structural integrity and visual quality during stress, reducing physiological disorders and stabilising yield expression.'},{label:'Application',val:'Foliar spray and drip application, ideally 48 hours before predicted stress'},{label:'Primary Crops',val:'Apples, Grapes, Strawberries, Potatoes, Tomatoes, Carrots, Asparagus, Onions'}]},
  'qg451':{sku:'UPC QG 451 L',pillar:'QualiGain — Pillar 4',pillarColor:'#4A1A6E',mockup:{bg:'#4A1A6E',label:'QG 451\nLiquid'},rows:[{label:'Product Tagline',val:'The Quality Architect'},{label:'Marine Algae Ingredients',val:'<em>Gracilaria edulis</em> (Tropical), enzymatically hydrolysed <em>Ecklonia maxima</em> (Temperate), and soy protein hydrolysate'},{label:'Bio-active Profile',val:'Natural auxins, cytokinins, salicylic acid, soy peptides'},{label:'Mechanism',val:'Auxins expand root systems, peptides support protein synthesis, and salicylic acid signalling strengthens cell walls and tissue firmness.'},{label:'Pillar Alignment',val:'Shelf-life & harvest stage — building physically stronger, uniform produce'},{label:'Quality Impact',val:'Enhances structural strength, uniformity, and post-harvest durability aligned with export-grade quality expectations.'},{label:'Application',val:'Foliar spray and drip application from flowering through harvest'}]}
};

function openModal(id){
  const d=modalData[id]; if(!d)return;
  document.getElementById('modal-sku').textContent=d.sku;
  const tag=document.getElementById('modal-pillar-tag');
  tag.textContent=d.pillar;
  tag.style.background=d.pillarColor+'28';
  tag.style.border='1px solid '+d.pillarColor+'66';
  tag.style.color='#ccc';
  const mk=document.getElementById('modal-mockup');
  if(d.mockup){mk.style.background=d.mockup.bg;mk.style.color='rgba(255,255,255,0.85)';mk.textContent=d.mockup.label;mk.style.display='flex';}else{mk.style.display='none';}
  document.getElementById('modal-body').innerHTML=d.rows.map((r,i)=>{
    let val=r.val;
    if(specTables[val]){return `${i>0?'<div class="modal-divider"></div>':''}<div class="modal-row"><div class="modal-row-label">${r.label}</div><div class="modal-row-val">${specTables[val]}</div></div>`;}
    return `${i>0?'<div class="modal-divider"></div>':''}<div class="modal-row"><div class="modal-row-label">${r.label}</div><div class="modal-row-val">${val}</div></div>`;
  }).join('');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function closeModalOutside(e){
  if(e.target===document.getElementById('modal-overlay'))closeModal();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// Store crop part base opacities
window.addEventListener('load',()=>{
  allCropParts.forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.dataset.baseOpacity=el.getAttribute('opacity')||'0.35';
  });
  observeReveal();
  /* initParticles(); — disabled */
  /* ─── HEADER SCROLL ─── */
  const mainHeader = document.getElementById('main-header');
  if(mainHeader){
    let lastY = 0;
    const checkHeader = () => {
      const y = window.scrollY;
      /* band: scrolled past top */
      if(y > 10) mainHeader.classList.add('scrolled');
      else { mainHeader.classList.remove('scrolled'); mainHeader.classList.remove('header-hidden'); }
      /* hide on scroll down, reveal on scroll up */
      if(y > lastY && y > 120) mainHeader.classList.add('header-hidden');
      else if(y < lastY)       mainHeader.classList.remove('header-hidden');
      lastY = y;
    };
    window.addEventListener('scroll', checkHeader, {passive:true});
    checkHeader(); /* run immediately on load so scroll-restored positions are covered */
  }
  setTimeout(()=>{
    const ls=document.getElementById('loading-screen');
    if(ls)ls.classList.add('hide');
  },700);
});

/* ─── MOBILE NAV ─── */
function toggleMobileNav(){
  const nav=document.getElementById('mobile-nav');
  const overlay=document.getElementById('mob-overlay');
  const ham=document.getElementById('hamburger');
  nav.classList.toggle('open');
  overlay.classList.toggle('open');
  ham.classList.toggle('open');
  document.body.style.overflow=nav.classList.contains('open')?'hidden':'';
}
function closeMobileNav(){
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mob-overlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow='';
}


/* ─── HERO PARTICLES (agricultural seeds / leaves / pollen) ─── */
function initParticles(){
  const container=document.getElementById('hero-particles');
  if(!container)return;
  const types=['leaf','seed','seed','drop','leaf'];
  for(let i=0;i<26;i++){
    const p=document.createElement('div');
    const type=types[i%types.length];
    let w,h;
    if(type==='leaf'){   w=5+Math.random()*7;  h=w*1.7+Math.random()*4; }
    else if(type==='seed'){ w=3+Math.random()*4; h=w*2+Math.random()*3; }
    else {               w=4+Math.random()*5;  h=w*1.4; }
    const drift=(Math.random()-0.5)*180;
    const spin=90+Math.random()*270;
    const startRot=Math.random()*360;
    p.className=`particle particle-${type}`;
    p.style.cssText=`width:${w}px;height:${h}px;left:${Math.random()*100}%;bottom:${-5+Math.random()*50}%;animation-duration:${16+Math.random()*22}s;animation-delay:-${Math.random()*20}s;--drift:${drift};--spin:${spin}deg;transform:rotate(${startRot}deg);`;
    container.appendChild(p);
  }
}

/* ─── FORM VALIDATION ─── */
function handleFormSubmit(e){
  let valid=true;
  const fields=[
    {id:'cf-fname',check:v=>v.trim().length>0},
    {id:'cf-email',check:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())},
    {id:'cf-enquiry',check:v=>v!==''}
  ];
  fields.forEach(f=>{
    const el=document.getElementById(f.id);
    if(!el)return;
    if(!f.check(el.value)){el.classList.add('invalid');el.classList.remove('valid');valid=false;}
    else{el.classList.remove('invalid');el.classList.add('valid');}
  });
  if(!valid){e.preventDefault();return false;}
  const success=document.getElementById('form-success');
  if(success){
    e.preventDefault();
    success.classList.add('show');
    document.getElementById('contact-form').reset();
    document.querySelectorAll('#contact-form .valid').forEach(el=>el.classList.remove('valid'));
  }
  return true;
}

/* ─── NEWSLETTER ─── */
function handleNewsletterSubmit(){
  const el=document.getElementById('footer-email');
  if(el&&el.value.includes('@')){
    el.value='';
    el.placeholder='Thank you for subscribing!';
    el.style.color='var(--mint)';
  }
}
