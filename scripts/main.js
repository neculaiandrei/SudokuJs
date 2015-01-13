$(document).ready(function(){
     /* [ ,5,4, , , ,7, ,2],
        [ , ,8, ,1,5, , ,3],
        [9, , ,8,2,7,5, , ],
        [ , ,7, ,6,4,1, ,8],
        [6, , , , , , , , ],
        [5, ,1,9,8, ,3, , ],
        [ , ,9,1,5,8, , ,6],
        [8, , ,2,3, ,9, , ],
        [2, ,6, , , ,8,1, ]*/
    var map = [
        [ ,5,4, , , ,7, ,2],
        [ , ,8, ,1,5, , ,3],
        [9, , ,8,2,7,5, , ],
        [ , ,7, ,6,4,1, ,8],
        [6, , , , , , , , ],
        [5, ,1,9,8, ,3, , ],
        [ , ,9,1,5,8, , ,6],
        [ , , , , , , , , ],
        [ , , , , , , , , ]
    ];
    
    var Stringify = function (solution) {
        var str;
        for (var i = 0; i < 9; i++) {
            str += "\n";
            for (var j = 0; j < 9; j++) {
                str += (solution[i][j] + " ");
            }
        }
        return str;
    }
    
    //var startDate = new Date(),
    //    board = Board(map),
    //    solutionContainer = new BoardContainer(500);
    //BoardSolver.solve(board, solutionContainer);
    
    //var firstSolution = CellsMapper.mapCellsToNumbers(solutionContainer.getBoard(0).cells),
    //    secondSolution = CellsMapper.mapCellsToNumbers(solutionContainer.getBoard(1).cells),
        
    //    endDate = new Date(),
    //    timeDiff = endDate - startDate;
		
	//alert(solutionContainer.numberOfBoards());
    var board = BoardGenerator.generate();
    
    var htmlTable = "<table>";
    
    for (var i = 0; i < 9; i++) {
        htmlTable += "<tr>";
        for (var j = 0; j < 9; j++) {
            var value = board.cells[i][j].getNumber() || 0;
            htmlTable += "<td>" + value + "</td>";
        }
        htmlTable += "</tr>";
    }
    
    htmlTable += "</table>";
    
    $("#help").html(htmlTable);
});