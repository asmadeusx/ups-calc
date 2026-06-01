(function () {
    'use strict';

    /* ── Элементы DOM ── */
    const devicesList = document.getElementById('devicesList');
    const template = document.getElementById('deviceTemplate');
    const btnAdd = document.getElementById('btnAddDevice');
    const marginInput = document.getElementById('marginPercent');
    const pfInput = document.getElementById('powerFactor');

    const elTotalWatts = document.getElementById('totalWatts');
    const elWithMargin = document.getElementById('withMargin');
    const elRecWatts = document.getElementById('recWatts');
    const elRecVA = document.getElementById('recVA');
    const elMarginLabel = document.getElementById('marginLabel');

    const langToggle = document.getElementById('langToggle');
    const themeToggle = document.getElementById('themeToggle');

    /* ── Словарь переводов ── */
    const translations = {
        ru: {
            title: "⚡ Калькулятор мощности ИБП",
            subtitle: "Рассчитайте необходимую мощность источника бесперебойного питания",
            addDevice: "＋ Добавить устройство",
            settingsSummary: "⚙ Настройки расчёта",
            marginLabel: "Запас мощности, %",
            marginHint: "Рекомендуется 20–30%",
            pfLabel: "Коэфф. мощности (PF)",
            pfHint: "Обычно 0.6–0.7 для линейно-интерактивных",
            resultsTitle: "📊 Результат расчёта",
            totalLoad: "Общая нагрузка",
            withMargin: "С запасом",
            recWatts: "Рекомендуемый ИБП (Вт)",
            recVA: "Рекомендуемый ИБП (ВА)",
            tip: "💡 Совет: выбирайте ИБП с номинальной мощностью не менее расчётного значения. Обратите внимание на реальную выходную мощность в ваттах, а не только на ВА.",
            calcInfoTitle: "📐 Как производится расчёт",
            formulasTitle: "🧮 Формулы",
            f1: "Общая нагрузка: Σ (Мощность устройства × Количество)",
            f2: "С запасом: Общая нагрузка × (1 + Запас / 100)",
            f3: "ИБП (Вт): = Мощность с запасом",
            f4: "ИБП (ВА): = Мощность с запасом ÷ Коэфф. мощности (PF)",
            whyTitle: "❓ Почему именно так?",
            whyText: "ИБП не рекомендуется нагружать «под завязку». Запас 20–30% компенсирует пусковые токи, естественный износ батарей, неидеальный КПД инвертора и позволяет оборудованию работать в щадящем режиме. Коэффициент PF (~0.6–0.7) учитывает разницу между активной (Вт) и полной (ВА) мощностью, что критично при подборе модели по каталогам, где производители часто указывают только ВА.",
            disclaimerTitle: "⚠️ Дисклеймер",
            disclaimerText: "Расчёты носят исключительно рекомендательный характер. Фактическое энергопотребление может отличаться от заявленного в зависимости от режима работы, загрузки компонентов, типа блоков питания и состояния электросети. Для критически важных систем обязательно учитывайте пусковые токи, требуемое время автономии и консультируйтесь с профильными инженерами. Разработчик не несёт ответственности за выбор и эксплуатацию оборудования.",
            langBtn: "🌐 RUS",
            themeIconDark: "🌙",
            themeIconLight: "☀️"
        },
        en: {
            title: "⚡ UPS Power Calculator",
            subtitle: "Calculate the required UPS capacity for your equipment",
            addDevice: "＋ Add Device",
            settingsSummary: "⚙ Calculation Settings",
            marginLabel: "Power Margin, %",
            marginHint: "Recommended: 20–30%",
            pfLabel: "Power Factor (PF)",
            pfHint: "Usually 0.6–0.7 for line-interactive UPS",
            resultsTitle: "📊 Calculation Result",
            totalLoad: "Total Load",
            withMargin: "With Margin",
            recWatts: "Recommended UPS (W)",
            recVA: "Recommended UPS (VA)",
            tip: "💡 Tip: Choose a UPS with a rated power not less than the calculated value. Pay attention to the actual output power in Watts, not just VA.",
            calcInfoTitle: "📐 How the Calculation Works",
            formulasTitle: "🧮 Formulas",
            f1: "Total Load: Σ (Device Power × Quantity)",
            f2: "With Margin: Total Load × (1 + Margin / 100)",
            f3: "UPS (W): = Power with Margin",
            f4: "UPS (VA): = Power with Margin ÷ Power Factor (PF)",
            whyTitle: "❓ Why this way?",
            whyText: "It's not recommended to load a UPS to its maximum capacity. A 20–30% margin compensates for inrush currents, battery aging, inverter inefficiency, and allows equipment to run in a gentle mode. The Power Factor (~0.6–0.7) accounts for the difference between Active (W) and Apparent (VA) power, which is critical when selecting a model from catalogs that often only list VA.",
            disclaimerTitle: "⚠️ Disclaimer",
            disclaimerText: "Calculations are for recommendation purposes only. Actual power consumption may vary depending on operating mode, component load, power supply type, and grid conditions. For critical systems (servers, medical, security), always account for inrush currents, required runtime, and consult qualified engineers. The developer assumes no liability for equipment selection and operation.",
            langBtn: "🌐 ENG",
            themeIconDark: "🌙",
            themeIconLight: "☀️"
        }
    };

    let currentLang = localStorage.getItem('ups_lang') || 'ru';
    let currentTheme = localStorage.getItem('ups_theme') || 'dark';
    let deviceCounter = 0;

    /* ── Переключение языка ── */
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('ups_lang', lang);
        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });

        langToggle.textContent = t.langBtn;
        document.documentElement.lang = lang;
        recalc(); // Обновить метку запаса
    }

    /* ── Переключение темы ── */
    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('ups_theme', theme);
        document.body.classList.toggle('light-theme', theme === 'light');
        themeToggle.textContent = theme === 'dark' ? translations[currentLang].themeIconDark : translations[currentLang].themeIconLight;
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
            const presetWatts = parseInt(select.options[select.selectedIndex].getAttribute('data-watts'), 10);
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

        rows.forEach(row => {
            const w = parseInt(row.querySelector('.watts-input').value, 10) || 0;
            const q = parseInt(row.querySelector('.qty-input').value, 10) || 1;
            row.querySelector('.subtotal-value').textContent = (w * q) + ' Вт';
            totalWatts += w * q;
        });

        const margin = (parseInt(marginInput.value, 10) || 0) / 100;
        const pf = parseFloat(pfInput.value) || 0.65;
        const withMargin = Math.ceil(totalWatts * (1 + margin));
        const recVA = Math.ceil(withMargin / pf);

        elTotalWatts.textContent = totalWatts + ' Вт';
        elWithMargin.textContent = withMargin + ' Вт';
        elRecWatts.textContent = withMargin + ' Вт';
        elRecVA.textContent = recVA + ' ВА';
        elMarginLabel.textContent = Math.round(margin * 100);
    }

    /* ── Инициализация ── */
    langToggle.addEventListener('click', () => applyLanguage(currentLang === 'ru' ? 'en' : 'ru'));
    themeToggle.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    
    marginInput.addEventListener('input', recalc);
    pfInput.addEventListener('input', recalc);
    btnAdd.addEventListener('click', () => createDeviceRow());

    applyTheme(currentTheme);
    applyLanguage(currentLang);

    // Стартовые устройства
    createDeviceRow('office_pc', 250);
    createDeviceRow('monitor_led', 35);
    createDeviceRow('router', 15);

})();