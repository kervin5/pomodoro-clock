//Javascript

var timerOn = true;
var currentTimer = "session";

function startTimer(duration, displayMinute, displaySecond, message) {
    var bgPosition = duration;

    var timer = duration;

    var timeIntervalID = setInterval(function () {
        bgPosition = 110 - ((timer / duration) + 0.1)*100;
        console.log(timer);
       $(".bg-group").css("top",bgPosition+"%");
        minutes = parseInt(timer / 60, 10);

        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayMinute.textContent = minutes;

        displaySecond.textContent = seconds;

        if (--timer < 0) {

            timer = 0;

            if (timer === 0 && currentTimer !== "break") {

                clearInterval(timeIntervalID);

              $('.info').text(message);

            }

        }

    }, 1000);

}

$(document).ready(function () {

    var fragmentTime;

    //$('.info').hide();

    var sessionMinutes = $('#session-length').text();
    var breakMinutes = $('#break-length').text();

    var minutes = parseInt(sessionMinutes) + parseInt(breakMinutes);

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
        startTimer(fragmentTime, displayMinute, displaySecond,"Time out");
    });
});



