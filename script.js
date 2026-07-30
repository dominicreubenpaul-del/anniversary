/* ==========================================================
   ANNIVERSARY COUNTDOWN

   19 November 2026
   12:00 AM IST
========================================================== */

const targetDate =
    new Date("2026-11-19T00:00:00+05:30");


const monthsElement =
    document.getElementById("months");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


/* ==========================================================
   TWO DIGITS
========================================================== */

function twoDigits(value) {

    return String(value).padStart(2, "0");

}


/* ==========================================================
   ADD CALENDAR MONTHS SAFELY
========================================================== */

function addCalendarMonths(date, months) {

    const result =
        new Date(date.getTime());


    const originalDay =
        result.getDate();


    result.setDate(1);


    result.setMonth(
        result.getMonth() + months
    );


    const daysInMonth =
        new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        ).getDate();


    result.setDate(
        Math.min(
            originalDay,
            daysInMonth
        )
    );


    return result;
}


/* ==========================================================
   CALCULATE COUNTDOWN
========================================================== */

function calculateCountdown(now) {

    let months =

        (
            targetDate.getFullYear()
            -
            now.getFullYear()
        )

        * 12

        +

        (
            targetDate.getMonth()
            -
            now.getMonth()
        );


    let afterMonths =
        addCalendarMonths(
            now,
            months
        );


    if (afterMonths > targetDate) {

        months--;


        afterMonths =
            addCalendarMonths(
                now,
                months
            );

    }


    let difference =
        targetDate.getTime()
        -
        afterMonths.getTime();


    const SECOND = 1000;

    const MINUTE =
        SECOND * 60;

    const HOUR =
        MINUTE * 60;

    const DAY =
        HOUR * 24;


    const days =
        Math.floor(
            difference / DAY
        );


    difference %= DAY;


    const hours =
        Math.floor(
            difference / HOUR
        );


    difference %= HOUR;


    const minutes =
        Math.floor(
            difference / MINUTE
        );


    difference %= MINUTE;


    const seconds =
        Math.floor(
            difference / SECOND
        );


    return {
        months,
        days,
        hours,
        minutes,
        seconds
    };

}


/* ==========================================================
   ANNIVERSARY REACHED
========================================================== */

function showAnniversary() {

    monthsElement.textContent = "00";

    daysElement.textContent = "00";

    hoursElement.textContent = "00";

    minutesElement.textContent = "00";

    secondsElement.textContent = "00";


    document.title =
        "Happy Anniversary ❤️";

}


/* ==========================================================
   UPDATE COUNTDOWN
========================================================== */

function updateCountdown() {

    const now =
        new Date();


    if (now >= targetDate) {

        showAnniversary();

        return;

    }


    const time =
        calculateCountdown(now);


    monthsElement.textContent =
        twoDigits(time.months);


    daysElement.textContent =
        twoDigits(time.days);


    hoursElement.textContent =
        twoDigits(time.hours);


    minutesElement.textContent =
        twoDigits(time.minutes);


    secondsElement.textContent =
        twoDigits(time.seconds);

}


/* ==========================================================
   START
========================================================== */

updateCountdown();


setInterval(
    updateCountdown,
    1000
);
