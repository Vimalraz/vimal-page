/* ─── PILLAR WHEEL ─── */
function pwSelect(idx) {
  document.querySelectorAll('.pw-node').forEach((el, i) => el.classList.toggle('active', i === idx));
  document.querySelectorAll('.pw-center-img').forEach((el, i) => el.classList.toggle('active', i === idx));
  document.querySelectorAll('.pw-text').forEach((el, i) => el.classList.toggle('active', i === idx));
}

document.addEventListener('DOMContentLoaded', () => {
  const wheel = document.querySelector('.pw-wheel');
  if (!wheel) return;
  pwSelect(0);
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
/* pages array removed — header now uses white-on-scroll universally */

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
    hdr.classList.remove('light-page');
    /* solid white header on non-hero pages; transparent over hero */
    if(id === 'home') hdr.classList.remove('header-solid');
    else hdr.classList.add('header-solid');
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

/* ─── STATS COUNTER ANIMATION ─── */
function initStatCounters(){
  const strip = document.getElementById('features-strip');
  if(!strip) return;
  let fired = false;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting && !fired){
        fired = true;
        const nums = strip.querySelectorAll('.stat-item-num');
        nums.forEach(el=>{
          const target = parseInt(el.textContent);
          if(!isNaN(target)){
            let current = 0;
            const step = Math.max(1, Math.floor(target / 30));
            const interval = setInterval(()=>{
              current += step;
              if(current >= target){ current = target; clearInterval(interval); }
              el.textContent = current;
            }, 50);
          } else {
            el.style.animation = 'statCountIn 0.6s ease both';
          }
        });
        obs.disconnect();
      }
    });
  },{threshold:0.3});
  obs.observe(strip);
}
window.addEventListener('load', initStatCounters);

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

