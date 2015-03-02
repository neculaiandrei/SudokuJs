require(['game/gameVM'], function (GameVM) {
    
    infuser.defaults.templateUrl = "scripts/templates";
    infuser.defaults.templatePrefix = "";
    infuser.defaults.templateSuffix = ".tmpl.html";
    
    $(document).ready(function () {
        
        GameVM.init();
        
        ko.applyBindings(GameVM, $(".button-container")[0]);
    });
});