require(['board/boardGenerator', 'board/boardSolver', 'game/boardBuilder', 'board/boardDifficulty'],
    function (BoardGenerator, BoardSolver, BoardBuilder, BoardDifficulty) {
        $(document).ready(function () {

            var board = BoardGenerator.generate(BoardDifficulty.Hard),

                easyButton = $("#easy").click(function () {
                    board = BoardGenerator.generate(BoardDifficulty.Easy);
                    BoardBuilder.build(board);
                }),

                mediumButton = $("#medium").click(function () {
                    board = BoardGenerator.generate(BoardDifficulty.Medium);
                    BoardBuilder.build(board);
                }),

                hardButton = $("#hard").click(function () {
                    board = BoardGenerator.generate(BoardDifficulty.Hard);
                    BoardBuilder.build(board);
                }),

                solveButton = $("#solve").click(function () {
                    board = BoardSolver.solve(board)[0];
                    BoardBuilder.build(board);
                });

            BoardBuilder.build(board);
        });
    });