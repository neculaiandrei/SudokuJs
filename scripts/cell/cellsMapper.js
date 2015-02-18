define(function () {
    var CellsMapper = (function () {
        var mapNumbersToCells = function (numbers, cells) {
                var row,
                    column;

                if (!numbers) {
                    return;
                }

                for (row = 0; row < 9; row++) {
                    for (column = 0; column < 9; column++) {
                        cells[row][column].setNumber(numbers[row][column]);
                    }
                }
            },

            mapCellsToNumbers = function (cells) {
                var row,
                    column,
                    numbers = [];

                for (row = 0; row < 9; row++) {
                    numbers[row] = [];
                    for (column = 0; column < 9; column++) {
                        numbers[row][column] = cells[row][column].getNumber();
                    }
                }

                return numbers;
            };

        return {
            mapCellsToNumbers: mapCellsToNumbers,
            mapNumbersToCells: mapNumbersToCells
        };
    })();

    return CellsMapper;
});