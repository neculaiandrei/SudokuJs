define(['board/board', 'board/boardMapper'],
    function (Board, BoardMapper) {
        var SudokuWorker = (function (src) {
            var worker,
                isBusy,
                onGenerated,
                onSolved,

                start = function () {
                    isBusy = false;
                    worker = new Worker(src);
                    worker.onmessage = messageHandler;
                },

                abort = function () {
                    worker.terminate();
                },

                generate = function (difficulty, callback) {
                    isBusy = true;
                    onGenerated = callback;
                    worker.postMessage({
                        'cmd': 'generate',
                        'difficulty': difficulty
                    });
                },

                solve = function (board, callback) {
                    isBusy = true;
                    onSolved = callback;
                    worker.postMessage({
                        'cmd': 'solve',
                        'board': BoardMapper.mapToString(board)
                    });
                },

                messageHandler = function (e) {
                    var board,
                        data;

                    data = e.data;
                    board = Board();
                    BoardMapper.mapFromString(board, data.board);

                    switch (data.cmd) {
                    case ('generate'):
                        isBusy = false;
                        onGenerated(board);
                        break;
                    case ('solve'):
                        isBusy = false;
                        onSolved(board);
                        break;
                    }
                };

            return {
                isBusy: isBusy,
                start: start,
                abort: abort,
                generate: generate,
                solve: solve,
            }
        })("scripts/game/sudokuWorker.src.js");

        return SudokuWorker;
    });