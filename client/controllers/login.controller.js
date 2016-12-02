/**
 * Login Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wg.login", [])
        .controller("LoginController", LoginController);
    
    LoginController.$inject = ["$state", "errorService"];
    
    /**
     * Client (Angular) Controller for login page.
     * @constructor LoginController
     * @memberOf ClientControllers
     * @param {service} $state - Service for changing view state.
     * @param {service} errorService - Notified if there are any errors with logging in.
     */
    function LoginController($state, errorService) {
        /**
         * The view-model for the login page.
         * @typedef {View-Model}
         * @memberOf ClientControllers.LoginController
         * @instance
         * @property {string} email - The data in the email input field.
         * @property {string} password - The data in the password input field.
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;
        
        vm.login = function() {
            console.log("Logging in...");
        };
        
        /**
         * Loads the dashboard page.
         * @function loadDashboardView
         * @memberOf ClientControllers.LoginController
         * @instance
         */
        vm.loadDashboardView = function() {
            $state.go("dashboard");
        };
    }
})();
