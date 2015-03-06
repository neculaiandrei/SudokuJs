define(function() {
    var BoardMapper = function () {
        var mapFromArray = function (board, array) {
                var it;

                for (it = 0; it < 81; it++) {
                    if(array[it]) {
                        board.cells[Math.floor(it / 9)][it % 9].setNumber(array[it]);
                    }
                }
            },
            
            mapToArray = function (board) {
                var row,
                    coll,
                    array = [];
                
                for (row = 0; row < 9; row++) {
                    for (coll = 0; coll < 9; coll++) {
                        array[row*9+coll] = board.cells[row][coll].getNumber();
                    }
                }
                
                return array;
            },
            
            mapFromString = function (board, word) {
                var it,
                    numbers = [];

                for (it = 0; it < 81; it++) {
                    if (word[it] != '.') {
                        numbers[it] = word[it];
                    } else if (word[it] == '.') {
                        numbers[it] = undefined;
                    } else {
                        throw "Not valid word";
                    }
                }

                mapFromArray(board, numbers);
            },
            
            mapToString = function (board) {
                var it,
                    numbers,
                    word = [];
                
                numbers = mapToArray(board);
                
                for (it = 0; it< 81; it++)
                    if(numbers[it]) {
                        word[it] = numbers[it];
                    } else {
                        word[it] = ".";
                    }
                
                return word;
            };
        
        return {
            mapFromArray: mapFromArray,
            mapFromString: mapFromString,
            mapToArray: mapToArray,
            mapToString: mapToString
        };
    }();
    
    return BoardMapper;
});