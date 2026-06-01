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
    const elMarginLabel = document.getElementById('marginLabel');

    let deviceCounter = 0;

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

        // Если передан конкретный пресет — выбрать его
        if (type) {
            select.value = type;
        }

        // Обработчик смены типа
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

        // Пересчёт при изменении любого поля
        wattsInput.addEventListener('input', recalc);
        qtyInput.addEventListener('input', recalc);

        // Удаление
        btnRemove.addEventListener('click', function () {
            row.remove();
            recalc();
        });

        devicesList.appendChild(clone);
        recalc();
    }

    /* ── Пересчёт ── */
    function recalc() {
        let totalWatts = 0;
        const rows = devicesList.querySelectorAll('.device-row');

        rows.forEach(function (row) {
            const wattsInput = row.querySelector('.watts-input');
            const qtyInput = row.querySelector('.qty-input');
            const subtotal = row.querySelector('.subtotal-value');

            const w = parseInt(wattsInput.value, 10) || 0;
            const q = parseInt(qtyInput.value, 10) || 1;
            const sub = w * q;

            subtotal.textContent = sub + ' Вт';
            totalWatts += sub;
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

    /* ── Кнопка добавления ── */
    btnAdd.addEventListener('click', function () {
        createDeviceRow();
    });

    /* ── Настройки тоже влияют на расчёт ── */
    marginInput.addEventListener('input', recalc);
    pfInput.addEventListener('input', recalc);

    /* ── Стартовые устройства для наглядности ── */
    createDeviceRow('office_pc', 250);
    createDeviceRow('monitor_led', 35);
    createDeviceRow('router', 15);

})();