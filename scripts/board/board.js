define(['cell/cellsMapper', 'cell/cell', 'utils/arrayExtensions'], function (CellsMapper, Cell) {

    var Board = function (value) {
        var cells,

            init = function () {
                createEmptyCells();
                addSiblings();

                if (!value) {
                    return;
                }

                initializers[$.type(value)](value);
            },

            createEmptyCells = function () {
                var row,
                    column;

                cells = [];

                for (row = 0; row < 9; row++) {
                    cells[row] = [];
                    for (column = 0; column < 9; column++) {
                        cells[row][column] = Cell();
                    }
                }
            },

            addSiblings = function () {
                var row,
                    column;

                for (row = 0; row < 9; row++) {
                    for (column = 0; column < 9; column++) {
                        addRowSiblings(cells[row][column], row);
                        addColumnSiblings(cells[row][column], column);
                        addBoxSiblings(cells[row][column], row, column);
                    }
                }
            },

            addRowSiblings = function (cell, row) {
                var column;

                for (column = 0; column < 9; column++) {
                    cell.siblings.pushIfNotExists(cells[row][column]);
                }
            },

            addColumnSiblings = function (cell, column) {
                var row;

                for (row = 0; row < 9; row++) {
                    cell.siblings.pushIfNotExists(cells[row][column]);
                }
            },

            addBoxSiblings = function (cell, boxRow, boxColumn) {
                var row,
                    column;

                boxRow = Math.floor(boxRow / 3) * 3;
                boxColumn = Math.floor(boxColumn / 3) * 3;

                for (row = boxRow; row < boxRow + 3; row++) {
                    for (column = boxColumn; column < boxColumn + 3; column++) {
                        cell.siblings.pushIfNotExists(cells[row][column]);
                    }
                }
            },

            initFromNumbers = function (numbers) {
                CellsMapper.mapNumbersToCells(numbers, cells);
            },

            initFromBoard = function (board) {
                var numbers = CellsMapper.mapCellsToNumbers(board.cells);
                CellsMapper.mapNumbersToCells(numbers, cells);
            },

            initFromString = function (word) {
                var row,
                    column,
                    numbers = [];

                for (row = 0; row < 9; row++) {
                    numbers[row] = [];
                    for (column = 0; column < 9; column++) {
                        if (word[row * 9 + column] != '.') {
                            numbers[row][column] = word[row * 9 + column];
                        }
                    }
                }
                initFromNumbers(numbers);
            },

            initializers = {
                "array": initFromNumbers,
                "object": initFromBoard,
                "string": initFromString
            };

        init();

        return {
            cells: cells,
        };
    };

    return Board;
});