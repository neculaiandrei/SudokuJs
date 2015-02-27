define(['game/modal', 'text!templates/board.tmpl.html'], function (modal, boardTemplate) {
    var BoardUI = (function (element) {
        var board,
            html,

            build = function (boardToBuild) {
                board = boardToBuild;
                element.html(_.template(boardTemplate)({
                    board: board
                }));
                handleCells();
            },

            handleCells = function () {
                var $cells = $(".sudoku-cell");

                $cells.each(function (index, value) {
                    $input = $(value).children("input").eq(0);
                    $input.change(handleCell);
                });

            },

            handleCell = function (e) {
                var row,
                    column,
                    newValue,
                    oldValue,
                    validatedValue;

                e.preventDefault();

                row = $(this).parent().attr("data-row");
                column = $(this).parent().attr("data-column");
                newValue = $(this).val();
                oldValue = $(this).prop("defaultValue");

                validatedValue = validateValue(newValue, row, column);

                if (validatedValue == -1) {
                    $(this).val(oldValue);
                }

                if (validatedValue == 0) {
                    board.cells[row][column].removeNumber();
                }

                if (validatedValue > 0) {
                    board.cells[row][column].setNumber(validatedValue);
                }
            },

            validateValue = function (value, row, column) {
                var intValue;

                if (value == "") {
                    return 0;
                }

                intValue = parseInt(value);

                if (intValue == 0) {
                    modal.show("0 not my kind of number");
                    return -1;
                }

                if (intValue != intValue) { //NaN, value was string
                    modal.show("Use numbers!");
                    return -1;
                }

                if (board.cells[row][column].getPossibleNumbers().indexOf(intValue) == -1) {
                    modal.show("Same number exists in row, column or box.");
                    return -1;
                }

                return intValue;
            };

        return {
            build: build
        };
    })($(".sudoku-table"));

    return BoardUI;
});