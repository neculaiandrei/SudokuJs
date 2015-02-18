define(['./boardSolver','./board'], function (BoardSolver, Board) {
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
                    isCellFilled = false,
                    currentCell,
                    possibleNumbers,
                    randomPossibleNumber;

                for (column = 0; column < 9; column++) {
                    currentCell = board.cells[0][column];
                    possibleNumbers = currentCell.getPossibleNumbers();
                    randomPossibleNumberNumber = possibleNumbers.getRandomValue();
                    currentCell.setNumber(randomPossibleNumberNumber);
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

            emptyCells = function (startPositionIndex, remainingNumberOfCells, currentNumberOfCells) {
                var index,
                    position,
                    cell,
                    cellNumber;

                if (isStopped) {
                    return;
                }

                if (remainingNumberOfCells == currentNumberOfCells) {
                    finalBoard = new Board(fullBoard);
                    return true;
                }

                for (index = startPositionIndex; index < 81; index++) {

                    position = positions[index],
                        cell = fullBoard.cells[position.row][position.column],
                        cellNumber = cell.getNumber(),
                        solutions = [];

                    cell.removeNumber();

                    BoardSolver.settings.numberSolutions = 2;

                    numberOfSolutions = BoardSolver.solve(fullBoard).length;

                    if (numberOfSolutions == 1) {
                        if (emptyCells(index + 1, remainingNumberOfCells, currentNumberOfCells - 1)) {
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
    
    return BoardGenerator;
});