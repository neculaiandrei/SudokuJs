define(function () {
    $(document).ready(function () {
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

        var navbarOffset = 75;
        
        $('.slow-anchor').click(function () {
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top - navbarOffset + 2
            }, 500);
            return false;
        });
        
        menuHidden.find("a").each(function () {
            var currentLink = $(this);
            currentLink.click(function () {
                menuHidden.fadeOut();
            });
        });

        function onScroll(event) {
            var scrollPos = $(document).scrollTop();
            $('.menu-bullets-container a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top - navbarOffset <= scrollPos &&
                    refElement.position().top - navbarOffset + refElement.height() > scrollPos) {
                    $('.menu-bullets-container a').removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            });
        }
        
        onScroll();

        $(document).on("scroll", onScroll);
    });
});