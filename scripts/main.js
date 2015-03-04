require(['game/game.vm', 'game/ui'], function (GameViewModel) {
    
    infuser.defaults.templateUrl = "scripts/templates";
    infuser.defaults.templatePrefix = "";
    infuser.defaults.templateSuffix = ".tmpl.html";
    
    $(document).ready(function () {
        
        GameViewModel.init();
        
        ko.applyBindings(GameViewModel, $(".button-container")[0]);
    });
});