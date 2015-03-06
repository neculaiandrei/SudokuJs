define(['game/board.vm', 'game/modal.vm', 'game/inputModal.vm', 
        'game/SudokuWorker', 'board/boardMapper', 'board/board', 'board/boardDifficulty'],
    function (BoardViewModel, ModalViewModel, InputModalViewModel, 
               SudokuWorker, BoardMapper, Board, BoardDifficulty) {
        var obj = {},
            currentBoard,
            boardViewModel,
            maxSolutions,
            isVisible = ko.observable(),
            isBusy = ko.observable(),

            init = function () {
                isVisible(false);
                isBusy(false);
                maxSolutions = 1000;
                currentBoard = Board();
                boardViewModel = BoardViewModel(currentBoard);
            },

            solve = function () {
                isBusy(true);
                SudokuWorker.solve(currentBoard, 1, onGenerated);
            },

            check = function () {
                isBusy(true);
                SudokuWorker.solve(currentBoard, maxSolutions, onChecked);
            },

            random = function () {
                isBusy(true);
                SudokuWorker.generate(BoardDifficulty.Medium, onGenerated);
            },
            
            handleBoardWord = function (word) {
                currentBoard = Board();
                
                try {
                    BoardMapper.mapFromString(currentBoard, word);
                } catch(exception) {
                    ModalViewModel.show("Something went wrong. Verify input");
                }
                
                obj.BoardViewModel = BoardViewModel(currentBoard);
                obj.BoardViewModel.stylesEnabled = false;
                ko.cleanNode($("#sudoku-editor-board")[0]);
                ko.applyBindings(obj, $("#sudoku-editor-board")[0]);
            },

            load = function () {
                InputModalViewModel.inputHandler = handleBoardWord;
                InputModalViewModel.show("Enter board in string format");
            },

            save = function () {
                var word = BoardMapper.mapToString(currentBoard);
                ModalViewModel.isTextSelectable(true);
                ModalViewModel.show("Copy this: " + word.join(""));
            },

            onGenerated = function (board) {
                currentBoard = board;
                obj.BoardViewModel = BoardViewModel(currentBoard);
                obj.BoardViewModel.stylesEnabled = false;
                ko.cleanNode($("#sudoku-editor-board")[0]);
                ko.applyBindings(obj, $("#sudoku-editor-board")[0]);
                isBusy(false);
            },
            
            onChecked = function (board, numberOfSolutions) {
                isBusy(false);
                var message = "";
                
                if(numberOfSolutions == maxSolutions) {
                    message = "Has at least ";
                }
                
                message += numberOfSolutions + " solutions";
                ModalViewModel.show(message);
            };

        init();
    
        obj = {
            isVisible: isVisible,
            isBusy: isBusy,
            solve: solve,
            check: check,
            random: random,
            load: load,
            save: save,
            BoardViewModel: boardViewModel
        };

        return obj;
    });