/* ─── BIOLOGICAL JOURNEY ─── */
function initPillarUI(){
  const section = document.getElementById('upcrop-journey');
  if(!section) return;

  const PILLARS = [
    { num:'01', name:'RaizUp',       color:'#6B4423', tagline:'Root Architecture & Seedling Vigour',
      desc:'Auxin-mediated cell elongation drives lateral root proliferation, while cytokinins stimulate meristematic activity — creating a dense, high-surface-area root system from the earliest growth stages.',
      zones:['roots'], products:[], arriving:true },
    { num:'02', name:'PhytoBoost',   color:'#2A5C1E', tagline:'Accelerated Vigour & Canopy Building',
      desc:'Cytokinins stimulate rapid cell division and lateral growth, while low-MW polysaccharides act as fast carbon and signalling molecules to accelerate early vegetative development.',
      zones:['leaves','canopy'], products:[{id:'pb201',label:'UPC PB 201 P',img:'img/Standing-Pouch-008.svg'},{id:'pb261',label:'UPC PB 261 L',img:'img/Bottle-009.svg'}], arriving:false },
    { num:'03', name:'Stressilient', color:'#7A3D10', tagline:'Abiotic Stress Shield & Recovery',
      desc:'Phlorotannins provide UV and oxidative protection, while glycine betaine maintains cellular water balance and prevents stress-induced tissue collapse.',
      zones:['full'], products:[{id:'st351',label:'UPC ST 351 L',img:'img/Bottle-010.svg'}], arriving:false },
    { num:'04', name:'QualiGain',    color:'#4A1A6E', tagline:'Harvest Quality & Post-Harvest Value',
      desc:'Auxins expand root systems, peptides support protein synthesis, and salicylic acid signalling strengthens cell walls and tissue firmness for export-grade quality.',
      zones:['fruit'], products:[{id:'qg451',label:'UPC QG 451 L',img:'img/Bottle-011.svg'}], arriving:false },
    { num:'05', name:'NutriSpike',   color:'#1A3570', tagline:'Metabolic Fueling & Nutrient Efficiency',
      desc:'Polyols support cellular energy balance and carbon metabolism, enhancing ATP-driven nutrient transport even under low-energy conditions.',
      zones:['stem','leaves'], products:[{id:'ns501',label:'UPC NS 501 P',img:'img/Standing-Pouch-007.svg'}], arriving:false },
    { num:'06', name:'BioGuard',     color:'#C0392B', tagline:'Biological Plant Protection',
      desc:'BioGuard targets the priming of systemic resistance pathways using novel marine algae bioactives. The science is in development — the outcomes we are working toward are significant.',
      zones:['full'], products:[], arriving:true },
    { num:'07', name:'BioFlow',      color:'#00B4C5', tagline:'Foliar Spray Optimisation & Adjuvant Science',
      desc:'BioFlow adjuvant formulations reduce surface tension, improve leaf surface contact and retention, and enhance stomatal penetration — maximising the efficacy of any biostimulant foliar spray.',
      zones:['leaves','canopy'], products:[], arriving:true }
  ];

  // Map zone names → SVG group IDs in Plant-scientific.svg
  const ZONE_TO_SVG = {
    roots:  ['Roots'],
    stem:   ['Stem'],
    leaves: ['Leaves'],
    canopy: ['Canopy'],
    fruit:  ['Fruit','Flowers']
  };
  const ALL_SVG_IDS = ['Canopy','Fruit','Flowers','Leaves','Stem','Roots'];
  const ALL_ZONES   = ['roots','stem','leaves','canopy','fruit'];

  const tabs        = section.querySelectorAll('.pillar-tab');
  const zoneLbls    = section.querySelectorAll('.zone-lbl');
  const piNum       = section.querySelector('#pi-num');
  const piName      = section.querySelector('#pi-name');
  const piTagline   = section.querySelector('#pi-tagline');
  const piDesc      = section.querySelector('#pi-desc');
  const piProds     = section.querySelector('#pi-products');
  const piEyebrow   = section.querySelector('.pi-eyebrow');
  const plantObj    = section.querySelector('#plant-obj');
  const piPlaceholder = section.querySelector('#pi-placeholder');
  const piContent   = section.querySelector('#pi-content');

  let svgGroups = null;
  let currentIdx = -1;

  function rgba(hex, a){
    const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function loadSvgGroups(){
    try {
      const doc = plantObj.contentDocument;
      if(!doc) return false;
      svgGroups = {};
      ALL_SVG_IDS.forEach(id => { svgGroups[id] = doc.getElementById(id); });
      ALL_SVG_IDS.forEach(id => {
        if(svgGroups[id]) svgGroups[id].style.transition = 'opacity 0.4s ease, filter 0.4s ease';
      });
      return true;
    } catch(e){ return false; }
  }

  function clearPlantHighlight(){
    if(!svgGroups) return;
    ALL_SVG_IDS.forEach(id => {
      const el = svgGroups[id];
      if(!el) return;
      el.style.opacity = '1';
      el.style.filter  = '';
    });
  }

  function applyPlantHighlight(activeZones, color){
    if(!svgGroups) return;
    const isFull = activeZones[0] === 'full';
    const activeIds = new Set();
    if(isFull){ ALL_SVG_IDS.forEach(id => activeIds.add(id)); }
    else { activeZones.forEach(z => (ZONE_TO_SVG[z]||[]).forEach(id => activeIds.add(id))); }
    ALL_SVG_IDS.forEach(id => {
      const el = svgGroups[id];
      if(!el) return;
      if(activeIds.has(id)){
        el.style.opacity = '1';
        el.style.filter  = `drop-shadow(0 0 8px ${color}88)`;
      } else {
        el.style.opacity = '0.15';
        el.style.filter  = 'saturate(0.15) brightness(1.1)';
      }
    });
  }

  function select(idx){
    const p = PILLARS[idx];
    const active = p.zones[0]==='full' ? ALL_ZONES : p.zones;
    currentIdx = idx;

    /* tabs */
    tabs.forEach((t,i) => t.classList.toggle('active', i===idx));

    /* plant */
    applyPlantHighlight(p.zones, p.color);

    /* zone labels */
    zoneLbls.forEach(lbl => {
      const z = lbl.dataset.zone;
      const on = active.includes(z);
      lbl.classList.toggle('lbl-active', on);
      lbl.style.color       = on ? p.color : '';
      lbl.style.borderColor = on ? p.color : '';
      lbl.style.background  = on ? rgba(p.color, 0.09) : '';
    });

    /* show content, hide placeholder */
    piPlaceholder.style.display = 'none';
    piContent.style.display     = 'flex';

    /* info panel */
    piEyebrow.style.color = p.color;
    piNum.textContent     = p.num;
    piName.textContent    = p.name;
    piTagline.textContent = p.tagline;
    piDesc.textContent    = p.desc;

    piProds.innerHTML = '';
    if(p.arriving){
      const b = document.createElement('div');
      b.className = 'node-arriving'; b.textContent = 'Products Arriving Soon';
      piProds.appendChild(b);
    } else if(p.products.length > 0){
      const title = document.createElement('div');
      title.className = 'pi-products-title'; title.textContent = 'Products';
      const grid = document.createElement('div');
      grid.className = 'pi-products-grid';
      p.products.forEach(pr => {
        const card = document.createElement('div');
        card.className = 'pi-product-card';
        card.onclick = () => openModal(pr.id);
        card.innerHTML = `<img src="${pr.img}" alt="${pr.label}"><div class="pi-product-name">${pr.label}</div>`;
        grid.appendChild(card);
      });
      piProds.appendChild(title);
      piProds.appendChild(grid);
    }
  }

  tabs.forEach((t,i) => t.addEventListener('click', () => select(i)));

  /* accordion hover */
  const tabsContainer = section.querySelector('.pillar-tabs');
  tabs.forEach((tab, i) => {
    tab.addEventListener('mouseenter', () => {
      tabs.forEach((t, j) => {
        t.classList.remove('p-hovered','p-near1','p-near2');
        const d = Math.abs(i - j);
        if(d === 0) t.classList.add('p-hovered');
        else if(d === 1) t.classList.add('p-near1');
        else if(d === 2) t.classList.add('p-near2');
      });
    });
  });
  tabsContainer.addEventListener('mouseleave', () => {
    tabs.forEach(t => t.classList.remove('p-hovered','p-near1','p-near2'));
  });

  function onSvgReady(){
    if(loadSvgGroups()){
      if(currentIdx >= 0) applyPlantHighlight(PILLARS[currentIdx].zones, PILLARS[currentIdx].color);
      else clearPlantHighlight(); // no pillar selected — all parts fully visible
    }
  }

  if(plantObj){
    plantObj.addEventListener('load', onSvgReady);
    if(plantObj.contentDocument && plantObj.contentDocument.readyState === 'complete') onSvgReady();
  }

  /* No default selection — plant shows all parts, info shows placeholder */
}

/* ─── INDIA MAP HUB PING ─── */
function initIndiaPing(){
  const section = document.querySelector('.india-map-section');
  if(!section || !('IntersectionObserver' in window)) return;
  const dots = section.querySelectorAll('.hub-dot');
  let pinged = false;
  const io = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting && !pinged){
      pinged = true;
      dots.forEach((d,i)=>setTimeout(()=>d.classList.add('ping'), i*80));
    }
  },{threshold:0.3});
  io.observe(section);
}

