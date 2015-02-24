require(['game/boardUIBuilder', 'game/sudokuWorker', 'board/boardDifficulty'],
    function (BoardUIBuilder, SudokuWorker, BoardDifficulty) {
        $(document).ready(function () {
      
            var currentBoard,
                
                easyButton = $("#easy").click(function () {
                    SudokuWorker.generate(BoardDifficulty.Easy, onGenerated);
                    loader.fadeIn();
                }),

                mediumButton = $("#medium").click(function () {
                    SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
                    loader.fadeIn();
                }),

                hardButton = $("#hard").click(function () {
                    SudokuWorker.generate(BoardDifficulty.Hard, onGenerated);
                    loader.fadeIn();
                }),
                
                retryButton = $("#retry").click(function () {
                    SudokuWorker.abort();
                    SudokuWorker.start();
                    
                    setTimeout(function () {
                        SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
                    }, 1000); //put a second delay for web worker to load
                    loader.fadeIn();
                }),

                solveButton = $("#solve").click(function () {
                    SudokuWorker.solve(currentBoard, onSolved);
                    loader.fadeIn();
                }),
                
                onGenerated = function (board) {
                    currentBoard = board;
                    BoardUIBuilder.build(currentBoard);
                    loader.fadeOut();
                },
                
                onSolved = function (board) {
                    currentBoard = board;
                    BoardUIBuilder.build(currentBoard);
                    loader.fadeOut();
                },
                
                loader = $("#loader-wrapper");
            
            SudokuWorker.start();
            
            setTimeout(function () {
                SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
            }, 1000); //put a second delay for web worker to load
          
        });
    });