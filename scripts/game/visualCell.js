define(function () {
    var VisualCell = function (cell) {
        var model = cell,
            html = "",

            buildHtml = function () {
                var number = model.getNumber();

                if (number) {
                    html += "<td class='sudoku-cell sudoku-cell-blocked'><input type='text' maxlength='1' value='" +
                        number +
                        "' readonly/></td>";
                } else {
                    html += "<td class='sudoku-cell  '><input type='text' maxlength='1' value=''/></td>";
                }
            };

        buildHtml();

        return {
            html: html
        };
    }

    return VisualCell;
});