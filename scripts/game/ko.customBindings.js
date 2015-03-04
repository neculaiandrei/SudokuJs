define(['game/modal'], function (modal) {
    var validateValue = function (cell, newValue) {
        var intValue;
        
        //clear number
        if (newValue == "") {
            return 0;
        }
        
        intValue = parseInt(newValue);

        if (intValue == 0) {
            modal.show("0 not my kind of number");
            return -1;
        }

        if (intValue != intValue) { //NaN, value was string
            modal.show("Use numbers!");
            return -1;
        }

        //Trigger this except same number re typed
        if (cell.getPossibleNumbers().indexOf(intValue) == -1 && 
            intValue != cell.getNumber()) {
            modal.show("Same number exists in row, column or box.");
            return -1;
        }

        return intValue;
    };

    ko.bindingHandlers.cellBinding = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var observable = valueAccessor(),
                cell = ko.unwrap(observable),
                $input = $(element).find("input");
            
            $input.val(cell.getNumber());

            if (cell.getNumber()) {
                $(element).addClass("sudoku-cell-blocked");
                $input.attr("readonly", true);
            }
            
            ko.utils.registerEventHandler(element, 'change', function (event) {
                observable.notifySubscribers();
            });
        },

        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var validatedValue,
                $input = $(element).find("input"),
                value = $input.val(),
                cell = ko.unwrap(valueAccessor());

            validatedValue = validateValue(cell, value);

            if (validatedValue == 0) {
                cell.setNumber();
            }
            if (validatedValue > 0) {
                cell.setNumber(validatedValue);
            }

            $input.val(cell.getNumber());
        }
    };
});