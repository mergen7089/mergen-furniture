/* =============================================================================
   MERGEN — dist/js/main.js   ←  تنها فایل JavaScript سایت (به‌جز jQuery / Owl در js/vendor)
   هر صفحه با <html data-page="..."> مشخص می‌شود و فقط کد خودش اجرا می‌شود.

   فهرست (جست‌وجو کن):
     PART 0  BOOT — تم، لینک‌های data-href، داده‌ی محصولات
     PART 1  HOME (index.html): S01 HEADER · S01 HERO · S02 PHILOSOPHY · S03 LAYERED SCROLL · S04 SLIDER 01 · S05 HORIZONTAL LAYERED · S06 SLIDER 02 / INTERIOR DETAILS · S07 SOFASPACE · S08 ORBIT SLIDER · S09 CONTACT / SOCIALS · S10 COLLECTION SHOWCASE · S11 SIGNATURE V3 · S12 SHOPPING GUIDE · S13 MERGEN EXPERIENCE · S14 SLIDER 03 / CUSTOM PRODUCTS · S15 MATERIAL LIBRARY / OFF-CANVAS / SUPPORT · S15B GROWING ROOM · S16 ABOUT / BRAND STORY · S16B CONSOLE SLIDER · S17 FAQ · S18 FOOTER
     PART 2  بقیه صفحه‌ها: footer-links · login · register · preview · wishlist · cart · compare · collection · product · baby-collection
     PART 3  START
   ============================================================================= */

/* ============================================================================
   PART 0 · BOOT
   ============================================================================ */
const PAGE = document.documentElement.dataset.page || 'home';
const PAGES = {};

/* تم: همین الان (قبل از رندر) اجرا می‌شود تا فلش رنگی نداشته باشیم. پیش‌فرض سایت = تاریک */
try { document.documentElement.classList.toggle('dark', localStorage.getItem('mergen-theme') !== 'light'); } catch (e) {}

/* دکمه‌ها / المنت‌هایی که data-href دارند (آیکن علاقه‌مندی، ورود، سبد خرید) به آن صفحه می‌روند */
document.addEventListener('click', e => {
  const el = e.target.closest && e.target.closest('[data-href]');
  if (el) { e.preventDefault(); if (el.hasAttribute('data-blank')) window.open(el.dataset.href, '_blank', 'noopener'); else location.href = el.dataset.href; }
  const call = e.target.closest && e.target.closest('[data-call]');
  if (call) { e.preventDefault(); mgConfirmCall(call.dataset.call); }
  const p = e.target.closest && e.target.closest('a[data-prevent]');
  if (p) e.preventDefault();
});
/* «مطمئن هستید؟» قبل از تماس تلفنی */
function mgConfirmCall(num) {
  let box = document.querySelector('.mg-callbox');
  if (!box) {
    box = document.createElement('div'); box.className = 'mg-callbox';
    box.innerHTML = '<div role="dialog" aria-modal="true"><h4>تماس تلفنی</h4><p>می‌خواهید با شماره <bdi></bdi> تماس بگیرید؟</p><div class="row"><button class="no" type="button">انصراف</button><button class="yes" type="button">بله، تماس بگیر</button></div></div>';
    document.body.appendChild(box);
    box.addEventListener('click', ev => { if (ev.target === box || ev.target.classList.contains('no')) box.classList.remove('open'); });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') box.classList.remove('open'); });
    box.querySelector('.yes').addEventListener('click', () => { box.classList.remove('open'); location.href = 'tel:' + box.dataset.num; });
  }
  box.dataset.num = num; box.querySelector('bdi').textContent = num;
  requestAnimationFrame(() => box.classList.add('open'));
}
document.addEventListener('submit', e => { if (e.target.matches('[data-prevent]')) e.preventDefault(); });

/* داده‌ی محصولات (قبلاً js/products.js) — برای collection / product / cart */
const products = {
  "aura-console": {
    id: "aura-console",
    name: "میز کنسول آورا",
    englishName: "AURA CONSOLE",
    category: "میز کنسول",
    collection: "Living Collection",

    description:
      "میز کنسول آورا با ترکیب خطوط مینیمال، تناسبات ظریف و جزئیات دقیق طراحی شده است؛ محصولی که می‌تواند به‌عنوان نقطه کانونی ورودی، نشیمن یا فضای پذیرایی استفاده شود.",

    images: [
      "assets/products/aura-01.webp",
      "assets/products/aura-02.webp",
      "assets/products/aura-03.webp",
      "assets/products/aura-04.webp",
      "assets/products/aura-05.webp"
    ],

    colors: [
      {
        name: "سبز تیره",
        value: "#17251F"
      },
      {
        name: "مشکی",
        value: "#111111"
      },
      {
        name: "گردویی",
        value: "#5A4030"
      }
    ],

    dimensions: {
      width: "180 cm",
      depth: "42 cm",
      height: "78 cm"
    },

    materials: [
      "MDF",
      "روکش چوب طبیعی",
      "رنگ پلی‌اورتان"
    ],

    features: [
      "طراحی اختصاصی مرگن",
      "ساخت سفارشی",
      "قابلیت انتخاب رنگ",
      "اجرای دقیق جزئیات CNC"
    ],

    related: [
      "aura-coffee-table",
      "nora-console",
      "line-side-table"
    ]
  }
};

/* ============================================================================
   PART 1 · HOME (index.html) — بخش‌ها به ترتیب صفحه
   ============================================================================ */
PAGES.home = function () {
/* ==========================================================
   SECTION 01 HEADER — دارک‌مود، هدر استیکی، مگامنو، ناوبری بخش‌ها، بازگشت به بالا
   ========================================================== */
try {
/* کلاس dark همین الان توسط اسکریپت داخل <head> تنظیم شده (برای جلوگیری از فلش رنگی).
       پیش‌فرض سایت تم تاریکه؛ فقط وقتی کاربر قبلاً «روشن» رو انتخاب کرده، تاریک نیست. */
    const html=document.documentElement;
    const themeToggles=[document.getElementById('themeToggle'),
    document.getElementById('themeToggleSticky'),document.getElementById('themeToggleSide')].filter(Boolean);
     themeToggles.forEach(btn=>btn.addEventListener('click',()=>{html.classList.toggle('dark');
     try{localStorage.setItem('mergen-theme',html.classList.contains('dark')?'dark':'light');}catch(e){}}));
    const sticky=document.getElementById('sticky');
    window.addEventListener('scroll',()=>{sticky.classList.toggle('show',scrollY>150);
    document.getElementById('backTop').classList.toggle('show',scrollY>650)},{passive:true});
    const mega=document.getElementById('megaMenu'),
    overlay=document.getElementById('megaOverlay'),
    megaButtons=[...document.querySelectorAll('.mega-nav')];
    const megaData={
    products:['MERGEN INTERIOR / COLLECTION','طراحی برای<br>زندگی متفاوت',
    ['مبلمان','مبل راحتی','مبل مدرن','صندلی','میز جلو مبلی'],
    ['اتاق خواب','سرویس خواب','تخت و دراور','کمد دیواری','کلوزت روم'],
    ['دکوراسیون','کابینت','TV Wall','دکور فروشگاه','طراحی داخلی']]
    ,living:['COLLECTION / 01','Living<br>Collection',
    ['مجموعه‌ها','مبل مدرن','مبل مینیمال','مبل راحتی'],
    ['تکمیل فضا','میز جلو مبلی','کنسول','میز عسلی'],
    ['خدمات','طراحی سفارشی','اجرای پروژه','مشاوره']]
    ,bedroom:['COLLECTION / 02','Bedroom<br>Collection',
    ['محصولات','تخت خواب','سرویس کامل','میز آرایش'],
    ['فضا','کمد دیواری','کلوزت روم','دراور'],
    ['سفارش','طراحی اختصاصی','مشاوره','اندازه‌گیری']]
    ,tables:['COLLECTION / 03','Tables<br>& Chairs',
    ['میزها','میز ناهارخوری','میز مدیریت','میز کامپیوتر'],
    ['میزهای کوچک','جلو مبلی','میز عسلی','کنسول'],
    ['صندلی','صندلی ناهارخوری','صندلی اداری','صندلی سفارشی']]
    ,interior:['INTERIOR DESIGN','Architecture<br>of Living',
    ['فضای داخلی','کابینت','TV Wall','دکور فروشگاه'],
    ['چوب و کف','درب چوبی','پارکت','قرنیز و روکوب'],
    ['پروژه','طراحی داخلی','اجرای کامل','پروژه تجاری']]
    };function renderMega(key){const d=megaData[key]||megaData.products;document.getElementById('megaKicker').innerHTML=d[0];
    document.getElementById('megaTitle').innerHTML=d[1];
    ['megaCol1','megaCol2','megaCol3','megaCol4'].forEach((id,n)=>{const col=document.getElementById(id).parentElement;if(!d[n+2]){col.style.display='none';return}col.style.display='';document.getElementById(id+'Title').textContent=d[n+2][0];
    document.getElementById(id).innerHTML=d[n+2].slice(1).map(x=>`<a href="#${key==='bedroom'?'layers':key==='interior'?'slider02':'slider01'}">${x}</a>`).join('')})}
    /* ---- مگامنو: هاور روان (تأخیر کوتاه برای جلوگیری از پرش) + تعویض نرم محتوا ---- */
    let megaTimer=null,megaKey=null;
    const setActive=k=>megaButtons.forEach(b=>b.classList.toggle('active',b.dataset.mega===k));
    function openMega(key){
        clearTimeout(megaTimer);
        if(mega.classList.contains('open')){
            if(megaKey===key)return;
            mega.classList.add('swapping');                       /* ستون‌ها نرم محو می‌شوند */
            setTimeout(()=>{renderMega(key);mega.classList.remove('swapping')},150);
        }else{
            renderMega(key);mega.classList.add('open');overlay.classList.add('open');
        }
        megaKey=key;setActive(key);
    }
    function closeMega(){
        clearTimeout(megaTimer);mega.classList.remove('open','swapping');overlay.classList.remove('open');
        megaKey=null;setActive(null);
    }
    const scheduleOpen=key=>{clearTimeout(megaTimer);megaTimer=setTimeout(()=>openMega(key),mega.classList.contains('open')?0:80)};
    const scheduleClose=()=>{clearTimeout(megaTimer);megaTimer=setTimeout(closeMega,200)};
    megaButtons.forEach(b=>{
        b.addEventListener('mouseenter',()=>scheduleOpen(b.dataset.mega));
        b.addEventListener('mouseleave',scheduleClose);
        b.addEventListener('click',e=>{e.stopPropagation();openMega(b.dataset.mega)});
    });
    mega.addEventListener('mouseenter',()=>clearTimeout(megaTimer));
    mega.addEventListener('mouseleave',scheduleClose);
    overlay.addEventListener('click',closeMega);

    /* ---- منوی کناری (دکمه‌ی همبرگری سه‌خطی هدر؛ در موبایل هم دکمه‌ی mobileToggle) ---- */
    const side=document.getElementById('sideMenu'),sideOv=document.getElementById('sideOverlay');
    function openSide(){closeMega();side.classList.add('open');sideOv.classList.add('open');side.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden'}
    function closeSide(){side.classList.remove('open');sideOv.classList.remove('open');side.setAttribute('aria-hidden','true');document.documentElement.style.overflow=''}
    const toggleSide=()=>side.classList.contains('open')?closeSide():openSide();
    document.getElementById('menuButton').addEventListener('click',toggleSide);
    document.getElementById('mobileToggle').addEventListener('click',toggleSide);
    document.getElementById('sideClose').addEventListener('click',closeSide);
    sideOv.addEventListener('click',closeSide);
    side.querySelectorAll('nav a, .side-cta').forEach(a=>a.addEventListener('click',closeSide));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMega();closeSide()}});

    /* ---- دکمه‌ی زبان FA / EN (فعلاً فقط وضعیت را نگه می‌دارد؛ ترجمه بعداً اضافه می‌شود) ---- */
    const langBtns=[...document.querySelectorAll('.lang-toggle')];
    let lang='fa';try{lang=localStorage.getItem('mergen-lang')||'fa'}catch(e){}
    const applyLang=l=>{html.dataset.lang=l;langBtns.forEach(b=>{const t=b.querySelector('.lang-label');if(t)t.textContent=l==='fa'?'EN':'FA';b.title=l==='fa'?'English':'فارسی'})};
    applyLang(lang);
    langBtns.forEach(b=>b.addEventListener('click',()=>{lang=lang==='fa'?'en':'fa';try{localStorage.setItem('mergen-lang',lang)}catch(e){};applyLang(lang)}));

    /* بازگشت به بالا (backTop) */
    document.getElementById('backTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});

    /* هایلایت لینک فعال در section-nav هنگام اسکرول */
    const links=[...document.querySelectorAll('.section-nav a')],targets=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55%'});targets.forEach(x=>io.observe(x));
} catch (e) { console.error('MERGEN JS [SECTION 01 HEADER — دارک‌مود، هدر استیکی، مگامنو، ناوبری بخش‌ها، بازگشت به بالا]:', e); }

/* ==========================================================
   SECTION 01 HEADER — جستجو: پنل از چپ + «شوروم تاریک»
   نور مثل چراغ‌قوه حرکت می‌کند و مبلمان را فقط زیر نور نشان می‌دهد؛ با تایپ، مبلمان مربوط روشن می‌شود؛
   روی آباژور کلیک کنید تا کل شوروم روشن شود.
   ========================================================== */
