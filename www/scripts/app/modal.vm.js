define(function () {
    var ModalViewModel = function (element) {
        var isVisible = ko.observable(false),
            isTextSelectable = ko.observable(false),
            content = ko.observable(),
            
            show = function(text) {
                content(text);
                isVisible(true);
            },
            
            close = function() {
                isVisible(false);
                isTextSelectable(false);
            };

        return {
            show: show,
            close: close,
            isVisible: isVisible,
            isTextSelectable: isTextSelectable,
            content: content,
        };
    
    }();

    return ModalViewModel;
});