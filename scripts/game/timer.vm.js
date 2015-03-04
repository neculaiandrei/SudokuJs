define(function () {

    var seconds = ko.observable(0),
        minutes = ko.observable(0),
        
        formatTimeUnit = function (timeUnit) {
            if (timeUnit < 10) {
                return "0" + timeUnit;
            }
            return timeUnit;
        },
        
        time = ko.computed(function() {
            return formatTimeUnit(minutes()) + ":" + formatTimeUnit(seconds());
        }),
        
        updateTimeTimeout,

        reset = function () {
            seconds(0);
            minutes(0);
            clearTimeout(updateTimeTimeout);
            updateTime();
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
        reset: reset
    };

});