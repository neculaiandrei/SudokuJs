define(['game/loader.vm', 'game/game.vm', 'game/gameEditor.vm', 'game/modal.vm'], function (LoaderViewModel, GameViewModel, GameEditorViewModel, ModalViewModel) {

    var handleIsBusy = function (busy) {
            if (busy) {
                LoaderViewModel.show("Loading...");
            } else {
                LoaderViewModel.isVisible(false);
            }
        },
        
        handleIsBlocked = function () {
            GameViewModel.restartWorker();
        };

    GameViewModel.isBusy.subscribe(handleIsBusy);
    LoaderViewModel.isBlocked.subscribe(handleIsBlocked);

    LoaderViewModel.show("Loading...");

    return {
        LoaderViewModel: LoaderViewModel,
        GameViewModel: GameViewModel,
        GameEditorViewModel: GameEditorViewModel,
        ModalViewModel: ModalViewModel
    }
})