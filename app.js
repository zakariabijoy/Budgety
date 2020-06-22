var budgetController = (function () {
    
    var x = 23;

    var  add  = function (a) {
        return a+x;
    }

    return  {
        publicTest : function (b) {
            return add(b);
        }
    }

})();

var UIController =(function () {
    
    // some code

})();

var controller = (function (budgetCntrl, UICntrl) {
    
    var z= budgetCntrl.publicTest(5);
    return {
        anotherPublic: function () {
            console.log(z);
        }
    }

})(budgetController, UIController);