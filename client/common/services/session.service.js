(function() {
    "use strict";
    
    angular
        .module("wgl.services.session", [])
        .service("sessionService", sessionService);

    sessionService.$inject = ["$http"];
    
    function sessionService($http) {

        this.isLoggedIn = function() {
            return $http.get("/session/user")
                .then(function(response) {
                    return true;
                },
                function(response) {
                    return false;
                });
        };
    }
})();
