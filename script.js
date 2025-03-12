const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.querySelector('.percent')
const animateCheckbox = document.querySelector('#animateCheckbox');
const hideCheckbox = document.querySelector('#hideCheckbox');
const progressRing = document.querySelector('.progress-ring');

animateCheckbox.addEventListener('change', function() {
    if (this.checked) {
        circle.classList.add('animate');
    } else {
        circle.classList.remove('animate');
    }
});

hideCheckbox.addEventListener('change', function() {
    if (this.checked) {
        progressRing.classList.add('hidden');
    } else {
        progressRing.classList.remove('hidden');
    }
});

window.onload = function() {
    input.value = 10;
    setProgress(input.value);
};

input.addEventListener('change', function(){
    setProgress(input.value);
})
input.addEventListener('input', function() {
    let value = parseInt(this.value, 10);
    if (value < 0) this.value = 0;
    if (value > 100) this.value = 100;
});

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

