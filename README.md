# ⚡ UPS Power Calculator / Калькулятор мощности ИБП

A lightweight, zero-dependency web application for calculating the required UPS capacity.

---

## 🇬🇧 English Version

### 📋 Description
Simple and intuitive calculator to estimate the required UPS power for your equipment setup. Works entirely in the browser (offline), supports dark/light themes, and bilingual interface.

### ✨ Features
*   📦 **Device Presets:** Built-in profiles for PCs, monitors, servers, printers, network gear, IP phones, and more.
*   ✏️ **Custom Devices:** Add any equipment with specific power consumption.
*   ⚖️ **Flexible Calculation:** Adjustable power margin (%) and Power Factor (PF).
*   🔄 **Real-time Results:** Instant updates as you add/modify devices.
*   🌍 **Bilingual UI:** Switch between English and Russian (preference saved).
*   🌙 **Dark & Light Themes:** Dark theme by default, smooth transitions.
*   🔌 **Zero Dependencies:** Pure HTML5, CSS3, and Vanilla JS. No build tools required.

### 🚀 How to Use
1.  Clone the repository or download the files.
2.  Open `index.html` in any modern web browser.
3.  Add your devices and check the recommended UPS capacity.

### 📐 Calculation Logic

| Parameter | Formula |
| :--- | :--- |
| **Total Load** | Σ (Device Power × Quantity) |
| **With Margin** | Total Load × (1 + Margin / 100) |
| **Recommended UPS (W)** | Power with Margin |
| **Recommended UPS (VA)** | Power with Margin ÷ Power Factor (PF) |

> **⚠️ Disclaimer:** Calculations are for informational purposes only. Real consumption varies by load, age, and efficiency. For critical infrastructure, consult qualified engineers and account for inrush currents.

### 📁 Project Structure

.
├── index.html      # Application structure and content
├── style.css       # Styling, themes (dark/light), responsiveness
├── script.js       # Logic, i18n, calculation engine
└── README.md       # Documentation

## 🇷🇺 Русская версия

### 📋 Описание
Простой и интуитивный калькулятор для оценки необходимой мощности источника бесперебойного питания (ИБП) для вашего оборудования. Работает в браузере (оффлайн), поддерживает темную/светлую темы и двуязычный интерфейс.

### ✨ Возможности
*   📦 **Пресеты устройств:** Встроенные профили для ПК, мониторов, серверов, принтеров, сетевого оборудования, IP-телефонов и др.
*   ✏️ **Свои устройства:** Возможность добавить любое оборудование с указанием мощности.
*   ⚖️ **Гибкий расчет:** Настраиваемый запас мощности (%) и коэффициент мощности (PF).
*   🔄 **Результаты в реальном времени:** Мгновенное обновление при изменении данных.
*   🌍 **Двуязычный интерфейс:** Переключение RU/EN (выбор сохраняется).
*   🌙 **Темная и светлая темы:** Темная тема по умолчанию, плавные переходы.
*   🔌 **Без зависимостей:** Чистые HTML5, CSS3 и Vanilla JS. Не требует сборки.

### 🚀 Как использовать
1.  Скачайте файлы репозитория.
2.  Откройте `index.html` в любом современном браузере.
3.  Добавьте ваши устройства и получите рекомендацию по мощности ИБП.

### 📐 Логика расчета

| Параметр | Формула |
| :--- | :--- |
| **Общая нагрузка** | Σ (Мощность устройства × Количество) |
| **С запасом** | Общая нагрузка × (1 + Запас / 100) |
| **Рекомендуемый ИБП (Вт)** | Мощность с запасом |
| **Рекомендуемый ИБП (ВА)** | Мощность с запасом ÷ Коэфф. мощности (PF) |

> **⚠️ Дисклеймер:** Расчеты носят информационный характер. Фактическое потребление зависит от нагрузки, износа и КПД. Для критически важных систем проконсультируйтесь с инженерами и учитывайте пусковые токи.

### 📁 Структура проекта

.
├── index.html      # Структура и содержимое приложения
├── style.css       # Стили, темы (темная/светлая), адаптивность
├── script.js       # Логика, интернационализация, движок расчета
└── README.md       # Документация