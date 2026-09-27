const productImages = {
  1:'ima_carossel/ima_cads/826070855_18159291304505078_8157389329216769723_n.jpg',
  2:'ima_carossel/ima_cads/819785127_18158843302505078_2739265618393793876_n.jpg',
  3:'ima_carossel/ima_cads/819802603_18158863942505078_6007571965587448520_n.jpg',
  4:'ima_carossel/ima_cads/821699008_18159026353505078_4285828320881454642_n.jpg',
  5:'ima_carossel/ima_cads/819629610_18158686999505078_7470706220857699550_n.jpg',
  6:'ima_carossel/ima_cads/820085216_18159099526505078_4438278365958234469_n.jpg',
  7:'ima_carossel/ima_cads/811748771_18157228126505078_4810743645151407110_n.jpg',
  8:'ima_carossel/ima_cads/812611975_18157409080505078_3526361720934655983_n.jpg',
  9:'ima_carossel/ima_cads/807727288_18156687832505078_7710117346998048455_n.jpg',
  10:'ima_carossel/ima_cads/817789369_18157886209505078_1551268956726868292_n.jpg',
  11:'ima_carossel/ima_cads/819601592_18158686621505078_9169661780200126993_n.jpg',
  12:'ima_carossel/ima_cads/811711050_18157189672505078_7170944230710205892_n.jpg'
};

const products = [
  {id:1,name:'Corset Branco de Renda',category:'corsets',label:'DESTAQUE',tone:'Branco · renda floral e alças finas',description:'Corset branco com bojo estruturado, renda floral e alças finas.',cardDescription:'Renda floral e recortes estruturados. Consulte tamanhos pelo WhatsApp.',contactOnly:true},
  {id:2,name:'Corset Rosa Coração',category:'corsets',label:'NOVO',tone:'Rosa · decote coração',description:'Corset rosa com decote coração, acabamento estampado em relevo e barra em ponta.',cardDescription:'Decote coração e acabamento delicado. Consulte disponibilidade pelo WhatsApp.',contactOnly:true},
  {id:3,name:'Corset Azul Rendado',category:'corsets',label:'NOVO',tone:'Azul claro · renda floral',description:'Corset azul claro com renda floral, bojo estruturado e transparência nos recortes.',cardDescription:'Renda floral azul com recortes transparentes. Consulte tamanhos pelo WhatsApp.',contactOnly:true},
  {id:4,name:'Corset Marrom Rendado',category:'corsets',label:'NOVO',tone:'Marrom · renda e estrutura',description:'Corset marrom com bojo estruturado, renda delicada e modelagem alongada.',cardDescription:'Tom marrom e renda delicada para compor o look. Consulte disponibilidade pelo WhatsApp.',contactOnly:true},
  {id:5,name:'Calça Jeans Wide Leg',category:'jeans',label:'NOVO',tone:'Jeans azul escuro · perna ampla',description:'Calça jeans azul escuro de modelagem ampla, usada com corset branco rendado na foto.',cardDescription:'Modelagem wide leg em jeans azul. Consulte tamanhos e lavagem pelo WhatsApp.',contactOnly:true},
  {id:6,name:'Corset Preto Rendado',category:'corsets',label:'NOVO',tone:'Preto · bojo estruturado',description:'Corset preto com bojo estruturado, detalhes em renda e modelagem ajustada.',cardDescription:'Preto versátil com acabamento rendado. Consulte tamanhos pelo WhatsApp.',contactOnly:true},
  {id:7,name:'Corset Marrom de Poá',category:'corsets',label:'NOVO',tone:'Marrom · poá branco e tule',description:'Corset marrom com estampa de poá branco, tule transparente e alças finas.',cardDescription:'Poá branco sobre tule marrom. Consulte disponibilidade pelo WhatsApp.',contactOnly:true},
  {id:8,name:'Blusa Branca de Poá',category:'tops',label:'NOVO',tone:'Branco · poá preto e alças largas',description:'Blusa branca de alças largas com estampa de poá preto.',cardDescription:'Estampa clássica de poá com alças largas. Consulte tamanhos pelo WhatsApp.',contactOnly:true},
  {id:9,name:'Blusa Rosa de Poá',category:'tops',label:'NOVO',tone:'Rosa · poá branco e alças largas',description:'Blusa rosa com estampa de poá branco, alças largas e franzido frontal.',cardDescription:'Rosa com poá branco e frente franzida. Consulte disponibilidade pelo WhatsApp.',contactOnly:true},
  {id:10,name:'Corset Cinza de Tule',category:'corsets',label:'NOVO',tone:'Cinza · tule transparente e viés claro',description:'Corset cinza de tule transparente, com bojo estruturado e recortes com viés claro.',cardDescription:'Tule transparente e recortes contrastantes. Consulte tamanhos pelo WhatsApp.',contactOnly:true},
  {id:11,name:'Corset Branco Rendado',category:'corsets',label:'NOVO',tone:'Branco · renda floral e barra delicada',description:'Corset branco rendado com decote reto e acabamento delicado na barra.',cardDescription:'Renda floral branca em modelagem estruturada. Consulte disponibilidade pelo WhatsApp.',contactOnly:true},
  {id:12,name:'Corset Preto de Poá',category:'corsets',label:'NOVO',tone:'Preto · poá branco e tule',description:'Corset preto com bojo de poá branco, corpo em tule transparente e alças finas.',cardDescription:'Poá branco e tule transparente em contraste. Consulte tamanhos pelo WhatsApp.',contactOnly:true}
];

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const safeRead = (k,f)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??f}catch{return f}};

