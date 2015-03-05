require(['game/page.vm', 'game/effects', 'game/ko.customBindings'], function (PageViewModel) {
    
    infuser.defaults.templateUrl = "scripts/templates";
    infuser.defaults.templatePrefix = "";
    infuser.defaults.templateSuffix = ".tmpl.html";
    
    $(document).ready(function () {
          ko.applyBindings(PageViewModel);
    });
});