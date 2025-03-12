class ProgressRing {
    constructor(element) {
        if (element) {
            this.element = element;
            this.circle = this.element.querySelector('.progress-ring__circle');
            this.input = this.element.querySelector('.percent');
            this.animateCheckbox = this.element.querySelector('.animateCheckbox');
            this.hideCheckbox = this.element.querySelector('.hideCheckbox');
            this.progressRing = this.element.querySelector('.progress-ring');
            this.radius = this.circle.r.baseVal.value;
            this.circumference = 2 * Math.PI * this.radius;

            this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
            this.circle.style.strokeDashoffset = this.circumference;

            this.setProgress(this.input.value, 10);
            this.addEventListeners();
        }
    }

    createProgressBar(containerId = null) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progressBar';
        progressBar.innerHTML = `
            <div class="progress-ring-container">
                <section class="circular-progress-bar">
                    <h2>Progress</h2>
                    <div class="circular-progress-bar-loader">
                        <svg class="progress-ring">
                            <circle class="progress-ring__circle-background"
                                    stroke="var(--base-accent-color)"
                                    stroke-width="10"
                                    cx="70" cy="70" r="60"
                                    fill="transparent"/>
                            <circle class="progress-ring__circle"
                                    stroke="var(--accent-color)"
                                    stroke-width="10"
                                    cx="70" cy="70" r="60"
                                    fill="transparent"/>
                        </svg>
                    </div>
                    <div class="circular-progress-bar-settings">
                        <label class="input-container">
                            <input type="number" min="1" max="100" class="percent" value="10"/>
                            <span>Value</span>
                        </label>
                        <label class="toggle">
                            <input type="checkbox" class="checkbox animateCheckbox"/>
                            <span></span> Animate
                        </label>
                        <label class="toggle">
                            <input type="checkbox" class="checkbox hideCheckbox"/>
                            <span></span> Hide
                        </label>
                    </div>
                </section>
            </div>`;

        // Если указан containerId, добавляем ProgressBar в этот элемент
        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.appendChild(progressBar);
            } else {
                console.error(`Элемент с id "${containerId}" не найден. ProgressBar будет добавлен в body.`);
                document.body.appendChild(progressBar);
            }
        } else {
            // Если containerId не указан, добавляем ProgressBar в body
            document.body.appendChild(progressBar);
        }

        return new ProgressRing(progressBar.querySelector('.circular-progress-bar'));
    }

    removeProgressBar() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            console.log('ProgressBar удален.');
        } else {
            console.error('Элемент ProgressBar не найден.');
        }
    }

    setProgress(value) {
        value = Math.min(100, Math.max(0, value));
        const offset = this.circumference - (value / 100) * this.circumference;
        this.circle.style.strokeDashoffset = offset;
        this.input.value = value;
    }

    getProgress() {
        return parseInt(this.input.value, 10) || 1;
    }

    onInputChange(callback) {
        this.input.addEventListener('input', () => {
            const value = parseInt(this.input.value, 10);
            callback(value);
        });
    }

    startAnimation() {
        this.circle.classList.add('animate');
    }

    stopAnimation() {
        this.circle.classList.remove('animate');
    }

    hide() {
        this.progressRing.classList.add('hidden');
    }

    show() {
        this.progressRing.classList.remove('hidden');
    }

    addEventListeners() {
        this.input.addEventListener('input', () => {
            this.setProgress(parseInt(this.input.value, 10));
        });

        this.animateCheckbox.addEventListener('change', () => {
            this.animateCheckbox.checked ? this.startAnimation() : this.stopAnimation();
        });

        this.hideCheckbox.addEventListener('change', () => {
            this.hideCheckbox.checked ? this.hide() : this.show();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const progressBarElements = document.querySelectorAll('.circular-progress-bar');

    // Проверка, есть ли элементы на странице
    if (progressBarElements.length > 0) {
        // Если элементы есть, создаем для каждого экземпляр ProgressRing
        window.progressBars = [...progressBarElements]
            .map(el => new ProgressRing(el));

        // Работа с первым ProgressBar (если он есть)
        const firstProgressBar = window.progressBars[0];
        firstProgressBar.setProgress(80); // Устанавливаем значение 80%

        // Значение первого элемента
        console.log('firstProgressBar value: ', firstProgressBar.getProgress());
    } else {
        // Если нет элементов
        console.log('На странице нет элементов с классом .circular-progress-bar.');
    }
    // Если нужно создать вручную
    const newProgressBar = new ProgressRing().createProgressBar('newBar');
    newProgressBar.setProgress(77);

    const newProgressBar2 = new ProgressRing().createProgressBar('container1');
    newProgressBar2.setProgress(88);
    newProgressBar2.removeProgressBar();

    newProgressBar.onInputChange(sendData);

});

// Отправка данных на сервер
function sendData(value) {
    const url = 'https://burzhumov.com/api/saveProgress';
    const data = {progress: value};

    console.log('sendData: ', data);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log('Данные успешно отправлены:', result);
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
        });
}

