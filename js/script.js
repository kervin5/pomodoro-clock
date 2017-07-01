//Javascript

var timerOn = false;
var currentTimer = "session";
var isPaused = false;
var initialValue = 60;
var currentTime = 0;
var interval;

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

                    if (timer === 0 && currentTimer !== "break") {
                        initialValue = 120;
                        clearInterval(timeIntervalID);
                        startTimer(120, displayMinute, displaySecond, "Break started");
                        currentTimer = "break";
                    } else {
                        $('.info').text("Break is over");
                    }

                }
            }
    }, 1000);

}

$(document).ready(function () {

    var fragmentTime;

    //$('.info').hide();

    var sessionMinutes = $('#session-length').text();
    var breakMinutes = $('#break-length').text();

    var minutes = parseInt(sessionMinutes);

    var seconds = $('#seconds').text();

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

    displayMinute = document.querySelector('#minutes');

    displaySecond = document.querySelector('#seconds');

    $(".play").click(function () {
        $(".play").fadeOut();
        $(".pause").delay(400).fadeIn();
        if(!timerOn && !isPaused){
            startTimer(fragmentTime, displayMinute, displaySecond,"Session started");
            timerOn = true;
        } else {
            startTimer(currentTime,displayMinute,displaySecond,"Session started")
        }
        isPaused = false;
    });
    $(".pause").click(function () {
        $(".pause").fadeOut();
        $(".play").delay(400).fadeIn();
        clearInterval(interval);
        isPaused = true;
    });
});



