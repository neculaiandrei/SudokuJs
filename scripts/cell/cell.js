define(function () {

    var Cell = function () {
        var number,
            references = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            siblings = [],

            getPossibleNumbers = function () {
                var number,
                    possibleNumbers = [];

                for (number = 1; number <= 9; number++) {
                    if (references[number] == 0) {
                        possibleNumbers.push(number);
                    }
                }

                return possibleNumbers;
            },

            updateReferences = function (number, value) {
                for (var i = 0; i < siblings.length; i++) {
                    siblings[i].references[number] += value;
                }
            },

            getNumber = function () {
                return number;
            },

            setNumber = function (newNumber) {
                if (number) {
                    updateReferences(number, -1);
                }

                if (newNumber) {
                    updateReferences(newNumber, 1);
                }
                
                number = newNumber;
            },

            removeNumber = function () {
                setNumber();
            };

        return {
            references: references,
            getPossibleNumbers: getPossibleNumbers,
            siblings: siblings,
            getNumber: getNumber,
            setNumber: setNumber,
            removeNumber: removeNumber
        };
    };

    return Cell;
});