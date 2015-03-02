define(['game/timerVM', 'game/sudokuWorker', 'board/boardDifficulty', 'game/boardVM'],
    function (TimerVM, SudokuWorker, BoardDifficulty, BoardVM) {
        var GameUI = (function () {
            var currentBoard,
                currentDifficulty,
                isSolving,
                $loader,
                $difficulty,
                $table,

                init = function () {
                    $loader = $("#loader-wrapper");
                    $difficulty = $("#difficulty");
                    $table = $(".sudoku-table");
                    ko.applyBindings(TimerVM, $("#sudoku-timer")[0]);
                    handleButtons();
                    generateInitialBoard();
                },

                handleButtons = function () {

                    $("#retry").on("click", function () {
                        if (isSolving) return;
                        SudokuWorker.abort();
                        SudokuWorker.start();

                        setTimeout(function () {
                            SudokuWorker.generate(currentDifficulty, onGenerated);
                        }, 1000); //put a second delay for web worker to load
                    });
                },

                generateInitialBoard = function () {
                    SudokuWorker.start();

                    setTimeout(function () {
                        SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
                    }, 1000); //put a second delay for web worker to load
                },
                
                solve = function () {
                    SudokuWorker.solve(currentBoard, onSolved);
                    $loader.fadeIn();
                },

                generate = function (difficulty) {
                    $loader.fadeIn();
                    currentDifficulty = difficulty;
                    SudokuWorker.generate(currentDifficulty, onGenerated);
                },

                onGenerated = function (board) {
                    currentBoard = board;
                    ko.cleanNode($table[0]);
                    ko.applyBindings(BoardVM(board), $table[0]);
                    $loader.fadeOut();
                    TimerVM.reset();
                    updateDifficulty();
                },

                onSolved = function (board) {
                    currentBoard = board;
                    ko.cleanNode($table[0]);
                    ko.applyBindings(BoardVM(board), $table[0]);
                    $loader.fadeOut();
                },

                updateDifficulty = function () {
                    if (currentDifficulty == BoardDifficulty.Easy) {
                        $difficulty.text("Easy");
                    } else if (currentDifficulty == BoardDifficulty.Medium) {
                        $difficulty.text("Medium");
                    } else if (currentDifficulty == BoardDifficulty.Hard) {
                        $difficulty.text("Hard");
                    }
                };


            return {
                init: init,
                generate: generate,
                solve: solve
            }

        })();

        return GameUI;
    });