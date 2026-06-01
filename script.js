(function () {
    'use strict';

    const devicesList = document.getElementById('devicesList');
    const template = document.getElementById('deviceTemplate');
    const btnAdd = document.getElementById('btnAddDevice');
    const marginInput = document.getElementById('marginPercent');
    const pfInput = document.getElementById('powerFactor');

    const elTotalWatts = document.getElementById('totalWatts');
    const elWithMargin = document.getElementById('withMargin');
    const elRecWatts = document.getElementById('recWatts');
    const elRecVA = document.getElementById('recVA');
    const elMarginValue = document.getElementById('marginValue');

    const langToggle = document.getElementById('langToggle');
    const themeToggle = document.getElementById('themeToggle');

    /* ── Словарь переводов ── */
    const t = {
        ru: {
            pageTitle: "Калькулятор мощности ИБП",
            title: "⚡ Калькулятор мощности ИБП",
            subtitle: "Рассчитайте необходимую мощность источника бесперебойного питания",
            deviceLabel: "Устройство",
            powerLabel: "Мощность, Вт",
            qtyLabel: "Кол-во",
            totalLabel: "Итого",
            customOpt: "— Своё значение —",
            customNamePh: "Название...",
            wattsPh: "Вт",
            grp_computers: "💻 Компьютеры", grp_monitors: "🖥 Мониторы", grp_peripherals: "🖨 Периферия",
            grp_network: "🌐 Сеть и хранение", grp_other: "📺 Прочее",
            opt_office_pc: "ПК офисный (~250 Вт)", opt_home_pc: "ПК домашний (~400 Вт)",
            opt_gaming_pc: "ПК игровой (~650 Вт)", opt_workstation: "Рабочая станция (~900 Вт)", opt_mini_pc: "Мини-ПК / неттоп (~65 Вт)",
            opt_monitor_led: "Монитор LED 22–24\" (~35 Вт)", opt_monitor_large: "Монитор 27–32\" (~65 Вт)", opt_monitor_ultrawide: "Монитор ultrawide (~80 Вт)",
            opt_ip_phone: "IP-телефон (~5 Вт)", opt_printer: "Принтер лазерный (~400 Вт)", opt_ink_printer: "Принтер струйный (~30 Вт)",
            opt_mfp: "МФУ (~600 Вт)", opt_scanner: "Сканер (~25 Вт)", opt_speakers: "Колонки (~20 Вт)", opt_webcam: "Веб-камера (~5 Вт)",
            opt_router: "Роутер (~15 Вт)", opt_switch: "Коммутатор (~20 Вт)", opt_nas: "NAS (~50 Вт)",
            opt_server_1u: "Сервер 1U (~350 Вт)", opt_server_tower: "Сервер башенный (~600 Вт)",
            opt_tv: "Телевизор (~100 Вт)", opt_ups_charger: "Зарядка ИБП (~50 Вт)",
            addDevice: "＋ Добавить устройство",
            settingsSummary: "⚙ Настройки расчёта", marginLabel: "Запас мощности, %", marginHint: "Рекомендуется 20–30%",
            pfLabel: "Коэфф. мощности (PF)", pfHint: "Обычно 0.6–0.7 для линейно-интерактивных",
            resultsTitle: "📊 Результат расчёта", totalLoad: "Общая нагрузка", withMargin: "С запасом",
            recWatts: "Рекомендуемый ИБП (Вт)", recVA: "Рекомендуемый ИБП (ВА)",
            tip: "💡 Совет: выбирайте ИБП с номинальной мощностью не менее расчётного значения. Обратите внимание на реальную выходную мощность в ваттах, а не только на ВА.",
            calcInfoTitle: "📐 Как производится расчёт", formulasTitle: "🧮 Формулы",
            f1: "Общая нагрузка: Σ (Мощность устройства × Количество)", f2: "С запасом: Общая нагрузка × (1 + Запас / 100)",
            f3: "ИБП (Вт): = Мощность с запасом", f4: "ИБП (ВА): = Мощность с запасом ÷ Коэфф. мощности (PF)",
            whyTitle: "❓ Почему именно так?",
            whyText: "ИБП не рекомендуется нагружать «под завязку». Запас 20–30% компенсирует пусковые токи, естественный износ батарей, неидеальный КПД инвертора и позволяет оборудованию работать в щадящем режиме. Коэффициент PF (~0.6–0.7) учитывает разницу между активной (Вт) и полной (ВА) мощностью, что критично при подборе модели по каталогам, где производители часто указывают только ВА.",
            disclaimerTitle: "⚠️ Дисклеймер",
            disclaimerText: "Расчёты носят исключительно рекомендательный характер. Фактическое энергопотребление может отличаться от заявленного в зависимости от режима работы, загрузки компонентов, типа блоков питания и состояния электросети. Для критически важных систем обязательно учитывайте пусковые токи, требуемое время автономии и консультируйтесь с профильными инженерами. Разработчик не несёт ответственности за выбор и эксплуатацию оборудования.",
            langBtn: "🌐 RUS", themeDark: "🌙", themeLight: "☀️",
            wattUnit: " Вт", vaUnit: " ВА"
        },
        en: {
            pageTitle: "UPS Power Calculator",
            title: "⚡ UPS Power Calculator",
            subtitle: "Calculate the required UPS capacity for your equipment",
            deviceLabel: "Device",
            powerLabel: "Power, W",
            qtyLabel: "Qty",
            totalLabel: "Total",
            customOpt: "— Custom Value —",
            customNamePh: "Name...",
            wattsPh: "W",
            grp_computers: "💻 Computers", grp_monitors: "🖥 Monitors", grp_peripherals: "🖨 Peripherals",
            grp_network: "🌐 Network & Storage", grp_other: "📺 Other",
            opt_office_pc: "Office PC (~250 W)", opt_home_pc: "Home PC (~400 W)",
            opt_gaming_pc: "Gaming PC (~650 W)", opt_workstation: "Workstation (~900 W)", opt_mini_pc: "Mini-PC / Nettop (~65 W)",
            opt_monitor_led: "LED Monitor 22–24\" (~35 W)", opt_monitor_large: "Monitor 27–32\" (~65 W)", opt_monitor_ultrawide: "Ultrawide Monitor (~80 W)",
            opt_ip_phone: "IP Phone (~5 W)", opt_printer: "Laser Printer (~400 W)", opt_ink_printer: "Inkjet Printer (~30 W)",
            opt_mfp: "MFP (~600 W)", opt_scanner: "Scanner (~25 W)", opt_speakers: "Speakers (~20 W)", opt_webcam: "Webcam (~5 W)",
            opt_router: "Router (~15 W)", opt_switch: "Switch (~20 W)", opt_nas: "NAS (~50 W)",
            opt_server_1u: "1U Server (~350 W)", opt_server_tower: "Tower Server (~600 W)",
            opt_tv: "TV (~100 W)", opt_ups_charger: "UPS Charger (~50 W)",
            addDevice: "＋ Add Device",
            settingsSummary: "⚙ Calculation Settings", marginLabel: "Power Margin, %", marginHint: "Recommended: 20–30%",
            pfLabel: "Power Factor (PF)", pfHint: "Usually 0.6–0.7 for line-interactive UPS",
            resultsTitle: "📊 Calculation Result", totalLoad: "Total Load", withMargin: "With Margin",
            recWatts: "Recommended UPS (W)", recVA: "Recommended UPS (VA)",
            tip: "💡 Tip: Choose a UPS with rated power ≥ calculated value. Pay attention to actual output in Watts, not just VA.",
            calcInfoTitle: "📐 How it Works", formulasTitle: "🧮 Formulas",
            f1: "Total Load: Σ (Device Power × Quantity)", f2: "With Margin: Total Load × (1 + Margin / 100)",
            f3: "UPS (W): = Power with Margin", f4: "UPS (VA): = Power with Margin ÷ Power Factor (PF)",
            whyTitle: "❓ Why this way?",
            whyText: "It's not recommended to load a UPS to 100%. A 20–30% margin compensates for inrush currents, battery aging, inverter inefficiency, and extends equipment lifespan. PF (~0.6–0.7) accounts for Active (W) vs Apparent (VA) power difference, critical for catalog comparison where only VA is often listed.",
            disclaimerTitle: "⚠️ Disclaimer",
            disclaimerText: "Calculations are for recommendation purposes only. Actual consumption varies by load, components, PSU type, and grid conditions. For critical systems, always account for inrush currents, required runtime, and consult qualified engineers. The developer assumes no liability for equipment selection or operation.",
            langBtn: "🌐 ENG", themeDark: "🌙", themeLight: "☀️",
            wattUnit: " W", vaUnit: " VA"
        }
    };

    let currentLang = localStorage.getItem('ups_lang') || 'ru';
    let currentTheme = localStorage.getItem('ups_theme') || 'dark';
    let deviceCounter = 0;

    /* ── Переключение языка ── */
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('ups_lang', lang);
        const dict = t[lang];

        // Текстовое содержимое
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });

        // Плейсхолдеры
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });

        // Заголовки опций и опций
        document.querySelectorAll('select option[data-i18n], optgroup[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });

        // Заголовок страницы и кнопки
        document.title = dict.pageTitle;
        langToggle.textContent = dict.langBtn;
        document.documentElement.lang = lang;
        themeToggle.textContent = currentTheme === 'dark' ? dict.themeDark : dict.themeLight;

        recalc(); // Обновить единицы измерения и метку запаса
    }

    /* ── Переключение темы ── */
    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('ups_theme', theme);
        document.body.classList.toggle('light-theme', theme === 'light');
        const dict = t[currentLang];
        themeToggle.textContent = theme === 'dark' ? dict.themeDark : dict.themeLight;
    }

    /* ── Создание строки устройства ── */
    function createDeviceRow(type, watts) {
        deviceCounter++;
        const clone = template.cloneNode(true);
        clone.removeAttribute('id');
        clone.style.display = '';

        const row = clone.querySelector('.device-row');
        row.dataset.id = deviceCounter;

        const select = row.querySelector('.device-select');
        const customName = row.querySelector('.custom-name');
        const wattsInput = row.querySelector('.watts-input');
        const qtyInput = row.querySelector('.qty-input');
        const subtotal = row.querySelector('.subtotal-value');
        const btnRemove = row.querySelector('.btn-remove');

        if (type) select.value = type;

        select.addEventListener('change', function () {
            const opt = select.options[select.selectedIndex];
            const presetWatts = parseInt(opt.getAttribute('data-watts'), 10);

            if (select.value === 'custom') {
                customName.style.display = '';
                wattsInput.value = '';
                wattsInput.focus();
            } else {
                customName.style.display = 'none';
                if (presetWatts) wattsInput.value = presetWatts;
            }
            recalc();
        });

        wattsInput.addEventListener('input', recalc);
        qtyInput.addEventListener('input', recalc);
        btnRemove.addEventListener('click', function () { row.remove(); recalc(); });

        devicesList.appendChild(clone);
        recalc();
    }

    /* ── Пересчёт ── */
    function recalc() {
        let totalWatts = 0;
        const rows = devicesList.querySelectorAll('.device-row');
        const dict = t[currentLang];

        rows.forEach(row => {
            const w = parseInt(row.querySelector('.watts-input').value, 10) || 0;
            const q = parseInt(row.querySelector('.qty-input').value, 10) || 1;
            row.querySelector('.subtotal-value').textContent = (w * q) + dict.wattUnit;
            totalWatts += w * q;
        });

        const margin = (parseInt(marginInput.value, 10) || 0) / 100;
        const pf = parseFloat(pfInput.value) || 0.65;
        const withMargin = Math.ceil(totalWatts * (1 + margin));
        const recVA = Math.ceil(withMargin / pf);

        elTotalWatts.textContent = totalWatts + dict.wattUnit;
        elWithMargin.textContent = withMargin + dict.wattUnit;
        elRecWatts.textContent = withMargin + dict.wattUnit;
        elRecVA.textContent = recVA + dict.vaUnit;
        elMarginValue.textContent = Math.round(margin * 100);
    }

    /* ── Инициализация ── */
    langToggle.addEventListener('click', () => applyLanguage(currentLang === 'ru' ? 'en' : 'ru'));
    themeToggle.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    
    marginInput.addEventListener('input', recalc);
    pfInput.addEventListener('input', recalc);
    btnAdd.addEventListener('click', () => createDeviceRow());

    // Применение сохранённых настроек и стартовые устройства
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    createDeviceRow('office_pc', 250);
    createDeviceRow('monitor_led', 35);
    createDeviceRow('router', 15);

})();