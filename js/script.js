'use strict';

let wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
})
wow.init();

let clock = document.querySelector('.clock');
let clockYears = clock.querySelector('.clock__years');
let clockYearsText = clock.querySelector('.clock__years-text');
let clockMonths = clock.querySelector('.clock__months');
let clockMonthsText = clock.querySelector('.clock__months-text');
let clockDays = clock.querySelector('.clock__days');
let clockDaysText = clock.querySelector('.clock__days-text');
let clockHours = clock.querySelector('.clock__hours');
let clockHoursText = clock.querySelector('.clock__hours-text');
let clockMinutes = clock.querySelector('.clock__minutes');
let clockMinutesText = clock.querySelector('.clock__minutes-text');
let clockSeconds = clock.querySelector('.clock__seconds');
let clockSecondsText = clock.querySelector('.clock__seconds-text');

let startDate = new Date(2020, 9, 19, 0, 0, 0, 0);
let locale = {
    seconds: ['секунду', 'секунды', 'секунд'],
    minutes: ['минуту', 'минуты', 'минут'],
    hours: ['час', 'часа', 'часов'],
    days: ['день', 'дня', 'дней'],
    months: ['месяц', 'месяца', 'месяцев'],
    years: ['год', 'года', 'лет']
};

function updateClock() {
    let currentDate = new Date();
    let dateDiff = currentDate.getTime() - startDate.getTime();
    let years = Math.floor(dateDiff / (1000 * 3600 * 24 * 30 * 12));
    let yearsCheck = years % 10;
    let months = Math.floor(dateDiff / (1000 * 3600 * 24 * 30));
    let days = Math.floor(dateDiff / (1000 * 3600 * 24) % 30);
    let daysCheck = days % 10;
    let hours = Math.floor(dateDiff / (1000 * 3600) % 24);
    let hoursCheck = hours % 10;
    let minutes = Math.floor(dateDiff / (1000 * 60) % 60);
    let minutesCheck = minutes % 10;
    let seconds = Math.floor(dateDiff / 1000 % 60);
    let secondsCheck = seconds % 10;

    clockSeconds.innerHTML = seconds;
    if (secondsCheck === 0 || secondsCheck >= 5 || seconds >= 11 && seconds <= 14) {
        clockSecondsText.innerHTML = locale.seconds[2];
    } else if (secondsCheck === 1) {
        clockSecondsText.innerHTML = locale.seconds[0];
    } else {
        clockSecondsText.innerHTML = locale.seconds[1];
    }

    clockMinutes.innerHTML = minutes;
    if (minutesCheck === 0 || minutesCheck >= 5 || minutes >= 11 && minutes <= 14) {
        clockMinutesText.innerHTML = locale.minutes[2];
    } else if (minutesCheck === 1) {
        clockMinutesText.innerHTML = locale.minutes[0];
    } else {
        clockMinutesText.innerHTML = locale.minutes[1];
    }

    clockHours.innerHTML = hours;
    if (hoursCheck === 0 || hoursCheck >= 5 || hours >= 11 && hours <= 14) {
        clockHoursText.innerHTML = locale.hours[2];
    } else if (hoursCheck === 1) {
        clockHoursText.innerHTML = locale.hours[0];
    } else {
        clockHoursText.innerHTML = locale.hours[1];
    }

    clockDays.innerHTML = days;
    if (daysCheck === 0 || daysCheck >= 5 || days >= 11 && days <= 14) {
        clockDaysText.innerHTML = locale.days[2];
    } else if (daysCheck === 1) {
        clockDaysText.innerHTML = locale.days[0];
    } else {
        clockDaysText.innerHTML = locale.days[1];
    }

    if (years > 0 || months > 0) {
        clockMonths.innerHTML = months;
        if (months === 1) {
            clockMonthsText.innerHTML = locale.months[0];
        } else if (months === 0 || months >= 5) {
            clockMonthsText.innerHTML = locale.months[2];
        } else {
            clockMonthsText.innerHTML = locale.months[1];
        }
    }

    if (years > 0) {
        clockYears.innerHTML = years;
        if (yearsCheck >= 5 || years >= 11 && years <= 14) {
            clockYearsText.innerHTML = locale.years[2];
        } else if (yearsCheck === 1) {
            clockYearsText.innerHTML = locale.years[0];
        } else {
            clockYearsText.innerHTML = locale.years[1];
        }
    }
}

function fadeIn(el) {
    let opacity = 0.01;
    el.style.display = 'block';

    var timer = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(timer);
        }

        el.style.opacity = opacity;
        el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
        opacity += opacity * 0.1;
    }, 10);

}

updateClock();
let timerId = setInterval(updateClock, 1000);

let audio = document.querySelector('.audio');
let audioButton = audio.querySelector('.audio__play');
let audioSound = new Audio('music/jony.mp3');

audioButton.onclick = function() {
    if (audioButton.classList.contains('audio__play--pause')) {
        audioButton.classList.remove('audio__play--pause');
        audioSound.pause();
    } else {
        audioButton.classList.add('audio__play--pause');
        audioSound.play();
    }
}

let myFullpage = new fullpage('.full-page', {
    sectionsColor: ['#FF99CC', '#ffc552', '#7BAABE', '#ccddff'],
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    lazyLoad: true
});

let overlay = document.querySelector('.overlay');
let riddleModal = document.querySelector('.riddle-modal');
let riddleInput = document.querySelector('.riddle-form__input');
riddleInput.oninput = function() {
    const value = this.value.toLowerCase();
    if (value === 'эндорфин' || value === 'endorphin') {
        fadeIn(overlay);
        fadeIn(riddleModal);
    }
};