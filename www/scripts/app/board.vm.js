define(function () {
    var BoardViewModel = function (board) {
        var rowBoxes,
            stylesEnabled,

            init = function () {
                var i,
                    j,
                    k,
                    l;

                rowBoxes = [];
                stylesEnabled = true;

                for (i = 0; i < 3; i++) {
                    rowBoxes[i] = {
                        boxes: []
                    };
                    for (j = 0; j < 3; j++) {
                        rowBoxes[i].boxes[j] = {
                            rowCells: []
                        };
                        for (k = 0; k < 3; k++) {
                            rowBoxes[i].boxes[j].rowCells[k] = {
                                cells: []
                            };
                            for (l = 0; l < 3; l++) {
                                rowBoxes[i].boxes[j].rowCells[k].cells[l] = {
                                    cell: ko.observable(board.cells[i * 3 + k][j * 3 + l])
                                };
                            }
                        }
                    }
                }
            };

        init();

        return {
            stylesEnabled: stylesEnabled,
            rowBoxes: rowBoxes
        };
    };

    return BoardViewModel;
});