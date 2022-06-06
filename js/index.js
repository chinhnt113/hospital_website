const tracker = document.querySelector(".slider-container-tracker");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const items = document.querySelectorAll(".slider-item");
const positions = document.querySelectorAll(".slider-position");

var currentPos = 0;
const lastPos = items.length - 1;

const showCurrentPos = () => {
    for (const position of positions) {
        position.classList.remove("current-position");
    }
    positions[currentPos].classList.add("current-position");
}
const moveLeft = () => {
    tracker.style.transform += "translateX(100%)";
    currentPos -= 1;
}
const moveRight = () => {
    tracker.style.transform += "translateX(-100%)";
    currentPos += 1;
}
// button left
btnLeft.addEventListener("click", () => {
    if (currentPos != 0) {
        moveLeft();
    } else {
        tracker.style.transform = `translateX(-${lastPos}00%)`;
        currentPos = lastPos;
    }
    showCurrentPos();
})
// button right
btnRight.addEventListener("click", () => {
    if (currentPos != lastPos) {
        moveRight();
    } else {
        tracker.style.transform = "translateX(0)";
        currentPos = 0;
    }
    showCurrentPos();
})
// navigator button
for (const [i,position] of positions.entries()) {
    position.addEventListener("click", () => {
        console.log(i);
        tracker.style.transform = `translateX(-${i}00%)`;
        currentPos = i;
        showCurrentPos();
    })
}

setInterval( () => {
    if (currentPos != lastPos) {
        moveRight();
    } else {
        tracker.style.transform = "translateX(0)";
        currentPos = 0;
    }
    showCurrentPos();
}, 7000)

ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 1000,
    interval: 100,
})

ScrollReveal().reveal('section', {delay: 0, origin: 'top' });
ScrollReveal().reveal('.service66', {delay: 400, origin: 'left' });
ScrollReveal().reveal('.service25', {delay: 400, origin: 'left' });
ScrollReveal().reveal('.service33', {delay: 400, origin: 'right' });
ScrollReveal().reveal('.service50', {delay: 400, origin: 'right' });
ScrollReveal().reveal('.reward-item', {delay: 400, origin: 'bottom' });
ScrollReveal().reveal('.footer-copyright', {delay: 400, origin: 'bottom' });

const toTopBtn = document.querySelector('.to-top-btn');
const navBar = document.querySelector('.nav-container');

window.addEventListener("scroll", () => {
    if(window.pageYOffset >= 200) {
        toTopBtn.style.visibility = 'visible';
        toTopBtn.style.animation = 'fadeInAnimation ease .5s';
    } else {
        toTopBtn.style.animation = 'fadeOutAnimation ease .7s';
        toTopBtn.style.visibility = 'hidden';
    }
})