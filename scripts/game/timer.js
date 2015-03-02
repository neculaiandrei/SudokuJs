define(function () {
    
    var Timer = (function (element) {
        var seconds,
            minutes,
            updateSecondsTimeout,
            updateMinutesTimeout,
            secondsElement = element.children("span").eq(1),
            minutesElement = element.children("span").eq(0),

            reset = function () {
                seconds = 0;
                minutes = 0;
                clearTimeout(updateSecondsTimeout);
                clearTimeout(updateMinutesTimeout);
                updateMinutes();
                updateSeconds();
            },

            updateSeconds = function () {
                
                if(seconds == 60) {
                    seconds = 0;
                    minutes++;
                    updateMinutes();
                }
                
                secondsElement.text(formatTimeUnit(seconds));
                
                updateSecondsTimeout = setTimeout(function () {
                    seconds++;
                    updateSeconds();
                }, 1000);
            },

            updateMinutes = function () {
                minutesElement.text(formatTimeUnit(minutes));
            },
            
            formatTimeUnit = function (timeUnit) {
                if (timeUnit < 10 ) {
                    return "0" + timeUnit;
                }
                return timeUnit;
            };

        reset();

        return {
            reset: reset
        };
        
    })($("#timer"));

    return Timer;
});