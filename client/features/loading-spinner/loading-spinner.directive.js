/**
 * Loading-Spinner Directive
 * @namespace Directives
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.directives.loading-spinner", [])
        .directive("wglLoadingSpinner", loadingSpinnerDirective);
    
    /**
     * Attribute directive for loading-spinners.
     * @constructor loadingSpinnerDirective
     * @memberOf Directives
     * @returns {Object} (anonymous) - An object with the directive restriction and template URL.
     */
    function loadingSpinnerDirective() {
        var opts = {
            color: "#FFFFFF",
            position: "absolute",
            shadow: true
        }
        
        function link(scope, element, attributes) {
            var spinner = new Spinner(opts).spin();
            var container = document.querySelector("#spinner-container");
            
            container.appendChild(spinner.el);
        }
        
        return {
            restrict: "A",
            link: link,
            templateUrl: "/features/loading-spinner/loading-spinner.html"
        };
    }
})();
