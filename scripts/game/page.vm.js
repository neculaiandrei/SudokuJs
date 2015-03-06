define(['game/loader.vm', 'game/game.vm', 'game/gameEditor.vm', 'game/modal.vm', 'game/inputModal.vm', 'game/SudokuWorker'], function (LoaderViewModel, GameViewModel, GameEditorViewModel, ModalViewModel, InputModalViewModel, SudokuWorker) {

    var isBusy = ko.computed(function () {
            return GameViewModel.isBusy() || GameEditorViewModel.isBusy();
        }),
        
        switchMode = function () {

            if (GameViewModel.isVisible()) {
                GameViewModel.isVisible(false);
                GameEditorViewModel.isVisible(true);
            } else {
                GameEditorViewModel.isVisible(false);
                GameViewModel.isVisible(true);
                GameViewModel.generate("Medium");
            }
        },

        handleIsBlocked = function () {
            SudokuWorker.abort();
            SudokuWorker.start();
            
            //allow time for worker to load
            setTimeout(function () {
                GameViewModel.isBusy(false);
                GameEditorViewModel.isBusy(false);
            }, 1000);
        };

    LoaderViewModel.isBlocked.subscribe(handleIsBlocked);
    LoaderViewModel.show("Loading...");

    return {
        isBusy: isBusy,
        switchMode: switchMode,
        LoaderViewModel: LoaderViewModel,
        GameViewModel: GameViewModel,
        GameEditorViewModel: GameEditorViewModel,
        ModalViewModel: ModalViewModel,
        InputModalViewModel: InputModalViewModel
    }
});