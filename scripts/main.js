$(document).ready(function(){
   
    var board = BoardGenerator.generate(BoardDifficulty.Hard),
        
        easyButton = $("#easy").click(function () {
            board = BoardGenerator.generate(BoardDifficulty.Easy);
            BoardBuilder.build(board);
        }),
                                      
        mediumButton = $("#medium").click(function () {
            board = BoardGenerator.generate(BoardDifficulty.Medium);
            BoardBuilder.build(board);
        }),
                                          
        hardButton = $("#hard").click(function () {
            board = BoardGenerator.generate(BoardDifficulty.Hard);
            BoardBuilder.build(board);
        });
                                          
    BoardBuilder.build(board);
});