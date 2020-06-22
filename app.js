// BudGet Controller
var budgetController = (function () {
    
   //some code

})();


// UI Controller
var UIController =(function () {
    var  DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDomStrings: function () {
            return DOMStrings;
        }
    }

})();


// Global App Controller
var controller = (function (budgetCntrl, UICntrl) {
    
    var Dom = UICntrl.getDomStrings();

    var ctrlAddItem  = function(){

        // 1. Get the filed input data
        var input = UICntrl.getInput();
        console.log(input);

        // 2. add the item to the budget controller

        // 3. add the item to the ui

        // 4. calculate the budget 

        // 5. display the budget on the ui

        console.log('it is working');
    }

    document.querySelector(Dom.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13  || e.which ===13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);