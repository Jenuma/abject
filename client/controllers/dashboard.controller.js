/**
 * Dashboard Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.dashboard", [])
        .controller("DashboardController", DashboardController);
    
    DashboardController.$inject = ["$state", "sessionService", "errorService"];
    
    /**
     * Client (Angular) Controller for dashboard.
     * @constructor DashboardController
     * @memberOf ClientControllers
     * @param {service} $state - Service for changing view state.
     * @param {service} errorService - Notified if there are any errors.
     */
    function DashboardController($state, sessionService, errorService) {
        /**
         * The view-model for the dashboard.
         * @typedef {View-Model}
         * @memberOf ClientControllers.DashboardController
         * @instance
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;
        
        /**
         * Loads the index page for contact resources.
         * @function loadContactView
         * @memberOf ClientControllers.DashboardController
         * @instance
         */
        vm.loadContactView = function() {
            $state.go("contacts");
        };
        
        sessionService.isLoggedIn().then(function(response) {
            if(response !== true) {
                $state.go("login");
            }
        });
        
//        if(!sessionService.isLoggedIn()) {
//            $state.go("login");
//        }
    }
})();
