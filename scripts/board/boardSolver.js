var BoardSolver = (function () {
    
    var findFirstEmptyCell = function (board) {
            var emptyCell;
            
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (!board.cells[i][j].getNumber()) {
                        emptyCell = board.cells[i][j];
                    }
                }
            }
            
            return emptyCell;
        },
        
        solve = function (board, boardContainer) {
            var cellToFill = findFirstEmptyCell(board);
			
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