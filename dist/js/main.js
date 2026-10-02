/* =========================================================
   MERGEN — main.js
   نقشه بخش‌ها (همان ترتیب HTML و CSS): هر بخش با «SECTION nn» شروع می‌شود؛
   برای پیدا کردن هر بخش، همان را جست‌وجو کن. هر بخش در try/catch جداست
   و خطای یک بخش بقیه را خراب نمی‌کند.
   01 HEADER · 01 HERO · 02 PHILOSOPHY · 03 LAYERED · 04 SLIDER 01
   05 HORIZONTAL LAYERED · 06 SLIDER 02 · 07 MATERIAL TO SPACE · 08 ORBIT
   09 CONTACT · 10 COLLECTION · 11 SIGNATURE V3 · 12 SHOPPING GUIDE
   13 EXPERIENCE · 14 SLIDER 03 · 15 MATERIAL LIBRARY · 16 ABOUT · 17 FAQ · 18 FOOTER
   ========================================================= */

/* ==========================================================
   SECTION 01 HEADER — دارک‌مود، هدر استیکی، مگامنو، ناوبری بخش‌ها، بازگشت به بالا
   ========================================================== */
try {
/* کلاس dark همین الان توسط اسکریپت داخل <head> تنظیم شده (برای جلوگیری از فلش رنگی).
       پیش‌فرض سایت تم تاریکه؛ فقط وقتی کاربر قبلاً «روشن» رو انتخاب کرده، تاریک نیست. */
    const html=document.documentElement;
    const themeToggles=[document.getElementById('themeToggle'),
    document.getElementById('themeToggleSticky')].filter(Boolean);
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
    function openMega(key){renderMega(key);
        mega.classList.add('open');
        overlay.classList.add('open');
        megaButtons.forEach(b=>b.classList.toggle('active',b.dataset.mega===key))}
        function closeMega(){mega.classList.remove('open');
        overlay.classList.remove('open');megaButtons.forEach(b=>b.classList.remove('active'))}
        megaButtons.forEach(b=>{b.addEventListener('mouseenter',()=>openMega(b.dataset.mega));
        b.addEventListener('click',e=>{e.stopPropagation();
            openMega(b.dataset.mega)})});
            document.getElementById('menuButton').addEventListener('click',()=>{if(!mega.classList.contains('open'))renderMega('living');mega.classList.toggle('open')});
            document.getElementById('mobileToggle').addEventListener('click',()=>{if(!mega.classList.contains('open'))renderMega('living');mega.classList.toggle('open')});
            overlay.addEventListener('click',closeMega);
            document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMega()});
            mega.addEventListener('mouseleave',()=>closeMega());

    /* بازگشت به بالا (backTop) */
    document.getElementById('backTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});

    /* هایلایت لینک فعال در section-nav هنگام اسکرول */
    const links=[...document.querySelectorAll('.section-nav a')],targets=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55%'});targets.forEach(x=>io.observe(x));
} catch (e) { console.error('MERGEN JS [SECTION 01 HEADER — دارک‌مود، هدر استیکی، مگامنو، ناوبری بخش‌ها، بازگشت به بالا]:', e); }

/* ==========================================================
   SECTION 01 HERO — اسلایدر اصلی
   ========================================================== */
try {
$(function(){const $hero=$('.mergen-hero'),slides=$('.mergen-slide').toArray(),$title=$('.hero-title'),$kicker=$('.hero-kicker'),$desc=$('.hero-desc'),$current=$('#slide-current'),$progress=$('#progress'),$thumbs=$('#thumbs'),duration=7000;slides.forEach((s,i)=>{const bg=s.querySelector('.slide-bg').style.backgroundImage.slice(5,-2);$thumbs.append(`<button class="hero-thumb ${i===0?'active':''}" data-index="${i}"><img src="${bg}" alt=""><div class="text-center"><div class="hero-thumb-num">0${i+1}</div><div class="hero-thumb-title">${s.dataset.title}</div><div class="hero-thumb-desc">${s.dataset.desc}</div></div></button>`)});function ui(i){const s=slides[i];$current.text(String(i+1).padStart(2,'0'));$progress.css({transition:'none',width:'0%'});requestAnimationFrame(()=>requestAnimationFrame(()=>{$progress.css({transition:`width ${duration}ms linear`,width:'100%'})}));$('.hero-thumb').removeClass('active').eq(i).addClass('active')} $hero.owlCarousel({rtl:true,items:1,loop:true,dots:false,nav:false,autoplay:true,autoplayTimeout:duration,smartSpeed:1100,mouseDrag:true,touchDrag:true,animateOut:'fadeOut',animateIn:'fadeIn'});$hero.on('changed.owl.carousel',e=>ui(e.relatedTarget.relative(e.item.index)));$('#mergen-hero-slider .hero-nav-arrow.prev').on('click',()=> $hero.trigger('prev.owl.carousel'));$('#mergen-hero-slider .hero-nav-arrow.next').on('click',()=> $hero.trigger('next.owl.carousel'));$thumbs.on('click','.hero-thumb',function(){$hero.trigger('to.owl.carousel',[$(this).data('index'),900,true])});ui(0);
});
} catch (e) { console.error('MERGEN JS [SECTION 01 HERO — اسلایدر اصلی]:', e); }