const productIds = new Set(products.map(product=>product.id));
const shopWhatsAppNumber = '5511927188376';
const savedIds = key => {
  const value=safeRead(key,[]);
  return Array.isArray(value) ? [...new Set(value.map(Number).filter(id=>productIds.has(id)))] : [];
};
let cart = savedIds('ameimodassCart');
let favorites = savedIds('ameimodassWishlist');
let activeCategory='all', searchTerm='', sortMode='featured', favoriteMode=false;
let modalReturnFocus=null;

const categoryName = {corsets:'Corsets',tops:'Blusas & tops',jeans:'Jeans'};
const productRevealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        productRevealObserver.unobserve(entry.target);
      }
    }),{threshold:.14,rootMargin:'0px 0px -35px 0px'})
  : null;

function toast(msg){
  const n=$('#toast'); n.textContent=msg; n.classList.add('show');
  clearTimeout(toast.t); toast.t=setTimeout(()=>n.classList.remove('show'),2200);
}
function persist(){
  try{
    localStorage.setItem('ameimodassCart',JSON.stringify(cart));
    localStorage.setItem('ameimodassWishlist',JSON.stringify(favorites));
  }catch{}
}

function filteredProducts(){
  const list = products.filter(p=>{
    const okCat = activeCategory==='all' || activeCategory==='feminino' || p.category===activeCategory;
    const okQ = !searchTerm || `${p.name} ${p.category} ${p.tone}`.toLowerCase().includes(searchTerm.toLowerCase());
    return okCat && okQ && (!favoriteMode || favorites.includes(p.id));
  });
  const categoryOrder = {corsets:0,tops:1,jeans:2};
  return sortMode==='newest' ? list.sort((a,b)=>b.id-a.id) : list.sort((a,b)=>categoryOrder[a.category]-categoryOrder[b.category] || a.id-b.id);
}

