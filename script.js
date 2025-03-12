const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.querySelector('.percent')
const animateCheckbox = document.querySelector('#animateCheckbox');
const hideCheckbox = document.querySelector('#hideCheckbox');
const progressRing = document.querySelector('.progress-ring');

// Общая функция для добавления/удаления класса
function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

animateCheckbox.addEventListener('change', function() {
    toggleClass(circle, 'animate', this.checked);
});

hideCheckbox.addEventListener('change', function() {
    toggleClass(progressRing, 'hidden', this.checked);
});

window.onload = function() {
    const initialValue = 10;
    input.value = initialValue;
    setProgress(initialValue);
};

input.addEventListener('input', function() {
    let value = Math.min(100, Math.max(0, parseInt(this.value, 10)));
    this.value = value;
    setProgress(value);
});

// Установка свойств для окружности
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

