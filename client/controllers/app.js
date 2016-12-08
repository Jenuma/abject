(function() {
    "use strict";

    angular
        .module("app", [
            "ngAnimate",
            "ui.router",
            "ui.router.title",
            "wgl.directives",
            "wgl.services",
            "wgl.errors",
            "wgl.users",
            "wgl.dashboard",
            "wgl.contacts"
        ])
        .config(function($stateProvider, $locationProvider) {
            
            var loginState = {
                name: "login",
                url: "/login",
                templateUrl: "/views/login.html",
                resolve: {
                    $title: function() {return "Login";}
                }
            };
        
            var dashboardState = {
                name: "dashboard",
                url: "/",
                templateUrl: "/views/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                resolve: {
                    $title: function() {return "Dashboard";}
                }
            };
        
            var contactsState = {
                name: "contacts",
                url: "/contacts",
                templateUrl: "/views/contact/contact.index.html",
                controller: "ContactController",
                controllerAs: "contactCtrl",
                resolve: {
                    $title: function() {return "Contacts";}
                }
            };
        
            $locationProvider.html5Mode(true);
        
            $stateProvider.state(loginState);
            $stateProvider.state(dashboardState);
            $stateProvider.state(contactsState);
        });
})();