function productCard(p,i){
  const fav = favorites.includes(p.id);
  return `<article class="product-card" style="--i:${i}" data-open-product="${p.id}" tabindex="0" aria-label="Ver detalhes de ${p.name}">
    <div class="product-image">
      <img src="${productImages[p.id]}" alt="${p.name}" loading="lazy">
      <span class="product-label"${p.label==='DESTAQUE'?' data-featured':''}>${p.label}</span>
      <button class="favorite-button ${fav?'is-favorite':''}" data-favorite="${p.id}" aria-label="${fav?'Remover dos favoritos':'Adicionar aos favoritos'}" aria-pressed="${fav}">${fav?'?':'?'}</button>
      <div class="product-card-actions">
        <button class="quick-add" data-quick-add="${p.id}">CONSULTAR PEÇA <span>?</span></button>
        <button type="button" class="card-add-cart" data-card-add="${p.id}" aria-label="Adicionar ${p.name} à lista" title="Adicionar à lista">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-title-row"><h3 class="product-title">${p.name}</h3></div>
      <p class="product-meta">${p.tone}</p>
      ${p.cardDescription?`<p class="product-card-description">${p.cardDescription}</p>`:''}
    </div>
  </article>`;
}

function renderProducts(){
  const list = filteredProducts();
  $('#productGrid').innerHTML = list.map(productCard).join('');
  const cards = $$('.product-card', $('#productGrid'));
  if(productRevealObserver) cards.forEach(card=>productRevealObserver.observe(card));
  else cards.forEach(card=>card.classList.add('is-visible'));
  $('#noResults').hidden = list.length !== 0;
  $('#allCount').textContent = products.length;
  $('#favoriteToggle').setAttribute('aria-pressed',String(favoriteMode));
  $$('.filter-chip').forEach(b=>{
    const selected=b.dataset.category===activeCategory;
    b.classList.toggle('is-selected',selected);
    b.setAttribute('aria-pressed',String(selected));
  });
  $$('.nav-category').forEach(l=>l.classList.toggle('is-active',l.dataset.category===activeCategory));
}

function setCategory(cat){
  activeCategory=cat; favoriteMode=false;
  $('#favoriteToggle').classList.remove('is-selected');
  $('#searchInput').value=''; searchTerm='';
  renderProducts(); closeMobile();
}

function toggleFavorite(id){
  const n = Number(id);
  favorites = favorites.includes(n) ? favorites.filter(i=>i!==n) : [...favorites,n];
  $('#favoriteCount').textContent = favorites.length;
  persist(); renderProducts();
  toast(favorites.includes(n)?'Peça salva':'Peça removida');
}

function renderCart(){
  const items=products.filter(p=>cart.includes(p.id));
  $('#bagCount').textContent=items.length;
  $('#drawerCount').textContent=`(${items.length})`;
  $('#cartItems').innerHTML=items.map(p=>`<div class="selection-item"><img src="${productImages[p.id]}" alt=""><div><strong>${p.name}</strong><small>Consulte valor e disponibilidade</small></div><button type="button" data-remove-selection="${p.id}" aria-label="Remover ${p.name}">Remover</button></div>`).join('');
  $('#cartEmpty').classList.toggle('visible',items.length===0);
  $('#cartFooter').classList.toggle('hidden',items.length===0);
}
function addToCart(id){
  const productId=Number(id);
  if(!cart.includes(productId)) cart.push(productId);
  persist(); renderCart(); toast('Peça adicionada à sua lista');
}
function removeFromCart(id){
  cart=cart.filter(productId=>productId!==Number(id));
  persist(); renderCart();
}

