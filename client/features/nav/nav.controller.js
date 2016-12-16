(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.nav", [])
        .controller("NavController", NavController);
    
    NavController.$inject = ["$http", "$state", "sessionService", "errorService"];

    function NavController($http, $state, sessionService, errorService) {
        var vm = this;

        sessionService.getCurrentUser().then(function(response) {
            if(response) {
                vm.username = response.username;
                vm.profilePic = response.profilePic;
            } else {
                errorService.updateErrorMessage(response.data);
            }
        });
    }
})();
