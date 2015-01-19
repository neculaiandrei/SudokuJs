var BoardBuilder = (function (element) {
    var board,
        html,
        build = function (boardToBuild) {
            html = "";
            board = boardToBuild;
            
            for (var boxRow = 0; boxRow < 3; boxRow++) {
                html += "<tr>";
                for (var boxColumn = 0; boxColumn < 3; boxColumn++) {
                    buildBox(boxRow, boxColumn);
                }
                html += "</tr>";
            }
            
            element.html(html);
        }
        
        ,buildBox = function (boxRow, boxColumn) {
            html += "<td><table>";
            
            for (var i = 0; i < 3; i++) {
                html += "<tr>";
                for (var j = 0; j < 3; j++) {
                    buildCell(boxRow * 3 + i, boxColumn * 3 + j);
                }
                html += "</tr>";
            }
            
            html += "</table></td>";
        }
    
        ,buildCell = function (row, column) {
            var number = board.cells[row][column].getNumber();
             
            if (number) {
                html += "<td class='sudoku-cell sudoku-cell-blocked'><input type='text' maxlength='1' value='" +
                        number + 
                        "' readonly/></td>";
            }
            else {
                html += "<td class='sudoku-cell  '><input type='text' maxlength='1' value=''/></td>";
            }
        };
    
    return {
        build: build
    }
})($(".sudoku-table"));