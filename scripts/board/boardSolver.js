var BoardSolver = (function () {
    
    var findFirstEmptyCellWithFewestPossibilities = function (board) {
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
        },
        
        solve = function (board, boardContainer) {
            var cellToFill = findFirstEmptyCellWithFewestPossibilities(board);
			
            if (!cellToFill) {
                
                var solution = new Board(board);
                boardContainer.addBoard(solution);
                
                return boardContainer.isFull();
            }
            var possibleNumbers = cellToFill.getPossibleNumbers();
            
            for (var i = 0; i < possibleNumbers.length; i++) {
                cellToFill.setNumber(possibleNumbers[i]);
                if (solve(board, boardContainer)) {
                    cellToFill.setNumber();
                    return true;
                };
                cellToFill.setNumber();
            }
        };
    
    return{
        solve: solve
    };
})();