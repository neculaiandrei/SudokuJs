define(['./modal.vm'], function (ModalViewModel) {
    var validateValue = function (cell, newValue) {
        var intValue;

        //clear number
        if (newValue == "") {
            return 0;
        }

        intValue = parseInt(newValue);

        if (intValue == 0) {
            ModalViewModel.show("0 not my kind of number");
            return -1;
        }

        if (intValue != intValue) { //NaN, value was string
            ModalViewModel.show("Use numbers!");
            return -1;
        }

        //Trigger this except same number re typed
        if (cell.getPossibleNumbers().indexOf(intValue) == -1 &&
            intValue != cell.getNumber()) {
            ModalViewModel.show("Same number exists in row, column or box.");
            return -1;
        }

        return intValue;
    };

    ko.bindingHandlers.cellBinding = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var observable = valueAccessor(),
                cell = ko.unwrap(observable),
                $input = $(element).find("input"),
                boardViewModel = bindingContext.$parents[3];

            $input.val(cell.getNumber());
            
            if (cell.getNumber() && boardViewModel.stylesEnabled) {
                $(element).addClass("sudoku-cell-blocked");
                $input.attr("readonly", true);
            }

            ko.utils.registerEventHandler(element, 'change', function (event) {
                observable.notifySubscribers();
            });
        },

        update: function (element, valueAccessor) {
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

    ko.bindingHandlers.fade = {
        init: function (element, valueAccessor) {
        },
        
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            value ? $(element).fadeIn() : $(element).fadeOut();
        }
    };
});