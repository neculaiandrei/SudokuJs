define(function () {
    $(document).ready(function() {
        var menuHidden = $(".menu-hidden"),
            menuPull = $(".menu-pull"),
            menuClose = $(".menu-close");
        
        menuClose.click(function (e) {
            e.preventDefault();
            menuHidden.fadeOut();
        });
        
        menuPull.click(function (e) {
            e.preventDefault();
            menuHidden.fadeIn();
        });
        
    });
});