/* ==========================================================
   SECTION 02 PHILOSOPHY
   ========================================================== */
try {
const phil=document.querySelector('.mg-philosophy');
if(phil){const io=new IntersectionObserver(es=>es.forEach(e=>phil.classList.toggle('is-active',e.isIntersecting)),{threshold:.28});io.observe(phil);}
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
            { title:"سرویس مدل اول", desc:"طراحی مینیمال با درب‌های بدون دستگیره", img:"./img/takht1.jfif" },
            { title:"سرویس مدل دوم", desc:"ترکیب چوب و نور مخفی پشت پنل", img:"./img/takht2.jfif" },
            { title:"سرویس مدل سوم", desc:"قفسه‌بندی باز با نورپردازی نقطه‌ای", img:"./img/takht3.jfif" },
            { title:"سرویس مدل چهارم", desc:"درب‌های براق با هندل مخفی", img:"./img/takht4.jpg" },
            { title:"سرویس مدل پنجم", desc:"رنگ‌بندی خنثی و خطوط ساده", img:"./img/takht5.jfif" },
            { title:"سرویس مدل ششم", desc:"جداکننده فضا با طرح هندسی", img:"./img/takht6.jfif" },
            { title:"سرویس مدل هفتم", desc:"ترکیب سنگ و فلز در طراحی نشیمن", img:"./img/takht7.jfif" },
            { title:"سرویس مدل هشتم", desc:"نورپردازی غیرمستقیم دور سقف", img:"./img/takht8.jfif" }
        ];

        const row2Items = [
            { title:"سرویس مدل نهم", desc:"طراحی با قاب‌های برجسته و رنگ گرم", img:"./img/takht9.jpg" },
            { title:"سرویس مدل دهم", desc:"بافت سنگ طبیعی در دیوار پذیرایی", img:"./img/takht10.jpg" },
            { title:"سرویس مدل یازدهم", desc:"نمایش دکوری اشیا در طبقات باز", img:"./img/takht11.jpg" },
            { title:"سرویس مدل دوازدهم", desc:"طراحی جزیره‌ای با روشنایی آویز", img:"./img/takht12.jpg" },
            { title:"سرویس مدل سیزدهم", desc:"بافت گرم چوب در فضای خواب", img:"./img/takht13.jpg" },
            { title:"سرویس مدل چهاردهم", desc:"طرح مشبک فلزی برای تفکیک فضا", img:"./img/takht14.webp" },
            { title:"سرویس مدل پانزدهم", desc:"طراحی ساده با صندلی‌های هماهنگ", img:"./img/takht15.webp" },
            { title:"سرویس مدل شانزدهم", desc:"خطوط نوری کم‌مصرف در طراحی سقف", img:"./img/takht16.webp" }
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
   SECTION 07 MATERIAL TO SPACE
   ========================================================== */
try {
  const ms=document.querySelector('#material-space');
  const msStages=ms?[...ms.querySelectorAll('.mg-ms-stage')]:[];
  const msImage=ms?.querySelector('.mg-ms-image');
  const msProgress=ms?.querySelector('.mg-ms-progress i');
  const msImages=['./img/workshop.jpg','./img/mobl7.png','./img/mobl8.png','./img/mobl9.jfif','./img/naharkhori4.jpg','./img/modern-bedset.jpg'];
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
} catch (e) { console.error('MERGEN JS [SECTION 07 MATERIAL TO SPACE]:', e); }

/* ==========================================================
   SECTION 08 ORBIT SLIDER
   ========================================================== */
try {
(() => {
  const section = document.getElementById('orbit-slider');
  if (!section) return;
  const stage = section.querySelector('.mg-orbit-stage');
  const cards = [...section.querySelectorAll('.mg-orbit-card')];
  if (!stage || !cards.length || !cards[0].animate) return;

  /* زمان‌بندی (میلی‌ثانیه): هر اسلاید SLIDE طول می‌کشد و اسلاید بعدی هر GAP ثانیه شروع می‌شود */
  const SLIDE = 9600, GAP = 8600, CYCLE = GAP * cards.length;
  const EASE = 'cubic-bezier(.45,0,.25,1)';
  let anims = [], visible = false;

  function build() {
    const keep = anims.length ? anims[0].currentTime : 0;
    anims.forEach(a => a.cancel());

    const S = stage.clientWidth, H = stage.clientHeight, small = S < 700;
    const cw = small ? Math.round(S * .64) : Math.min(Math.max(Math.round(S * .27), 280), 440);
    const ch = Math.min(Math.round(cw * (small ? 1.1 : .82)), Math.round(H * .58));
    stage.style.setProperty('--ocw', cw + 'px');
    stage.style.setProperty('--och', ch + 'px');

    const pad   = Math.round(H * .05);
    const yUp   = pad, yDown = H - ch - pad;
    const xIn   = S + 60;                              /* بیرون از سمت راست */
    const x1    = Math.round(S * .22);                 /* سه‌چهارم عرض به داخل آمده */
    const x2    = Math.min(x1 + Math.round(S * .5), S - cw - 8);   /* نصف عرض به راست */
    const xOut  = -cw - 80;                            /* خروج از سمت چپ */

    const f = (ms, x, y, o, b, s) => ({
      offset: ms / CYCLE, opacity: o, easing: EASE,
      transform: `translate3d(${x}px,${y}px,0) scale(${s})`, filter: `blur(${b}px)`
    });
    const frames = [
      f(0,    xIn, yUp,   0, 22, .94),   /* ۱) وارد می‌شود: بلور، از راست */
      f(1300, x1,  yUp,   1, 0,  1),     /* ۲) می‌آید جلو و شفاف می‌شود */
      f(2300, x1,  yUp,   1, 0,  1),
      f(3500, x1,  yDown, 1, 0,  1),     /* ۳) می‌آید پایین */
      f(5300, x2,  yDown, 1, 0,  1),     /* ۴) نصف عرض به راست */
      f(6100, x2,  yDown, 1, 0,  1),
      f(7200, x2,  yUp,   1, 0,  1),     /* ۵) می‌رود بالا */
      f(7700, x2,  yUp,   1, 0,  1),
      f(8600, (x2 + xOut) / 2, yUp, .55, 12, .96),   /* ۶) بلور می‌شود و به چپ می‌رود */
      f(SLIDE, xOut, yUp, 0, 24, .92),
      f(CYCLE, xOut, yUp, 0, 24, .92)
    ];
    anims = cards.map((card, i) => card.animate(frames, {
      duration: CYCLE, delay: i * GAP, iterations: Infinity, fill: 'both'
    }));
    anims.forEach(a => { a.currentTime = keep; if (!visible) a.pause(); });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards[0].style.opacity = 1;
    cards[0].style.transform = 'translate3d(' + Math.round(stage.clientWidth * .22) + 'px,20px,0)';
    return;
  }
  build();
  new IntersectionObserver(es => {
    visible = es[0].isIntersecting;
    anims.forEach(a => visible ? a.play() : a.pause());
  }, { threshold: .15 }).observe(section);

  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 150); });
})();

} catch (e) { console.error('MERGEN JS [SECTION 08 ORBIT SLIDER]:', e); }

