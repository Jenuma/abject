(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.finance", [])
        .controller("FinanceController", FinanceController);

    function FinanceController($scope, $interval, financeService) {
        var vm = this;

        function getBalance() {
            financeService.getBalance().then(function(response) {
                vm.balance = response;
            });
        }
        
        getBalance();
        var balanceInterval = $interval(getBalance, 60000);
        
        $scope.$on("$stateChangeStart", function() {
            $interval.cancel(balanceInterval);
        });
    }
    
    FinanceController.$inject = ["$scope", "$interval", "financeService"];
})();
