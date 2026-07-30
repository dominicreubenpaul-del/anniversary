/* ==========================================================
   ANNIVERSARY COUNTDOWN

   Target:
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


/* ==============================
   TWO DIGITS
   ============================== */

function twoDigits(value) {

    return String(value).padStart(2, "0");

}


/* ==============================
   SAFELY ADD CALENDAR MONTHS
   ============================== */

function addCalendarMonths(date, months) {

    const result =
        new Date(date.getTime());


    const originalDay =
        result.getDate();


    /*
       Move to day 1 first so dates such as
       January 31 don't overflow incorrectly.
    */

    result.setDate(1);


    result.setMonth(
        result.getMonth() + months
    );


    /*
       Number of days in destination month
    */

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


/* ==============================
   CALCULATE COUNTDOWN
   ============================== */

function calculateCountdown(now) {


    /*
       Approximate number of complete
       calendar months remaining.
    */

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


    /*
       If adding those months passes
       the anniversary, subtract one.
    */

    if (afterMonths > targetDate) {

        months--;

        afterMonths =
            addCalendarMonths(
                now,
                months
            );
    }


    /*
       Remaining milliseconds after
       complete calendar months.
    */

    let difference =
        targetDate.getTime()
        -
        afterMonths.getTime();


    const SECOND =
        1000;

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


    difference %=
        DAY;


    const hours =
        Math.floor(
            difference / HOUR
        );


    difference %=
        HOUR;


    const minutes =
        Math.floor(
            difference / MINUTE
        );


    difference %=
        MINUTE;


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


/* ==============================
   ANNIVERSARY REACHED
   ============================== */

function showAnniversary() {

    monthsElement.textContent =
        "00";

    daysElement.textContent =
        "00";

    hoursElement.textContent =
        "00";

    minutesElement.textContent =
        "00";

    secondsElement.textContent =
        "00";


    document.title =
        "Happy Anniversary ❤️";
}


/* ==============================
   UPDATE TIMER
   ============================== */

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


/* First update immediately */

updateCountdown();


/* Then every second */

setInterval(
    updateCountdown,
    1000
);