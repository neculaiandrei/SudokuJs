define(function () {
    var BoardUIBuilder = (function (element) {
        var board,
            html,

            build = function (boardToBuild) {
                var boxRow,
                    boxColumn;
                
                html = "";
                board = boardToBuild;

                for (boxRow = 0; boxRow < 3; boxRow++) {
                    html += "<tr>";
                    for (boxColumn = 0; boxColumn < 3; boxColumn++) {
                        buildBox(boxRow, boxColumn);
                    }
                    html += "</tr>";
                }

                element.html(html);
            },

            buildBox = function (boxRow, boxColumn) {
                var i,
                    j;
                
                html += "<td><table>";

                for (i = 0; i < 3; i++) {
                    html += "<tr>";
                    for (j = 0; j < 3; j++) {
                        buildCell(board.cells[boxRow * 3 + i][boxColumn * 3 + j]);
                    }
                    html += "</tr>";
                }

                html += "</table></td>";
            },
            
            buildCell = function(cell) {
                var number = cell.getNumber();

                if (number) {
                    html += "<td class='sudoku-cell sudoku-cell-blocked'><input type='text' maxlength='1' value='" +
                        number +
                        "' readonly/></td>";
                } else {
                    html += "<td class='sudoku-cell  '><input type='text' maxlength='1' value=''/></td>";
                }
            }

        return {
            build: build
        }
    })($(".sudoku-table"));

    return BoardUIBuilder;
});