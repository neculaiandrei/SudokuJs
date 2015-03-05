define(function () {
    var ModalViewModel = function (element) {
        var isVisible = ko.observable(false),
            content = ko.observable(),
            
            show = function(text) {
                content(text);
                isVisible(true);
            },
            
            close = function() {
                isVisible(false);
            }

        return {
            show: show,
            close: close,
            isVisible: isVisible,
            content: content
        };
    
    }();

    return ModalViewModel;
});