try {
(function () {
  const IDX = [
    { t: 'مبلمان', k: 'sofa couch furniture مبل کاناپه راحتی', u: '#slider01', s: 'SOFA' },
    { t: 'سرویس خواب', k: 'bedroom bed تخت کمد دراور', u: '#layers', s: 'BEDROOM' },
    { t: 'سرویس ناهارخوری', k: 'dining table میز ناهارخوری صندلی', u: '#mergen-v3', s: 'DINING' },
    { t: 'انواع میز', k: 'tables desk میز عسلی میز کار جلو مبلی', u: '#slider02', s: 'TABLES' },
    { t: 'کنسول و استند', k: 'console stand جاکفشی کنسول', u: '#collection', s: 'COLLECTION' },
    { t: 'کنسول‌های مرگن', k: 'console entryway کنسول ورودی', u: '#console-slider', s: 'CONSOLES' },
    { t: 'سوفاسپیس', k: 'sofaspace sofa space مبلمان و فضا', u: '#material-space', s: 'SOFASPACE' },
    { t: 'کتابخانه متریال', k: 'material library چوب رنگ پارچه کالیته وکیوم', u: '#materialsOpen', s: 'MATERIALS' },
    { t: 'اتاق کودک', k: 'baby kids نوزاد کودک', u: 'baby-collection.html', s: 'BABY' },
    { t: 'سوالات متداول', k: 'faq پرسش سوال', u: '#faq', s: 'FAQ' },
    { t: 'تماس با ما', k: 'contact تلفن شماره ارتباط', u: '#contact', s: 'CONTACT' },
    { t: 'درباره ما', k: 'about brand story برند', u: 'footer-links.html#about', s: 'ABOUT' },
    { t: 'شرایط استفاده', k: 'terms قوانین', u: 'footer-links.html#terms', s: 'TERMS' },
    { t: 'مرجوعی', k: 'returns بازگشت کالا', u: 'footer-links.html#returns', s: 'RETURNS' },
    { t: 'ارسال و تحویل', k: 'shipping delivery حمل', u: 'footer-links.html#shipping', s: 'SHIPPING' },
    { t: 'حریم خصوصی', k: 'privacy', u: 'footer-links.html#privacy', s: 'PRIVACY' },
    { t: 'رهگیری سفارش', k: 'order tracking پیگیری', u: 'footer-links.html#ordertracking', s: 'TRACKING' },
    { t: 'علاقه‌مندی‌ها', k: 'wishlist favorites', u: 'wishlist.html', s: 'WISHLIST' },
    { t: 'سبد خرید', k: 'cart basket', u: 'cart.html', s: 'CART' },
    { t: 'مقایسه محصولات', k: 'compare', u: 'compare.html', s: 'COMPARE' },
    { t: 'ورود / ثبت‌نام', k: 'login register حساب', u: 'login.html', s: 'ACCOUNT' }
  ].filter(x => !x.u.startsWith('#') || document.querySelector(x.u));
  const norm = s => (s || '').toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\s]+/g, ' ').trim();

  /* مبلمان شوروم (خطی): مختصات داخل viewBox 520×300، کف = y 248 */
  const ITEMS = [
    { id: 'sofa', s: 'SOFA', u: '#slider01', k: 'sofa couch furniture مبل مبلمان کاناپه راحتی', oy: -24, c: [100, 200], hit: [14, 140, 172, 112], lx: 100,
      d: '<g transform="translate(20,150)"><rect x="14" y="8" width="132" height="46" rx="10"/><rect x="0" y="48" width="160" height="34" rx="8"/><rect x="-10" y="26" width="22" height="56" rx="9"/><rect x="148" y="26" width="22" height="56" rx="9"/><path d="M10 82v14M150 82v14M14 30h132" stroke-opacity=".5"/></g>' },
    { id: 'table', s: 'TABLES', u: '#slider02', k: 'tables table desk میز عسلی میز کار انواع', oy: -24, c: [226, 220], hit: [198, 180, 56, 72], lx: 226,
      d: '<g transform="translate(208,0)"><ellipse cx="18" cy="192" rx="26" ry="7"/><path d="M18 199v49M4 248h28"/></g>' },
    { id: 'console', s: 'CONSOLE', u: '#console-slider', k: 'console stand entryway کنسول جاکفشی استند ورودی', oy: -24, c: [302, 208], hit: [244, 160, 116, 92], lx: 302,
      d: '<g transform="translate(250,168)"><rect x="0" y="0" width="104" height="9" rx="2"/><rect x="6" y="9" width="92" height="44" rx="3"/><path d="M6 31h92M52 9v44"/><path d="M42 20h6M56 20h6M42 42h6M56 42h6"/><path d="M12 53v27M92 53v27"/></g>' },
    { id: 'dining', s: 'DINING', u: '#mergen-v3', k: 'dining table chair ناهارخوری میز ناهارخوری صندلی', oy: -24, c: [430, 218], hit: [354, 170, 160, 82], lx: 430,
      d: '<g transform="translate(380,188)"><rect x="0" y="0" width="100" height="8" rx="2"/><path d="M10 8v52M90 8v52"/><path d="M-20 14v46M-20 40h20M0 40v20"/><path d="M120 14v46M120 40h-20M100 40v20"/></g>' },
    { id: 'crib', s: 'KIDS', u: 'baby-collection.html', k: 'baby crib kids نوزاد کودک اتاق کودک تخت کودک', oy: 166, c: [74, 205], hit: [14, 150, 120, 100], lx: 74,
      d: '<g transform="translate(24,168)"><path d="M0 12h100M0 -14v94M100 -14v94M14 12v50M30 12v50M46 12v50M62 12v50M78 12v50M94 12v50M0 62h100"/></g>' },
    { id: 'bed', s: 'BEDROOM', u: '#layers', k: 'bed bedroom سرویس خواب تخت خواب', oy: 166, c: [215, 200], hit: [142, 148, 148, 104], lx: 215,
      d: '<g transform="translate(150,150)"><rect x="0" y="0" width="130" height="44" rx="6"/><rect x="-6" y="44" width="142" height="30" rx="6"/><rect x="14" y="24" width="40" height="16" rx="6"/><rect x="76" y="24" width="40" height="16" rx="6"/><path d="M0 74v24M130 74v24"/></g>' },
    { id: 'wardrobe', s: 'WARDROBE', u: '#layers', k: 'wardrobe closet cabinet کمد کمد لباس دراور', oy: 166, c: [344, 190], hit: [298, 114, 92, 140], lx: 344,
      d: '<g transform="translate(306,120)"><rect x="0" y="0" width="76" height="120" rx="3"/><path d="M38 0v120M30 56v10M46 56v10M6 120v8M70 120v8"/></g>' },
    { id: 'desk', s: 'DESK', u: '#slider02', k: 'desk office work table میز کار میز تحریر', oy: 166, c: [450, 216], hit: [372, 170, 134, 82], lx: 450,
      d: '<g transform="translate(398,184)"><rect x="0" y="0" width="104" height="8" rx="2"/><rect x="64" y="8" width="38" height="46" rx="2"/><path d="M64 28h38M8 8v56M-24 20v44M-24 44h18M-6 44v20"/></g>' }
  ];
  ITEMS.forEach(i => { i.c = [i.c[0], i.c[1] + i.oy]; i.hit = [i.hit[0], i.hit[1] + i.oy, i.hit[2], i.hit[3]]; });
  const DECO = '<g transform="translate(0,-24)"><rect x="46" y="38" width="46" height="62" rx="2"/><rect x="104" y="50" width="36" height="46" rx="2"/></g><path d="M0 224H520M0 414H520"/>';
  const items = () => ITEMS.map(i => `<g class="item" data-id="${i.id}" transform="translate(0,${i.oy})">${i.d}<text class="lbl" x="${i.lx}" y="268">${i.s}</text></g>`).join('');

  const box = document.createElement('div');
  box.className = 'mg-search'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = `<div class="mgs-scrim"></div><aside class="mgs-panel" role="dialog" aria-label="جستجو">
    <button class="mgs-close" type="button" aria-label="بستن">×</button>
    <div class="mgs-top"><span class="mgs-kicker">MERGEN / SEARCH</span>
      <label class="mgs-field"><i class="fa-solid fa-magnifying-glass"></i><input type="search" placeholder="دنبال چی می‌گردی؟" autocomplete="off"><kbd>ESC</kbd></label>
      <div class="mgs-chips">${['مبلمان', 'سرویس خواب', 'میز', 'کنسول', 'متریال', ].map(c => `<button type="button">${c}</button>`).join('')}</div>
      <ul class="mgs-results"></ul></div>
    <div class="mgs-play"><p class="mgs-hint">نور را حرکت بده تا شوروم را کشف کنی</p>
      <svg viewBox="0 0 520 450" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="mgsBeam"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
          <mask id="mgsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="450"><rect width="520" height="450" fill="#000"/><circle class="beam" cx="260" cy="215" r="105" fill="url(#mgsBeam)"/></mask>
        </defs>
        <g class="scene dim">${DECO}${items()}</g>
        <g mask="url(#mgsMask)"><g class="scene lit">${DECO}${items()}</g></g>
        <g class="hits">${ITEMS.map(i => `<rect data-id="${i.id}" x="${i.hit[0]}" y="${i.hit[1]}" width="${i.hit[2]}" height="${i.hit[3]}"/>`).join('')}</g>
      </svg></div></aside>`;
  document.body.appendChild(box);
  const input = box.querySelector('input'), list = box.querySelector('.mgs-results'), play = box.querySelector('.mgs-play'), svg = play.querySelector('svg'), beam = svg.querySelector('.beam');
  const litItems = [...svg.querySelectorAll('.lit .item')], dimItems = [...svg.querySelectorAll('.dim .item')];
  const byId = id => ITEMS.find(i => i.id === id);

  function go(u) {
    close();
    if (u.startsWith('#')) setTimeout(() => { const el = document.querySelector(u); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 350);
    else location.href = u;
  }

  /* ---------- نتایج + روشن‌شدن مبلمان مربوط ---------- */
  let qHit = null;
  function search() {
    const q = norm(input.value).split(' ').filter(Boolean);
    litItems.forEach(g => g.classList.remove('hit')); qHit = null;
    if (!q.length) { list.innerHTML = ''; return; }
    const res = IDX.filter(x => { const h = norm(x.t + ' ' + x.k + ' ' + x.s); return q.every(w => h.includes(w)); }).slice(0, 6);
    list.innerHTML = res.length ? res.map(x => `<li><a href="${x.u}" data-u="${x.u}">${x.t}<small>${x.s}</small></a></li>`).join('') : '<li class="empty">نتیجه‌ای پیدا نشد؛ شوروم را بگرد، شاید چیزی پیدا کنی.</li>';
    ITEMS.forEach((it, n) => { if (q.every(w => norm(it.k).includes(w))) { litItems[n].classList.add('hit'); qHit = qHit || it.c; } });
    if (qHit) { tx = qHit[0]; ty = qHit[1]; tr = 120; idle = performance.now(); }
  }
  list.addEventListener('click', e => { const a = e.target.closest('a[data-u]'); if (a) { e.preventDefault(); go(a.dataset.u); } });
  box.querySelectorAll('.mgs-chips button').forEach(b => b.addEventListener('click', () => { input.value = b.textContent; search(); input.focus(); }));
  input.addEventListener('input', search);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = list.querySelector('a'); if (a) a.click(); } });

  /* ---------- نور ---------- */
  let bx = 260, by = 215, br = 105, tx = 260, ty = 215, tr = 105, hot = null, idle = 0, raf = 0;
  const reduce = matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function loop(t) {
    if (!hot && !qHit && !reduce && t - idle > 2200) { tx = 260 + 190 * Math.sin(t / 2800); ty = 215 + 150 * Math.sin(t / 3400); tr = 105; }
    bx += (tx - bx) * .07; by += (ty - by) * .07; br += (tr - br) * .06;
    beam.setAttribute('cx', bx); beam.setAttribute('cy', by); beam.setAttribute('r', br);
    ITEMS.forEach((it, n) => { const near = Math.hypot(bx - it.c[0], by - it.c[1]) < br * .8; litItems[n].classList.toggle('near', near); });
    raf = requestAnimationFrame(loop);
  }
  const pt = e => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const m = svg.getScreenCTM(); return m ? p.matrixTransform(m.inverse()) : { x: 260, y: 215 }; };
  svg.addEventListener('pointermove', e => { if (hot) return; const p = pt(e); tx = p.x; ty = p.y; tr = 105; idle = performance.now(); });
  svg.addEventListener('pointerover', e => { const id = e.target.dataset && e.target.dataset.id; if (id) { hot = byId(id); tx = hot.c[0]; ty = hot.c[1]; tr = 125; litItems.forEach((g, n) => g.classList.toggle('hit', ITEMS[n] === hot)); } });
  svg.addEventListener('pointerout', e => { if (e.target.dataset && e.target.dataset.id) { hot = null; search(); } });
  svg.addEventListener('click', e => {
    const id = e.target.dataset && e.target.dataset.id; if (id) go(byId(id).u);
  });

  /* ---------- باز و بسته شدن ---------- */
  function open() {
    box.classList.add('open'); box.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden';
    idle = performance.now(); if (!raf) raf = requestAnimationFrame(loop);
    setTimeout(() => input.focus(), 420);
  }
  function close() { box.classList.remove('open'); box.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; setTimeout(() => { if (!box.classList.contains('open')) { cancelAnimationFrame(raf); raf = 0; } }, 900); }
  document.addEventListener('click', e => { if (e.target.closest('[data-search]')) { e.preventDefault(); open(); } });
  box.querySelector('.mgs-scrim').addEventListener('click', close); box.querySelector('.mgs-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
})();
} catch (e) { console.error('MERGEN JS [SECTION 01 HEADER — SEARCH]:', e); }

/* ==========================================================
   SECTION 01 HERO — اسلایدر اصلی
   ========================================================== */
try {
$(function(){const $hero=$('.mergen-hero'),slides=$('.mergen-slide').toArray(),$title=$('.hero-title'),$kicker=$('.hero-kicker'),$desc=$('.hero-desc'),$current=$('#slide-current'),$progress=$('#progress'),$thumbs=$('#thumbs'),duration=7000;$('#slide-total').text(String(slides.length).padStart(2,'0'));slides.forEach((s,i)=>{const bg=s.querySelector('.slide-bg').style.backgroundImage.slice(5,-2);$thumbs.append(`<button class="hero-thumb ${i===0?'active':''}" data-index="${i}"><img src="${bg}" alt=""><div class="text-center"><div class="hero-thumb-num">0${i+1}</div><div class="hero-thumb-title">${s.dataset.title}</div><div class="hero-thumb-desc">${s.dataset.desc}</div></div></button>`)});function ui(i){const s=slides[i];$current.text(String(i+1).padStart(2,'0'));$progress.css({transition:'none',width:'0%'});requestAnimationFrame(()=>requestAnimationFrame(()=>{$progress.css({transition:`width ${duration}ms linear`,width:'100%'})}));$('.hero-thumb').removeClass('active').eq(i).addClass('active')} $hero.owlCarousel({rtl:true,items:1,loop:true,dots:false,nav:false,autoplay:true,autoplayTimeout:duration,smartSpeed:1100,mouseDrag:true,touchDrag:true,animateOut:'fadeOut',animateIn:'fadeIn'});$hero.on('changed.owl.carousel',e=>ui(e.relatedTarget.relative(e.item.index)));$('#mergen-hero-slider .hero-nav-arrow.prev').on('click',()=> $hero.trigger('prev.owl.carousel'));$('#mergen-hero-slider .hero-nav-arrow.next').on('click',()=> $hero.trigger('next.owl.carousel'));$thumbs.on('click','.hero-thumb',function(){$hero.trigger('to.owl.carousel',[$(this).data('index'),900,true])});ui(0);
});
} catch (e) { console.error('MERGEN JS [SECTION 01 HERO — اسلایدر اصلی]:', e); }

/* ==========================================================
   SECTION 02 PHILOSOPHY
   ========================================================== */
try {
const phil=document.querySelector('.mg-philosophy');
if(phil){const io=new IntersectionObserver(es=>es.forEach(e=>phil.classList.toggle('is-active',e.isIntersecting)),
{threshold:.28});io.observe(phil);}
} catch (e) { console.error('MERGEN JS [SECTION 02 PHILOSOPHY]:', e); }

/* ==========================================================
   SECTION 03 LAYERED SCROLL
   ========================================================== */
try {
const layers=[...document.querySelectorAll('[data-layer]')];
function updateLayers(){const vh=innerHeight;
    layers.forEach((s,i)=>{const next=layers[i+1];
        const r=s.getBoundingClientRect();
        let p=next?Math.max(0,Math.min(1,(vh-next.getBoundingClientRect().top)/vh)):0;
        let outgoing=p>0&&p<1;s.style.transform=`scale(${1-p*.055})`;
        s.style.opacity=1-p*.88;
        s.style.filter=`blur(${p*2.8}px)`;
        s.classList.toggle('outgoing',outgoing);
        s.classList.toggle('is-current',p<.05);
        const bg=s.querySelector('.layer-bg');
        if(bg)bg.style.transform=`scale(${1.04+p*.08}) translateY(${-p*2}%)`})}
        addEventListener('scroll',updateLayers,{passive:true});
        addEventListener('resize',updateLayers);updateLayers();
{
  const layers=document.querySelectorAll('#layers .layer-section');
if(layers.length){
  const updateLayers=()=>{
    const center=innerHeight*.5;
    layers.forEach(el=>{
      const r=el.getBoundingClientRect();
      const active=r.top<=center && r.bottom>=center;
      el.classList.toggle('is-active',active);
    });
  };
  addEventListener('scroll',updateLayers,{passive:true});
  addEventListener('resize',updateLayers);
  updateLayers();
}
}
} catch (e) { console.error('MERGEN JS [SECTION 03 LAYERED SCROLL]:', e); }

/* ==========================================================
   SECTION 04 SLIDER 01 — کاروسل مبلمان
   ========================================================== */
try {
$(function(){
    $('#furnitureCarousel').owlCarousel({rtl:true,loop:true,center:true,margin:20,nav:true,dots:false,autoplay:true,autoplayTimeout:3000,autoplayHoverPause:true,smartSpeed:700,responsive:{0:{items:1},600:{items:2},900:{items:3}}});
});
} catch (e) { console.error('MERGEN JS [SECTION 04 SLIDER 01 — کاروسل مبلمان]:', e); }

/* ==========================================================
   SECTION 05 HORIZONTAL LAYERED
   ========================================================== */
try {
(() => {
  const section  = document.getElementById('horizontal-layered');
  if (!section) return;
  const sticky   = section.querySelector('.mg-hlayer-sticky');
  const track    = section.querySelector('.mg-hlayer-track');
  const cards    = [...section.querySelectorAll('.mg-hlayer-track > .mg-hlayer')];
  const progress = section.querySelector('.mg-hlayer-progress i');
  if (!sticky || !track || !cards.length) return;

  const mobile = window.matchMedia('(max-width: 700px)');
  let travel = 0, raf = 0;

  /* مسافت کل حرکت = مجموع عرض کارت‌ها + فاصله‌ها + پدینگ - عرض صفحه */
  function layout() {
    if (mobile.matches) {            /* موبایل: چیدمان عمودی با CSS */
      section.style.height = '';
      track.style.transform = '';
      if (progress) progress.style.width = '100%';
      return;
    }
    const cs  = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap) || 24;
    const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const total = cards.reduce((s, c) => s + c.offsetWidth, 0) + gap * (cards.length - 1) + pad;
    travel = Math.max(0, total - window.innerWidth);
    section.style.height = (window.innerHeight + travel) + 'px';
    update();
  }
  function update() {
    if (mobile.matches) return;
    const range  = Math.max(section.offsetHeight - window.innerHeight, 1);
    const passed = Math.max(0, Math.min(range, -section.getBoundingClientRect().top));
    const ratio  = passed / range;
    track.style.transform = 'translate3d(' + (travel * ratio) + 'px,0,0)';
    if (progress) progress.style.width = (ratio * 100) + '%';
  }
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  layout();
})();

} catch (e) { console.error('MERGEN JS [SECTION 05 HORIZONTAL LAYERED]:', e); }

/* ==========================================================
   SECTION 06 SLIDER 02 / INTERIOR DETAILS
   ========================================================== */
try {
(() => {
        const scene = document.querySelector('#slider02 .ms-scene');
        if (!scene) return;

        const row1Items = [
            { title:"سرویس مدل اول", desc:"طراحی مینیمال با درب‌های بدون دستگیره", img:"./img/bed1.jpg" },
            { title:"سرویس مدل دوم", desc:"ترکیب چوب و نور مخفی پشت پنل", img:"./img/bed2.jpg" },
            { title:"سرویس مدل سوم", desc:"قفسه‌بندی باز با نورپردازی نقطه‌ای", img:"./img/bed3.jpg" },
            { title:"سرویس مدل چهارم", desc:"درب‌های براق با هندل مخفی", img:"./img/bed4.jpg" },
            { title:"سرویس مدل پنجم", desc:"رنگ‌بندی خنثی و خطوط ساده", img:"./img/bed5.jpg" },
            { title:"سرویس مدل ششم", desc:"جداکننده فضا با طرح هندسی", img:"./img/bed6.jpg" },
            { title:"سرویس مدل هفتم", desc:"ترکیب سنگ و فلز در طراحی نشیمن", img:"./img/bed7.jpg" },
            { title:"سرویس مدل هشتم", desc:"نورپردازی غیرمستقیم دور سقف", img:"./img/bed8.jpg" }
        ];

        const row2Items = [
            { title:"سرویس مدل نهم", desc:"طراحی با قاب‌های برجسته و رنگ گرم", img:"./img/bed9.jpg" },
            { title:"سرویس مدل دهم", desc:"بافت سنگ طبیعی در دیوار پذیرایی", img:"./img/bed10.jpg" },
            { title:"سرویس مدل یازدهم", desc:"نمایش دکوری اشیا در طبقات باز", img:"./img/bed11.jpg" },
            { title:"سرویس مدل دوازدهم", desc:"طراحی جزیره‌ای با روشنایی آویز", img:"./img/bed12.jpg" },
            { title:"سرویس مدل سیزدهم", desc:"بافت گرم چوب در فضای خواب", img:"./img/bed13.jpg" },
            { title:"سرویس مدل چهاردهم", desc:"طرح مشبک فلزی برای تفکیک فضا", img:"./img/bed14.jpg" },
            { title:"سرویس مدل پانزدهم", desc:"طراحی ساده با صندلی‌های هماهنگ", img:"./img/bed15.jpg" },
            { title:"سرویس مدل شانزدهم", desc:"خطوط نوری کم‌مصرف در طراحی سقف", img:"./img/bed16.jpg" }
        ];

        const track1 = document.getElementById('msTrack1');
        const track2 = document.getElementById('msTrack2');
        const row1El = document.querySelector('#slider02 .ms-row-1');
        const row2El = document.querySelector('#slider02 .ms-row-2');
        const title1 = document.getElementById('msTitle1');
        const title2 = document.getElementById('msTitle2');
        const LEN = row1Items.length;

        const tripled = items => [...items, ...items, ...items];

        function buildTrack(trackEl, items) {
            trackEl.innerHTML = tripled(items).map((it, i) => `
                <article class="ms-card" data-i="${i}">
                    <img src="${it.img}" alt="${it.title}" loading="lazy">
                    <div class="ms-info">
                        <h3>${it.title}</h3>
                        <p>${it.desc}</p>
                    </div>
                </article>
            `).join('');
        }

        buildTrack(track1, row1Items);
        buildTrack(track2, row2Items);

        function metrics() {
            const mobile = window.innerWidth <= 600;
            return {
                width: mobile ? 180 : 220,
                gap: mobile ? 14 : 20
            };
        }

        function offsetFor(rowEl, idx) {
            const {width, gap} = metrics();
            const step = width + gap;
            return rowEl.clientWidth / 2 - width / 2 - idx * step;
        }

        function render(trackEl, rowEl, idx, skipAnim = false) {
            if (skipAnim) trackEl.classList.add('ms-no-anim');

            trackEl.querySelectorAll('.ms-card').forEach((card, i) => {
                card.classList.remove('ms-center', 'ms-neighbor');
                if (i === idx) card.classList.add('ms-center');
                else if (i === idx - 1 || i === idx + 1) card.classList.add('ms-neighbor');
            });

            trackEl.style.transform = `translateX(${offsetFor(rowEl, idx)}px)`;

            if (skipAnim) {
                void trackEl.offsetWidth;
                trackEl.classList.remove('ms-no-anim');
            }
        }

        const state = {
            row1: {idx: LEN, dir: 1, track: track1, el: row1El},
            row2: {idx: LEN * 2 - 1, dir: -1, track: track2, el: row2El}
        };

        render(track1, row1El, state.row1.idx, true);
        render(track2, row2El, state.row2.idx, true);

        let focusedRow = 'row1';
        let paused = false;
        let timer;

        function setFocus(rowKey) {
            title1.classList.toggle('focused', rowKey === 'row1');
            title2.classList.toggle('focused', rowKey === 'row2');

            scene.querySelectorAll('.ms-card.ms-focused').forEach(c => c.classList.remove('ms-focused'));
            const s = state[rowKey];
            const center = s.track.querySelector(`.ms-card[data-i="${s.idx}"]`);
            if (center) center.classList.add('ms-focused');
        }

        function advance(rowKey) {
            const s = state[rowKey];
            s.idx += s.dir;
            render(s.track, s.el, s.idx);

            setTimeout(() => {
                if (s.idx >= LEN * 2) {
                    s.idx -= LEN;
                    render(s.track, s.el, s.idx, true);
                } else if (s.idx < LEN) {
                    s.idx += LEN;
                    render(s.track, s.el, s.idx, true);
                }
            }, 950);
        }

        function tick() {
            if (paused) return;
            const next = focusedRow === 'row1' ? 'row2' : 'row1';
            advance(next);

            setTimeout(() => {
                if (paused) return;
                focusedRow = next;
                setFocus(next);
            }, 820);
        }

        function start() {
            clearInterval(timer);
            timer = setInterval(tick, 2700);
        }

        scene.querySelectorAll('.ms-row').forEach(row => {
            row.addEventListener('mouseenter', () => paused = true);
            row.addEventListener('mouseleave', () => paused = false);
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                render(track1, row1El, state.row1.idx, true);
                render(track2, row2El, state.row2.idx, true);
            }, 120);
        });

        setFocus('row1');
        start();
    })();
} catch (e) { console.error('MERGEN JS [SECTION 06 SLIDER 02 / INTERIOR DETAILS]:', e); }

