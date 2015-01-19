var BoardSolver = (function () {
    var settings = {
            numberSolutions: 1,
        },
        solutions,
        board,
        isStopped,
        
        solve = function (boardToSolve) {
            board = boardToSolve;
            
            isStopped = false;
            
            solutions = [];
            
            recursiveSolve();
            
            return solutions;
        },
        
        stop = function () {
            isStopped = true;
        },
        
        recursiveSolve = function () {
            
            if (isStopped ) {
                return;
            }
            
            var cellToFill = findFirstEmptyCellWithFewestPossibilities();
	
            if (!cellToFill) {
                var solution = new Board(board);
                solutions.push(solution);
                
                return settings.numberSolutions == solutions.length;
            }
            
            var possibleNumbers = cellToFill.getPossibleNumbers();
            
            for (var i = 0; i < possibleNumbers.length; i++) {
                cellToFill.setNumber(possibleNumbers[i]);
                if (recursiveSolve()) {
                    cellToFill.removeNumber();
                    return true;
                };
                
                cellToFill.removeNumber();
            }
        }
        
        findFirstEmptyCellWithFewestPossibilities = function () {
            var emptyCell,
                minPossibilities = 10;
            
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    var cell = board.cells[i][j];
                    
                    if (!cell.getNumber()) {
                        if(cell.getPossibleNumbers().length < minPossibilities) {
                            emptyCell = cell;
                            minPossibilities = cell.getPossibleNumbers().length;
                        }
                    }
                }
            }
            
            return emptyCell;
        };
    
    return{
        settings: settings,
        solve: solve,
        stop: stop
    };
})();