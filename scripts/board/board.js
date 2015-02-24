define(['cell/cell', 'utils/pubsub', 'utils/arrayExtensions'], function (Cell, PubSub, _) {

    var Board = function (otherBoard) {
        var cells,
            pubsub,

            init = function () {
                pubsub = new PubSub();
                createEmptyCells();

                if (!otherBoard) {
                    return;
                }

                copyBoard(otherBoard);
            },

            createEmptyCells = function () {
                var row,
                    column;

                cells = [];

                for (row = 0; row < 9; row++) {
                    cells[row] = [];
                    for (column = 0; column < 9; column++) {
                        cells[row][column] = Cell(row, column, pubsub);
                    }
                }
            },
            
            copyBoard = function (board) {
                var row,
                    column;

                for (row = 0; row < 9; row++) {
                    for (column = 0; column < 9; column++) {
                        cells[row][column].setNumber(board.cells[row][column].getNumber());
                    }
                }
            };

        init();

        return {
            cells: cells,
            pubsub: pubsub
        };
    };

    return Board;
});