/* ─── WHY TRISHUL — iPhone card-zoom scroll animation ─── */
function initWhyScroll(){
  const card = document.querySelector('.why-outer-card');
  if(!card) return;

  const texts  = card.querySelectorAll('.why-text-panel');
  const layers = card.querySelectorAll('.why-image-layer');
  const dots   = card.querySelectorAll('.why-dot');

  const N = texts.length; // 4 slides
  let current = 0;

  // Mobile: simple tab fallback
  if(window.innerWidth <= 768){
    layers.forEach((l,i) => {
      l.style.cssText = '';
      if(i===0) l.classList.add('mob-active');
    });
    texts[0].classList.add('active');
    return;
  }

  // Set first layer fully visible immediately
  layers[0].style.cssText = 'opacity:1; transform:scale(1) translateY(0px); z-index:2;';

  function ease(t){ return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; } // ease in-out

  function onScroll(){
    const rect   = card.getBoundingClientRect();
    const viewH  = window.innerHeight;
    // Pixels scrolled past the top of the scroll container
    const scrolled = Math.max(0, -rect.top);
    // Each step = 1 viewport height (matching the spacer heights)
    const stepH    = viewH;
    const raw      = scrolled / stepH;           // e.g. 1.73 = step 1, 73% through
    const floorIdx = Math.min(N - 1, Math.floor(raw));
    const prog     = (floorIdx === N - 1) ? 0 : Math.min(1, raw - floorIdx); // 0–1

    layers.forEach((layer, i) => {
      if(i < floorIdx){
        // Already passed — snap gone
        layer.style.cssText = 'opacity:0; transform:scale(0.9) translateY(-20px); z-index:1;';
      } else if(i === floorIdx){
        if(i === N - 1){
          // Last slide — always fully visible
          layer.style.cssText = 'opacity:1; transform:scale(1) translateY(0px); z-index:2;';
        } else {
          // Active slide exits as progress grows
          const ep    = ease(Math.max(0, (prog - 0.45) / 0.55));
          const scale = 1 - ep * 0.05;
          const op    = 1 - ep * 0.85;
          const ty    = -ep * 18;
          layer.style.cssText = `opacity:${op.toFixed(3)}; transform:scale(${scale.toFixed(4)}) translateY(${ty.toFixed(1)}px); z-index:2;`;
        }
      } else if(i === floorIdx + 1){
        // Incoming slide zooms in from below
        const ip    = ease(Math.min(1, prog / 0.95));
        const scale = 0.82 + ip * 0.18;
        const op    = ip;
        const ty    = (1 - ip) * 70;
        layer.style.cssText = `opacity:${Math.min(1, op).toFixed(3)}; transform:scale(${scale.toFixed(4)}) translateY(${ty.toFixed(1)}px); z-index:3;`;
      } else {
        // Future — hidden, ready
        layer.style.cssText = 'opacity:0; transform:scale(0.82) translateY(70px); z-index:1;';
      }
    });

    // Snap text at midpoint of transition
    const newIdx = Math.min(N-1, prog > 0.52 ? floorIdx + 1 : floorIdx);
    if(newIdx !== current){
      texts[current].classList.remove('active');
      texts[newIdx].classList.add('active');
      dots.forEach((d,i) => d.classList.toggle('active', i === newIdx));
      current = newIdx;
    }
  }

  // Wire dot buttons
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const targetY = card.getBoundingClientRect().top + window.scrollY + i * window.innerHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  onScroll(); // run on load
}

/* ─── MOBILE NAV OVERLAY CLOSE ON BACKGROUND TAP ─── */
function handleMobileNavClick(e){
  if(e.target === e.currentTarget) closeMobileNav();
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

/* ─── KEY FACTS COUNTER ANIMATION ─── */
function initKeyFactsCounter(){
  const nums = document.querySelectorAll('.keyfact-num[data-target]');
  if(!nums.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1400; // ms
      const start  = performance.now();

      function tick(now){
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        /* ease-out cubic */
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  nums.forEach(n => io.observe(n));
}

window.addEventListener('load',()=>{
  observeReveal();
  initPillarUI();
  initIndiaPing();
  initWhyScroll();
  initKeyFactsCounter();
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
