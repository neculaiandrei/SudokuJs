define(['./board'], function (Board) {
    var BoardSolver = (function (options) {
        var settings,
            solutions,
            board,
            isCancelled,

            init = function () {
                settings = options;
                solutions = [];
            },

            solve = function (boardToSolve) {
                board = boardToSolve;
                isCancelled = false;
                solutions = [];
                recursiveSolve();

                return solutions;
            },

            cancel = function () {
                isCancelled = true;
            },

            recursiveSolve = function () {
                var it,
                    cellToFill,
                    solution,
                    possibleNumbers;

                if (isCancelled) {
                    return;
                }

                cellToFill = findFirstEmptyCellWithFewestPossibilities();

                if (!cellToFill) {
                    solution = Board(board);
                    solutions.push(solution);

                    return settings.numberSolutions == solutions.length;
                }

                possibleNumbers = cellToFill.getPossibleNumbers();

                for (it = 0; it < possibleNumbers.length; it++) {

                    cellToFill.setNumber(possibleNumbers[it]);

                    if (recursiveSolve()) {
                        cellToFill.setNumber();
                        return true;
                    }

                    cellToFill.setNumber();
                }
            }

        findFirstEmptyCellWithFewestPossibilities = function () {
            var row,
                column,
                currentCell,
                emptyCell,
                minPossibilities = 10;

            for (row = 0; row < 9; row++) {
                for (column = 0; column < 9; column++) {

                    currentCell = board.cells[row][column];

                    if (!currentCell.getNumber()) {
                        if (currentCell.getPossibleNumbers().length < minPossibilities) {
                            emptyCell = currentCell;
                            minPossibilities = currentCell.getPossibleNumbers().length;
                        }
                    }
                }
            }

            return emptyCell;
        };

        init();

        return {
            settings: settings,
            solve: solve,
            cancel: cancel
        };
    })({
        numberOfSolutions: 1 //default value
    });

    return BoardSolver;
});