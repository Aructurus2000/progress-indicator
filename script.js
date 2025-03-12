class ProgressRing {
    constructor(element) {
        this.element = element;
        this.circle = this.element.querySelector('.progress-ring__circle');
        this.input = this.element.querySelector('.percent');
        this.animateCheckbox = this.element.querySelector('.animateCheckbox');
        this.hideCheckbox = this.element.querySelector('.hideCheckbox');
        this.progressRing = this.element.querySelector('.progress-ring');
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;
        this.isAnimated = false;
        this.isHidden = false;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;
        this.setProgress(10);

        this.addEventListeners();
    }

    setProgress(value) {
        const offset = this.circumference - (value / 100 * this.circumference);
        this.circle.style.strokeDashoffset = offset;
    }

    startAnimation() {
        if (!this.isAnimated) {
            this.circle.classList.add('animate');
            this.isAnimated = true;
        }
    }

    stopAnimation() {
        if (this.isAnimated) {
            this.circle.classList.remove('animate');
            this.isAnimated = false;
        }
    }

    hide() {
        if (!this.isHidden) {
            this.progressRing.classList.add('hidden');
            this.isHidden = true;
        }
    }

    show() {
        if (this.isHidden) {
            this.progressRing.classList.remove('hidden');
            this.isHidden = false;
        }
    }

    addEventListeners() {
        this.animateCheckbox.addEventListener('change', () => {
            if (this.animateCheckbox.checked) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        });

        this.hideCheckbox.addEventListener('change', () => {
            if (this.hideCheckbox.checked) {
                this.hide();
            } else {
                this.show();
            }
        });

        this.input.addEventListener('input', () => {
            let value = Math.min(100, Math.max(0, parseInt(this.input.value, 10)));
            this.input.value = value;
            this.setProgress(value);
        });
    }
}

// Инициализация нескольких экземпляров
window.onload = function () {
    const progressBars = document.querySelectorAll('.progress-ring-container');

    progressBars.forEach((container) => {
        new ProgressRing(container);
    });
};