function openProduct(id){
  const p = products.find(x=>x.id===Number(id)); if(!p) return;
  modalReturnFocus=document.activeElement;
  $('#productModal').removeAttribute('inert');
  $('#modalContent').innerHTML = `<div class="modal-product">
    <div class="modal-product-image" style="--product-photo:url('${productImages[p.id]}')"><img src="${productImages[p.id]}" alt="${p.name}"></div>
    <div class="modal-product-info">
      <p class="eyebrow">${categoryName[p.category]||'Moda'} · ${p.label}</p>
      <h2>${p.name}</h2>
      <p class="modal-description">${p.description}</p>
      <p class="modal-description">Consulte pelo WhatsApp o valor, as cores, os tamanhos e a disponibilidade.</p>
      <button type="button" class="button button-outline modal-add" data-add-selection="${p.id}">ADICIONAR À LISTA</button>
      <a class="button modal-add modal-add-whatsapp" href="https://wa.me/${shopWhatsAppNumber}?text=${encodeURIComponent('Olá! Tenho interesse em ' + p.name + '. Pode me informar valor, cores e tamanhos disponíveis?')}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.1L3.5 20l1.2-4.3a8.2 8.2 0 1 1 15.5-4Z"/><path d="M8.2 7.8c.2-.4.5-.5.8-.5h.4c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .4-.2 1.1-.6 1.4-.4.4-1 .6-1.6.5-1-.1-2.2-.7-3.5-1.8-1.1-1-1.9-2.2-2.1-3.2-.2-.9.1-1.8.5-2.5Z"/></svg>
        CHAMAR NO WHATSAPP <span>?</span>
      </a>
    </div>
  </div>`;
  $('#productModal').classList.add('open');
  $('#productModal').setAttribute('aria-hidden','false');
  document.body.classList.add('locked');
}
function closeProduct(){
  $('#productModal').classList.remove('open');
  $('#productModal').setAttribute('aria-hidden','true');
  $('#productModal').setAttribute('inert','');
  if(!$('#cartDrawer').classList.contains('open')&&!$('#mobileMenu').classList.contains('open')) document.body.classList.remove('locked');
  if(modalReturnFocus?.isConnected) modalReturnFocus.focus();
  modalReturnFocus=null;
}

function openCart(){ closeMobile(); $('#cartDrawer').removeAttribute('inert'); $('#cartDrawer').classList.add('open'); $('#cartDrawer').setAttribute('aria-hidden','false'); $('#bagToggle').setAttribute('aria-expanded','true'); $('#scrim').classList.add('open'); document.body.classList.add('locked'); }
function closeCart(){ $('#cartDrawer').classList.remove('open'); $('#cartDrawer').setAttribute('aria-hidden','true'); $('#cartDrawer').setAttribute('inert',''); $('#bagToggle').setAttribute('aria-expanded','false'); $('#scrim').classList.remove('open'); if(!$('#mobileMenu').classList.contains('open')&&!$('#productModal').classList.contains('open')) document.body.classList.remove('locked'); }
function openMobile(){ $('#mobileMenu').removeAttribute('inert'); $('#mobileMenu').classList.add('open'); $('#mobileMenu').setAttribute('aria-hidden','false'); $('#menuToggle').setAttribute('aria-expanded','true'); $('#scrim').classList.add('open'); document.body.classList.add('locked'); }
function closeMobile(){ $('#mobileMenu').classList.remove('open'); $('#mobileMenu').setAttribute('aria-hidden','true'); $('#mobileMenu').setAttribute('inert',''); $('#menuToggle').setAttribute('aria-expanded','false'); if(!$('#cartDrawer').classList.contains('open')) $('#scrim').classList.remove('open'); if(!$('#cartDrawer').classList.contains('open')&&!$('#productModal').classList.contains('open')) document.body.classList.remove('locked'); }

document.addEventListener('click', e=>{
  const catLink = e.target.closest('[data-category]');
  if(catLink){ e.preventDefault(); setCategory(catLink.dataset.category); $('#produtos').scrollIntoView({behavior:'smooth'}); return; }
  const fav = e.target.closest('[data-favorite]'); if(fav){ e.stopPropagation(); toggleFavorite(fav.dataset.favorite); return; }
  const cardAdd = e.target.closest('[data-card-add]'); if(cardAdd){ e.stopPropagation(); addToCart(cardAdd.dataset.cardAdd); return; }
  const quick = e.target.closest('[data-quick-add]'); if(quick){ e.stopPropagation(); openProduct(quick.dataset.quickAdd); return; }
  const add = e.target.closest('[data-add-selection]'); if(add){ e.stopPropagation(); addToCart(add.dataset.addSelection); return; }
  const remove = e.target.closest('[data-remove-selection]'); if(remove){ removeFromCart(remove.dataset.removeSelection); return; }
  const card = e.target.closest('[data-open-product]'); if(card){ openProduct(card.dataset.openProduct); return; }
  if(e.target.closest('[data-close-modal]')) closeProduct();
});

