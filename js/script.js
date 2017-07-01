//Javascript

var timerOn = false;
var currentTimer = "Session";
var isPaused = false;
var initialValue = 0;
var currentTime = 0;
var interval;
var breakMinutes = 0;

function resetClock() {
    var sessionLength = parseInt($('#session-length').text());
    timerOn = false;
    currentTimer = "Session";
    isPaused = false;
    initialValue = 60;
    currentTime = 0;
    interval = 0;
    breakMinutes = 0;
    $(".info").text("POMODORO");
    if (sessionLength < 10) {
        $("#minutes").text("0" + sessionLength.toString());
    } else  {
        $("#minutes").text(sessionLength.toString());
    }

    $(".pause").fadeOut();
    $(".play").delay(400).fadeIn();
}

function startTimer(duration, displayMinute, displaySecond, message) {
    var bgPosition = duration;

    var timer = duration;

    $('.info').text(message);
    var timeIntervalID = setInterval(function () {
        interval = timeIntervalID;
            if(!isPaused) {
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
                        resetClock();
                        clearInterval(timeIntervalID);
                    }

                }
            }
    }, 1000);

}

$(document).ready(function () {

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
        if(!timerOn && !isPaused){
            startTimer(fragmentTime, displayMinute, displaySecond,currentTimer + " started");
            timerOn = true;
        } else {
            startTimer(currentTime,displayMinute,displaySecond,currentTimer + " started");
        }
        isPaused = false;
    });
    $(".pause").click(function () {
        $(".pause").fadeOut();
        $(".play").delay(400).fadeIn();
        $(".info").text(currentTimer + " paused");
        clearInterval(interval);
        isPaused = true;
    });
});



