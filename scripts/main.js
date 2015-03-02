require(['game/gameUI'], function (GameUI) {
    
    infuser.defaults.templateUrl = "scripts/templates";
    infuser.defaults.templatePrefix = "";
    infuser.defaults.templateSuffix = ".tmpl.html";
    
    $(document).ready(function () {
        GameUI.init();
    });
});