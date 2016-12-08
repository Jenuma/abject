(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.session", [])
        .controller("SessionController", SessionController);
    
    SessionController.$inject = ["$http"];

    function SessionController($http) {
        var vm = this;

        vm.getCurrentUser = function() {
            $http.get("/session/user")
                .then(function(response) {
                    vm.username = response.data.displayName;
                    vm.profilePic = response.data.photos[0].value;
                },
                function(response) {
                    console.log(response.data);
                });
        };
        
        vm.getCurrentUser();
    }
})();
