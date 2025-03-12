# progress-indicator

Прототип блока Progress для мобильных web-приложений. Отображает процесс выполнения задач с возможностью управления состояниями через API.

## 🚀 Демо

[Открыть демо на GitHub Pages](https://aructurus2000.github.io/progress-indicator/)

## 📂 Структура проекта
```
progress-indicator/
├──css-normalize.css # Нормализация стилей
├── index.html       # Основная разметка
├── styles.css       # Стилизация компонента
├── script.js        # Логика работы блока
└── README.md        # Документация проекта
```

## ⚙️ Установка и запуск

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/Aructurus2000/progress-indicator.git
cd progress-block
```

2. **Запуск `index.html` :**
- Запустите файл index.html, в браузере откроется вкладка проекта.

## 🛠️ Функциональность

- **Value (Число 0-100):** Введите значение, чтобы изменить прогресс.
- **Animate (Вкл/Выкл):** Включите/выключите автоматическую анимацию прогресса.
- **Hide (Вкл/Выкл):** Скрыть или показать блок прогресса.

## 📱 Адаптивность

- Поддержка ориентаций экрана: Portrait (320x568) и Landscape (568x320).
- Компонент масштабируется и сохраняет пропорции.

## 🧩 API и повторное использование

Компонент имеет три состояния управления:

1. **Normal** — задается значение `Value` (0-100), регулирующее размер дуги.
2. **Animated** — автоматическое вращение прогресса.
3. **Hidden** — скрытие блока с экрана.

<u>Компонент Progress Indicator спроектирован так, чтобы его было легко повторно использовать в одном месте на странице</u>, при этом каждый блок будет независимым и иметь собственное состояние. Для этого в проекте реализовано API, которое позволяет управлять состояниями и прогрессом каждого блока.

**Структура HTML**
Чтобы добавить несколько индикаторов прогресса на страницу, достаточно вставить несколько контейнеров с классом .progress-ring-container. Каждый контейнер будет управляться индивидуально через API, а все индикаторы будут работать независимо друг от друга.
```
<div class="progress-ring-container">
    <!-- Первый индикатор -->
</div>

<div class="progress-ring-container">
    <!-- Второй индикатор -->
</div>
```

**API для управления состояниями**
Каждый блок индикатора прогресса может быть проинициализирован и контролируем через методы API:

`setProgress(value)` — устанавливает процентный прогресс для индикатора.
`startAnimation()` — запускает анимацию вращения прогресса.
`stopAnimation()` — останавливает анимацию вращения прогресса.
`show()` — отображает индикатор прогресса.
`hide()` — скрывает индикатор прогресса.

Для каждого индикатора прогресса будет создан отдельный экземпляр компонента, который можно управлять через методы API:

```
// Инициализация всех индикаторов на странице
window.onload = function() {
    const progressBars = document.querySelectorAll('.progress-ring-container');

    progressBars.forEach((container) => {
        const progressRing = new ProgressRing(container);

        // Пример использования API для первого индикатора:
        progressRing.setProgress(50); // Установить прогресс на 50%
        progressRing.startAnimation(); // Запустить анимацию
    });
};
```

Каждый блок индикатора прогресса будет работать <u>независимо от других</u>, с собственными значениями прогресса, состоянием анимации и видимости.

---

**Автор:** [Aructurus2000](https://github.com/Aructurus2000)
