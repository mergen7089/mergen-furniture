# MERGEN — نسخه‌ی Tailwind

ساخت CSS (از همین پوشه):

    npm install
    npm run dev      # خروجی: dist/css/style.css
    npm run build    # خروجی: dist/css/style.min.css

## ساختار src/css (به ترتیب import در input.css)

| فایل | چیست |
|---|---|
| components.css | کلاس‌های تکراری که با @apply ساخته شده‌اند (c-...) + افزوده‌ها: c-sticky-link، c-lang، c-side-* |
| base.css | ریست‌ها و متغیرهای رنگ (شامل --btn-red و --btn-red-hover برای دکمه‌های لایت‌مود) |
| keyframes.css | انیمیشن‌ها |
| runtime.css | استایل المنت‌هایی که JS می‌سازد (Owl، thumbs، لینک‌های مگامنو، متریال) |
| kept-*.css | بخش‌هایی که طبق درخواست CSS دستی ماندند (Slider 01/02/03، Signature V3، Layered Scroll، Horizontal Layered، Orbit، sofaspace) |
| header-extras.css | انیمیشن روان مگامنو + ریسپانسیو هدر |
| nav-buttons.css | شکل مشترک دکمه‌های Next/Prev (اسلایدر 01 و Signature مثل اسلایدر 03) |

## کدام تغییر کجاست (آپدیت اکتبر)

- مگامنو (هاور روان): main.js (openMega / scheduleOpen) + header-extras.css
- منوی کناری دکمه‌ی سه‌خطی: HTML (#sideMenu, #sideOverlay) + main.js (openSide) + components.css (c-side-*)
- دکمه‌ی زبان FA/EN: HTML (.lang-toggle) + main.js (applyLang) + components.css (c-lang). فعلاً فقط وضعیت را در html[data-lang] و localStorage نگه می‌دارد.
- هاور لینک‌های هدر استیکی: components.css (c-sticky-link)
- نوار هاور هدر در لایت‌مود (قرمز): components.css (c-mega-nav)
- اندازه‌ی کارت وسط اسلایدر 01: kept-slider-01.css
- قرمز روشن‌تر دکمه‌های لایت‌مود: base.css (--btn-red)

## هنوز انجام نشده

- جداسازی CSS بر اساس بخش‌های HTML (فعلاً بر اساس نوع)
- ترجمه‌ی انگلیسی
- فایل img/kitchen1.jpg در پوشه‌ی img وجود ندارد (HTML به آن اشاره می‌کند)
