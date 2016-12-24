(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.nav", [])
        .controller("NavController", NavController);

    function NavController(sessionService, errorService) {
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
    
    NavController.$inject = ["sessionService", "errorService"];
})();
