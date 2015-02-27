define(['game/timer', 'game/boardUI', 'game/sudokuWorker', 'board/boardDifficulty'],
    function (Timer, BoardUI, SudokuWorker, BoardDifficulty) {

        var GameUI = (function () {
            var currentBoard,
                currentDifficulty,
                isSolving,
                loader,
                difficultyElement,

                init = function () {
                    loader = $("#loader-wrapper");
                    difficultyElement = $("#difficulty");
                    handleButtons();
                    generateInitialBoard();
                },

                handleButtons = function () {

                    $("#easy").click(function () {
                        generate(BoardDifficulty.Easy);
                    });

                    $("#medium").click(function () {
                        generate(BoardDifficulty.Medium);
                    });

                    $("#hard").click(function () {
                        generate(BoardDifficulty.Hard);
                    });

                    $("#retry").on("click", function () {
                        if (isSolving) return;
                        SudokuWorker.abort();
                        SudokuWorker.start();

                        setTimeout(function () {
                            SudokuWorker.generate(currentDifficulty, onGenerated);
                        }, 1000); //put a second delay for web worker to load
                    });

                    $("#solve").click(function () {
                        SudokuWorker.solve(currentBoard, onSolved);
                        loader.fadeIn();
                    });
                },

                generateInitialBoard = function () {
                    SudokuWorker.start();

                    setTimeout(function () {
                        SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
                    }, 1000); //put a second delay for web worker to load
                },

                generate = function (difficulty) {
                    loader.fadeIn();
                    currentDifficulty = difficulty;
                    SudokuWorker.generate(currentDifficulty, onGenerated);
                },

                onGenerated = function (board) {
                    currentBoard = board;
                    BoardUI.build(currentBoard);
                    loader.fadeOut();
                    Timer.reset();
                    updateDifficulty();
                },

                onSolved = function (board) {
                    currentBoard = board;
                    BoardUI.build(currentBoard);
                    loader.fadeOut();
                },


                updateDifficulty = function () {
                    if (currentDifficulty == BoardDifficulty.Easy) {
                        difficultyElement.text("Easy");
                    } else if (currentDifficulty == BoardDifficulty.Medium) {
                        difficultyElement.text("Medium");
                    } else if (currentDifficulty == BoardDifficulty.Hard) {
                        difficultyElement.text("Hard");
                    }
                };
            
            $(document).ready(init);
            
        })();
    });