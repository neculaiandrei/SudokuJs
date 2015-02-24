define(['board/board', 'board/BoardMapper'],
    function (Board, BoardMapper) {
        var SudokuWorker = (function (src) {
            var worker,
                onGenerated,
                onSolved,

                start = function () {
                    worker = new Worker(src);
                    worker.onmessage = messageHandler;
                },

                abort = function () {
                    worker.terminate();
                },

                generate = function (difficulty, callback) {
                    onGenerated = callback;
                    worker.postMessage({
                        'cmd': 'generate',
                        'difficulty': difficulty
                    });
                },

                solve = function (board, callback) {
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
                    board = new Board();
                    BoardMapper.mapFromString(board, data.board);

                    switch (data.cmd) {
                    case ('generate'):
                        onGenerated(board);
                        break;
                    case ('solve'):
                        onSolved(board);
                        break;
                    }
                };

            return {
                start: start,
                abort: abort,
                generate: generate,
                solve: solve,
            }
        })("scripts/game/sudokuWorker_src.js");

        return SudokuWorker;
    });