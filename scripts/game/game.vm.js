define(['game/timer.vm', 'game/board.vm', 'game/SudokuWorker', 'board/board', 'board/boardDifficulty'],

    function (TimerViewModel, BoardViewModel, SudokuWorker, Board, BoardDifficulty) {
        var GameViewModel = (function () {
            var obj = {},
                currentBoard,
                boardViewModel,
                currentDifficulty = ko.observable(),
                isVisible = ko.observable(),
                isBusy = ko.observable(),
                isPaused = ko.observable(),

                init = function () {
                    isVisible(true);
                    isBusy(true);
                    isPaused(false);

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

                restartWorker = function () {
                    isBusy(true);

                    SudokuWorker.abort();
                    SudokuWorker.start();

                    //allow time for worker to load
                    setTimeout(function () {
                        isBusy(false);
                    }, 1000);
                },

                solve = function () {
                    isBusy(true);
                    SudokuWorker.solve(currentBoard, onSolved);
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
                }

                //These happen after document loaded, bein safe to use selector
                onGenerated = function (board) {
                    currentBoard = board;
                    ko.cleanNode($("#sudoku-board")[0]);
                    obj.BoardViewModel = BoardViewModel(currentBoard);
                    ko.applyBindings(obj, $("#sudoku-board")[0]); // after render knockoutjs?
                    TimerViewModel.reset();
                    isBusy(false);
                },

                onSolved = function (board) {
                    currentBoard = board;
                    obj.BoardViewModel = BoardViewModel(currentBoard);
                    ko.cleanNode($("#sudoku-board")[0]);
                    ko.applyBindings(obj, $("#sudoku-board")[0]);
                    isBusy(false);
                };

            init();

            obj = {
                generate: generate,
                solve: solve,
                play: play,
                pause: pause,
                restartWorker: restartWorker,
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