/* ==========================================================
   SECTION 07 SOFASPACE
   ========================================================== */
try {
  const ms=document.querySelector('#material-space');
  const msStages=ms?[...ms.querySelectorAll('.mg-ms-stage')]:[];
  const msImage=ms?.querySelector('.mg-ms-image');
  const msProgress=ms?.querySelector('.mg-ms-progress i');
  const msImages=['./img/mobl7.png','./img/mobl8.png','./img/mobl9.png','./img/mobl10.png','./img/mobl11.png','./img/mobl12.png'];
  if(ms&&msStages.length){
    const updateMS=()=>{
      const rect=ms.getBoundingClientRect();
      const max=Math.max(ms.offsetHeight-innerHeight,1);
      const pct=Math.max(0,Math.min(1,(-rect.top)/max));
      const idx=Math.min(msStages.length-1,Math.floor(pct*msStages.length));
      msStages.forEach((el,i)=>el.classList.toggle('is-active',i===idx));
      if(msImage){msImage.style.backgroundImage='url("'+msImages[idx]+'")';msImage.style.transform='scale('+(1.02+pct*.06)+')';}
      if(msProgress)msProgress.style.width=(pct*100)+'%';
    };
    addEventListener('scroll',updateMS,{passive:true});addEventListener('resize',updateMS);
    updateMS();
  }
} catch (e) { console.error('MERGEN JS [SECTION 07 SOFASPACE]:', e); }

/* ==========================================================
   SECTION 08 ORBIT SLIDER
   ========================================================== */
