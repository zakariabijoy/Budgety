// BudGet Controller
var budgetController = (function () {
    
   var Expense = function (id, description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
   }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }


    var data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }



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
    
    var setupEventListeners = function () {
        var Dom = UICntrl.getDomStrings();

        document.querySelector(Dom.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };
    

    var ctrlAddItem  = function(){

        // 1. Get the filed input data
        var input = UICntrl.getInput();
        console.log(input);

        // 2. add the item to the budget controller

        // 3. add the item to the ui

        // 4. calculate the budget 

        // 5. display the budget on the ui

        console.log('it is working');
    };

    return {
        init: function () {
            console.log('application started');
            setupEventListeners();
        }
    }
   

})(budgetController, UIController);

controller.init();