/* SECTION 09 CONTACT / SOCIALS — بدون جاوااسکریپت اختصاصی */

/* ==========================================================
   SECTION 10 COLLECTION SHOWCASE
   ========================================================== */
try {
const vcCollections=[
    {number:'01',title:'کنسول',english:'BEDROOM COLLECTION',description:'طراحی و اجرای سرویس خواب مدرن و سفارشی با جزئیات دقیق، متناسب با فضای شما.',image:'./img/console.webp'},
    {number:'02',title:'کاور رادیاتور',english:'LIVING COLLECTION',description:'مبلمان مدرن و لوکس برای ایجاد فضایی متفاوت، گرم و ماندگار.',image:'./img/coverradiator.jfif'},
    {number:'03',title:'میز و صندلی',english:'DINING COLLECTION',description:'میزهای غذاخوری، مدیریتی و سفارشی با تمرکز بر فرم، متریال و جزئیات.',image:'./img/chair.jpg'},
    {number:'04',title:'کمد لباس',english:'CONSOLE COLLECTION',description:'کنسول‌های مینیمال و خاص برای کامل کردن هویت بصری فضای داخلی.',image:'./img/wardrobe.jpeg'},
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
    {title:'مدل اول',desc:'آرامش در جزئیات',img:'./img/naharkhori1.jfif'},
    {title:'مدل دوم',desc:'راحتی در کنار زیبایی',img:'./img/naharkhori2.jfif'},
    {title:'مدل سوم',desc:'ترکیب زیبایی و کارایی',img:'./img/naharkhori3.jfif'},
    {title:'مدل چهارم',desc:'نظم با طراحی اختصاصی',img:'./img/naharkhori4.jpg'},
    {title:'مدل پنجم',desc:'طراحی مدرن و ماندگار',img:'./img/naharkhori5.jpg'},
    {title:'مدل ششم',desc:'فضایی که شبیه شماست',img:'./img/naharkhori6.webp'}
    ];
    const v3Carousel=document.getElementById('carousel'),v3Thumbs=document.getElementById('v3Thumbs');let v3Current=0,v3Animating=false,v3StartX=0,v3Dragging=false;const v3Cards=[];
    v3Products.forEach((p,i)=>{const c=document.createElement('article');c.className='card';c.innerHTML=`<img src="${p.img}" alt="${p.title}"><div class="meta"><small>MERGEN / ${String(i+1).padStart(2,'0')}</small><strong>${p.title}</strong><span>${p.desc}</span></div>`;c.addEventListener('click',()=>{if(!v3Animating){const d=(i-v3Current+v3Products.length)%v3Products.length;if(d===0)return;if(d<=3)v3Go(d);else v3Go(d-v3Products.length)}});v3Carousel.appendChild(c);v3Cards.push(c);const t=document.createElement('button');t.className='thumb';t.innerHTML=`<img src="${p.img}" alt="">`;t.addEventListener('click',()=>v3Select(i));v3Thumbs.appendChild(t)});
    function v3Wrap(n){return(n+v3Products.length)%v3Products.length}
    function v3Position(){v3Cards.forEach((c,i)=>{let d=i-v3Current;if(d>3)d-=v3Products.length;if(d<-3)d+=v3Products.length;c.className='card '+(d===0?'pos0':d===1?'pos1':d===2?'pos2':d===3?'pos3':d===-1?'pos-1':d===-2?'pos-2':'posm3')+(d===0?' active':'')});document.getElementById('v3title').textContent=v3Products[v3Current].title;document.getElementById('v3desc').textContent=v3Products[v3Current].desc;document.getElementById('v3counter').textContent=String(v3Current+1).padStart(2,'0');document.getElementById('v3progress').style.width=((v3Current+1)/v3Products.length*100)+'%';[...v3Thumbs.children].forEach((t,i)=>t.classList.toggle('active',i===v3Current))}
    function v3Select(i){let d=i-v3Current;if(d>v3Products.length/2)d-=v3Products.length;if(d<-v3Products.length/2)d+=v3Products.length;v3Go(d)}
    function v3Go(step){if(v3Animating||step===0)return;v3Animating=true;v3Current=v3Wrap(v3Current+step);v3Position();setTimeout(()=>v3Animating=false,870)}
    document.getElementById('next').onclick=()=>v3Go(1);document.getElementById('prev').onclick=()=>v3Go(-1);window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')v3Go(1);if(e.key==='ArrowLeft')v3Go(-1)});
    v3Carousel.addEventListener('pointerdown',e=>{v3Dragging=true;v3StartX=e.clientX;v3Carousel.setPointerCapture(e.pointerId);clearInterval(v3Timer)});v3Carousel.addEventListener('pointerup',e=>{if(!v3Dragging)return;v3Dragging=false;const dx=e.clientX-v3StartX;if(Math.abs(dx)>55)v3Go(dx<0?1:-1);restartV3Timer()});v3Carousel.addEventListener('pointercancel',()=>{v3Dragging=false;restartV3Timer()});v3Position();let v3Timer=setInterval(()=>v3Go(1),5200);function restartV3Timer(){clearInterval(v3Timer);v3Timer=setInterval(()=>v3Go(1),5200)}['mouseenter','touchstart'].forEach(ev=>v3Carousel.addEventListener(ev,()=>clearInterval(v3Timer)));['mouseleave','touchend'].forEach(ev=>v3Carousel.addEventListener(ev,restartV3Timer));
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
image:'./img/designing.jpg'},
{label:'SERVICES',title:'از ایده تا اجرای نهایی، کنار شما.',
desc:'طراحی، CNC، ساخت سفارشی و اجرای پروژه در یک مسیر منسجم و دقیق انجام می‌شود.',
image:'./img/workshop.jpg'}];
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
    $('#customCarousel').owlCarousel({rtl:true,loop:true,center:true,margin:22,nav:true,dots:false,autoplay:true,autoplayTimeout:3200,autoplayHoverPause:true,smartSpeed:750,responsive:{0:{items:1.1},600:{items:2},900:{items:3}}});
});
} catch (e) { console.error('MERGEN JS [SECTION 14 SLIDER 03 / CUSTOM PRODUCTS]:', e); }

