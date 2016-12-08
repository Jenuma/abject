(function() {
    "use strict";
    
    angular
        .module("wgl.users", [])
        .controller("UserController", UserController);
    
    UserController.$inject = ["$http"];

    function UserController($http) {
        var vm = this;

        vm.getCurrentUser = function() {
            $http.get("/current-user")
                .then(function(response) {
                    vm.username = response.data.displayName;
                    vm.profilePic = response.data.photos[0].value;
                });
        };
        
        vm.logout = function() {
            $http.get("/logout")
                .then(function(response) {
                    
                });
        };
        
        vm.getCurrentUser();
    }
})();
