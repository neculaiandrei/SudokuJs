define(function () {

    var Cell = function () {
        var number,
            numberOfReferences = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            siblings = [],

            getPossibleNumbers = function () {
                var number,
                    possibleNumbers = [];

                for (number = 1; number <= 9; number++) {
                    if (numberOfReferences[number] == 0) {
                        possibleNumbers.push(number);
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
                if (number) {
                    updateNumberOfReferences(number, -1);
                }

                if (newNumber) {
                    updateNumberOfReferences(newNumber, 1);
                }
                number = newNumber;
            },

            removeNumber = function () {
                setNumber();
            };

        return {
            numberOfReferences: numberOfReferences,
            getPossibleNumbers: getPossibleNumbers,
            siblings: siblings,
            getNumber: getNumber,
            setNumber: setNumber,
            removeNumber: removeNumber
        };
    };

    return Cell;
});