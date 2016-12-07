/**
 * Error Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.errors", [])
        .controller("ErrorController", ErrorController);
    
    ErrorController.$inject = ["errorService"];
    
    /**
     * Client (Angular) Controller for errors.
     * @constructor ErrorController
     * @memberOf ClientControllers
     * @param {service} errorService - Notifies this controller when an error message is ready.
     */
    function ErrorController(errorService) {
        /**
         * The view-model for errors. 
         * @typedef {View-Model}
         * @memberOf ClientControllers.ErrorController
         * @instance
         * @property {string} errorMessage - The most recent error message to be displayed.
         */
        var vm = this;
        
        /**
         * Notifies error service when the error is dismissed.
         * @function dismissError
         * @memberOf ClientControllers.ErrorController
         * @instance
         */
        vm.dismissError = function() {
            errorService.updateErrorMessage("");
        };
        
        /**
         * Updates the error message when notified by error service.
         * @function updateErrorMessage
         * @memberOf ClientControllers.ErrorController
         * @protected
         */
        var updateErrorMessage = function() {
            vm.errorMessage = errorService.errorMessage;
        };
        
        errorService.registerObserverCallback(updateErrorMessage);
    }
})();
