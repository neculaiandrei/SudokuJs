define(function () {
    var TimerViewModel = function () {
        var seconds = ko.observable(0),
            minutes = ko.observable(0),
            updateTimeTimeout,
            formatTimeUnit = function (timeUnit) {
                if (timeUnit < 10) {
                    return "0" + timeUnit;
                }
                return timeUnit;
            },

            time = ko.computed(function () {
                return formatTimeUnit(minutes()) + ":" + formatTimeUnit(seconds());
            }),

            reset = function () {
                seconds(0);
                minutes(0);
                clearTimeout(updateTimeTimeout);
                updateTime();
            },
            
            play = function () {
                updateTime();
            },
            
            pause = function () {
                clearTimeout(updateTimeTimeout);
            },

            updateTime = function () {

                if (seconds() == 60) {
                    seconds(0);
                    minutes(minutes() + 1);
                }

                updateTimeTimeout = setTimeout(function () {
                    seconds(seconds() + 1);
                    updateTime();
                }, 1000);
            };

        reset();

        return {
            time: time,
            reset: reset,
            play: play,
            pause: pause
        };
    }();

    return TimerViewModel;
});