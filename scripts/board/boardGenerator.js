define(['./boardSolver','./board'], function (BoardSolver, Board) {
    var BoardGenerator = (function () {
        
        var fullBoard,
            finalBoard,
            positions,
            isCancelled,

            cancel = function () {
                isCancelled = true;
            },
            
            generate = function (difficulty) {
                isCancelled = false;
                prepareFullBoard();
                initPositions();
                positions.shuffle();
                emptyCells(0, difficulty, 81);

                return finalBoard;
            },

            prepareFullBoard = function () {
                var solutions = [],
                    emptyBoard = new Board();

                finalBoard = new Board();
                fillFirstRowWithValues(emptyBoard);
                
                BoardSolver.settings.numberSolutions = 1;
                fullBoard = BoardSolver.solve(emptyBoard)[0];
                
            },

            fillFirstRowWithValues = function (board) {
                var row,
                    column,
                    currentCell;

                for (column = 0; column < 9; column++) {
                    currentCell = board.cells[0][column];
                    currentCell.setNumber(currentCell.getPossibleNumbers().getRandomValue());
                }
            },

            initPositions = function () {
                var row,
                    column;

                positions = [];
                for (row = 0; row < 9; row++) {
                    for (column = 0; column < 9; column++) {
                        positions[row * 9 + column] = {
                            row: row,
                            column: column
                        };
                    }
                }
            },

            emptyCells = function (start, remainingCellsCount, cellsCount) {
                var index,
                    position,
                    cell,
                    cellNumber,
                    solutionsCount;

                if (isCancelled) {
                    return;
                }

                if (remainingCellsCount == cellsCount) {
                    finalBoard = new Board(fullBoard);
                    return true;
                }

                for (index = start; index < 81; index++) {

                    position = positions[index];
                    cell = fullBoard.cells[position.row][position.column];
                    cellNumber = cell.getNumber();

                    cell.removeNumber();

                    BoardSolver.settings.numberSolutions = 2;

                    solutionsCount = BoardSolver.solve(fullBoard).length;

                    if (solutionsCount == 1) {
                        if (emptyCells(index + 1, remainingCellsCount, cellsCount - 1)) {
                            cell.setNumber(cellNumber);
                            return true;
                        }
                    }

                    cell.setNumber(cellNumber);
                }
            };

        return {
            cancel: cancel,
            generate: generate
        }
    })();
    
    return BoardGenerator;
});