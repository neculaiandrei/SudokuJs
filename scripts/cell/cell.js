var Cell = function () {
        var number,
            numberOfReferences = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            siblings = [],
            
            getPossibleNumbers = function () {
                var possibleNumbers = [];
                
                for (var i = 1; i <= 9; i++) {
                    if (numberOfReferences[i]==0) {
                        possibleNumbers.push(i);
                    }
                }
                
                return possibleNumbers;
            },
            
            updateNumberOfReferences = function (number, reference) {
                for (var i = 0; i < siblings.length; i++) {
                    siblings[i].numberOfReferences[number] += reference;
                }
            },
            
            getNumber = function () {
                return number;
            },

            setNumber = function (newNumber) {
                if(number){
                    updateNumberOfReferences(number, -1);
                }
                
                if(newNumber){
                    updateNumberOfReferences(newNumber, 1);
                }
                number = newNumber;
            };
            
            removeNumber = function () {
                setNumber();
            }
        return {
            numberOfReferences: numberOfReferences,
            getPossibleNumbers: getPossibleNumbers,
            siblings: siblings,
            getNumber: getNumber,
            setNumber: setNumber,
            removeNumber: removeNumber
        };
    };