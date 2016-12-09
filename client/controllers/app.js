(function() {
    "use strict";

    angular
        .module("app", [
            "ngAnimate",
            "ui.router",
            "ui.router.title",
            "wgl.directives.error",        
            "wgl.services.session",
            "wgl.services.error",
            "wgl.controllers.error",
            "wgl.controllers.nav",
            "wgl.controllers.dashboard",
            "wgl.controllers.contact"
        ])
        .config(function($stateProvider, $locationProvider) {
            var loginState = {
                name: "login",
                url: "/login",
                templateUrl: "/views/login.html",
                resolve: {
                    $title: function() {return "Login";},
                    alreadyLoggedIn: function($state, sessionService) {
                        sessionService.getCurrentUser().then(function(response) {
                            if(response) {
                                $state.go("dashboard");
                            }
                        });
                    }
                }
            };
            var dashboardState = {
                name: "dashboard",
                url: "/",
                templateUrl: "/views/dashboard.html",
                controller: "DashboardController",
                controllerAs: "dashboardCtrl",
                resolve: {
                    $title: function() {return "Dashboard";},
                    notLoggedIn: function($state, sessionService) {
                        sessionService.getCurrentUser().then(function(response) {
                            if(!response) {
                                $state.go("login");
                            }
                        });
                    }
                }
            };
            var contactsState = {
                name: "contacts",
                url: "/contacts",
                templateUrl: "/views/contact/contact.index.html",
                controller: "ContactController",
                controllerAs: "contactCtrl",
                resolve: {
                    $title: function() {return "Contacts";},
                    notLoggedIn: function($state, sessionService) {
                        sessionService.getCurrentUser().then(function(response) {
                            if(!response) {
                                $state.go("login");
                            }
                        });
                    }
                }
            };
            var unauthorizedState = {
                name: "unauthorized",
                url: "/401",
                templateUrl: "/views/errors/401.html",
                resolve: {
                    $title: function() {return "401 - Unauthorized";}
                }
            };
            var notFoundState = {
                name: "notFound",
                url: "*path",
                templateUrl: "/views/errors/404.html",
                resolve: {
                    $title: function() {return "404 - Not Found";}
                }
            };
        
            $locationProvider.html5Mode(true);
        
            $stateProvider.state(loginState);
            $stateProvider.state(dashboardState);
            $stateProvider.state(contactsState);
            $stateProvider.state(unauthorizedState);
            $stateProvider.state(notFoundState);
        });
})();
