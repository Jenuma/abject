(function() {
    "use strict";

    angular
        .module("app", [
            "ngAnimate",
            "ui.router",
            "ui.router.title",
            "wg.directives",
            "wg.services",
            "wg.errors",
            "wg.dashboard",
            "wg.contacts",
            "wg.to-play"
        ])
        .config(function($stateProvider, $locationProvider) {
            
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
        
            var toPlayState = {
                name: "to-play",
                url: "/to-play",
                templateUrl: "views/to-play/to-play.index.html",
                controller: "ToPlayController",
                controllerAs: "toPlayCtrl",
                resolve: {
                    $title: function() {return "To Play";}
                }
            }
        
            $locationProvider.html5Mode(true);
        
            $stateProvider.state(dashboardState);
            $stateProvider.state(contactsState);
            $stateProvider.state(toPlayState);
        });
})();
