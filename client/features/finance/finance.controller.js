(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.finance", [])
        .controller("FinanceController", FinanceController);

    function FinanceController(financeService) {
        var vm = this;

        financeService.getBalance().then(function(response) {
            vm.balance = response;
        });
    }
    
    FinanceController.$inject = ["financeService"];
})();
