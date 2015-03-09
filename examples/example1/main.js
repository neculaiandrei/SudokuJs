require(['../.././src/boardGenerator', '../.././src/boardMapper', '../.././src/boardDifficulty'],
    function (BoardGenerator, BoardMapper, BoardDifficulty) {

        var boardContainer = document.getElementById("board"),
            button = document.getElementsByTagName("button")[0];

        button.addEventListener("click", function () {
            var board = BoardGenerator.generate(BoardDifficulty.Medium);

            boardContainer.innerHTML = BoardMapper.mapToString(board).join('');
        });
    });