try {
(() => {

  const section = document.getElementById('orbit-slider');
  if (!section) return;

  const stage = section.querySelector('.mg-orbit-stage');
  const cards = [...section.querySelectorAll('.mg-orbit-card')];

  if (!stage || cards.length !== 12 || !cards[0].animate) return;

  let animations = [];
  let visible = false;

  /*
   * ============================
   * TIMING
   * ============================
   */

  const MOVE = 9600;       // حرکت کامل هر جفت
  const GAP = 1400;        // فاصله کوتاه بین جفت‌ها
  const PAIR = MOVE + GAP; // زمان هر جفت
  const TOTAL = PAIR * 6;

  const EASE = 'cubic-bezier(.45,0,.25,1)';

  /*
   * ============================
   * BUILD
   * ============================
   */

  function build() {

    const oldTime =
      animations.length
        ? animations[0].currentTime || 0
        : 0;

    animations.forEach(a => a.cancel());
    animations = [];

    const S = stage.clientWidth;
    const H = stage.clientHeight;

    const small = S < 700;

    /*
     * اندازه کارت
     */

    const cw = small
      ? Math.round(S * .58)
      : Math.min(
          Math.max(Math.round(S * .24), 280),
          420
        );

    const ch = Math.min(
      Math.round(cw * (small ? 1.05 : .80)),
      Math.round(H * .52)
    );

    stage.style.setProperty('--ocw', cw + 'px');
    stage.style.setProperty('--och', ch + 'px');

    /*
     * ============================
     * POSITION
     * ============================
     *
     * دو نقطه اصلی حرکت:
     *
     * LEFT  = حدود 12٪
     * RIGHT = حدود 64٪
     *
     * بنابراین مرکز کلی حرکت
     * تقریباً وسط مانیتور قرار می‌گیرد.
     */

    const leftX = Math.round(S * .10);

    const rightX = Math.round(
      S - cw - S * .10
    );

    /*
     * فاصله عمودی بیشتر
     */

    const topY = Math.max(
      0,
      Math.round(H * .015)
    );

    const bottomY = Math.min(
      H - ch,
      Math.round(H - ch - H * .015)
    );

    /*
     * ورود و خروج
     */

    const enterRight = S + 80;
    const enterLeft = -cw - 80;

    /*
     * ============================
     * PATH A
     * کارت اول
     * ============================
     */

    function pathA(start, end) {

      const o = v => start + v * (end - start);

      return [

        /*
         * ورود از راست بالا
         */

        {
          offset: o(0) / TOTAL,
          opacity: 0,
          transform:
            `translate3d(${enterRight}px,${topY}px,0) scale(.94)`,
          filter: 'blur(22px)'
        },

        {
          offset: o(.14) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث بالا چپ
         */

        {
          offset: o(.24) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * پایین
         */

        {
          offset: o(.38) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * حرکت پایین به راست
         */

        {
          offset: o(.56) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث پایین راست
         */

        {
          offset: o(.64) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * بالا
         */

        {
          offset: o(.77) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث بالا راست
         */

        {
          offset: o(.83) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * خروج مستقیم به چپ
         * بدون برگشت به راست
         */

        {
          offset: o(.94) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${topY}px,0) scale(.98)`,
          filter: 'blur(0)'
        },

        {
          offset: o(.975) / TOTAL,
          opacity: .55,
          transform:
            `translate3d(${Math.round((leftX + enterLeft) / 2)}px,${topY}px,0) scale(.96)`,
          filter: 'blur(9px)'
        },

        {
          offset: o(1) / TOTAL,
          opacity: 0,
          transform:
            `translate3d(${enterLeft}px,${topY}px,0) scale(.92)`,
          filter: 'blur(22px)'
        }
      ];
    }

    /*
     * ============================
     * PATH B
     * کارت دوم - کاملاً معکوس
     * ============================
     */

    function pathB(start, end) {

      const o = v => start + v * (end - start);

      return [

        /*
         * ورود از چپ پایین
         */

        {
          offset: o(0) / TOTAL,
          opacity: 0,
          transform:
            `translate3d(${enterLeft}px,${bottomY}px,0) scale(.94)`,
          filter: 'blur(22px)'
        },

        {
          offset: o(.14) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث پایین راست
         */

        {
          offset: o(.24) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * بالا راست
         */

        {
          offset: o(.38) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * بالا به چپ
         */

        {
          offset: o(.56) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث بالا چپ
         */

        {
          offset: o(.64) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${topY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * پایین چپ
         */

        {
          offset: o(.77) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * مکث پایین چپ
         */

        {
          offset: o(.83) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${leftX}px,${bottomY}px,0) scale(1)`,
          filter: 'blur(0)'
        },

        /*
         * خروج مستقیم به راست
         */

        {
          offset: o(.94) / TOTAL,
          opacity: 1,
          transform:
            `translate3d(${rightX}px,${bottomY}px,0) scale(.98)`,
          filter: 'blur(0)'
        },

        {
          offset: o(.975) / TOTAL,
          opacity: .55,
          transform:
            `translate3d(${Math.round((rightX + enterRight) / 2)}px,${bottomY}px,0) scale(.96)`,
          filter: 'blur(9px)'
        },

        {
          offset: o(1) / TOTAL,
          opacity: 0,
          transform:
            `translate3d(${enterRight}px,${bottomY}px,0) scale(.92)`,
          filter: 'blur(22px)'
        }
      ];
    }

    /*
     * ============================
     * CREATE 12 ANIMATIONS
     * ============================
     *
     * 01 + 02
     * 03 + 04
     * ...
     * 11 + 12
     *
     * فقط یک بار در هر TOTAL اجرا می‌شوند.
     */

    for (let pair = 0; pair < 6; pair++) {

      const first = pair * 2;
      const second = first + 1;

      const pairStart = pair * PAIR;

      const a = cards[first].animate(
        pathA(pairStart, pairStart + MOVE),
        {
          duration: TOTAL,
          iterations: Infinity,
          fill: 'both',
          easing: 'linear'
        }
      );

      const b = cards[second].animate(
        pathB(pairStart, pairStart + MOVE),
        {
          duration: TOTAL,
          iterations: Infinity,
          fill: 'both',
          easing: 'linear'
        }
      );

      animations.push(a, b);
    }

    /*
     * حفظ زمان قبلی هنگام resize
     */

    animations.forEach(a => {

      a.currentTime =
        oldTime % TOTAL;

      if (!visible) {
        a.pause();
      }

    });
  }

  /*
   * Reduced motion
   */

  if (
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {

    cards.forEach(card => {
      card.style.opacity = 0;
    });

    cards[0].style.opacity = 1;

    return;
  }

  build();

  /*
   * فقط وقتی Section دیده می‌شود اجرا شود
   */

  new IntersectionObserver(
    entries => {

      visible = entries[0].isIntersecting;

      animations.forEach(a => {

        if (visible) {
          a.play();
        } else {
          a.pause();
        }

      });

    },
    {
      threshold: .15
    }
  ).observe(section);

  /*
   * Resize
   */

  let resizeTimer;

  window.addEventListener('resize', () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      build();
    }, 150);

  });

})();
} catch (e) {

  console.error(
    'MERGEN JS [SECTION 08 ORBIT SLIDER]:',
    e
  );

}

/* SECTION 09 CONTACT / SOCIALS — بدون جاوااسکریپت اختصاصی */

/* ==========================================================
   SECTION 10 COLLECTION SHOWCASE
   ========================================================== */
try {
const vcCollections=[
    {number:'01',title:'کنسول',english:'BEDROOM COLLECTION',description:'طراحی و اجرای انواع کنسول های مدرن و سفارشی با جزئیات دقیق، متناسب با فضای شما.',image:'./img/console.webp'},
    {number:'02',title:'کاور رادیاتور',english:'LIVING COLLECTION',description:'کاور رادیاتوز مدرن و لوکس برای ایجاد فضایی متفاوت، گرم و ماندگار.',image:'./img/coverradiator.webp'},
    {number:'03',title:'میز و صندلی',english:'DINING COLLECTION',description:'میزهای غذاخوری، مدیریتی و سفارشی با تمرکز بر فرم، متریال و جزئیات.',image:'./img/chair.jpg'},
    {number:'04',title:'کمد لباس',english:'CONSOLE COLLECTION',description:'کمد های لباس مینیمال و خاص برای کامل کردن هویت بصری فضای داخلی.',image:'./img/wardrobe.jpeg'},
    {number:'05',title:'کتابخانه',english:'INTERIOR DESIGN',description:'از ایده تا اجرا؛ طراحی فضاهای مسکونی و تجاری با نگاه یکپارچه.',image:'./img/library.jpeg'}
    ];
    let currentIndex=0,changing=false;
    function selectCollection(index){if(index===currentIndex&&!changing)return;currentIndex=index;changing=true;const item=vcCollections[index],content=document.getElementById('heroContent'),image=document.getElementById('heroImage');content.style.opacity='0';content.style.transform='translateY(25px)';image.style.opacity='0';image.style.transform='scale(1.08)';setTimeout(()=>{document.getElementById('title').innerText=item.title;document.getElementById('english').innerText=item.english;document.getElementById('description').innerText=item.description;document.getElementById('largeNumber').innerText=item.number;image.style.backgroundImage=`url("${item.image}")`;document.querySelectorAll('#collection .collection').forEach(btn=>btn.classList.remove('active'));const btn=document.querySelector(`#collection .collection[data-index="${index}"]`);if(btn)btn.classList.add('active');document.getElementById('counter').innerText=`${item.number} / 05`;document.getElementById('imageProgress').style.width=`${((index+1)/vcCollections.length)*100}%`;document.getElementById('verticalProgress').style.height=`${((index+1)/vcCollections.length)*100}%`;setTimeout(()=>{image.style.opacity='1';image.style.transform='scale(1)';content.style.opacity='1';content.style.transform='translateY(0)';changing=false},100)},350)}
    document.getElementById('heroImage').style.backgroundImage=`url("${vcCollections[0].image}")`;
    document.querySelectorAll('#collection .collection').forEach(btn=>{const i=+btn.dataset.index;btn.addEventListener('mouseenter',()=>selectCollection(i));btn.addEventListener('click',()=>selectCollection(i))});
    let autoPlay=setInterval(()=>selectCollection((currentIndex+1)%vcCollections.length),7000);const collectionHero=document.getElementById('hero');collectionHero.addEventListener('mouseenter',()=>clearInterval(autoPlay));collectionHero.addEventListener('mouseleave',()=>{clearInterval(autoPlay);autoPlay=setInterval(()=>selectCollection((currentIndex+1)%vcCollections.length),7000)});
} catch (e) { console.error('MERGEN JS [SECTION 10 COLLECTION SHOWCASE]:', e); }

/* ==========================================================
   SECTION 11 SIGNATURE V3 — کاروسل کارتی
   ========================================================== */
try {
const v3Products=[
    {title:'مدل اول',desc:'آرامش در جزئیات',img:'./img/dining1.jpg'},
    {title:'مدل دوم',desc:'راحتی در کنار زیبایی',img:'./img/dining2.jpg'},
    {title:'مدل سوم',desc:'ترکیب زیبایی و کارایی',img:'./img/dining3.jpg'},
    {title:'مدل چهارم',desc:'نظم با طراحی اختصاصی',img:'./img/dining4.jpg'},
    {title:'مدل پنجم',desc:'طراحی مدرن و ماندگار',img:'./img/dining5.jpg'},
    {title:'مدل ششم',desc:'فضایی که شبیه شماست',img:'./img/dining6.jpg'}

    ];
    const v3Carousel=document.getElementById('carousel'),v3Thumbs=document.getElementById('v3Thumbs');
    let v3Current=0,v3Animating=false,v3StartX=0,v3Dragging=false;const v3Cards=[];
    v3Products.forEach((p,i)=>{const c=document.createElement('article');
    c.className='card';c.innerHTML=`<img src="${p.img}" alt="${p.title}">
    <div class="meta"><small>MERGEN /
    ${String(i+1).padStart(2,'0')}</small><strong>${p.title}</strong><span>${p.desc}</span></div>`;
    c.addEventListener('click',()=>{if(!v3Animating){const d=(i-v3Current+v3Products.length)%v3Products.length;
        if(d===0)return;if(d<=3)v3Go(d);else v3Go(d-v3Products.length)}});
        v3Carousel.appendChild(c);v3Cards.push(c);
        const t=document.createElement('button');
        t.className='thumb';t.innerHTML=`<img src="${p.img}" alt="">`;
        t.addEventListener('click',()=>v3Select(i));v3Thumbs.appendChild(t)});
    function v3Wrap(n){return(n+v3Products.length)%v3Products.length}
    function v3Position(){v3Cards.forEach((c,i)=>{let d=i-v3Current;
        if(d>3)d-=v3Products.length;if(d<-3)d+=v3Products.length;
        c.className='card '+(d===0?'pos0':d===1?'pos1':d===2?'pos2':d===3?'pos3':d===-1?'pos-1':d===-2?'pos-2':'posm3')+(d===0?' active':'')});
        document.getElementById('v3title').textContent=v3Products[v3Current].title;
        document.getElementById('v3desc').textContent=v3Products[v3Current].desc;
        document.getElementById('v3counter').textContent=String(v3Current+1).padStart(2,'0');
        document.getElementById('v3progress').style.width=((v3Current+1)/v3Products.length*100)+'%';
        [...v3Thumbs.children].forEach((t,i)=>t.classList.toggle('active',i===v3Current))}
    function v3Select(i){let d=i-v3Current;if(d>v3Products.length/2)d-=v3Products.length;
    if(d<-v3Products.length/2)d+=v3Products.length;v3Go(d)}
    function v3Go(step){if(v3Animating||step===0)return;
        v3Animating=true;v3Current=v3Wrap(v3Current+step);
        v3Position();setTimeout(()=>v3Animating=false,870)}
    document.getElementById('next').onclick=()=>v3Go(1);
    document.getElementById('prev').onclick=()=>v3Go(-1);window.addEventListener('keydown',
    e=>{if(e.key==='ArrowRight')v3Go(1);if(e.key==='ArrowLeft')v3Go(-1)});
    v3Carousel.addEventListener('pointerdown',e=>{v3Dragging=true;v3StartX=e.clientX;
        v3Carousel.setPointerCapture(e.pointerId);clearInterval(v3Timer)});v3Carousel.addEventListener('pointerup',
        e=>{if(!v3Dragging)return;v3Dragging=false;
            const dx=e.clientX-v3StartX;if(Math.abs(dx)>55)v3Go(dx<0?1:-1);
            restartV3Timer()});v3Carousel.addEventListener('pointercancel',()=>{v3Dragging=false;
                restartV3Timer()});v3Position();let v3Timer=setInterval(()=>v3Go(1),5200);
                function restartV3Timer(){clearInterval(v3Timer);
                    v3Timer=setInterval(()=>v3Go(1),5200)}['mouseenter','touchstart'].
                    forEach(ev=>v3Carousel.addEventListener(ev,()=>clearInterval(v3Timer)));
                    ['mouseleave','touchend'].forEach(ev=>v3Carousel.addEventListener(ev,restartV3Timer));
} catch (e) { console.error('MERGEN JS [SECTION 11 SIGNATURE V3 — کاروسل کارتی]:', e); }

/* ==========================================================
   SECTION 12 SHOPPING GUIDE — پنل راهنما
   ========================================================== */
try {
const guide=document.getElementById('guide');
    document.getElementById('guideOpen').onclick=()=>guide.classList.add('open');
    document.getElementById('guideClose').onclick=()=>guide.classList.remove('open');
    guide.addEventListener('click',e=>{if(e.target===guide)guide.classList.remove('open')});
} catch (e) { console.error('MERGEN JS [SECTION 12 SHOPPING GUIDE — پنل راهنما]:', e); }

/* ==========================================================
   SECTION 13 MERGEN EXPERIENCE
   ========================================================== */
try {
(function(){const root=document.querySelector('.mergen-experience');
if(!root)return;const items=[...root.querySelectorAll('.me-item')],
image=root.querySelector('#meImage'),
index=root.querySelector('#meVisualIndex'),
label=root.querySelector('#meVisualLabel'),
title=root.querySelector('#meVisualTitle'),
desc=root.querySelector('#meVisualDesc');
const data=[{label:'EXHIBITION',title:'فضا را قبل از انتخاب لمس کن.',
desc:'نمونه‌کارها، متریال و جزئیات را در فضایی واقعی ببینید و انتخاب دقیق‌تری داشته باشید.',
image:'./img/exhibition.webp'},
{label:'SHOWROOM',title:'محصول را از نزدیک ببین.',
desc:'در فروشگاه مرگن، فرم، متریال، رنگ و جزئیات را از نزدیک مقایسه و انتخاب کنید.',
image:'./img/showroom.webp'},
{label:'3D DESIGN',
title:'قبل از ساخت، نتیجه را ببین.',
desc:'تناسبات، رنگ، چیدمان و نورپردازی را پیش از تولید بررسی کنید تا تصمیم نهایی دقیق‌تر باشد.',
image:'./img/designing.webp'},
{label:'SERVICES',title:'از ایده تا اجرای نهایی، کنار شما.',
desc:'طراحی، CNC، ساخت سفارشی و اجرای پروژه در یک مسیر منسجم و دقیق انجام می‌شود.',
image:'./img/workshop.webp'}];
let active=-1,timer=null;
function activate(i){if(i===active)return;
    active=i;items.forEach((e,n)=>e.classList.toggle('active',n===i));
    const d=data[i];
    image.style.opacity='0';
    image.style.transform='scale(1.035)';
    setTimeout(()=>{image.src=d.image;
        label.textContent=d.label;
        title.textContent=d.title;
        desc.textContent=d.desc;index.textContent=String(i+1).padStart(2,'0')+' / 04';
        requestAnimationFrame(()=>{image.style.opacity='1';
        image.style.transform='scale(1)'})},
        220)}function start(){clearInterval(timer);
            timer=setInterval(()=>activate((active+1)%data.length),
            5200)}items.forEach((e,i)=>{['mouseenter',
            'focus','click'].forEach(ev=>e.addEventListener(ev,
                ()=>{activate(i);start()}))});
                root.addEventListener('mouseenter',()=>clearInterval(timer));
                root.addEventListener('mouseleave',start);activate(0);start()})();
} catch (e) { console.error('MERGEN JS [SECTION 13 MERGEN EXPERIENCE]:', e); }

/* ==========================================================
   SECTION 14 SLIDER 03 / CUSTOM PRODUCTS
   ========================================================== */
try {
$(function(){
    $('#customCarousel').owlCarousel(
        {rtl:true,loop:true,center:true,margin:22,
            nav:true,dots:false,autoplay:true,autoplayTimeout:3200,
            autoplayHoverPause:true,smartSpeed:750,
            responsive:{0:{items:1.1},600:{items:2},900:{items:3}}});
});
} catch (e) { console.error('MERGEN JS [SECTION 14 SLIDER 03 / CUSTOM PRODUCTS]:', e); }

/* ==========================================================
   SECTION 15 MATERIAL LIBRARY / OFF-CANVAS / SUPPORT
   ========================================================== */
try {
(function(){const materials=document.getElementById('materialsCanvas'),
open=document.getElementById('materialsOpen'),
close=document.getElementById('materialsClose'),
grid=document.getElementById('materialGrid');
if(materials&&open&&close){open.addEventListener('click',
()=>{materials.classList.add('open');
materials.setAttribute('aria-hidden','false');
document.body.classList.add('canvas-open')});
close.addEventListener('click',
()=>{materials.classList.remove('open');
materials.setAttribute('aria-hidden','true');
document.body.classList.remove('canvas-open')});
materials.addEventListener('click',
e=>{if(e.target===materials)close.click()})}
const materialData={wood:[['بلوط طبیعی','./img/placeholders/ph-3.svg'],
['گردو','./img/placeholders/ph-2.svg'],
['راش','./img/placeholders/ph-6.svg'],
['ونگه','./img/placeholders/ph-5.svg']],
color:[['سبز مرگن','#173b32'],
['سبز تیره','#0b1713'],
['زغالی','#171b19'],
['کرم گرم','#c9bca7'],
['سفید گرم','#eee9df'],
['قهوه‌ای گردویی','#4b3628']],
vacuum:[['روکش چوب','./img/placeholders/ph-1.svg'],
['مات سنگ','./img/placeholders/ph-2.svg'],
['طرح مرمر','./img/placeholders/ph-2.svg'],
['طرح بتن','./img/placeholders/ph-1.svg']],
fabric:[['Linen 01','./img/placeholders/ph-5.svg'],
['Boucle 02','./img/placeholders/ph-1.svg'],
['Velvet 03','./img/placeholders/ph-1.svg'],
['Texture 04','./img/placeholders/ph-6.svg']]};
function renderMaterial(type){if(!grid)return;
    grid.innerHTML=materialData[type].map(x=>type==='color'?
    `<button class="mm-swatch">
    <span style="background:${x[1]}"></span>
    <b>${x[0]}</b></button>`:
    `<button class="mm-sample">
    <img src="${x[1]}" alt="${x[0]}">
    <b>${x[0]}</b></button>`)
    .join('')}document.querySelectorAll('.mm-tab').
    forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.mm-tab').
    forEach(x=>x.classList.remove('active'));t.classList.add('active');
    renderMaterial(t.dataset.material)}));renderMaterial('wood');
    const support=document.getElementById('supportButton'),
    panel=document.getElementById('supportPanel'),
    sc=document.getElementById('supportClose');
    function toggleSupport(v){panel.classList.toggle('open',v);
    panel.setAttribute('aria-hidden',String(!v))}
    support&&support.addEventListener('click',()=>toggleSupport(!panel.classList.contains('open')));
    sc&&sc.addEventListener('click',()=>toggleSupport(false));
    document.addEventListener('click',e=>{if(panel&&panel.classList.contains('open')&&!
    panel.contains(e.target)&&!support.contains(e.target))toggleSupport(false)});
    document.addEventListener('keydown',
    e=>{if(e.key==='Escape'){if(materials&&materials.classList.contains('open'))
    close.click();if(panel&&panel.classList.contains('open'))toggleSupport(false)}})})();
} catch (e) { console.error('MERGEN JS [SECTION 15 MATERIAL LIBRARY / OFF-CANVAS / SUPPORT]:', e); }



/* =========================================================
   MERGEN — GROWING ROOM
========================================================= */
(() => {
    const section = document.querySelector("#mg-growing-room");
    if (!section) return;
    const image = section.querySelector("#mgGrowImage");
    const counter = section.querySelector("#mgGrowCounter");
    const bigNumber = section.querySelector("#mgGrowBigNumber");
    const stageLabel = section.querySelector("#mgGrowStage");
    const stageName = section.querySelector("#mgGrowStageName");
    const progress = section.querySelector("#mgGrowProgress");
    const teaser = section.querySelector("#mgGrowTeaser");
    const teaserNumber = section.querySelector("#mgGrowTeaserNumber");
    const teaserKicker = section.querySelector("#mgGrowTeaserKicker");
    const teaserTitle = section.querySelector("#mgGrowTeaserTitle");
    const teaserText = section.querySelector("#mgGrowTeaserText");
    const buttons = section.querySelectorAll(".mg-grow-stage");
    const data = [
        {
            image: "./img/baby-collection1.png",
            stage: "STAGE 01",
            name: "FIRST ROOM",
            kicker: "FIRST ROOM",
            title: "اولین پناه",
            text: "فضایی آرام و امن برای اولین سال‌های زندگی."
        },
        {
            image: "./img/baby-collection2.jpg",
            stage: "STAGE 02",
            name: "PLAY WORLD",
            kicker: "PLAY WORLD",
            title: "دنیای بازی",
            text: "فضایی برای بازی، کشف کردن و شکل‌گیری اولین استقلال‌های کودک."
        },
        {
            image: "./img/baby-collection3.png",
            stage: "STAGE 03",
            name: "LEARNING",
            kicker: "LEARNING",
            title: "دنیای یادگیری",
            text: "میز مطالعه، کتابخانه و فضایی که کودک در آن آرام‌آرام دنیای خودش را می‌سازد."
        },
        {
            image: "./img/baby-collection4.jpg",
            stage: "STAGE 04",
            name: "HIS OWN SPACE",
            kicker: "HIS OWN SPACE",
            title: "اتاق خودش",
            text: "اتاقی که دیگر فقط اتاق کودک نیست؛ بخشی از شخصیت اوست."
        }
    ];
    let current = 0;
    let hoverTimer = null;
    function setActive(index, animate = true) {
        const item = data[index];
        current = index;
        buttons.forEach((button, i) => {
            const dot = button.querySelector(".mg-grow-dot");
            const title = button.querySelector("strong");
            if (i === index) {
                dot.classList.add(
                    "border-emerald-400",
                    "bg-emerald-400",
                    "shadow-[0_0_0_7px_rgba(16,185,129,0.08)]"
                );
                dot.classList.remove(
                    "border-white/20",
                    "bg-[#06100c]"
                );
                title.classList.remove("text-white/50");
                title.classList.add("text-white");
            } else {
                dot.classList.remove(
                    "border-emerald-400",
                    "bg-emerald-400",
                    "shadow-[0_0_0_7px_rgba(16,185,129,0.08)]"
                );
                dot.classList.add(
                    "border-white/20",
                    "bg-[#06100c]"
                );
                title.classList.remove("text-white");
                title.classList.add("text-white/50");
            }
        });
        counter.textContent =
            String(index + 1).padStart(2, "0");
        bigNumber.textContent =
            String(index + 1).padStart(2, "0");
        stageLabel.textContent =
            item.stage;
        stageName.textContent =
            item.name;
        teaserNumber.textContent =
            String(index + 1).padStart(2, "0");
        teaserKicker.textContent =
            item.kicker;
        teaserTitle.textContent =
            item.title;
        teaserText.textContent =
            item.text;
        progress.style.width =
            `${(index / 3) * 100}%`;
        if (!animate) {

            image.src = item.image;

            return;
        }
        image.classList.add(
            "opacity-0",
            "scale-[1.07]",
            "blur-sm"
        );
        setTimeout(() => {
            image.src = item.image;
            image.onload = () => {
                image.classList.remove(
                    "opacity-0",
                    "scale-[1.07]",
                    "blur-sm"
                );
                image.classList.add(
                    "opacity-100",
                    "scale-[1.025]"
                );
            };
        }, 250);
        teaser.classList.remove(
            "opacity-100",
            "translate-y-0"
        );
        teaser.classList.add(
            "opacity-0",
            "translate-y-3"
        );
    }
    function startThreeSecondReveal(index) {
        clearTimeout(hoverTimer);
        const loader =
            buttons[index].querySelector(
                ".mg-grow-loader span"
            );
        const loaderWrap =
            buttons[index].querySelector(
                ".mg-grow-loader"
            );
        loader.style.transition = "none";
        loader.style.width = "0%";
        loaderWrap.classList.remove("opacity-0");
        loaderWrap.classList.add("opacity-100");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                loader.style.transition =
                    "width 3s linear";
                loader.style.width = "100%";
            });
        });
        hoverTimer = setTimeout(() => {
            if (current !== index) return;
            teaser.classList.remove(
                "opacity-0",
                "translate-y-3"
            );
            teaser.classList.add(
                "opacity-100",
                "translate-y-0"
            );
        }, 3000);
    }
    function cancelThreeSecondReveal(index) {
        clearTimeout(hoverTimer);
        const loader =
            buttons[index].querySelector(
                ".mg-grow-loader span"
            );
        const loaderWrap =
            buttons[index].querySelector(
                ".mg-grow-loader"
            );
        loader.style.transition = "none";
        loader.style.width = "0%";
        loaderWrap.classList.remove("opacity-100");
        loaderWrap.classList.add("opacity-0");
    }
    buttons.forEach((button, index) => {
        button.addEventListener("mouseenter", () => {
            setActive(index);
            startThreeSecondReveal(index);
        });
        button.addEventListener("mouseleave", () => {

            cancelThreeSecondReveal(index);
        });
        button.addEventListener("click", () => {
            setActive(index);
        });
    });
    /* subtle image parallax */
    const visual =
        section.querySelector("#mgGrowVisual");
    visual.addEventListener("mousemove", (event) => {
        if (window.innerWidth < 1024) return;
        const rect =
            visual.getBoundingClientRect();
        const x =
            (event.clientX - rect.left) /
            rect.width - 0.5;
        const y =
            (event.clientY - rect.top) /
            rect.height - 0.5;
        image.style.transform =
            `scale(1.04) translate(${x * -8}px, ${y * -8}px)`;
    });
    visual.addEventListener("mouseleave", () => {
        image.style.transform =
            "scale(1.025) translate(0,0)";
    });
    /* initial state */
    setActive(0, false);
})();
/* ==========================================================
   SECTION 16 ABOUT / BRAND STORY — animated metrics
   ========================================================== */
try {
(function(){
    const metrics=document.querySelector('#brandMetrics');
    if(!metrics)return;
    const counters=[...metrics.querySelectorAll('.about-metric')];
    let started=false;
    function animateMetrics(){
        if(started)return;
        started=true;
        counters.forEach(item=>{
            const target=Number(item.dataset.target||0);
            const suffix=item.dataset.suffix||'';
            const number=item.querySelector('.metric-number');
            const duration=1500;
            const start=performance.now();
            function frame(now){
                const p=Math.min((now-start)/duration,1);
                const eased=1-Math.pow(1-p,3);
                number.textContent=Math.floor(target*eased).toLocaleString('fa-IR')+suffix;
                if(p<1)requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        });
    }
    const observer=new IntersectionObserver(entries=>{
        if(entries.some(entry=>entry.isIntersecting)){
            animateMetrics();
            observer.disconnect();
        }
    },{threshold:.25});
    observer.observe(metrics);
})();
} catch (e) { console.error('MERGEN JS [SECTION 16 ABOUT / BRAND STORY — animated metrics]:', e); }

/* ==========================================================
   SECTION 16B CONSOLE SLIDER — استوانه‌ی سه‌بعدی (درگ، کیبورد، پخش خودکار)
   ========================================================== */
try {
  const ring = document.getElementById('mgcRing');
  if (ring) {
    const items = [
      { en: 'AURA CONSOLE', t: 'کنسول آورا', d: 'خطوط مینیمال و تناسبات ظریف؛ نقطه‌ی کانونی ورودی خانه.', m: ['بلوط طبیعی', '۱۶۰ × ۴۰ × ۸۵', '۳ کشو'], img: './img/console1.jpg' },
      { en: 'NOVA CONSOLE', t: 'کنسول نوا', d: 'لبه‌های نرم و پایه‌های شناور برای فضاهای باز.', m: ['گردوی آمریکایی', '۱۴۰ × ۳۵ × ۸۰', '۲ درِ ریلی'], img: './img/console2.jpg' },
      { en: 'ARCO CONSOLE', t: 'کنسول آرکو', d: 'قوس‌های معماری با سطح سنگ و ساختار چوبی.', m: ['چوب + سنگ', '۱۸۰ × ۴۰ × ۸۵', '۴ کشو'], img: './img/console3.jpg' },
      { en: 'LINEA CONSOLE', t: 'کنسول لینیا', d: 'خطی، سبک و دقیق؛ مناسب راهروهای باریک.', m: ['MDF لاک', '۱۲۰ × ۳۰ × ۸۰', '۱ کشو'], img: './img/console4.jpg' },
      { en: 'ONYX SHOE CABINET', t: 'جاکفشی اونیکس', d: 'جاکفشی ریلی با سطح مات و دستگیره‌ی پنهان.', m: ['مات', '۹۰ × ۳۵ × ۱۱۰', '۶ جفت'], img: './img/console5.jpg' },
      { en: 'ATLAS CONSOLE', t: 'کنسول اطلس', d: 'سطح فلزی ساتن با بدنه‌ی چوب طبیعی.', m: ['فلز + چوب', '۱۵۰ × ۴۰ × ۸۵', '۲ طبقه'], img: './img/console6.jpg' }
    ];
    const N = items.length, step = 360 / N;
    let cur = 0, timer = null, sx = null;
    ring.innerHTML = items.map((it, i) => `<article class="mgc-card" data-i="${i}" style="--a:${i * step}deg"><div class="mgc-art" style="${it.img ? "background-image:url('" + it.img + "')" : ''}"></div><span class="mgc-no">${String(i + 1).padStart(2, '0')}</span><b>${it.en}</b></article>`).join('');
    const cards = [...ring.children], $ = id => document.getElementById(id), bar = $('mgcBar');
    const pad = n => String(n).padStart(2, '0');
    function render() {
      const idx = ((cur % N) + N) % N;
      ring.style.setProperty('--rot', (-cur * step) + 'deg');
      cards.forEach((c, i) => { const df = Math.abs(i - idx); c.dataset.d = Math.min(df, N - df); });
      const it = items[idx];
      $('mgcTitle').textContent = it.t; $('mgcDesc').textContent = it.d; $('mgcBig').textContent = pad(idx + 1);
      $('mgcMeta').innerHTML = it.m.map(x => `<span>${x}</span>`).join('');
      $('mgcCount').textContent = pad(idx + 1) + ' / ' + pad(N);
      bar.style.transition = 'none'; bar.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = 'width 5.2s linear'; bar.style.width = '100%'; }));
    }
    const go = d => { cur += d; render(); restart(); };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(1), 5200); };
    $('mgcNext').addEventListener('click', () => go(1)); $('mgcPrev').addEventListener('click', () => go(-1));
    cards.forEach(c => c.addEventListener('click', () => { const i = +c.dataset.i, idx = ((cur % N) + N) % N; let d = i - idx; if (d > N / 2) d -= N; if (d < -N / 2) d += N; if (d) go(d); }));
    const stage = $('mgcStage');
    stage.addEventListener('pointerdown', e => { sx = e.clientX; });
    window.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
    stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(); ring.style.setProperty('--tilt', (-5 + ((e.clientY - r.top) / r.height - .5) * -6) + 'deg'); });
    document.addEventListener('keydown', e => { const r = stage.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) { if (e.key === 'ArrowRight') go(-1); if (e.key === 'ArrowLeft') go(1); } });
    render(); restart();
  }
} catch (e) { console.error('MERGEN JS [SECTION 16B CONSOLE SLIDER]:', e); }