/* ==========================================================
   SECTION 15 MATERIAL LIBRARY / OFF-CANVAS / SUPPORT
   ========================================================== */
try {
(function(){const materials=document.getElementById('materialsCanvas'),open=document.getElementById('materialsOpen'),close=document.getElementById('materialsClose'),grid=document.getElementById('materialGrid');if(materials&&open&&close){open.addEventListener('click',()=>{materials.classList.add('open');materials.setAttribute('aria-hidden','false');document.body.classList.add('canvas-open')});close.addEventListener('click',()=>{materials.classList.remove('open');materials.setAttribute('aria-hidden','true');document.body.classList.remove('canvas-open')});materials.addEventListener('click',e=>{if(e.target===materials)close.click()})}const materialData={wood:[['بلوط طبیعی','./img/placeholders/ph-3.svg'],['گردو','./img/placeholders/ph-2.svg'],['راش','./img/placeholders/ph-6.svg'],['ونگه','./img/placeholders/ph-5.svg']],color:[['سبز مرگن','#173b32'],['سبز تیره','#0b1713'],['زغالی','#171b19'],['کرم گرم','#c9bca7'],['سفید گرم','#eee9df'],['قهوه‌ای گردویی','#4b3628']],vacuum:[['روکش چوب','./img/placeholders/ph-1.svg'],['مات سنگ','./img/placeholders/ph-2.svg'],['طرح مرمر','./img/placeholders/ph-2.svg'],['طرح بتن','./img/placeholders/ph-1.svg']],fabric:[['Linen 01','./img/placeholders/ph-5.svg'],['Boucle 02','./img/placeholders/ph-1.svg'],['Velvet 03','./img/placeholders/ph-1.svg'],['Texture 04','./img/placeholders/ph-6.svg']]};function renderMaterial(type){if(!grid)return;grid.innerHTML=materialData[type].map(x=>type==='color'?`<button class="mm-swatch"><span style="background:${x[1]}"></span><b>${x[0]}</b></button>`:`<button class="mm-sample"><img src="${x[1]}" alt="${x[0]}"><b>${x[0]}</b></button>`).join('')}document.querySelectorAll('.mm-tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.mm-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderMaterial(t.dataset.material)}));renderMaterial('wood');const support=document.getElementById('supportButton'),panel=document.getElementById('supportPanel'),sc=document.getElementById('supportClose');function toggleSupport(v){panel.classList.toggle('open',v);panel.setAttribute('aria-hidden',String(!v))}support&&support.addEventListener('click',()=>toggleSupport(!panel.classList.contains('open')));sc&&sc.addEventListener('click',()=>toggleSupport(false));document.addEventListener('click',e=>{if(panel&&panel.classList.contains('open')&&!panel.contains(e.target)&&!support.contains(e.target))toggleSupport(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(materials&&materials.classList.contains('open'))close.click();if(panel&&panel.classList.contains('open'))toggleSupport(false)}})})();
} catch (e) { console.error('MERGEN JS [SECTION 15 MATERIAL LIBRARY / OFF-CANVAS / SUPPORT]:', e); }

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
   SECTION 17 FAQ
   ========================================================== */
try {
document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>{const item=q.parentElement;document.querySelectorAll('.faq-item').forEach(x=>{if(x!==item)x.classList.remove('open')});item.classList.toggle('open')});
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
