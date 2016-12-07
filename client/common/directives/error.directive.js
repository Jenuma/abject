/**
 * Error Directive
 * @namespace Directives
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.directives", [])
        .directive("wglError", errorDirective);
    
    /**
     * Attribute directive for error messages.
     * @constructor errorDirective
     * @memberOf Directives
     * @returns {Object} (anonymous) - An object with the directive restriction and template URL.
     */
    function errorDirective() {
        return {
            restrict: "A",
            templateUrl: "/views/_error.html",
            controller: "ErrorController",
            controllerAs: "errorCtrl"
        };
    }
})();