$('#sortSelect').addEventListener('change', e=>{ sortMode=e.target.value; renderProducts(); });
$('#searchToggle').addEventListener('click', ()=>{ const open=$('#searchPanel').classList.toggle('open'); $('#searchToggle').setAttribute('aria-expanded',String(open)); if(open) $('#searchInput').focus(); });
$('#searchClose').addEventListener('click', ()=>{ $('#searchPanel').classList.remove('open'); $('#searchToggle').setAttribute('aria-expanded','false'); $('#searchInput').value=''; searchTerm=''; renderProducts(); $('#searchToggle').focus(); });
$('#searchInput').addEventListener('input', e=>{ searchTerm=e.target.value.trim(); favoriteMode=false; renderProducts(); });
$('#favoriteToggle').addEventListener('click', ()=>{
  if(!favorites.length){ toast('Toque no coração de uma peça'); return; }
  favoriteMode=!favoriteMode; activeCategory='all';
  $('#favoriteToggle').classList.toggle('is-selected',favoriteMode);
  renderProducts(); $('#produtos').scrollIntoView({behavior:'smooth'});
});
$('#bagToggle').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#scrim').addEventListener('click', ()=>{ closeCart(); closeMobile(); });
$('#menuToggle').addEventListener('click', openMobile);
$('#mobileClose').addEventListener('click', closeMobile);
$('#mobileMenu').addEventListener('click', e=>{ if(e.target.closest('a:not([data-category])')) closeMobile(); });
$('#mobileFavorites').addEventListener('click', ()=>{
  closeMobile();
  if(!favorites.length){ toast('Toque no coração de uma peça para salvá-la'); return; }
  activeCategory='all'; favoriteMode=true; $('#favoriteToggle').classList.add('is-selected');
  renderProducts(); $('#produtos').scrollIntoView({behavior:'smooth'});
});
$('#continueShopping').addEventListener('click', closeCart);
$('#showAll').addEventListener('click', ()=>setCategory('all'));
document.addEventListener('click', e=>{
  if(!e.target.closest('#searchPanel')&&!e.target.closest('#searchToggle')){
    $('#searchPanel').classList.remove('open');
    $('#searchToggle').setAttribute('aria-expanded','false');
  }
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeCart(); closeMobile(); closeProduct(); $('#searchPanel').classList.remove('open'); $('#searchToggle').setAttribute('aria-expanded','false'); }});
document.addEventListener('keydown', e=>{
  const card=e.target.closest('[data-open-product]');
  if(!card || e.target!==card || !['Enter',' '].includes(e.key)) return;
  e.preventDefault(); openProduct(card.dataset.openProduct);
});

/* ============ CARROSSEL DO HERO ============ */
const heroSlidesData = [
  { num:'01', text:'Corset nude de renda' },
  { num:'02', text:'Blusa canelada marrom' },
  { num:'03', text:'Blusa branca de poá' }
];

