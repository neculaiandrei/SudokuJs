var CellsMapper = (function () {
        var mapNumbersToCells = function (numbers, cells) {
            if (!numbers) {
                return;
            }
            
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                        cells[i][j].setNumber(numbers[i][j]);
                    }
                }
        },
        
        mapCellsToNumbers = function (cells) {
            numbers = [];
            for (var i = 0; i < 9; i++) {
                numbers[i] = [];
                for (var j = 0; j < 9; j++) {
                    numbers[i][j] = cells[i][j].getNumber();
                }
            }
            
            return numbers;
        };
    
    return {
        mapCellsToNumbers: mapCellsToNumbers,
        mapNumbersToCells: mapNumbersToCells
    };
})();