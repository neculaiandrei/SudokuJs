define(['game/timer.vm', 'game/sudokuWorker', 'board/boardDifficulty', 'game/board.vm', 'game/ko.customBindings'],

    function (TimerViewModel, SudokuWorker, BoardDifficulty, BoardViewModel, modal) {
                var GameViewModel = (function () {
                    var currentBoard,
                        currentDifficulty,
                        isSolving,
                        difficulty,
                        $loader,
                        $board,

                        init = function () {
                            $loader = $("#loader-wrapper");
                            $difficulty = $("#sudoku-difficulty");
                            $board = $("#sudoku-board");
                            ko.applyBindings(TimerViewModel, $("#sudoku-clock")[0]);
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
                            ko.cleanNode($board[0]);
                            ko.applyBindings(BoardViewModel(board), $board[0]);
                            $loader.fadeOut();
                            TimerViewModel.reset();
                            updateDifficulty();
                        },

                        onSolved = function (board) {
                            currentBoard = board;
                            ko.cleanNode($board[0]);
                            ko.applyBindings(BoardViewModel(board), $board[0]);
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

                return GameViewModel;
    });