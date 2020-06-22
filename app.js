// BudGet Controller
var budgetController = (function () {
    
   //some code

})();


// UI Controller
var UIController =(function () {
    
    // some code

})();


// Global App Controller
var controller = (function (budgetCntrl, UICntrl) {
    
    var ctrlAddItem  = function(){

        // 1. Get the filed input data

        // 2. add the item to the budget controller

        // 3. add the item to the ui

        // 4. calculate the budget 

        // 5. display the budget on the ui

        console.log('it is working');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13  || e.which ===13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);