/* ==========================================================
   SECTION 17 FAQ
   ========================================================== */
try {
document.querySelectorAll('.faq-q').
forEach(q=>q.onclick=()=>
{const item=q.parentElement;document.querySelectorAll('.faq-item').
forEach(x=>{if(x!==item)x.classList.remove('open')});
item.classList.toggle('open')});
} catch (e) { console.error('MERGEN JS [SECTION 17 FAQ]:', e); }

/* ==========================================================
   SECTION 18 FOOTER — افکت هاور نقشه اتاق‌ها
   ========================================================== */
try {
(()=>{const f=document.querySelector('.mergen-footer');
if(!f)return;const plan=f.querySelector('.plan');
const rooms=[...f.querySelectorAll('.room')];
rooms.forEach(r=>{r.addEventListener('mouseenter',()=>{f.classList.add('room-focus');
rooms.forEach(x=>x.classList.toggle('is-hovered',x===r))});
r.addEventListener('mouseleave',()=>{f.classList.remove('room-focus');
rooms.forEach(x=>x.classList.remove('is-hovered'))})});
plan.addEventListener('mousemove',e=>{const b=plan.getBoundingClientRect();
    const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
    rooms.forEach((r,i)=>{const dx=x*(i%3-1)*10,dy=y*(i%2-.5)*8;
        r.style.transform=`translate3d(${dx}px,${dy}px,0)`})});
        plan.addEventListener('mouseleave',()=>rooms.forEach(r=>r.style.transform=''));
    })();
} catch (e) { console.error('MERGEN JS [SECTION 18 FOOTER — افکت هاور نقشه اتاق‌ها]:', e); }



/* =========================================================
   SECTION 18b FOOTER — نقشه تب‌دار، شبکه‌های بیشتر، آکاردئون موبایل، فرم عضویت
   (این بلاک را بعد از بسته شدن try/catch مربوط به SECTION 18 در انتهای main.js بچسبان)
   ========================================================= */
try {
    (() => {
        const q = s => document.querySelector(s);
        const qa = s => document.querySelectorAll(s);

        /* نقشه: تب دفتر / فروشگاه / کارگاه */
        const map = q('[data-map]'), addr = q('[data-map-addr]'), go = q('[data-map-go]');
        qa('[data-map-tab]').forEach(tab => tab.addEventListener('click', () => {
            qa('[data-map-tab]').forEach(t => t.setAttribute('aria-selected', t === tab));
            const place = encodeURIComponent(tab.dataset.q);
            map.src = `https://maps.google.com/maps?q=${place}&output=embed`;
            go.href = `https://www.google.com/maps/search/?api=1&query=${place}`;
            addr.textContent = tab.dataset.t;
        }));

        /* شبکه‌های اجتماعی بیشتر */
        const more = q('[data-social-more]'), btn = q('[data-social-btn]');
        btn?.addEventListener('click', () => {
            const open = more.dataset.open !== 'true';
            more.dataset.open = open;
            btn.setAttribute('aria-expanded', open);
            btn.textContent = open ? '−' : '+۱۲';
        });

        /* آکاردئون لینک‌ها (فقط موبایل/تبلت؛ در دسکتاپ همیشه باز است) */
        qa('[data-acc] > button').forEach(b => b.addEventListener('click', () => {
            if (window.innerWidth > 900) return;
            const col = b.parentElement;
            col.dataset.open = col.dataset.open !== 'true';
        }));

        /* فرم عضویت — فعلاً نمایشی؛ بعداً به API / Google Form وصل کن */
        q('[data-join]')?.addEventListener('submit', e => {
            e.preventDefault();
            e.target.querySelector('button').textContent = 'ثبت شد ✓';
            e.target.reset();
        });
    })();
} catch (e) { console.error('MERGEN JS [SECTION 18b FOOTER]:', e); }
};

/* ============================================================================
   PART 2 · بقیه صفحه‌ها
   ============================================================================ */

/* ----------------------------------------------------------------------------
   PAGE · FOOTER LINKS (قوانین · مرجوعی · ارسال · حریم خصوصی · درباره ما · رهگیری سفارش)  —  فایل: footer-links.html
   ---------------------------------------------------------------------------- */
PAGES['footer-links'] = function () {
try {
/* ===== helpers & theme ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],fa=n=>n.toLocaleString('fa'),root=document.documentElement;
root.dataset.theme=root.classList.contains('dark')?'dark':'light'; /* هم‌گام با تم کل سایت */
$('#th').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;root.classList.toggle('dark',t==='dark');try{localStorage.setItem('mergen-theme',t)}catch(e){}};

/* ===== content (متن‌ها نمونه‌اند؛ با قوانین واقعی خودت جایگزین کن) ===== */
const TERMS=[["مقدمه و پذیرش شرایط","استفاده از وب‌سایت و ثبت سفارش به معنی پذیرش این شرایط است. مرگن می‌تواند در صورت نیاز شرایط را به‌روزرسانی کند و نسخه جدید در همین صفحه منتشر می‌شود."],["حساب کاربری","نگهداری اطلاعات ورود بر عهده کاربر است. اطلاعات واردشده باید صحیح باشد تا هماهنگی ارسال و پشتیبانی بدون مشکل انجام شود."],["سفارش‌ها و قیمت‌ها","سفارش پس از تأیید نهایی و دریافت پیش‌پرداخت وارد تولید می‌شود. قیمت‌ها ممکن است بسته به تغییر متریال به‌روز شوند، اما قیمت سفارش تأییدشده تغییر نمی‌کند."],["پرداخت","پرداخت از طریق درگاه امن بانکی انجام می‌شود. جزئیات اقساط یا پیش‌پرداخت در مرحله ثبت سفارش نمایش داده می‌شود."],["مالکیت محتوا","تصاویر، طرح‌ها، لوگو و متن‌های سایت متعلق به مرگن است و استفاده از آن‌ها بدون مجوز کتبی ممنوع است."],["مسئولیت‌ها","مرگن در قبال کیفیت ساخت و ارسال مسئول است و کاربر موظف است محصول را مطابق راهنمای نگهداری استفاده کند."]];
const RET=[["مهلت مرجوعی","۷ روز پس از تحویل","در صورت مغایرت محصول با سفارش یا وجود ایراد ساخت، تا ۷ روز پس از تحویل می‌توانید درخواست مرجوعی ثبت کنید."],["کالای آسیب‌دیده","جبران سریع","اگر محصول هنگام حمل آسیب دیده باشد، با ارسال عکس، تعویض یا تعمیر رایگان انجام می‌شود."],["محصولات سفارشی","شرایط ویژه","محصولات با ابعاد یا رنگ سفارشی مرجوع نمی‌شوند، مگر اینکه با سفارش ثبت‌شده مغایرت داشته باشند."],["بازپرداخت وجه","۵ تا ۷ روز کاری","پس از تأیید کارشناس، مبلغ به همان روش پرداخت برگردانده می‌شود."],["ضمانت ساخت","گارانتی کتبی","هر محصول با ضمانت‌نامه کتبی تحویل داده می‌شود و ایرادهای ساخت در دوره ضمانت رایگان رفع می‌شود."],["ثبت درخواست","۳ مرحله ساده","۱) ورود به حساب  ۲) ثبت درخواست همراه عکس  ۳) هماهنگی کارشناس برای بازدید یا جمع‌آوری."]];
const SHIP=[["ارسال تهران","به‌صورت اختصاصی و با خودروی مبلمان‌بر انجام می‌شود، همراه با تیم چیدمان.","۲ تا ۴ روز کاری"],["ارسال شهرستان‌ها","با حمل بیمه‌شده و بسته‌بندی چندلایه به سراسر کشور ارسال می‌شود.","۴ تا ۹ روز کاری"],["نصب و چیدمان","تیم مرگن محصول را در محل نصب و تراز می‌کند و بسته‌بندی را جمع می‌برد.","رایگان در تهران"],["بسته‌بندی ویژه","قطعات با فوم، گوشه‌گیر و کارتن تقویت‌شده بسته‌بندی می‌شوند تا بی‌نقص برسند.","شامل همه سفارش‌ها"]];
const PRIV=[["جمع‌آوری حداقلی","فقط اطلاعات لازم برای ارسال و پشتیبانی دریافت می‌شود."],["عدم فروش اطلاعات","اطلاعات شما هرگز به اشخاص ثالث فروخته نمی‌شود."],["پرداخت امن","اطلاعات کارت در درگاه بانکی ثبت می‌شود و در اختیار ما نیست."],["کنترل با شما","هر زمان بخواهید می‌توانید حذف یا ویرایش اطلاعات را درخواست کنید."]];
const STEPS=[["ثبت سفارش",0],["تأیید و پرداخت",0],["ساخت در کارگاه",0],["کنترل کیفیت",2],["آماده‌سازی و ارسال",4],["تحویل و نصب",6]],CUR=3,PCT=58;

/* ===== render ===== */
$('#tq').innerHTML=TERMS.map((x,i)=>`<div class="q"><button><i>${fa(i+1).padStart(2,'۰')}</i>${x[0]}</button><div><p>${x[1]}</p></div></div>`).join('');
$$('.q button').forEach(b=>b.onclick=()=>{const q=b.parentElement,o=q.classList.contains('open');$$('.q').forEach(e=>e.classList.remove('open'));if(!o)q.classList.add('open')});
$('#rt').innerHTML=RET.map((x,i)=>`<button class="cd" data-i="${i}"><b>${x[0]}</b><small>${x[1]}</small></button>`).join('');
const md=$('#md'),close=()=>md.classList.remove('on');
$$('#rt .cd').forEach(b=>b.onclick=()=>{const x=RET[b.dataset.i];$('#mt').textContent=x[0];$('#mp').textContent=x[2];md.classList.add('on')});
md.onclick=e=>{if(e.target===md)close()};$('#mc').onclick=close;addEventListener('keydown',e=>e.key==='Escape'&&close());
$('#sl').innerHTML=SHIP.map((x,i)=>`<button class="cd" data-i="${i}"><b>${x[0]}</b><small>${x[2]}</small></button>`).join('');
$$('#sl .cd').forEach(b=>b.onclick=()=>{$$('#sl .cd').forEach(e=>e.classList.remove('on'));b.classList.add('on');const x=SHIP[b.dataset.i];$('#sg').innerHTML=`<div class="drop"><h3>${x[0]}</h3><p>${x[1]}</p><b>${x[2]}</b></div>`});
$('#pv').innerHTML=PRIV.map((x,i)=>`<button class="flip" type="button" aria-pressed="false"><span class="flip-inner"><span class="flip-face flip-front"><span class="accent">${fa(i+1)}</span><b>${x[0]}</b><span class="hint">برای دیدن توضیحات ← کلیک کنید</span></span><span class="flip-face flip-back"><small>PRIVACY / ${String(i+1).padStart(2,'0')}</small><p>${x[1]}</p><span style="font-size:9px;opacity:.72;position:relative;z-index:1">برای بازگشت دوباره کلیک کنید</span></span></span></button>`).join('');
$$('#pv .flip').forEach(b=>b.addEventListener('click',()=>{const inner=$('.flip-inner',b);const on=b.classList.toggle('on');b.setAttribute('aria-pressed',on?'true':'false');inner.style.transform=on?'rotateY(180deg)':'rotateY(0deg)';inner.style.webkitTransform=on?'rotateY(180deg)':'rotateY(0deg)';inner.setAttribute('data-flipped',on?'true':'false')}));
$('#stp').innerHTML=STEPS.map((s,i)=>`<div class="s ${i<CUR?'d':i==CUR?'c':''}" data-tip="${i<CUR?'تکمیل شد ✓':i==CUR?'در حال انجام · حدود '+fa(s[1])+' روز تا پایان این مرحله':'حدود '+fa(s[1])+' روز تا این مرحله'}">${s[0]}</div>`).join('');

/* ===== tracker animation ===== */
function run(){const pb=$('#pb'),pt=$('#pt');pb.style.transition='none';pb.style.width='0';pt.textContent='۰٪ انجام شده';requestAnimationFrame(()=>requestAnimationFrame(()=>{pb.style.transition='';pb.style.width=PCT+'%';let n=0;const t=setInterval(()=>{n+=2;if(n>=PCT){n=PCT;clearInterval(t)}pt.textContent=fa(n)+'٪ انجام شده'},30)}))}
$('#tf').onsubmit=e=>{e.preventDefault();$('#cd').textContent=$('#tc').value.trim()||'MG-1405-2048';run()};
$('#in2').onmousemove=e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',e.clientX-r.left+'px');e.currentTarget.style.setProperty('--my',e.clientY-r.top+'px')};

/* ===== nav, reveal, counters, deep links ===== */
let ran=0;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');$$('nav a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));
 if(e.target.id==='ordertracking'&&!ran){ran=1;run()}
 if(e.target.id==='about')$$('[data-n]',e.target).forEach(b=>{if(b.done)return;b.done=1;const N=+b.dataset.n;let n=0;const t=setInterval(()=>{n+=Math.ceil(N/40);if(n>=N){n=N;clearInterval(t)}b.textContent=fa(n)},35)})}),{threshold:.35});
