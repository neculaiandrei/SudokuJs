var BoardGenerator = (function () {
    var fillFirstRowWithValues = function (board) {
            var isCellFilled = false;
            for (var i = 0; i < 9; i++) {
                var cellToFill = board.cells[0][i];
                var possibleNumbers = cellToFill.getPossibleNumbers();
                var randomNumber = possibleNumbers.getRandomValue();
                cellToFill.setNumber(randomNumber);
            }
        },
        
        initPositions = function () {
            var positions = [];
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    positions[i*9+j] = {
                        row: i,
                        column: j
                    };
                }
            }
            return positions;
        },
        
        emptyCells = function (board, boardContainer, shuffledpositions, startIndex,  remainingNumberOfCells, currentNumberOfCells) {
            
            if (remainingNumberOfCells == currentNumberOfCells) {
                var finalBoard = new Board(board);
                boardContainer.addBoard(finalBoard);
                return true;
            }
            
            for (var i = startIndex; i < 81; i++) {
                    
                var position = shuffledpositions[i],
                    cell = board.cells[position.row][position.column],
                    cellNumber = cell.getNumber(),
                    solutionContainer = BoardContainer(2);

                cell.setNumber();
                BoardSolver.solve(board, solutionContainer);
                
                if (solutionContainer.numberOfBoards() == 1) {
                    if (emptyCells(board, boardContainer, shuffledpositions, i + 1, remainingNumberOfCells, currentNumberOfCells-1)) {
                        cell.setNumber(cellNumber);
                        return true;
                    }
                }

                cell.setNumber(cellNumber);
            }
        }
        
        generate = function () {
            var board = new Board(),
                positions = initPositions(),
                solutions = new BoardContainer(1),
                finalBoard = new BoardContainer(1);

            fillFirstRowWithValues(board);
            BoardSolver.solve(board, solutions);
            
            positions.shuffle();
            
            emptyCells(solutions.getBoard(0), finalBoard, positions, 0, 24, 81);
            return finalBoard.getBoard(0);
    };
    
    return {
        generate: generate
    }
})();