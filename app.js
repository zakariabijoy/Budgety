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
        },
        budget: 0,
        percentage: -1
    }

    var calculateTotal = function(type) {
        var sum =0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {
            var newItem, Id;
            
            // create new id  ( id = last id +1)
            if(data.allItems[type].length > 0){
                Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                Id = 0;
            }
            
            // create new item based on 'exp' or 'inc' type
            if(type === 'exp'){
                newItem = new Expense(Id, des, val)
            }else if(type === 'inc'){
                newItem = new Income(Id, des, val)
            }

            // push it to out data structure 
            data.allItems[type].push(newItem);

            //return  the new element
            return newItem;
        },

        calculateBudget: function () {
            
            // calculate total inccome  and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
            }else{
                data.percentage = -1;
            }
           
        },

        getBudget: function(){
            return { 
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing : function () {
            console.log(data);
        }
    };



})();


// UI Controller
var UIController =(function () {
    var  DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addItemList: function (obj, type) {
            var html, newHtml, element ;
            // create html string with placeholder text
            if(type === 'inc'){

                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description"> %description% </div> <div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div >';
            
            }else if(type === 'exp'){

                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description"> %description% </div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // inter html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },

        clearFields: function (params) {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);    

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMStrings.percentageLabel).textContent= '---';
            }
            
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


    var updateBudget = function () {

        // 1. calculate the  budget
            budgetCntrl.calculateBudget();
        // 2. return the budget

        var budget = budgetCntrl.getBudget();

        // 3. display the budget on the ui

        UICntrl.displayBudget(budget);
    };
    

    var ctrlAddItem  = function(){
        var input, newItem
        // 1. Get the filed input data
        input = UICntrl.getInput();

        if(input.description !== "" &&  !isNaN(input.value) && input.value > 0){

            // 2. add the item to the budget controller
            newItem = budgetCntrl.addItem(input.type, input.description, input.value);

            // 3. add the item to the ui
            UICntrl.addItemList(newItem, input.type);

            // 4. clear fileds 
            UICntrl.clearFields();

            // 5. calculate and and update budget
            updateBudget();
        }

       
    };

    return {
        init: function () {
            console.log('application started');
            UICntrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
   

})(budgetController, UIController);

controller.init();