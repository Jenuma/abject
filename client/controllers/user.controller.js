(function() {
    "use strict";
    
    angular
        .module("wgl.users", [])
        .controller("UserController", UserController);
    
    UserController.$inject = ["$http"];

    function UserController($http) {
        var vm = this;

        vm.getCurrentUser = function() {
            $http.get("/session/user")
                .then(function(response) {
                    vm.username = response.data.displayName;
                    vm.profilePic = response.data.photos[0].value;
                });
        };
        
        vm.getCurrentUser();
    }
})();
