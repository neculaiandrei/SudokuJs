define(['./timer.vm', './board.vm', './modal.vm', 
        'sudokujs/sudokuWorker', 'sudokujs/board', 'sudokujs/boardDifficulty'],

    function (TimerViewModel, BoardViewModel, ModalViewModel, SudokuWorker, Board, BoardDifficulty) {
        var GameViewModel = (function () {
            var obj = {},
                currentBoard,
                originalBoard,
                boardViewModel,
                currentDifficulty = ko.observable(),
                isVisible = ko.observable(),
                isBusy = ko.observable(),
                isPaused = ko.observable(),
                isAutomaticSolved,

                init = function () {
                    isVisible(true);
                    isBusy(true);
                    isPaused(false);
                    isAutomaticSolved = false;

                    //Generate empty board to bind 
                    //till the full board will be generated
                    currentBoard = Board();
                    boardViewModel = BoardViewModel(currentBoard);

                    SudokuWorker.start();

                    //allow time for worker to load
                    setTimeout(function () {
                        generate("Medium");
                    }, 1000);
                },

                solve = function () {
                    isBusy(true);
                    SudokuWorker.solve(originalBoard, 1, onSolved);
                },

                generate = function (difficulty) {
                    isBusy(true);
                    currentDifficulty(difficulty);

                    SudokuWorker.generate(BoardDifficulty[ko.unwrap(currentDifficulty)], onGenerated);
                },

                pause = function () {
                    isPaused(true);
                    TimerViewModel.pause();
                },

                play = function () {
                    isPaused(false);
                    TimerViewModel.play();
                },

                finish = function () {
                    if (currentBoard.isFull()) {

                        if (isAutomaticSolved) {
                            ModalViewModel.show("Confucius: 'I hate cheaters'");
                        } else {
                            TimerViewModel.pause();
                            ModalViewModel.show("Congrats! Awesome job"); //on play the time should not resume
                        }
                        
                    } else {
                        ModalViewModel.show("Not finished yet! You missed some spots");
                    }
                },

                //These happen after document loaded, being safe to use selector
                onGenerated = function (board) {
                    currentBoard = board;
                    originalBoard = Board(board);
                    obj.BoardViewModel = BoardViewModel(currentBoard);
                    isAutomaticSolved = false;
                    ko.cleanNode($("#sudoku-normal-board")[0]);
                    ko.applyBindings(obj, $("#sudoku-normal-board")[0]);
                    TimerViewModel.reset();
                    isBusy(false);
                },

                onSolved = function (board) {
                    currentBoard = board;
                    originalBoard = Board(board);
                    obj.BoardViewModel = BoardViewModel(currentBoard);
                    isAutomaticSolved = true;
                    ko.cleanNode($("#sudoku-normal-board")[0]);
                    ko.applyBindings(obj, $("#sudoku-normal-board")[0]);
                    isBusy(false);
                };

            init();

            obj = {
                generate: generate,
                solve: solve,
                play: play,
                finish: finish,
                pause: pause,
                isVisible: isVisible,
                isBusy: isBusy,
                isPaused: isPaused,
                currentDifficulty: currentDifficulty,
                TimerViewModel: TimerViewModel,
                BoardViewModel: boardViewModel,
            };
            
            return obj;

        })();

        return GameViewModel;
    });