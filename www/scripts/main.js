require(['app/page.vm', 'app/effects', 'app/ko.customBindings'], function (PageViewModel) {
    
    infuser.defaults.templateUrl = "www/templates";
    infuser.defaults.templatePrefix = "";
    infuser.defaults.templateSuffix = ".tmpl.html";
    
    $(document).ready(function () {
          ko.applyBindings(PageViewModel);
    });
});