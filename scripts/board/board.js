var Board = function (value) {
    var cells,
        
        init = function () {
            createEmptyCells();
            addSiblings();
            
            if (!value) {
                return;
            }
            
            if ($.type(value) == "array") {
                initFromNumbers(value);
            } else if ($.type(value) == "object") {
                initFromBoard(value);
            } else if ($.type(value) == "string") {
                initFromString(value);
            }
        },
        
        createEmptyCells = function () {
            cells = [];
            for (var i = 0; i < 9; i++) {
                cells[i] = [];
                for(var j = 0; j < 9; j++) {
                    cells[i][j] = Cell();
                }
            }
        },
        
        addSiblings = function () {
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    addRowSiblings(cells[i][j], i);
                    addColumnSiblings(cells[i][j], j);
                    addSectionSiblings(cells[i][j], i, j);
                }
            }
        },
        
        addRowSiblings = function (cell, row) {
            for (var i = 0; i < 9; i++) {
                    cell.siblings.pushIfNotExists(cells[row][i]);
            }
        },
        
        addColumnSiblings = function (cell, column) {
            for (var i = 0; i < 9; i++) {
                    cell.siblings.pushIfNotExists(cells[i][column]);
            }
        },
        
        addSectionSiblings = function (cell, row, column) {
            row = Math.floor(row / 3) * 3;
            column = Math.floor(column / 3) * 3;
            
            for (var i = row; i < row + 3; i++) {
                for (var j = column; j < column + 3; j++) {
                        cell.siblings.pushIfNotExists(cells[i][j]);
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
            var numbers = [];
            
            for (var i = 0; i < 9; i++) {
                numbers[i] = [];
                for (var j = 0; j < 9; j++) {
                    if(word[i*9+j] != '.') {
                        numbers[i][j] = word[i*9+j];
                    }
                }
            }
            initFromNumbers(numbers);
        };
    
    init();
    
    return {
        cells: cells,
    };
};