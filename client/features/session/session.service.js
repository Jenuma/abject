(function() {
    "use strict";
    
    angular
        .module("wgl.services.session", [])
        .service("sessionService", sessionService);
    
    function sessionService($http) {
        this.getCurrentUser = function() {
            return $http.get("/session/user")
                .then(function(response) {
                    return {
                        username: response.data.displayName,
                        profilePic: response.data.photos[0].value
                    };
                },
                function(response) {
                    return false;
                });
        };
    }
    
    sessionService.$inject = ["$http"];
})();
