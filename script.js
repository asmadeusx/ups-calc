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

    const dict = {
        ru: {
            pageTitle: "Калькулятор мощности ИБП",
            title: "⚡ Калькулятор мощности ИБП",
            subtitle: "Рассчитайте необходимую мощность источника бесперебойного питания",
            deviceLabel: "Устройство", powerLabel: "Мощность, Вт", qtyLabel: "Кол-во", totalLabel: "Итого",
            customOpt: "— Своё значение —", customNamePh: "Название...", wattsPh: "Вт",
            addDevice: "＋ Добавить устройство", settingsSummary: "⚙ Настройки расчёта",
            marginLabel: "Запас мощности, %", marginHint: "Рекомендуется 20–30%",
            pfLabel: "Коэфф. мощности (PF)", pfHint: "Обычно 0.6–0.7 для линейно-интерактивных",
            resultsTitle: "📊 Результат расчёта", totalLoad: "Общая нагрузка", withMargin: "С запасом",
            recWatts: "Рекомендуемый ИБП (Вт)", recVA: "Рекомендуемый ИБП (ВА)",
            tip: "💡 Совет: выбирайте ИБП с номинальной мощностью не менее расчётного значения. Обратите внимание на реальную выходную мощность в ваттах, а не только на ВА.",
            printerWarning: "⚠️ Важно: крайне не рекомендуется подключать лазерные принтеры и МФУ через ИБП. В момент разогрева термопечки их мгновенное энергопотребление может кратковременно достигать 1000–1500 Вт, что вызывает перегрузку инвертора, срабатывание защиты или отключение всего подключённого оборудования.",
            calcInfoTitle: "📐 Как производится расчёт", formulasTitle: "🧮 Формулы",
            f1: "Общая нагрузка: Σ (Мощность устройства × Количество)", f2: "С запасом: Общая нагрузка × (1 + Запас / 100)",
            f3: "ИБП (Вт): = Мощность с запасом", f4: "ИБП (ВА): = Мощность с запасом ÷ Коэфф. мощности (PF)",
            whyTitle: "❓ Почему именно так?",
            whyText: "ИБП не рекомендуется нагружать «под завязку». Запас 20–30% компенсирует пусковые токи, естественный износ батарей, неидеальный КПД инвертора и позволяет оборудованию работать в щадящем режиме. Коэффициент PF (~0.6–0.7) учитывает разницу между активной (Вт) и полной (ВА) мощностью, что критично при подборе модели по каталогам, где производители часто указывают только ВА.",
            disclaimerTitle: "⚠️ Дисклеймер",
            disclaimerText: "Расчёты носят исключительно рекомендательный характер. Фактическое энергопотребление может отличаться от заявленного в зависимости от режима работы, загрузки компонентов, типа блоков питания и состояния электросети. Для критически важных систем обязательно учитывайте пусковые токи, требуемое время автономии и консультируйтесь с профильными инженерами. Разработчик не несёт ответственности за выбор и эксплуатацию оборудования.",
            langBtn: "🌐 RUS", themeDark: "🌙", themeLight: "☀️",
            wattUnit: " Вт", vaUnit: " ВА",
            deviceOptions: [
                { id: 'custom', group: 'grp_custom', label: '— Своё значение —', watts: 0 },
                { id: 'office_pc', group: 'grp_computers', label: 'ПК офисный (~250 Вт)', watts: 250 },
                { id: 'home_pc', group: 'grp_computers', label: 'ПК домашний (~400 Вт)', watts: 400 },
                { id: 'gaming_pc', group: 'grp_computers', label: 'ПК игровой (~650 Вт)', watts: 650 },
                { id: 'workstation', group: 'grp_computers', label: 'Рабочая станция (~900 Вт)', watts: 900 },
                { id: 'mini_pc', group: 'grp_computers', label: 'Мини-ПК / неттоп (~65 Вт)', watts: 65 },
                { id: 'monitor_led', group: 'grp_monitors', label: 'Монитор LED 22–24" (~35 Вт)', watts: 35 },
                { id: 'monitor_large', group: 'grp_monitors', label: 'Монитор 27–32" (~65 Вт)', watts: 65 },
                { id: 'monitor_ultrawide', group: 'grp_monitors', label: 'Монитор ultrawide (~80 Вт)', watts: 80 },
                { id: 'ip_phone', group: 'grp_peripherals', label: 'IP-телефон (~5 Вт)', watts: 5 },
                { id: 'printer', group: 'grp_peripherals', label: 'Принтер лазерный (~400 Вт)', watts: 400 },
                { id: 'ink_printer', group: 'grp_peripherals', label: 'Принтер струйный (~30 Вт)', watts: 30 },
                { id: 'mfp', group: 'grp_peripherals', label: 'МФУ (~600 Вт)', watts: 600 },
                { id: 'scanner', group: 'grp_peripherals', label: 'Сканер (~25 Вт)', watts: 25 },
                { id: 'speakers', group: 'grp_peripherals', label: 'Колонки (~20 Вт)', watts: 20 },
                { id: 'webcam', group: 'grp_peripherals', label: 'Веб-камера (~5 Вт)', watts: 5 },
                { id: 'router', group: 'grp_network', label: 'Роутер (~15 Вт)', watts: 15 },
                { id: 'switch', group: 'grp_network', label: 'Коммутатор (~20 Вт)', watts: 20 },
                { id: 'nas', group: 'grp_network', label: 'NAS (~50 Вт)', watts: 50 },
                { id: 'server_1u', group: 'grp_network', label: 'Сервер 1U (~350 Вт)', watts: 350 },
                { id: 'server_tower', group: 'grp_network', label: 'Сервер башенный (~600 Вт)', watts: 600 },
                { id: 'tv', group: 'grp_other', label: 'Телевизор (~100 Вт)', watts: 100 },
                { id: 'ups_charger', group: 'grp_other', label: 'Зарядка ИБП (~50 Вт)', watts: 50 }
            ],
            groups: {
                grp_custom: 'Выбор',
                grp_computers: '💻 Компьютеры', grp_monitors: '🖥 Мониторы', grp_peripherals: '🖨 Периферия',
                grp_network: '🌐 Сеть и хранение', grp_other: '📺 Прочее'
            }
        },
        en: {
            pageTitle: "UPS Power Calculator",
            title: "⚡ UPS Power Calculator",
            subtitle: "Calculate the required UPS capacity for your equipment",
            deviceLabel: "Device", powerLabel: "Power, W", qtyLabel: "Qty", totalLabel: "Total",
            customOpt: "— Custom Value —", customNamePh: "Name...", wattsPh: "W",
            addDevice: "＋ Add Device", settingsSummary: "⚙ Calculation Settings",
            marginLabel: "Power Margin, %", marginHint: "Recommended: 20–30%",
            pfLabel: "Power Factor (PF)", pfHint: "Usually 0.6–0.7 for line-interactive UPS",
            resultsTitle: "📊 Calculation Result", totalLoad: "Total Load", withMargin: "With Margin",
            recWatts: "Recommended UPS (W)", recVA: "Recommended UPS (VA)",
            tip: "💡 Tip: Choose a UPS with rated power ≥ calculated value. Pay attention to actual output in Watts, not just VA.",
            printerWarning: "⚠️ Important: It is highly discouraged to connect laser printers and MFPs to a UPS. During the fuser heating cycle, their instantaneous power draw can spike to 1000–1500 W, causing inverter overload, protection triggers, or shutdown of all connected equipment.",
            calcInfoTitle: "📐 How it Works", formulasTitle: "🧮 Formulas",
            f1: "Total Load: Σ (Device Power × Quantity)", f2: "With Margin: Total Load × (1 + Margin / 100)",
            f3: "UPS (W): = Power with Margin", f4: "UPS (VA): = Power with Margin ÷ Power Factor (PF)",
            whyTitle: "❓ Why this way?",
            whyText: "It's not recommended to load a UPS to 100%. A 20–30% margin compensates for inrush currents, battery aging, inverter inefficiency, and extends equipment lifespan. PF (~0.6–0.7) accounts for Active (W) vs Apparent (VA) power difference, critical for catalog comparison where only VA is often listed.",
            disclaimerTitle: "⚠️ Disclaimer",
            disclaimerText: "Calculations are for recommendation purposes only. Actual consumption varies by load, components, PSU type, and grid conditions. For critical systems, always account for inrush currents, required runtime, and consult qualified engineers. The developer assumes no liability for equipment selection or operation.",
            langBtn: "🌐 ENG", themeDark: "🌙", themeLight: "☀️",
            wattUnit: " W", vaUnit: " VA",
            deviceOptions: [
                { id: 'custom', group: 'grp_custom', label: '— Custom Value —', watts: 0 },
                { id: 'office_pc', group: 'grp_computers', label: 'Office PC (~250 W)', watts: 250 },
                { id: 'home_pc', group: 'grp_computers', label: 'Home PC (~400 W)', watts: 400 },
                { id: 'gaming_pc', group: 'grp_computers', label: 'Gaming PC (~650 W)', watts: 650 },
                { id: 'workstation', group: 'grp_computers', label: 'Workstation (~900 W)', watts: 900 },
                { id: 'mini_pc', group: 'grp_computers', label: 'Mini-PC / Nettop (~65 W)', watts: 65 },
                { id: 'monitor_led', group: 'grp_monitors', label: 'LED Monitor 22–24" (~35 W)', watts: 35 },
                { id: 'monitor_large', group: 'grp_monitors', label: 'Monitor 27–32" (~65 W)', watts: 65 },
                { id: 'monitor_ultrawide', group: 'grp_monitors', label: 'Ultrawide Monitor (~80 W)', watts: 80 },
                { id: 'ip_phone', group: 'grp_peripherals', label: 'IP Phone (~5 W)', watts: 5 },
                { id: 'printer', group: 'grp_peripherals', label: 'Laser Printer (~400 W)', watts: 400 },
                { id: 'ink_printer', group: 'grp_peripherals', label: 'Inkjet Printer (~30 W)', watts: 30 },
                { id: 'mfp', group: 'grp_peripherals', label: 'MFP (~600 W)', watts: 600 },
                { id: 'scanner', group: 'grp_peripherals', label: 'Scanner (~25 W)', watts: 25 },
                { id: 'speakers', group: 'grp_peripherals', label: 'Speakers (~20 W)', watts: 20 },
                { id: 'webcam', group: 'grp_peripherals', label: 'Webcam (~5 W)', watts: 5 },
                { id: 'router', group: 'grp_network', label: 'Router (~15 W)', watts: 15 },
                { id: 'switch', group: 'grp_network', label: 'Switch (~20 W)', watts: 20 },
                { id: 'nas', group: 'grp_network', label: 'NAS (~50 W)', watts: 50 },
                { id: 'server_1u', group: 'grp_network', label: '1U Server (~350 W)', watts: 350 },
                { id: 'server_tower', group: 'grp_network', label: 'Tower Server (~600 W)', watts: 600 },
                { id: 'tv', group: 'grp_other', label: 'TV (~100 W)', watts: 100 },
                { id: 'ups_charger', group: 'grp_other', label: 'UPS Charger (~50 W)', watts: 50 }
            ],
            groups: {
                grp_custom: 'Selection',
                grp_computers: '💻 Computers', grp_monitors: '🖥 Monitors', grp_peripherals: '🖨 Peripherals',
                grp_network: '🌐 Network & Storage', grp_other: '📺 Other'
            }
        }
    };

    let currentLang = localStorage.getItem('ups_lang') || 'ru';
    let currentTheme = localStorage.getItem('ups_theme') || 'dark';
    let deviceCounter = 0;

    function renderDeviceSelect(selectEl, selectedId) {
        selectEl.innerHTML = '';
        const d = dict[currentLang];
        const grouped = {};

        d.deviceOptions.forEach(opt => {
            if (!grouped[opt.group]) grouped[opt.group] = [];
            grouped[opt.group].push(opt);
        });

        for (const groupKey in grouped) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = d.groups[groupKey] || groupKey;
            
            grouped[groupKey].forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.label;
                option.dataset.watts = item.watts;
                if (item.id === selectedId) option.selected = true;
                optgroup.appendChild(option);
            });
            selectEl.appendChild(optgroup);
        }
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('ups_lang', lang);
        const d = dict[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (d[key]) el.textContent = d[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (d[key]) el.placeholder = d[key];
        });

        document.querySelectorAll('.device-select').forEach(sel => {
            const currentVal = sel.value;
            renderDeviceSelect(sel, currentVal);
        });

        document.title = d.pageTitle;
        langToggle.textContent = d.langBtn;
        document.documentElement.lang = lang;
        themeToggle.textContent = currentTheme === 'dark' ? d.themeDark : d.themeLight;
        recalc();
    }

    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('ups_theme', theme);
        document.body.classList.toggle('light-theme', theme === 'light');
        const d = dict[currentLang];
        themeToggle.textContent = theme === 'dark' ? d.themeDark : d.themeLight;
    }

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

        renderDeviceSelect(select, type || 'office_pc');
        if (watts) wattsInput.value = watts;

        select.addEventListener('change', function () {
            const opt = select.options[select.selectedIndex];
            const presetWatts = parseInt(opt.dataset.watts, 10) || 0;

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

    function recalc() {
        let totalWatts = 0;
        const rows = devicesList.querySelectorAll('.device-row');
        const d = dict[currentLang];

        rows.forEach(row => {
            const w = parseInt(row.querySelector('.watts-input').value, 10) || 0;
            const q = parseInt(row.querySelector('.qty-input').value, 10) || 1;
            row.querySelector('.subtotal-value').textContent = (w * q) + d.wattUnit;
            totalWatts += w * q;
        });

        const margin = (parseInt(marginInput.value, 10) || 0) / 100;
        const pf = parseFloat(pfInput.value) || 0.65;
        const withMargin = Math.ceil(totalWatts * (1 + margin));
        const recVA = Math.ceil(withMargin / pf);

        elTotalWatts.textContent = totalWatts + d.wattUnit;
        elWithMargin.textContent = withMargin + d.wattUnit;
        elRecWatts.textContent = withMargin + d.wattUnit;
        elRecVA.textContent = recVA + d.vaUnit;
        elMarginValue.textContent = Math.round(margin * 100);
    }

    langToggle.addEventListener('click', () => applyLanguage(currentLang === 'ru' ? 'en' : 'ru'));
    themeToggle.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    
    marginInput.addEventListener('input', recalc);
    pfInput.addEventListener('input', recalc);
    btnAdd.addEventListener('click', () => createDeviceRow());

    applyTheme(currentTheme);
    applyLanguage(currentLang);
    createDeviceRow('office_pc', 250);
    createDeviceRow('monitor_led', 35);
    createDeviceRow('router', 15);

})();