$$('section').forEach(s=>io.observe(s));
addEventListener('load',()=>{const e=location.hash&&document.getElementById(location.hash.slice(1));if(e)setTimeout(()=>e.scrollIntoView({behavior:'smooth',block:'start'}),60)});
/* ===== رفتن دقیق به بخش (footer-links.html#about و ...) — بعد از رندر و بعد از لود کامل ===== */
const goHash=()=>{try{if(location.hash){const el=document.querySelector(location.hash);if(el)el.scrollIntoView({block:'start'})}}catch(e){}};
goHash(); window.addEventListener('load',goHash); window.addEventListener('hashchange',goHash);
} catch (e) { console.error('MERGEN JS [PAGE footer-links]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · LOGIN  —  فایل: login.html
   ---------------------------------------------------------------------------- */
PAGES['login'] = function () {
try {
function togglePass() { const x = document.getElementById('pass'); x.type = x.type === 'password' ? 'text' : 'password' }
window.togglePass = togglePass;
} catch (e) { console.error('MERGEN JS [PAGE login]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · REGISTER  —  فایل: register.html
   ---------------------------------------------------------------------------- */
PAGES['register'] = function () {
try {
    // Theme follows the website/system; there is intentionally no theme toggle.
    const root = document.documentElement;
    const saved = localStorage.getItem('mergen-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : true;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);

    document.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.toggle);
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = input.type === 'password' ? 'نمایش' : 'مخفی';
      });
    });

    const password = document.getElementById('password');
    const bars = document.querySelectorAll('.strength');
    password.addEventListener('input', () => {
      const v = password.value;
      let score = 0;
      if (v.length >= 6) score++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
      if (/\d/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      bars.forEach((b,i)=> b.style.background = i < score ? '#79D6AA' : 'rgba(255,255,255,.10)');
    });

    document.getElementById('registerForm').addEventListener('submit', e => {
      e.preventDefault();
      const toast = document.getElementById('toast');
      if (password.value !== document.getElementById('confirmPassword').value) {
        toast.textContent = 'رمز عبور و تکرار آن یکسان نیست.';
      } else {
        toast.textContent = 'این نسخه نمایشی است؛ فرم آماده اتصال به بک‌اند مرگن است.';
      }
      toast.classList.remove('opacity-0','translate-y-8');
      setTimeout(()=>toast.classList.add('opacity-0','translate-y-8'),3200);
    });

} catch (e) { console.error('MERGEN JS [PAGE register]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · PASSWORD RECOVERY (preview)  —  فایل: preview.html
   ---------------------------------------------------------------------------- */
PAGES['preview'] = function () {
try {

} catch (e) { console.error('MERGEN JS [PAGE preview]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · WISHLIST  —  فایل: wishlist.html
   ---------------------------------------------------------------------------- */
PAGES['wishlist'] = function () {
try {
/* ---- داده‌ی نمونه: نام، قیمت (تومان)، عکس را با محصولات واقعی عوض کن ---- */
const ITEMS=[
{id:1,cat:'تخت',name:'تخت دونفره آریا',mat:'چوب راش · چرم طبیعی',img:'takht9.jpg',price:48500000,left:3,c:[['#8a6a4a','گردویی'],['#d9cdb8','کرم'],['#2b2b2b','دودی']]},
{id:2,cat:'مبل',name:'مبل راحتی نیلا',mat:'پارچه بوکله · پایه‌ی بلوط',img:'mobl1.jpg',price:62000000,c:[['#c9b79c','شنی'],['#5d6b5a','سبز مات'],['#e9e2d3','عاجی']]},
{id:3,cat:'ناهارخوری',name:'میز ناهارخوری سینا',mat:'چوب گردو · هشت‌نفره',img:'dining1.jpg',price:34900000,c:[['#6b4a32','گردو'],['#b9a182','بلوط']]},
{id:4,cat:'صندلی',name:'صندلی لوسیا',mat:'ام‌دی‌اف روکش‌دار · پارچه',img:'chair.jpg',price:7800000,left:5,c:[['#c2411f','ترنج'],['#2b2b2b','دودی'],['#d9cdb8','کرم']]},
{id:5,cat:'کنسول',name:'کنسول ماهان',mat:'چوب افرا · دستگیره‌ی برنجی',img:'console.webp',price:18200000,c:[['#b9a182','افرا'],['#3a3a36','گرافیت']]},
{id:6,cat:'کمد',name:'کمد دیواری ترنج',mat:'ام‌دی‌اف هایگلاس · سه‌درب',img:'wardrobe.jpeg',price:56400000,c:[['#e9e2d3','عاجی'],['#4a4f4a','سنگی']]},
{id:7,cat:'تخت',name:'تخت یک‌نفره رها',mat:'چوب بلوط · تاج چرمی',img:'takht11.jpg',price:41000000,left:2,c:[['#b9a182','بلوط'],['#6b4a32','گردو']]},
{id:8,cat:'مبل',name:'مبل سه‌نفره دیبا',mat:'مخمل ایتالیایی · فنر زیگزاگ',img:'mobl2.jpg',price:58700000,c:[['#1d4a3d','سبز جنگلی'],['#7a3b3b','عنابی'],['#c9b79c','شنی']]}];
const $=s=>document.querySelector(s),KEY='mergen-wishlist';
const fa=n=>Number(n).toLocaleString('fa-IR'),money=n=>fa(n)+' تومان',mil=n=>(n/1e6).toLocaleString('fa-IR',{maximumFractionDigits:1});
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let ids=ls(KEY,ITEMS.map(i=>i.id)),cart=new Set(),sel={},filter='all',sort='new',budget=ls('mergen-budget',150);
const heart='<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--acc)" stroke="var(--acc)" stroke-width="1.5"><path d="M12 21s-7-4.6-9.3-9.2C1.200 8.700 3 5 6.500 5c2 0 3.600 1.100 5.500 3 1.900-1.900 3.500-3 5.500-3 3.500 0 5.300 3.700 3.800 6.800C19 16.400 12 21 12 21z"/></svg>';
const list=()=>{let a=ITEMS.filter(i=>ids.includes(i.id));if(filter!=='all')a=a.filter(i=>i.cat===filter);
 if(sort==='new')a.sort((x,y)=>ids.indexOf(y.id)-ids.indexOf(x.id));else a.sort((x,y)=>sort==='lo'?x.price-y.price:y.price-x.price);return a};
function card(i,n){const k=sel[i.id]??0;return `<article class="card group relative overflow-hidden rounded-[26px] border border-line bg-surface rise" style="--i:${n}" data-id="${i.id}">
<div class="ph relative aspect-[4/5] overflow-hidden"><img src="./img/${i.img}" alt="${i.name}" loading="lazy" onerror="this.remove()" class="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.07]">
<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
<span class="str"></span><span class="tag">MG<br>${fa(String(i.id).padStart(3,'0'))}</span>
<button class="heart absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/35 backdrop-blur-md" data-act="rm" aria-label="حذف ${i.name} از علاقه‌مندی‌ها">${heart}</button>
${i.left?`<span class="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] text-white backdrop-blur-md"><span class="relative flex h-2 w-2"><i class="absolute inset-0 rounded-full" style="background:var(--warn);animation:wishlist-ping2 1.6s infinite"></i><i class="relative h-2 w-2 rounded-full" style="background:var(--warn)"></i></span>فقط ${fa(i.left)} عدد در انبار</span>`:''}</div>
<div class="relative z-[2] p-5"><p class="mb-1 text-[11px] tracking-widest text-at">${i.cat}</p>
<h3 class="text-lg font-medium"><a href="product.html?id=${i.id}" class="transition hover:text-at">${i.name}</a></h3><p class="mt-1 text-xs text-soft">${i.mat}</p>
<div class="mt-4 flex items-center gap-2" data-sw>${i.c.map((c,j)=>`<button class="sw ${j===k?'on':''}" style="background:${c[0]}" data-act="sw" data-j="${j}" aria-label="رنگ ${c[1]}" title="${c[1]}"></button>`).join('')}<span class="mr-1 text-[11px] text-soft">${i.c[k][1]}</span></div>
<div class="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4"><b class="text-[15px] font-semibold">${money(i.price)}</b>
<button data-act="cart" class="rounded-full px-5 py-2.5 text-xs font-medium transition ${cart.has(i.id)?'bg-transparent text-at ring-1 ring-acc':'bg-btn text-onbtn hover:-translate-y-0.5'}">${cart.has(i.id)?'✓ در سبد':'افزودن به سبد'}</button></div></div></article>`}
function render(anim=true){const a=list(),all=ITEMS.filter(i=>ids.includes(i.id));
 const cats=[...new Set(all.map(i=>i.cat))];if(filter!=='all'&&!cats.includes(filter))filter='all';
 $('#chips').innerHTML=['all',...cats].map(c=>{const n=c==='all'?all.length:all.filter(i=>i.cat===c).length,on=c===filter;
  return `<button data-chip="${c}" role="tab" aria-selected="${on}" class="rounded-full border px-4 py-2 text-xs transition ${on?'border-transparent bg-btn font-medium text-onbtn':'border-line text-soft hover:border-acc hover:text-ink'}">${c==='all'?'همه':c} <span class="opacity-60">${fa(n)}</span></button>`}).join('');
 $('#grid').innerHTML=a.map(card).map((h,n)=>anim?h:h.replace(' rise"','"')).join('');
 $('#grid').parentElement.querySelector('#chips').parentElement.style.display=all.length?'':'none';
 $('#empty').classList.toggle('hidden',all.length>0);
 const t=all.reduce((s,i)=>s+i.price,0),b=budget*1e6,p=b?t/b:0;
 $('#bigNum').textContent=fa(all.length);$('#count').textContent=fa(all.length);$('#total').textContent=all.length?money(t):'—';
 $('#inCart').textContent=fa(all.filter(i=>cart.has(i.id)).length);$('#pct').textContent=fa(Math.round(p*100))+'٪';
 const r=$('#ring');r.setAttribute('stroke-dasharray',`${Math.min(p,1)*339.3} 340`);r.style.stroke=p>1?'var(--warn)':'var(--acc)';
 $('#msg').textContent=!all.length?'لیستت خالی است؛ بودجه‌ات دست‌نخورده مانده.':p>1?`${mil(t-b)} میلیون تومان بیشتر از بودجه‌ات است. شاید یکی را برای بعد نگه داری؟`:`${mil(b-t)} میلیون تومان تا سقف بودجه‌ات باقی مانده.`;
 $('#budget').value=budget}
function toast(m,undo){const e=document.createElement('div');e.className='toast overflow-hidden rounded-2xl bg-ink text-bg shadow-2xl';
 e.innerHTML=`<div class="flex items-center gap-5 px-5 py-3.5 text-sm"><span>${m}</span>${undo?'<button class="font-semibold underline underline-offset-4" style="color:var(--at-inv,inherit)">بازگردانی</button>':''}</div><i></i>`;
 $('#toasts').append(e);const x=setTimeout(()=>e.remove(),5000);if(undo)e.querySelector('button').onclick=()=>{clearTimeout(x);e.remove();undo()}}
$('#grid').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const c=b.closest('.card'),id=+c.dataset.id,it=ITEMS.find(i=>i.id===id),act=b.dataset.act;
 if(act==='sw'){sel[id]=+b.dataset.j;c.querySelector('[data-sw]').outerHTML=card(it,0).match(/<div class="mt-4[\s\S]*?<\/span><\/div>/)[0];}
 if(act==='cart'){cart.has(id)?cart.delete(id):cart.add(id);render(false)}
 if(act==='rm'){b.classList.add('pop');const pos=ids.indexOf(id);c.classList.add('leaving');setTimeout(()=>{ids=ids.filter(x=>x!==id);sv(KEY,ids);render(false);
  toast(`«${it.name}» حذف شد`,()=>{ids.splice(pos,0,id);sv(KEY,ids);render(false)})},420)}});
$('#grid').addEventListener('mousemove',e=>{const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')});
$('#chips').addEventListener('click',e=>{const b=e.target.closest('[data-chip]');if(b){filter=b.dataset.chip;render()}});
$('#sort').onchange=e=>{sort=e.target.value;render()};
$('#budget').oninput=e=>{budget=Math.max(1,+e.target.value||1);sv('mergen-budget',budget);const v=e.target.value;render(false);$('#budget').value=v};
$('#addAll').onclick=()=>{ITEMS.filter(i=>ids.includes(i.id)).forEach(i=>cart.add(i.id));render(false);toast('همه‌ی قطعات به سبد اضافه شد')};
$('#copy').onclick=()=>{const t=ITEMS.filter(i=>ids.includes(i.id)).map(i=>`• ${i.name} — ${money(i.price)}`).join('\n');
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('لیست کپی شد'),()=>toast('کپی انجام نشد'))};
$('#clear').onclick=()=>{const old=ids;if(!old.length)return;ids=[];sv(KEY,ids);render(false);toast('همه‌ی موارد پاک شد',()=>{ids=old;sv(KEY,ids);render(false)})};
$('#themeBtn').onclick=()=>{const d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('mergen-theme',d?'dark':'light')}catch(e){}};
render();
} catch (e) { console.error('MERGEN JS [PAGE wishlist]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · CART  —  فایل: cart.html
   ---------------------------------------------------------------------------- */
PAGES['cart'] = function () {
try {
    const CART_KEY = "mergen-cart";
    const THEME_KEY = "mergen-theme";


    /* ---------------------------------------------
       Theme
    --------------------------------------------- */

    function applyTheme(theme) {
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark"
      );
    }


    const savedTheme =
      localStorage.getItem(THEME_KEY) ||
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    applyTheme(savedTheme);


    document
      .getElementById("themeToggle")
      .addEventListener("click", () => {

        const isDark =
          document.documentElement.classList.contains("dark");

        const nextTheme =
          isDark ? "light" : "dark";

        localStorage.setItem(
          THEME_KEY,
          nextTheme
        );

        applyTheme(nextTheme);

      });


    /* ---------------------------------------------
       Cart
    --------------------------------------------- */

    function getCart() {

      try {

        const raw =
          localStorage.getItem(CART_KEY);

        if (!raw) return [];

        const cart =
          JSON.parse(raw);

        return Array.isArray(cart)
          ? cart
          : [];

      } catch (error) {

        return [];

      }

    }


    function saveCart(cart) {

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );

    }


    function toman(number) {

      return new Intl.NumberFormat("fa-IR")
        .format(number) + " تومان";

    }


    function totalItems(cart) {

      return cart.reduce(
        (sum, item) =>
          sum + Number(item.qty || 0),
        0
      );

    }


    function subtotal(cart) {

      return cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
          Number(item.qty || 0),
        0
      );

    }


    let discountRate = 0;


    /* ---------------------------------------------
       Toast
    --------------------------------------------- */

    function showToast(message) {

      const toast =
        document.getElementById("toast");

      toast.textContent = message;

      toast.classList.remove(
        "hidden",
        "opacity-0",
        "translate-y-4"
      );

      toast.classList.add(
        "opacity-100",
        "translate-y-0"
      );


      setTimeout(() => {

        toast.classList.remove(
          "opacity-100",
          "translate-y-0"
        );

        toast.classList.add(
          "opacity-0",
          "translate-y-4"
        );

        setTimeout(() => {

          toast.classList.add("hidden");

        }, 500);

      }, 2200);

    }


    /* ---------------------------------------------
       Render
    --------------------------------------------- */

    function renderCart() {

      const cart =
        getCart();

      const container =
        document.getElementById("cartItems");

      const empty =
        document.getElementById("emptyCart");

      const clearButton =
        document.getElementById("clearCartBtn");

      const countLabel =
        document.getElementById("cartCountLabel");


      container.innerHTML = "";


      if (!cart.length) {

        empty.classList.remove("hidden");

        clearButton.classList.add("hidden");

        countLabel.textContent =
          "سبد خرید خالی است";

        updateSummary();

        return;

      }


      empty.classList.add("hidden");

      clearButton.classList.remove("hidden");


      countLabel.textContent =
        `${new Intl.NumberFormat("fa-IR").format(totalItems(cart))} محصول در سبد خرید`;


      cart.forEach((item, index) => {

        const card =
          document.createElement("article");

        card.className =
          "group relative overflow-hidden rounded-[26px] border border-black/[0.07] bg-white/75 p-3 shadow-[0_20px_60px_rgba(36,28,21,.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(36,28,21,.10)] dark:border-white/[0.08] dark:bg-white/[0.035]";


        card.innerHTML = `

          <div class="flex flex-col gap-4 sm:flex-row">

            <!-- Image -->
            <div class="relative h-52 shrink-0 overflow-hidden rounded-[20px] sm:h-44 sm:w-52">

              <img
                src="${item.image || "assets/products/aura-01.webp"}"
                alt="${item.name || ""}"
                class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              ></div>

            </div>


            <!-- Content -->
            <div class="flex min-w-0 flex-1 flex-col justify-between px-2 py-1 sm:py-2">

              <div>

                <div class="flex items-start justify-between gap-3">

                  <div>

                    <p class="text-[10px] text-[#7C6C58] dark:text-[#A9B7AF]">
                      ${item.category || "محصول مرگن"}
                    </p>

                    <h3 class="mt-2 text-lg font-bold">
                      ${item.name || "محصول"}
                    </h3>

                    <p class="mt-1 text-[9px] tracking-[0.2em] text-[#7C6C58] dark:text-[#A9B7AF]">
                      ${item.englishName || "MERGEN"}
                    </p>

                  </div>

                  <button
                    type="button"
                    onclick="removeItem(${index})"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm text-[#7C6C58] transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    aria-label="حذف محصول"
                  >
                    ×
                  </button>

                </div>


                <div class="mt-5 flex flex-wrap items-center gap-2">

                  <span class="rounded-full bg-black/5 px-3 py-1.5 text-[10px] text-[#7C6C58] dark:bg-white/5 dark:text-[#A9B7AF]">
                    ${item.material || "ساخت سفارشی"}
                  </span>

                  <span class="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-[10px] text-[#7C6C58] dark:bg-white/5 dark:text-[#A9B7AF]">

                    <span
                      class="h-2.5 w-2.5 rounded-full border border-black/10"
                      style="background:${item.colorHex || "#17251F"}"
                    ></span>

                    ${item.color || "انتخابی"}

                  </span>

                </div>

              </div>


              <div class="mt-6 flex flex-wrap items-end justify-between gap-4">

                <!-- Quantity -->
                <div
                  class="flex items-center rounded-full border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5"
                >

                  <button
                    type="button"
                    onclick="changeQuantity(${index}, -1)"
                    class="flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 hover:bg-[#17251F] hover:text-white"
                  >
                    −
                  </button>

                  <span
                    class="min-w-8 text-center text-xs font-semibold"
                  >
                    ${new Intl.NumberFormat("fa-IR").format(item.qty || 1)}
                  </span>

                  <button
                    type="button"
                    onclick="changeQuantity(${index}, 1)"
                    class="flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300 hover:bg-[#17251F] hover:text-white"
                  >
                    +
                  </button>

                </div>


                <!-- Price -->
                <div class="text-left">

                  <p class="text-[10px] text-[#7C6C58] dark:text-[#A9B7AF]">
                    قیمت
                  </p>

                  <p class="mt-1 text-base font-bold">
                    ${toman((item.price || 0) * (item.qty || 1))}
                  </p>

                </div>

              </div>

            </div>

          </div>

        `;


        container.appendChild(card);

      });


      updateSummary();

    }


    /* ---------------------------------------------
       Quantity
    --------------------------------------------- */

    function changeQuantity(index, delta) {

      const cart =
        getCart();

      if (!cart[index]) return;

      cart[index].qty =
        Math.max(
          1,
          Number(cart[index].qty || 1) + delta
        );

      saveCart(cart);

      renderCart();

    }


    /* ---------------------------------------------
       Remove
    --------------------------------------------- */

    function removeItem(index) {

      const cart =
        getCart();

      if (!cart[index]) return;

      const name =
        cart[index].name || "این محصول";

      cart.splice(index, 1);

      saveCart(cart);

      renderCart();

      showToast(
        `${name} از سبد حذف شد`
      );

    }


    /* ---------------------------------------------
       Clear
    --------------------------------------------- */

    document
      .getElementById("clearCartBtn")
      .addEventListener("click", () => {

        const cart =
          getCart();

        if (!cart.length) return;

        const confirmed =
          confirm(
            "آیا از حذف همه محصولات مطمئن هستید؟"
          );

        if (!confirmed) return;

        localStorage.removeItem(CART_KEY);

        discountRate = 0;

        renderCart();

        showToast(
          "سبد خرید خالی شد"
        );

      });


    /* ---------------------------------------------
       Summary
    --------------------------------------------- */

    function updateSummary() {

      const cart =
        getCart();

      const sub =
        subtotal(cart);

      const discount =
        Math.round(
          sub * discountRate
        );

      const total =
        Math.max(
          0,
          sub - discount
        );


      document.getElementById("subtotal")
        .textContent =
        toman(sub);


      document.getElementById("discount")
        .textContent =
        discount
          ? toman(discount)
          : "۰ تومان";


      document.getElementById("total")
        .textContent =
        toman(total);


      document.getElementById("checkoutTotal")
        .textContent =
        toman(total);


      document.getElementById("checkoutBtn")
        .disabled =
        !cart.length;

    }


    /* ---------------------------------------------
       Coupon
    --------------------------------------------- */

    document
      .getElementById("couponBtn")
      .addEventListener("click", () => {

        const input =
          document.getElementById("couponInput");

        const message =
          document.getElementById("couponMessage");

        const code =
          input.value
            .trim()
            .toUpperCase();


        if (code === "MERGEN10") {

          discountRate = 0.10;

          message.textContent =
            "کد تخفیف با موفقیت اعمال شد.";

          updateSummary();

          showToast(
            "۱۰٪ تخفیف اعمال شد"
          );

          return;

        }


        discountRate = 0;

        message.textContent =
          "کد تخفیف معتبر نیست.";

        updateSummary();

      });


    /* ---------------------------------------------
       Demo Product
    --------------------------------------------- */

    const demoProduct = {

      id: "aura-console",

      name: "میز کنسول آورا",

      englishName: "AURA CONSOLE",

      category: "میز کنسول",

      material: "MDF با روکش سفارشی",

      color: "سبز تیره",

      colorHex: "#17251F",

      price: 128000000,

      qty: 1,

      image: "assets/products/aura-01.webp"

    };


    function addDemoProduct() {

      const cart =
        getCart();

      const existing =
        cart.find(
          item =>
            item.id === demoProduct.id
        );


      if (existing) {

        existing.qty =
          Number(existing.qty || 1) + 1;

      } else {

        cart.push({
          ...demoProduct
        });

      }


      saveCart(cart);

      renderCart();

      showToast(
        "میز کنسول آورا به سبد اضافه شد"
      );

    }


    document
      .getElementById("demoProductBtn")
      .addEventListener(
        "click",
        addDemoProduct
      );


    /* ---------------------------------------------
       Checkout
    --------------------------------------------- */

    const checkoutModal =
      document.getElementById("checkoutModal");

    const checkoutStep1 =
      document.getElementById("checkoutStep1");

    const checkoutStep2 =
      document.getElementById("checkoutStep2");

    const checkoutStep3 =
      document.getElementById("checkoutStep3");


    function openCheckout() {

      if (!getCart().length) {

        showToast(
          "ابتدا یک محصول به سبد اضافه کنید"
        );

        return;

      }

      checkoutModal.classList.remove("hidden");

      checkoutModal.classList.add("flex");

      document.body.classList.add("overflow-hidden");

      showStep(1);

    }


    function closeCheckout() {

      checkoutModal.classList.add("hidden");

      checkoutModal.classList.remove("flex");

      document.body.classList.remove("overflow-hidden");

    }


    function showStep(step) {

      checkoutStep1.classList.toggle(
        "hidden",
        step !== 1
      );

      checkoutStep2.classList.toggle(
        "hidden",
        step !== 2
      );

      checkoutStep3.classList.toggle(
        "hidden",
        step !== 3
      );


      const indicators = [
        document.getElementById("stepIndicator1"),
        document.getElementById("stepIndicator2"),
        document.getElementById("stepIndicator3")
      ];


      indicators.forEach(
        (indicator, index) => {

          const active =
            index + 1 === step;

          indicator.classList.toggle(
            "bg-[#17251F]",
            active
          );

          indicator.classList.toggle(
            "text-white",
            active
          );

          indicator.classList.toggle(
            "bg-black/5",
            !active
          );

          indicator.classList.toggle(
            "dark:bg-white/5",
            !active
          );

          indicator.classList.toggle(
            "text-[#7C6C58]",
            !active
          );

        }
      );

    }


    document
      .getElementById("checkoutBtn")
      .addEventListener(
        "click",
        openCheckout
      );


    document
      .getElementById("closeCheckout")
      .addEventListener(
        "click",
        closeCheckout
      );


    checkoutModal.addEventListener(
      "click",
      event => {

        if (
          event.target === checkoutModal
        ) {
          closeCheckout();
        }

      }
    );


    document
      .getElementById("toStep2")
      .addEventListener(
        "click",
        () => {

          const name =
            document
              .getElementById("customerName")
              .value.trim();

          const phone =
            document
              .getElementById("customerPhone")
              .value.trim();


          if (!name || !phone) {

            showToast(
              "نام و شماره تماس را وارد کنید"
            );

            return;

          }

          showStep(2);

        }
      );


    document
      .getElementById("backToStep1")
      .addEventListener(
        "click",
        () => showStep(1)
      );


    document
      .getElementById("toStep3")
      .addEventListener(
        "click",
        () => {

          const address =
            document
              .getElementById("customerAddress")
              .value.trim();

          const city =
            document
              .getElementById("customerCity")
              .value.trim();


          if (!address || !city) {

            showToast(
              "آدرس و شهر را وارد کنید"
            );

            return;

          }


          updateSummary();

          showStep(3);

        }
      );


    document
      .getElementById("backToStep2")
      .addEventListener(
        "click",
        () => showStep(2)
      );


    document
      .getElementById("finalPayment")
      .addEventListener(
        "click",
        () => {

          showToast(
            "این بخش آماده اتصال به درگاه پرداخت است."
          );

        }
      );


    /* ---------------------------------------------
       Initial Render
    --------------------------------------------- */

    renderCart();


window.changeQuantity = changeQuantity;
window.removeItem = removeItem;
} catch (e) { console.error('MERGEN JS [PAGE cart]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · COMPARE  —  فایل: compare.html
   ---------------------------------------------------------------------------- */
PAGES['compare'] = function () {
try {
/* ---- داده‌ی نمونه: با محصولات واقعی عوض کن. ابعاد به سانتی‌متر ---- */
const ITEMS=[
{id:1,cat:'تخت',name:'تخت دونفره آریا',img:'takht9.jpg',price:48500000,w:190,h:105,d:220,mat:'چوب راش · چرم',war:3,del:14,col:3},
{id:2,cat:'مبل',name:'مبل راحتی نیلا',img:'mobl1.jpg',price:62000000,w:230,h:85,d:95,mat:'پارچه بوکله',war:2,del:21,col:3},
{id:3,cat:'ناهارخوری',name:'میز سینا',img:'dining1.jpg',price:34900000,w:220,h:76,d:100,mat:'چوب گردو',war:5,del:10,col:2},
{id:4,cat:'صندلی',name:'صندلی لوسیا',img:'chair.jpg',price:7800000,w:48,h:90,d:52,mat:'ام‌دی‌اف · پارچه',war:2,del:7,col:3},
{id:5,cat:'کنسول',name:'کنسول ماهان',img:'console.webp',price:18200000,w:140,h:82,d:38,mat:'چوب افرا · برنج',war:3,del:12,col:2},
{id:6,cat:'کمد',name:'کمد دیواری ترنج',img:'wardrobe.jpeg',price:56400000,w:240,h:230,d:60,mat:'ام‌دی‌اف هایگلاس',war:3,del:25,col:2},
{id:7,cat:'تخت',name:'تخت یک‌نفره رها',img:'takht11.jpg',price:41000000,w:110,h:100,d:215,mat:'چوب بلوط · چرم',war:3,del:14,col:2},
{id:8,cat:'مبل',name:'مبل سه‌نفره دیبا',img:'mobl2.jpg',price:58700000,w:215,h:82,d:92,mat:'مخمل ایتالیایی',war:4,del:18,col:3}];
const ROWS=[['قیمت',i=>i.price,v=>fa(v)+' تومان','min'],['عرض',i=>i.w,v=>fa(v)+' سانتی‌متر'],['ارتفاع',i=>i.h,v=>fa(v)+' سانتی‌متر'],['عمق',i=>i.d,v=>fa(v)+' سانتی‌متر'],['متریال',i=>i.mat,v=>v],['گارانتی',i=>i.war,v=>fa(v)+' سال','max'],['زمان تحویل',i=>i.del,v=>fa(v)+' روز','min'],['رنگ‌های سفارشی',i=>i.col,v=>fa(v)+' رنگ','max']];
const $=s=>document.querySelector(s),fa=n=>Number(n).toLocaleString('fa-IR'),KEY='mergen-compare';
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let sel=ls(KEY,[2,8,3]),t=0,cart=new Set();const get=id=>ITEMS.find(i=>i.id===id);
function toast(m){const e=document.createElement('div');e.className='toast rounded-2xl bg-ink px-5 py-3.5 text-sm text-bg shadow-2xl';e.textContent=m;$('#toasts').append(e);setTimeout(()=>e.remove(),3200)}

/* ---- صحنه ---- */
let topI=null,see=false;
const WOMAN=`<svg viewBox="0 0 60 170" width="100%" height="100%" preserveAspectRatio="xMidYMax meet"><path d="M30 0C19 0 13 8 14 20c0 10-3 18-1 27h34c2-9-1-17-1-27C47 8 41 0 30 0z" fill="#2a1a16"/><rect x="26" y="25" width="8" height="10" fill="#f1c7a5"/><path d="M21 34h18l3 25 11 51H7l11-51z" fill="var(--acc)"/><path d="M18 59h24" stroke="#fff" stroke-opacity=".4" stroke-width="2"/><path d="M20.500 37L14 80M39.500 37L46 80" stroke="#f1c7a5" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="81" r="2.800" fill="#f1c7a5"/><circle cx="46" cy="81" r="2.800" fill="#f1c7a5"/><rect x="23" y="108" width="5.500" height="57" rx="2.500" fill="#f1c7a5"/><rect x="31.500" y="108" width="5.500" height="57" rx="2.500" fill="#f1c7a5"/><ellipse cx="25.500" cy="166.500" rx="6" ry="3.500" fill="#2a1a16"/><ellipse cx="34.500" cy="166.500" rx="6" ry="3.500" fill="#2a1a16"/><ellipse cx="30" cy="16" rx="9.500" ry="11" fill="#f1c7a5"/><path d="M20.500 14C22 5.500 28 3.500 32 4.500c5 1 8 5 8 9.500-4-4-9-6-14-5-3 1-5 3-5.500 5.500z" fill="#2a1a16"/><circle cx="26" cy="18" r="1.200" fill="#2a1a16"/><circle cx="34" cy="18" r="1.200" fill="#2a1a16"/><circle cx="23.500" cy="21.500" r="2" fill="#ff7a7a" opacity=".35"/><circle cx="36.500" cy="21.500" r="2" fill="#ff7a7a" opacity=".35"/><path d="M27.500 23q2.500 2.200 5 0" stroke="#a5503f" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`;
function build(){const it=sel.map(get);let h='';
 for(let c=0;c<=250;c+=50)h+=`<div class="tick" data-cm="${c}"><span>${fa(c)}</span></div>`;
 h+=`<div id="floor" class="absolute left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--soft),transparent)"></div>
 <div id="human" class="absolute">${WOMAN}<b class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-normal text-soft">قد ۱۷۰</b></div>`;
 it.forEach((p,i)=>{h+=`<div class="hl" data-i="${i}" style="opacity:0"><b style="border:1px solid">${fa(i+1)} · ${fa(p.h)} سانتی‌متر</b></div>
 <div class="pb ph" data-i="${i}" style="background-image:url('./img/${p.img}')" title="${p.name} — ${fa(p.w)}×${fa(p.h)}×${fa(p.d)}"></div>
 <div class="ol" data-i="${i}" style="border-style:${['solid','dashed','dotted'][i]}"><b>${fa(i+1)}</b></div>`});
 $('#layer').innerHTML=h;layout()}
function layout(){const st=$('#stage'),W=st.clientWidth,H=st.clientHeight,fl=62,top0=44,gap=24,hum=60,it=sel.map(get);
 const tot=hum+it.reduce((a,b)=>a+b.w,0)+gap*it.length||1;
 const s=Math.min((W-150)/tot,(H-fl-top0)/Math.max(170,...it.map(i=>i.h)));
 $('#floor').style.bottom=fl+'px';Object.assign($('#human').style,{left:'80px',bottom:fl+'px',width:60*s+'px',height:170*s+'px'});
 document.querySelectorAll('.tick').forEach(e=>{e.style.bottom=fl+e.dataset.cm*s+'px'});
 let x=80+(hum+gap)*s;const ov=W*.6;
 it.forEach((p,i)=>{const side=x,mid=ov-p.w*s/2;x+=(p.w+gap)*s;
  const g={left:side*(1-t)+mid*t+'px',bottom:fl+'px',width:p.w*s+'px',height:p.h*s+'px'},q=a=>document.querySelector(`.${a}[data-i="${i}"]`);
  Object.assign(q('pb').style,g,{opacity:(topI===i&&!see)?1:1-.5*t,zIndex:topI===i?1500:1000-p.w});Object.assign(q('ol').style,g);
  Object.assign(q('hl').style,{bottom:fl+p.h*s+'px',opacity:t})})}
function setT(v){t=v;$('#morph').value=v*100;layout()}
function tween(to,ms=900){const from=t,t0=performance.now();return new Promise(r=>{(function f(n){const k=Math.min((n-t0)/ms,1),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;setT(from+(to-from)*e);k<1?requestAnimationFrame(f):r()})(t0)})}

/* ---- جدول ---- */
function table(){const it=sel.map(get),n=it.length;
 if(n<2){$('#table').innerHTML='<p class="px-6 py-16 text-center text-sm text-soft">برای مقایسه حداقل دو محصول انتخاب کن.</p>';return}
 const cols=`grid-template-columns:150px repeat(${n},minmax(190px,1fr))`,wins=it.map(()=>0);let rows='';
 ROWS.forEach(([lab,f,fmt,rule],r)=>{const vals=it.map(f),same=vals.every(v=>v===vals[0]);if($('#only').checked&&same)return;
  const best=rule&&!same?(rule==='min'?Math.min:Math.max)(...vals):null;
  rows+=`<div class="grid items-center border-t border-line" style="${cols}"><div class="px-5 py-4 text-xs text-soft">${lab}</div>${vals.map((v,i)=>{const w=best!==null&&v===best;if(w)wins[i]++;
  return `<div class="cell px-5 py-4 text-sm ${w?'win':''}" style="--i:${r*n+i}">${fmt(v)}${w?' <span class="mr-1 text-[10px]">✓ بهترین</span>':''}</div>`}).join('')}</div>`});
 const head=`<div class="grid" style="${cols}"><div></div>${it.map((p,i)=>`<div class="relative p-5" style="border-top:3px solid var(--acc)"><button data-rm="${p.id}" class="fill absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full" aria-label="حذف ${p.name}">✕</button>
 <div class="ph mb-3 h-20 w-20 rounded-2xl bg-cover bg-center" style="background-image:url('./img/${p.img}')"></div><p class="text-[11px] tracking-widest text-at">${p.cat}</p><h3 class="text-base font-medium">${p.name}</h3>
 <p class="mt-1 text-[11px] text-soft">${fa(wins[i])} برتری</p>
 <button data-cart="${p.id}" class="fill relative mt-4 w-full rounded-full px-4 py-2.5 text-xs font-medium ${cart.has(p.id)?'on':''}">${cart.has(p.id)?'✓ در سبد':'افزودن به سبد'}</button></div>`).join('')}</div>`;
 $('#table').innerHTML=`<div style="min-width:${150+n*190}px">${head}${rows}</div>`;
}
function legend(){$('#legend').innerHTML=sel.map(get).map((p,i)=>`<span class="flex items-center gap-2"><i class="grid h-5 w-5 place-items-center rounded-full bg-btn text-[10px] font-bold not-italic text-onbtn">${fa(i+1)}</i><b class="font-medium">${p.name}</b><span class="text-soft">${fa(p.w)} × ${fa(p.h)} × ${fa(p.d)} سانتی‌متر</span></span>`).join('')||'<span class="text-soft">محصولی انتخاب نشده.</span>'}
function picker(){$('#picker').innerHTML=ITEMS.map(p=>{const i=sel.indexOf(p.id),on=i>-1;return `<button data-pick="${p.id}" aria-pressed="${on}" class="fill relative flex items-center gap-2 rounded-full px-4 py-2 text-xs ${on?'on':''}">${on?`<b class="grid h-4 w-4 place-items-center rounded-full bg-onbtn text-[9px] text-btn">${fa(i+1)}</b>`:''}${p.name}</button>`}).join('')}
function topPick(){$('#topPick').innerHTML=`<button data-top="auto" class="fill relative rounded-full px-4 py-2 ${topI===null?'on':''}">خودکار</button>`+sel.map(get).map((p,i)=>`<button data-top="${i}" class="fill relative rounded-full px-4 py-2 ${topI===i?'on':''}">${fa(i+1)} · ${p.name}</button>`).join('')+`<button data-see class="fill relative rounded-full px-4 py-2 ${see?'on':''}">بالایی شفاف باشد</button>`}
function all(rebuild=true){sv(KEY,sel);if(topI!==null&&topI>=sel.length)topI=null;$('#bigNum').textContent=fa(sel.length);picker();topPick();legend();table();if(rebuild)build()}
$('#topPick').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.see!==undefined)see=!see;else topI=b.dataset.top==='auto'?null:+b.dataset.top;topPick();layout()};
$('#layer').onclick=e=>{const b=e.target.closest('.pb');if(b&&t>.05){topI=+b.dataset.i;topPick();layout()}};
$('#picker').onclick=e=>{const b=e.target.closest('[data-pick]');if(!b)return;const id=+b.dataset.pick;
 if(sel.includes(id))sel=sel.filter(x=>x!==id);else if(sel.length>=3)return toast('حداکثر سه محصول را می‌شود مقایسه کرد');else sel.push(id);all()};
$('#table').onclick=e=>{const r=e.target.closest('[data-rm]'),c=e.target.closest('[data-cart]');
 if(r){sel=sel.filter(x=>x!==+r.dataset.rm);all()}if(c){const id=+c.dataset.cart;cart.has(id)?cart.delete(id):cart.add(id);table()}};
$('#morph').oninput=e=>setT(e.target.value/100);$('#toSide').onclick=()=>tween(0);$('#toOver').onclick=()=>tween(1);
$('#only').onchange=table;addEventListener('resize',layout);
$('#themeBtn').onclick=()=>{const d=document.documentElement.classList.toggle('dark');try{localStorage.setItem('mergen-theme',d?'dark':'light')}catch(e){}};
all();
/* حرکت معرفی: یک‌بار صحنه خودش روی هم می‌افتد و برمی‌گردد */
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setTimeout(async()=>{await tween(1,1400);await new Promise(r=>setTimeout(r,500));await tween(0,1100)},700);
} catch (e) { console.error('MERGEN JS [PAGE compare]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · COLLECTION (موقت)  —  فایل: collection.html
   ---------------------------------------------------------------------------- */
PAGES['collection'] = function () {
try {
        const productsGrid =
            document.getElementById("productsGrid");

        const productCount =
            document.getElementById("productCount");


        function normalizeCategory(category) {

            const value =
                category.toLowerCase();


            if (
                value.includes("sofa") ||
                value.includes("مبل")
            ) {
                return "sofas";
            }


            if (
                value.includes("seat") ||
                value.includes("chair") ||
                value.includes("صندلی")
            ) {
                return "seating";
            }


            if (
                value.includes("table") ||
                value.includes("میز")
            ) {
                return "tables";
            }


            if (
                value.includes("storage") ||
                value.includes("console") ||
                value.includes("کنسول")
            ) {
                return "storage";
            }


            return "all";

        }



        function renderProducts(list) {

            productsGrid.innerHTML = "";


            productCount.textContent =
                `${String(list.length).padStart(2, "0")} محصول`;


            list.forEach((product, index) => {

                const card =
                    document.createElement("a");


                card.href =
                    `product.html?id=${product.id}`;


                let layoutClass = "";


                if (index % 5 === 0) {

                    layoutClass =
                        "md:col-span-2 md:w-[78%]";

                } else if (index % 5 === 1) {

                    layoutClass =
                        "md:w-[82%] md:mr-auto";

                } else if (index % 5 === 2) {

                    layoutClass =
                        "md:w-[86%]";

                } else if (index % 5 === 3) {

                    layoutClass =
                        "md:w-[78%] md:mr-auto";

                } else {

                    layoutClass =
                        "md:col-span-2 md:w-[70%] md:mx-auto";

                }


                card.className =
                    `product-card group reveal ${layoutClass}`;


                card.innerHTML = `

        <div
          class="relative
                 aspect-[1.22/1]
                 overflow-hidden
                 bg-[#101210]"
        >

          <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="product-image
                   w-full h-full
                   object-cover"
          >

          <div
            class="absolute
                   inset-0
                   bg-gradient-to-t
                   from-black/20
                   via-transparent
                   to-transparent
                   opacity-0
                   group-hover:opacity-100
                   transition duration-500"
          ></div>

        </div>


        <div
          class="product-info
                 pt-5
                 pr-1"
        >

          <div
            class="text-[9px]
                   text-white/35
                   mb-3"
          >
            ${product.category}
          </div>


          <h2
            class="product-name
                   serif
                   text-2xl
                   md:text-[28px]
                   font-normal"
          >
            ${product.name}
          </h2>


          <div
            class="mt-2
                   text-[9px]
                   tracking-[.12em]
                   text-white/35"
          >
            ${product.englishName}
          </div>


          <div
            class="mt-4
                   text-[10px]
                   text-[#c1a96f]"
          >
            مشاهده محصول ←
          </div>

        </div>

      `;


                productsGrid.appendChild(card);

            });

        }



        const allProducts =
            Object.values(products);


        renderProducts(allProducts);



        /* فیلتر دسته بندی */

        document
            .querySelectorAll("[data-category]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const category =
                            button.dataset.category;


                        document
                            .querySelectorAll(".filter-item")
                            .forEach(item => {

                                item.classList.remove("active");

                            });


                        document
                            .querySelectorAll(
                                `.filter-item[data-category="${category}"]`
                            )
                            .forEach(item => {

                                item.classList.add("active");

                            });


                        if (category === "all") {

                            renderProducts(allProducts);

                        } else {

                            const filtered =
                                allProducts.filter(product =>
                                    normalizeCategory(
                                        product.category
                                    ) === category
                                );

                            renderProducts(filtered);

                        }


                        mobileFilter.classList.add("hidden");

                    }
                );

            });



        /* موبایل */

        const mobileFilter =
            document.getElementById("mobileFilter");


        document
            .getElementById("mobileFilterButton")
            .addEventListener(
                "click",
                () => {

                    mobileFilter.classList.remove(
                        "hidden"
                    );

                }
            );


        document
            .getElementById("closeMobileFilter")
            .addEventListener(
                "click",
                () => {

                    mobileFilter.classList.add(
                        "hidden"
                    );

                }
            );



        /* فیلتر رنگ */

        document
            .querySelectorAll(".color-filter")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".color-filter")
                            .forEach(item => {

                                item.style.boxShadow =
                                    "none";

                            });


                        button.style.boxShadow =
                            "0 0 0 1px #e8dfca";


                        const color =
                            button.dataset.color;


                        if (color === "all") {

                            renderProducts(allProducts);

                            return;

                        }


                        const filtered =
                            allProducts.filter(product => {

                                return product.colors?.some(
                                    item =>
                                        item.name
                                            .toLowerCase()
                                            .includes(color)
                                );
                            });
                        renderProducts(filtered);
                    }
                );
            });

} catch (e) { console.error('MERGEN JS [PAGE collection]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · PRODUCT (موقت)  —  فایل: product.html
   ---------------------------------------------------------------------------- */
PAGES['product'] = function () {
try {
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PRODUCT
    ========================================= */

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product =
        typeof products !== "undefined"
            ? products[productId]
            : null;


    /* =========================================
       PRODUCT NOT FOUND
    ========================================= */

    if (!product) {

        document.title = "MERGEN — Product Not Found";

        const main = document.querySelector("main");

        if (main) {
            main.innerHTML = `
                <div class="min-h-screen flex flex-col items-center justify-center px-6 text-center">

                    <p class="text-[9px] tracking-[.4em] text-[#c1a96f] mb-6">
                        MERGEN / 404
                    </p>

                    <h1 class="serif text-5xl text-[#e8dfca]">
                        محصول پیدا نشد
                    </h1>

                    <p class="mt-5 text-sm text-[#77756e]">
                        این محصول در کالکشن مرگن وجود ندارد.
                    </p>

                    <a href="collection.html"
                       class="mt-10 border border-[#8d7950]/60
                              px-8 py-4
                              text-[9px] tracking-[.25em]
                              text-[#c1a96f]
                              hover:bg-[#c1a96f]
                              hover:text-[#080908]
                              transition">
                        بازگشت به کالکشن
                    </a>

                </div>
            `;
        }

        return;
    }


    /* =========================================
       BASIC INFO
    ========================================= */

    document.title =
        `MERGEN — ${product.englishName || product.name}`;

    const breadcrumb =
        document.getElementById("breadcrumbName");

    if (breadcrumb)
        breadcrumb.textContent = product.name;


    const name =
        document.getElementById("productName");

    if (name)
        name.textContent = product.name;


    const englishName =
        document.getElementById("productEnglishName");

    if (englishName)
        englishName.textContent = product.englishName;


    const description =
        document.getElementById("productDescription");

    if (description)
        description.textContent = product.description;


    const category =
        document.getElementById("productCategory");

    if (category)
        category.textContent = product.category;


    const metaCategory =
        document.getElementById("metaCategory");

    if (metaCategory)
        metaCategory.textContent = product.category;


    const metaMaterial =
        document.getElementById("metaMaterial");

    if (metaMaterial)
        metaMaterial.textContent =
            product.materials?.join(" / ") || "—";


    const metaDesigner =
        document.getElementById("metaDesigner");

    if (metaDesigner)
        metaDesigner.textContent = "MERGEN";


    /* =========================================
       GALLERY
    ========================================= */

    const images = Array.isArray(product.images)
        ? product.images
        : [];


    const mainImage =
        document.getElementById("mainImage");

    const thumbnails =
        document.getElementById("thumbnails");

    const counter =
        document.getElementById("imageCounter");


    let currentImage = 0;


    function showImage(index) {

        if (!images.length) {

            if (mainImage)
                mainImage.style.display = "none";

            if (counter)
                counter.textContent = "NO IMAGE";

            return;
        }


        currentImage =
            (index + images.length) % images.length;


        if (mainImage) {

            mainImage.style.opacity = "0";


            setTimeout(() => {

                mainImage.src =
                    images[currentImage];

                mainImage.alt =
                    product.name;

                mainImage.style.opacity = "1";

            }, 120);

        }


        if (counter) {

            counter.textContent =
                `${String(currentImage + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

        }


        document
            .querySelectorAll(".thumb")
            .forEach((thumb, i) => {

                thumb.classList.toggle(
                    "active",
                    i === currentImage
                );

            });

    }


    if (thumbnails) {

        thumbnails.innerHTML = "";


        images.forEach((image, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "thumb aspect-square overflow-hidden border border-[#8d7950]/20 opacity-60";


            button.innerHTML = `
                <img
                    src="${image}"
                    alt="${product.name}"
                    class="w-full h-full object-cover"
                >
            `;


            button.addEventListener(
                "click",
                () => showImage(index)
            );


            thumbnails.appendChild(button);

        });

    }


    const prev =
        document.getElementById("prevImage");

    if (prev) {

        prev.addEventListener(
            "click",
            () => showImage(currentImage - 1)
        );

    }


    const next =
        document.getElementById("nextImage");

    if (next) {

        next.addEventListener(
            "click",
            () => showImage(currentImage + 1)
        );

    }


    showImage(0);


    /* =========================================
       SPECIFICATIONS
    ========================================= */

    const specifications =
        document.getElementById("specifications");


    if (specifications) {

        specifications.innerHTML = "";


        /* Dimensions */

        if (product.dimensions) {

            Object.entries(product.dimensions)
                .forEach(([key, value]) => {

                    const labels = {
                        width: "عرض",
                        depth: "عمق",
                        height: "ارتفاع"
                    };


                    const row =
                        document.createElement("div");

                    row.className =
                        "border-b border-[#8d7950]/20 py-6 px-1 flex items-center justify-between gap-6";


                    row.innerHTML = `
                        <span class="text-[9px] tracking-[.2em] text-[#77756e]">
                            ${labels[key] || key}
                        </span>

                        <span class="text-sm text-[#b6b1a5]">
                            ${value}
                        </span>
                    `;


                    specifications.appendChild(row);

                });

        }


        /* Materials */

        if (product.materials?.length) {

            const row =
                document.createElement("div");

            row.className =
                "border-b border-[#8d7950]/20 py-6 px-1 flex items-center justify-between gap-6";


            row.innerHTML = `
                <span class="text-[9px] tracking-[.2em] text-[#77756e]">
                    متریال
                </span>

                <span class="text-sm text-[#b6b1a5] text-left">
                    ${product.materials.join(" / ")}
                </span>
            `;


            specifications.appendChild(row);

        }


        /* Features */

        if (product.features?.length) {

            const row =
                document.createElement("div");

            row.className =
                "border-b border-[#8d7950]/20 py-6 px-1 flex items-start justify-between gap-6";


            row.innerHTML = `
                <span class="text-[9px] tracking-[.2em] text-[#77756e]">
                    ویژگی‌ها
                </span>

                <div class="text-sm text-[#b6b1a5] text-left leading-7">
                    ${product.features.join("<br>")}
                </div>
            `;


            specifications.appendChild(row);

        }

    }


    /* =========================================
       COLORS
    ========================================= */

    const colorOptions =
        document.getElementById("colorOptions");


    if (colorOptions) {

        colorOptions.innerHTML = "";


        if (!product.colors?.length) {

            colorOptions.innerHTML = `
                <div class="col-span-full
                            border border-[#8d7950]/20
                            p-8 text-center">

                    <p class="text-[10px] text-[#77756e]">
                        امکان انتخاب رنگ بر اساس سفارش
                    </p>

                </div>
            `;

        } else {

            product.colors.forEach(color => {

                const item =
                    document.createElement("div");

                item.className =
                    "border border-[#8d7950]/20 p-4";


                item.innerHTML = `
                    <div class="flex items-center gap-4">

                        <span
                            class="w-8 h-8 rounded-full border border-white/10"
                            style="background:${color.value}">
                        </span>

                        <span class="text-xs text-[#a8a398]">
                            ${color.name}
                        </span>

                    </div>
                `;


                colorOptions.appendChild(item);

            });

        }

    }


    /* =========================================
       WHATSAPP
    ========================================= */

    const whatsappButton =
        document.getElementById("whatsappButton");


    if (whatsappButton) {

        const message =
            encodeURIComponent(
                `سلام، برای محصول ${product.name} از کالکشن مرگن قیمت می‌خواستم.`
            );


        /*
          شماره واقعی واتساپ مرگن را اینجا قرار بده.
          مثال:
          989121234567
        */

        const whatsappNumber =
            "YOUR_WHATSAPP_NUMBER";


        whatsappButton.href =
            `https://wa.me/${whatsappNumber}?text=${message}`;

    }


    /* =========================================
       STORY
    ========================================= */

    const storyText =
        document.getElementById("storyText");


    if (storyText) {

        storyText.textContent =
            product.description;

    }


    /* =========================================
       MATERIAL TEXT
    ========================================= */

    const materialText =
        document.getElementById("materialText");


    if (materialText && product.materials?.length) {

        materialText.textContent =
            `در ساخت ${product.name} از ${product.materials.join("، ")} استفاده شده است. انتخاب متریال در کنار اجرای دقیق جزئیات، بخشی از شخصیت این محصول را شکل می‌دهد.`;

    }


    /* =========================================
       RELATED PRODUCTS
    ========================================= */

    const relatedContainer =
        document.getElementById("relatedProducts");


    if (relatedContainer) {

        relatedContainer.innerHTML = "";


        const relatedProducts =
            (product.related || [])
                .map(id => products[id])
                .filter(Boolean)
                .slice(0, 3);


        relatedProducts.forEach(item => {

            const image =
                item.images?.[0] || "";


            const card =
                document.createElement("a");


            card.href =
                `product.html?id=${item.id}`;


            card.className =
                "related-card group block";


            card.innerHTML = `

                <div class="relative
                            aspect-[4/5]
                            overflow-hidden
                            bg-[#0d0f0e]
                            border border-[#8d7950]/20">

                    <img
                        src="${image}"
                        alt="${item.name}"
                        class="w-full h-full object-cover"
                    >

                    <div class="absolute inset-0
                                bg-gradient-to-t
                                from-black/50
                                via-transparent
                                to-transparent
                                opacity-60
                                group-hover:opacity-30
                                transition">
                    </div>

                </div>


                <div class="mt-5 flex items-start justify-between gap-5">

                    <div>

                        <h3 class="serif text-xl text-[#e8dfca]">
                            ${item.name}
                        </h3>

                        <p class="mt-2 text-[8px]
                                  tracking-[.25em]
                                  text-[#77756e]">
                            ${item.englishName || "MERGEN"}
                        </p>

                    </div>

                    <span class="text-[#c1a96f] text-sm">
                        →
                    </span>

                </div>

            `;


            relatedContainer.appendChild(card);

        });


        /* اگر محصول مرتبط هنوز در products.js وجود ندارد */

        if (!relatedProducts.length) {

            relatedContainer.innerHTML = `
                <div class="col-span-full
                            border border-[#8d7950]/20
                            py-16 text-center">

                    <p class="text-[9px] tracking-[.25em]
                              text-[#66655f]">
                        MORE PRODUCTS COMING SOON
                    </p>

                </div>
            `;

        }

    }


    /* =========================================
       KEYBOARD GALLERY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "ArrowLeft") {
            showImage(currentImage + 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentImage - 1);
        }

    });

});
} catch (e) { console.error('MERGEN JS [PAGE product]:', e); }
};

/* ----------------------------------------------------------------------------
   PAGE · BABY COLLECTION  —  فایل: baby-collection.html
   ---------------------------------------------------------------------------- */
PAGES['baby-collection'] = function () {
try {
const stages=[
{age:'۰ — ۲ سال',title:'اولین پناه',tag:'امنیت / آرامش / نظم',counter:'۰۱ / ۰۴',image:'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1800&q=85',description:'اولین اتاق باید آرام، امن و منظم باشد. همه‌چیز در دسترس والدین قرار می‌گیرد و فضای کودک برای استراحت و رشد آزاد می‌ماند.',pieces:['تخت نوزاد','کمد','دراور','میز تعویض']},
{age:'۲ — ۵ سال',title:'دنیای بازی',tag:'بازی / کشف / استقلال',counter:'۰۲ / ۰۴',image:'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1800&q=85',description:'کودک حالا بیشتر حرکت می‌کند و دنیا را کشف می‌کند. فضای بازی، ذخیره‌سازی بیشتر و مبلمان در اندازه مناسب او به اتاق اضافه می‌شود.',pieces:['تخت کودک','کمد','دراور','میز کودک','صندلی کودک','شلف']},
{age:'۵ — ۸ سال',title:'دنیای یادگیری',tag:'تمرکز / خلاقیت / رشد',counter:'۰۳ / ۰۴',image:'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1800&q=85',description:'وقت آن است که اتاق یک فضای واقعی برای یادگیری هم داشته باشد. میز مطالعه، کتابخانه و فضاهای سازمان‌یافته وارد سیستم می‌شوند.',pieces:['تخت','کمد','دراور','میز مطالعه','کتابخانه','شلف']},
{age:'۸ — ۱۲ سال',title:'اتاق خودش',tag:'شخصیت / انتخاب / هویت',counter:'۰۴ / ۰۴',image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',description:'در این مرحله کودک دیگر فقط به یک اتاق نیاز ندارد؛ به یک فضای شخصی نیاز دارد. طراحی می‌تواند کاملاً با سلیقه، شخصیت و سبک زندگی او هماهنگ شود.',pieces:['تخت بزرگ‌تر','کمد','دراور','میز مطالعه','کتابخانه','فضای شخصی']}
];
const buttons=document.querySelectorAll('[data-stage]'),roomImage=document.getElementById('roomImage'),roomAge=document.getElementById('roomAge'),roomTitle=document.getElementById('roomTitle'),roomTag=document.getElementById('roomTag'),roomDescription=document.getElementById('roomDescription'),roomPieces=document.getElementById('roomPieces'),stageCounter=document.getElementById('stageCounter'),heroImage=document.getElementById('heroImage'),heroCounter=document.getElementById('heroCounter'),heroAge=document.getElementById('heroAge'),heroStage=document.getElementById('heroStage');
let currentStage=0,autoTimer=null,heroTimer=null;
function renderStage(i,restart=true){currentStage=i;const s=stages[i];buttons.forEach((b,n)=>b.classList.toggle('active',n===i));roomImage.classList.add('switching');setTimeout(()=>{roomImage.src=s.image;roomAge.textContent=s.age;roomTitle.textContent=s.title;roomTag.textContent=s.tag;roomDescription.textContent=s.description;stageCounter.textContent=s.counter;roomPieces.innerHTML=s.pieces.map(p=>'<span class="rounded-full border border-white/[.09] px-3 py-2 text-[10px] text-[#aab6af]">'+p+'</span>').join('');roomImage.classList.remove('switching')},300);if(restart)startAuto();}
function startAuto(){clearInterval(autoTimer);autoTimer=setInterval(()=>renderStage((currentStage+1)%stages.length,false),7000)}
function renderHero(i){const s=stages[i];heroImage.style.opacity='0';heroImage.style.filter='blur(4px)';setTimeout(()=>{heroImage.src=s.image;heroCounter.textContent='ROOM 0'+(i+1)+' / 04';heroAge.textContent=s.age;heroStage.textContent=s.title;heroImage.style.opacity='1';heroImage.style.filter='blur(0)'},350)}
function startHero(){let i=0;clearInterval(heroTimer);heroTimer=setInterval(()=>{i=(i+1)%stages.length;renderHero(i)},6000)}
buttons.forEach(b=>b.addEventListener('click',()=>renderStage(Number(b.dataset.stage))));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
renderStage(0,false);startAuto();startHero();
} catch (e) { console.error('MERGEN JS [PAGE baby-collection]:', e); }
};

/* ============================================================================
   PART 3 · START — بعد از آماده‌شدن DOM فقط کد همین صفحه اجرا می‌شود
   ============================================================================ */
(function () {
  const run = () => { try { (PAGES[PAGE] || function () {})(); } catch (e) { console.error('MERGEN JS [' + PAGE + ']:', e); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
