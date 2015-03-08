define(function () {

    var Cell = function (row, column, pubsub) {
        var number,
            appearances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            obj = {},
            
            getPossibleNumbers = function () {
                var number,
                    possibleNumbers = [];

                for (number = 1; number <= 9; number++) {
                    if (appearances[number] == 0) {
                        possibleNumbers.push(number);
                    }
                }

                return possibleNumbers;
            },

            getNumber = function () {
                return number;
            },

            setNumber = function (newNumber) {
                
                if (appearances[newNumber]) {
                    return 0;
                }
                
                if (number) {
                    pubsub.publish('numberChanged-' + row + column, [number, -1]);
                }

                if (newNumber) {
                    pubsub.publish('numberChanged-' + row + column, [newNumber, 1]);
                }
                
                number = newNumber;
                return 1;
            },
            
            handleChange = function (args) {
                var number,
                    value;
                
                number = args[0];
                value = args[1];
                
                appearances[number] += value;
            },
                
            subscribeRowChanges = function () {
                var otherColumn;
                
                for (otherColumn = 0; otherColumn < 9; otherColumn++) {
                    pubsub.subscribe('numberChanged-' + row + otherColumn, obj.handleChange);
                }
            },
                
            subscribeColumnChanges = function () {
                var otherRow;
                
                for (otherRow = 0; otherRow < 9; otherRow++) {
                    pubsub.subscribe('numberChanged-' + otherRow + column, obj.handleChange);
                }
            }, 
            
            subscribeBoxChanges = function () {
                var boxRow,
                    boxColumn,
                    otherRow,
                    otherColumn;
                
                boxRow = Math.floor(row / 3) * 3;
                boxColumn = Math.floor(column / 3) * 3;

                for (otherRow = boxRow; otherRow < boxRow + 3; otherRow++) {
                    for (otherColumn = boxColumn; otherColumn < boxColumn + 3; otherColumn++) {
                        pubsub.subscribe('numberChanged-' + otherRow + otherColumn, obj.handleChange);
                    }
                }
            };
        
        obj = {
            getPossibleNumbers: getPossibleNumbers,
            getNumber: getNumber,
            setNumber: setNumber,
            handleChange: handleChange
        };
        
        subscribeRowChanges();
        subscribeColumnChanges();
        subscribeBoxChanges();
        
        
        return obj;
    };

    return Cell;
});