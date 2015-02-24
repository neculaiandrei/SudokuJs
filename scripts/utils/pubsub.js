define(function () {

    var pubsub = function () {
        var subscribers = {};
        
        return {
            publish: function (id) {
                var args = [].slice.call(arguments, 1);

                if (!subscribers[id]) {
                    subscribers[id] = [];
                }

                for (var i = 0, il = subscribers[id].length; i < il; i++) {
                    subscribers[id][i].apply(null, args);
                }
            },
            subscribe: function (id, fn) {
                if (!subscribers[id]) {
                    subscribers[id] = [fn];
                } else {
                    subscribers[id].push(fn);
                }
            }
        };
    };
    
    return pubsub;
});