function initHeroCarousel(){
  const carousel = $('#heroCarousel');
  const photo = $('#heroPhoto');
  const wipe = $('#heroWipe');
  const glowFollow = $('#heroGlowFollow');
  const badgeRing = $('#heroBadgeRing');
  if(!carousel) return;
  const slides = $$('.hero-slide', carousel);
  const timeline = $$('.hero-tl');
  const captionNum = $('#heroCounterNum');
  const captionText = $('#heroCaptionText');
  if(!slides.length) return;

  const DURATION = 4500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RING_CIRCUMFERENCE = 2 * Math.PI * 17;
  let current = 0;
  let timer = null;

  function updateBadgeRing(){
    if(!badgeRing) return;
    badgeRing.style.strokeDasharray = RING_CIRCUMFERENCE;
    badgeRing.style.strokeDashoffset = RING_CIRCUMFERENCE;
    void badgeRing.getBoundingClientRect();
    badgeRing.style.transition = 'stroke-dashoffset 4.5s linear';
    badgeRing.style.strokeDashoffset = 0;
  }

  function rollNumber(newVal){
    if(!captionNum) return;
    captionNum.classList.add('rolling');
    setTimeout(()=>{
      captionNum.textContent = newVal;
      captionNum.classList.remove('rolling');
      captionNum.style.transition = 'none';
      captionNum.style.transform = 'translateY(120%)';
      captionNum.style.opacity = '0';
      void captionNum.offsetWidth;
      captionNum.style.transition = '';
      captionNum.style.transform = '';
      captionNum.style.opacity = '';
    }, 320);
  }

  function render(){
    slides.forEach((s, i)=>{
      const active=i===current;
      const next=i===(current+1)%slides.length;
      const prev=i===(current-1+slides.length)%slides.length;
      s.classList.toggle('is-active',active);
      s.classList.toggle('is-next',!active&&next);
      s.classList.toggle('is-prev',!active&&prev);
      s.setAttribute('aria-hidden',String(!active));
    });
    timeline.forEach((t, i)=>{
      t.classList.remove('is-active','is-past');
      if(i<current) t.classList.add('is-past');
      if(i===current){ void t.offsetWidth; t.classList.add('is-active'); }
      t.setAttribute('aria-current',String(i===current));
    });
    const data = heroSlidesData[current] || {};
    const num = data.num || String(current+1).padStart(2,'0');
    if(captionNum) rollNumber(num);
    if(captionText) captionText.textContent = data.text || '';
    updateBadgeRing();
  }

  function fireWipe(){
    if(!wipe) return;
    wipe.classList.remove('is-running');
    void wipe.offsetWidth;
    wipe.classList.add('is-running');
  }

  function goTo(i){
    const prev = current;
    current = (i + slides.length) % slides.length;
    if(prev !== current) fireWipe();
    render();
  }
  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }
  function start(){ stop(); if(!reduceMotion) timer = setInterval(next, DURATION); }
  function stop(){ if(timer) clearInterval(timer); timer = null; }

  $('.hero-arrow-next')?.addEventListener('click', ()=>{ next(); start(); });
  $('.hero-arrow-prev')?.addEventListener('click', ()=>{ prev(); start(); });
  timeline.forEach((t, i)=>t.addEventListener('click', ()=>{ goTo(i); start(); }));

  let sx=0, sy=0;
  carousel.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; stop(); }, {passive:true});
  carousel.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)){ dx < 0 ? next() : prev(); }
    start();
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', ()=>{ document.hidden ? stop() : start(); });

  if(photo && window.matchMedia('(hover:hover)').matches){
    photo.addEventListener('mousemove', e=>{
      const rect = photo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width  - .5);
      const ny = (y / rect.height - .5);
      const img = photo.querySelector('.hero-slide.is-active img');
      if(img){
        img.style.setProperty('--mx', (-nx * 4).toFixed(2) + 'px');
        img.style.setProperty('--my', (-ny * 4).toFixed(2) + 'px');
      }
      if(glowFollow){
        glowFollow.style.setProperty('--gx', x + 'px');
        glowFollow.style.setProperty('--gy', y + 'px');
      }
    });
    photo.addEventListener('mouseleave', ()=>{
      const img = photo.querySelector('.hero-slide.is-active img');
      if(img){
        img.style.setProperty('--mx','0px');
        img.style.setProperty('--my','0px');
      }
    });
  }

  render();
  start();
}

function initScrollReveal(){
  if(!('IntersectionObserver' in window)){ $$('.reveal').forEach(el=>el.classList.add('in-view')); return; }
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15,rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach(el=>observer.observe(el));
}

function initHeaderScroll(){
  const header = $('#top');
  const onScroll = ()=> header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
}

$('#favoriteCount').textContent = favorites.length;
renderCart();
renderProducts();
initHeroCarousel();
initScrollReveal();
initHeaderScroll();
