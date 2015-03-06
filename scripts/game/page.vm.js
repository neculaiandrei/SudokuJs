define(['game/loader.vm', 'game/game.vm', 'game/gameEditor.vm', 'game/modal.vm'], function (LoaderViewModel, GameViewModel, GameEditorViewModel, ModalViewModel) {

    var switchMode = function () {

            if (GameViewModel.isVisible()) {
                GameViewModel.isVisible(false);
                GameEditorViewModel.isVisible(true);
            } else {
                GameEditorViewModel.isVisible(false);
                GameViewModel.isVisible(true);
            }
        },

        handleIsBusy = function (busy) {
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
        switchMode: switchMode,
        LoaderViewModel: LoaderViewModel,
        GameViewModel: GameViewModel,
        GameEditorViewModel: GameEditorViewModel,
        ModalViewModel: ModalViewModel
    }
});