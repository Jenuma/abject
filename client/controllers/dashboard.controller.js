/**
 * Dashboard Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wg.dashboard", [])
        .controller("DashboardController", DashboardController);
    
    DashboardController.$inject = ["$state", "errorService"];
    
    /**
     * Client (Angular) Controller for dashboard.
     * @constructor DashboardController
     * @memberOf ClientControllers
     * @param {service} $state - Service for changing view state.
     * @param {service} errorService - Notified if there are any errors with contacts.
     */
    function DashboardController($state, errorService) {
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
        
        /**
         * Loads the index page for to-play resources.
         * @function loadToPlayView
         * @memberOf ClientControllers.DashboardController
         * @instance
         */
        vm.loadToPlayView = function() {
            $state.go("to-play")
        }
    }
})();
