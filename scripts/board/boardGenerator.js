var BoardGenerator = (function () {
    var fullBoard,
        finalBoard,
        positions,
        isStopped,
        
        generate = function (difficulty) {
            isStopped = false;
            
            prepareFullBoard();
            
            initPositions();
            positions.shuffle();
            
            emptyCells(0, difficulty, 81);
            
            return finalBoard;
        },
        
        stop = function () {
            isStopped = true;
        }
        
        prepareFullBoard = function () {
            var solutions = [],
                emptyBoard = new Board();
            
            finalBoard = new Board();
            
            fillFirstRowWithValues(emptyBoard);
            
            BoardSolver.settings.numberSolutions = 1;
            fullBoard = BoardSolver.solve(emptyBoard)[0];
        },
        
        fillFirstRowWithValues = function (board) {
            var isCellFilled = false;
            for (var i = 0; i < 9; i++) {
                var cellToFill = board.cells[0][i];
                var possibleNumbers = cellToFill.getPossibleNumbers();
                var randomNumber = possibleNumbers.getRandomValue();
                cellToFill.setNumber(randomNumber);
            }
        },
        
        initPositions = function () {
            positions = [];
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    positions[i*9+j] = {
                        row: i,
                        column: j
                    };
                }
            }
        },
        
        emptyCells = function (startPositionIndex,  remainingNumberOfCells, currentNumberOfCells) {
            
            if (isStopped) {
                return;
            }
            
            if (remainingNumberOfCells == currentNumberOfCells) {
                finalBoard = new Board(fullBoard);
                return true;
            }
            
            for (var i = startPositionIndex; i < 81; i++) {
                    
                var position = positions[i],
                    cell = fullBoard.cells[position.row][position.column],
                    cellNumber = cell.getNumber(),
                    solutions = [];

                cell.removeNumber();
                
                BoardSolver.settings.numberSolutions = 2;
                
                numberOfSolutions = BoardSolver.solve(fullBoard).length;
                
                if (numberOfSolutions == 1) {
                    if (emptyCells(i + 1, remainingNumberOfCells, currentNumberOfCells-1)) {
                        cell.setNumber(cellNumber);
                        return true;
                    }
                }
                
                cell.setNumber(cellNumber);
            }
        };
    
    return {
        generate: generate
    }
})();