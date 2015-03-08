importScripts('../examples/require.js'); //path to require js relative to current folder
require({
        baseUrl: "./"
    }, ["require", "./boardGenerator", "./boardSolver", './boardMapper', './board'],
    function (require, BoardGenerator, BoardSolver, BoardMapper, Board) {

        self.onmessage = function (e) {
            var board,
                data,
                solutions;

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
                board = Board();
                BoardMapper.mapFromString(board, data.board);
                BoardSolver.settings.numberOfSolutions = parseInt(data.numberOfSolutions);
                solutions = BoardSolver.solve(board);
                board = solutions[0];

                self.postMessage({
                    'cmd': data.cmd,
                    'board': BoardMapper.mapToString(board),
                    'numberOfSolutions': solutions.length 
                });
            }
        }
    }
);