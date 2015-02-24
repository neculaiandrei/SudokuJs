importScripts('../lib/require.min.js');

require({
        baseUrl: "../"
    }, ["require", "board/boardGenerator", "board/boardSolver", 'board/boardMapper', 'board/board'],
    function (require, BoardGenerator, BoardSolver, BoardMapper, Board) {

        self.onmessage = function (e) {
            var board,
                data;

            data = e.data;
            switch (data.cmd) {

            case ('generate'):
                board = BoardGenerator.generate(data.difficulty);

                self.postMessage({
                    'cmd': data.cmd,
                    'board': BoardMapper.mapToString(board)
                });
                break;

            case ('solve'):
                board = new Board();
                BoardMapper.mapFromString(board, data.board);
                board = BoardSolver.solve(board)[0];

                self.postMessage({
                    'cmd': data.cmd,
                    'board': BoardMapper.mapToString(board)
                });
            }
        }
    }
);