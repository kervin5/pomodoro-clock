//Javascript

var timerOn = false;
var currentTimer = "Session";
var isPaused = false;
var initialValue = 0;
var currentTime = 0;
var interval;
var breakMinutes = 0;
var valueChanged = false;

function resetClock() {
    var sessionLength = parseInt($('#session-length').text());
    timerOn = false;
    currentTimer = "Session";
    isPaused = false;
    initialValue = 60;
    currentTime = 0;
    interval = 0;
    breakMinutes = 0;
    valueChanged = false;
    $(".info").text("POMODORO");
    if (sessionLength < 10) {
        $("#minutes").text("0" + sessionLength.toString());
    } else {
        $("#minutes").text(sessionLength.toString());
    }

    $("#seconds").text("00");
    clearInterval(interval);
    $(".pause").fadeOut();
    $(".stop").fadeOut();
    $(".play").delay(400).fadeIn();
}

function startTimer(duration, displayMinute, displaySecond, message) {
    var bgPosition = duration;

    var timer = duration;

    $('.info').text(message);
    var timeIntervalID = setInterval(function () {
        interval = timeIntervalID;

        if (!isPaused && !valueChanged) {
            currentTime = timer;
            console.log(currentTime);
            bgPosition = 110 - ((timer / initialValue) + 0.1) * 100;
            $(".bg-group").css("top", bgPosition + "%");
            minutes = parseInt(timer / 60, 10);

            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;

            seconds = seconds < 10 ? "0" + seconds : seconds;

            displayMinute.textContent = minutes;

            displaySecond.textContent = seconds;


            if (--timer < 0) {

                timer = 0;

                if (timer === 0 && currentTimer !== "Break") {
                    initialValue = breakMinutes;
                    clearInterval(timeIntervalID);
                    startTimer(breakMinutes, displayMinute, displaySecond, "Break started");
                    currentTimer = "Break";
                } else {
                    $('.info').text("Break is over");
                    clearInterval(timeIntervalID);
                    resetClock();
                }

            }
        } else {
            clearInterval(timeIntervalID);
            resetClock();
        }
    }, 1000);

}

$(document).ready(function () {
    resetClock();
    displayMinute = document.querySelector('#minutes');

    displaySecond = document.querySelector('#seconds');

    $(".play").click(function () {

        var fragmentTime;

        var sessionMinutes = $('#session-length').text();
        var breakMinutesText = $('#break-length').text();
        breakMinutes = parseInt(breakMinutesText) * 60;

        var minutes = parseInt(sessionMinutes);

        var seconds = $('#seconds').text();


        initialValue = minutes * 60;

        if (currentTimer === "Break") {
            initialValue = breakMinutes;
        }

        minutes = parseInt(minutes);

        seconds = parseInt(seconds);

        if (isNaN(minutes)) {

            minutes = 00;

        }

        if (isNaN(seconds)) {

            seconds = 00;

        }

        if (minutes === 60) {

            minutes = 59;

        }

        if (seconds === 60) {

            seconds = 59;

        }

        fragmentTime = (60 * minutes) + (seconds);

        $(".play").fadeOut();
        $(".pause").delay(400).fadeIn();
        $(".stop").delay(400).fadeIn();
        if (!timerOn && !isPaused) {
            timerOn = true;
            startTimer(fragmentTime, displayMinute, displaySecond, currentTimer + " started");
        } else {
            startTimer(currentTime, displayMinute, displaySecond, currentTimer + " started");
        }

        isPaused = false;
        valueChanged = false;
    });
    $(".pause").click(function () {
        $(".pause").fadeOut();
        $(".play").delay(400).fadeIn();
        $(".info").text(currentTimer + " paused");
        clearInterval(interval);
        isPaused = true;
    });

    $("#session-plus").click(function () {
        var valueHolder = $("#session-length");
        var currentValue = parseInt(valueHolder.text());
        currentValue++;
        valueHolder.text(currentValue);
        if (currentValue < 10) {
            $("#minutes").text("0" + currentValue);
        } else {
            $("#minutes").text(currentValue);
        }

        if(isPaused) {
            resetClock();
        }
        valueChanged = true;
    });

    $("#session-minus").click(function () {
        var valueHolder = $("#session-length");
        var currentValue = parseInt(valueHolder.text());
        if(currentValue > 1){
            currentValue--;
        }
        valueHolder.text(currentValue);
        if (currentValue < 10) {
            $("#minutes").text("0" + currentValue);
        } else {
            $("#minutes").text(currentValue);
        }
        if(isPaused) {
            resetClock();
        }
        valueChanged = true;
    });

    $("#break-plus").click(function () {
        var valueHolder = $("#break-length");
        var currentValue = parseInt(valueHolder.text());
        currentValue++;
        valueHolder.text(currentValue);

        if(isPaused) {
            resetClock();
        }
        valueChanged = true;
    });

    $("#break-minus").click(function () {
        var valueHolder = $("#break-length");
        var currentValue = parseInt(valueHolder.text());
        if(currentValue > 1){
            currentValue--;
        }
        valueHolder.text(currentValue);
        if(isPaused) {
            resetClock();
        }
        valueChanged = true;
    });

    $(".stop").click(function () {
        $(".pause").fadeOut();
        $(".stop").fadeOut();
        $(".play").delay(400).fadeIn();
        resetClock();
        valueChanged = true;
    });
});



