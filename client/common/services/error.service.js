/**
 * Error Service
 * @namespace Services
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.services", [])
        .service("errorService", errorService);
    
    /**
     * Service that will listen for new error messages.
     * @constructor errorService
     * @memberOf Services
     */
    function errorService() {
        /**
         * An array of callback functions to be invoked when notified.
         * @member {function[]}
         * @memberOf Services.errorService
         * @protected
         */
        var observerCallbacks = [];
        
        /**
         * Updates the current error message and notifies all observers.
         * @function updateErrorMessage
         * @memberOf Services.errorService
         * @instance
         */
        this.updateErrorMessage = function(message) {
            /**
             * The current error message sent by some controller.
             * @member {string}
             * @memberOf Services.errorService
             * @instance
             */
            this.errorMessage = message;
            notifyObservers();
        };
        
        /**
         * Registers external functions as callbacks to be executed when notified.
         * @function registerObserverCallback
         * @memberOf Services.errorService
         * @instance
         */
        this.registerObserverCallback = function(callback) {
            observerCallbacks.push(callback);
        };
        
        /**
         * Notifies the observers that the error message has changed.
         * @function notifyObservers
         * @memberOf Services.errorService
         * @protected
         */
        var notifyObservers = function() {
            angular.forEach(observerCallbacks, function(callback) {
                callback();
            });
        };
    }
})();
