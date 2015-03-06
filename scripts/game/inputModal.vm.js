define(function () {
    var InputModalViewModel = function (element) {
        var obj = {},
            isVisible = ko.observable(false),
            content = ko.observable(),
            input = ko.observable(),
            inputHandler = function () {},
            
            show = function(text) {
                content(text);
                isVisible(true);
            },
            
            close = function() {
                isVisible(false);
                obj.inputHandler(input());
            };

        obj = {
            show: show,
            close: close,
            isVisible: isVisible,
            content: content,
            input: input,
            inputHandler: inputHandler
        };
        
        return obj;
    
    }();

    return InputModalViewModel;
});