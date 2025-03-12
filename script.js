class ProgressRing {
    constructor(element) {
        this.element = element;
        this.circle = element.querySelector('.progress-ring__circle');
        this.backgroundCircle = element.querySelector('.progress-ring__circle-background');
        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        this.progress = 0;
        this.isAnimated = false;
        this.isHidden = false;

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;
    }

    setProgress(value) {
        if (value < 0 || value > 100) return;
        this.progress = value;
        const offset = this.circumference - (value / 100 * this.circumference);
        this.circle.style.strokeDashoffset = offset;
    }

    startAnimation() {
        this.isAnimated = true;
        this.circle.classList.add('animate');
    }

    stopAnimation() {
        this.isAnimated = false;
        this.circle.classList.remove('animate');
    }

    hide() {
        this.isHidden = true;
        this.element.classList.add('hidden');
    }

    show() {
        this.isHidden = false;
        this.element.classList.remove('hidden');
    }

    initialize(initialProgress) {
        this.setProgress(initialProgress);
    }
}

// Использование компонента
document.addEventListener('DOMContentLoaded', () => {
    const progressRingElement = document.querySelector('.progress-ring');
    const progressRing = new ProgressRing(progressRingElement);

    progressRing.initialize(10);

    document.querySelector('.percent').addEventListener('input', (event) => {
        const value = Math.min(100, Math.max(0, parseInt(event.target.value, 10)));
        progressRing.setProgress(value); // Обновить прогресс
    });

    document.getElementById('animateCheckbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            progressRing.startAnimation();
        } else {
            progressRing.stopAnimation();
        }
    });

    document.getElementById('hideCheckbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            progressRing.hide();
        } else {
            progressRing.show();
        }
    });
});
