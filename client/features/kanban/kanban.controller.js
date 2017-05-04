/**
 * Kanban Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.kanban", [])
        .controller("KanbanController", KanbanController);
    
    /**
     * Client (Angular) Controller for kanban board.
     * @constructor KanbanController
     * @memberOf ClientControllers
     * @param {service} $state - Service for changing view state.
     * @param {service} errorService - Notified if there are any errors.
     */
    function KanbanController($state) {
        /**
         * The view-model for the kanban board.
         * @typedef {View-Model}
         * @memberOf ClientControllers.KanbanController
         * @instance
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;
        
        /**
         * Function description
         * @function sampleFunction
         * @memberOf ClientControllers.KanbanController
         * @instance
         */
        vm.sampleFunction = function() {
            // Function code
        };
    }
    
    KanbanController.$inject = ["$state"];
})();
