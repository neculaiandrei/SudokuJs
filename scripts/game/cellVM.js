define(['game/modal'], function (modal) {
    var CellVM = function (cell) {
        var _number = ko.observable(cell.getNumber()),
            hasNumber,
            number = ko.computed({
                read: function () {
                    return _number();
                },
                write: function (value) {

                    var validatedValue = validateValue(value);
                    
                    if (validatedValue == -1) {
                        _number(cell.getNumber() || "");
                    }
                    if (validatedValue == 0) {
                        cell.setNumber();
                        _number("");
                    }
                    if (validatedValue > 0) {
                        cell.setNumber(value);
                        _number(validatedValue);
                    }
                    
                    _number.notifySubscribers();
                }
            }),
            
            validateValue = function (value) {
                var intValue;
                if (value == "") {
                    return 0;
                }

                intValue = parseInt(value);

                if (intValue == 0) {
                    modal.show("0 not my kind of number");
                    return -1;
                }

                if (intValue != intValue) { //NaN, value was string
                    modal.show("Use numbers!");
                    return -1;
                }

                if (cell.getPossibleNumbers().indexOf(intValue) == -1) {
                    modal.show("Same number exists in row, column or box.");
                    return -1;
                }


                return intValue;
            };

        if (cell.getNumber()) hasNumber = true;

        return {
            number: number,
            hasNumber: hasNumber
        };
    };

    return CellVM;
});