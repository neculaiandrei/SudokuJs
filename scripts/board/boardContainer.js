var BoardContainer = function (maxNumberOfBoards) {
    
    var boards = [],
        
        addBoard = function (board) {
            if (boards.length < maxNumberOfBoards) {
                boards.push(board);
            }
        },
        
        getBoard = function (nth) {
            return boards[nth];
        },
        
        numberOfBoards = function() {
            return boards.length;
        },
        
        isFull = function() {
            return boards.length == maxNumberOfBoards;
        };
    
    return {
        numberOfBoards: numberOfBoards,
        isFull: isFull,
        addBoard: addBoard,
        getBoard: getBoard
    };
};