(function() {
    "use strict";
    
    angular
        .module("wgl.services.finance", [])
        .service("financeService", financeService);
    
    function financeService($http, errorService) {
        
       this.getBalance = function() {
            return $http.get("/api/finance/balance")
                .then(function(response) {
                    return response.data.amount;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
    }
    
    financeService.$inject = ["$http", "errorService"];
})();
