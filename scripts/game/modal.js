define(function () {
    var Modal = function (element) {
        var closeButton = element.find("button").first(),
            content = element.find("p").first(),

            show = function (value) {
                content.text(value);
                element.fadeIn();
            };

        closeButton.click(function (e) {
            e.preventDefault();
            element.fadeOut();
        });

        return {
            show: show
        };
    
    }($("#modalDialog"));

    return Modal;
});