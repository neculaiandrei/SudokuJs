define(['.././sudokujs/arrayExtensions'], function () {
    var LoaderViewModel = function () {
        var numbers = [],
            content = ko.observable(),
            isVisible = ko.observable(false),
            isBlocked = ko.observable(),
            
            init = function () {
                
                for (var i = 0; i < 9; i++) {
                    numbers[i] = ko.observable(i+1); 
                }
                
                getRandomNumbers();
            },
            
            getRandomNumbers = function () {
                var randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                randomNumbers.shuffle();
                
                for (var i = 0; i < 9; i++) {
                    numbers[i](randomNumbers[i]); 
                }
            },
            
            show = function (text) {
                getRandomNumbers();
                content(text);
                isVisible(true);
            },
            
            retry = function () {
               isBlocked.notifySubscribers(); 
            };
        
        init();
        
        return {
            content: content,
            numbers: numbers,
            isVisible: isVisible,
            isBlocked: isBlocked,
            show: show,
            retry: retry
        }
    }();
    
    return LoaderViewModel;
});