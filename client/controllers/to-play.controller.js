/**
 * To-Play Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wg.to-play", [])
        .controller("ToPlayController", ToPlayController);
    
    ToPlayController.$inject = ["$http", "errorService"];
    
    /**
     * Client (Angular) Controller for to-play resources.
     * @constructor ToPlayController
     * @memberOf ClientControllers
     * @param {service} $http - Facilitates communication with remote HTTP server.
     * @param {service} errorService - Notified if there are any errors with games.
     */
    function ToPlayController($http, errorService) {
        /**
         * The view-model for a to-play resource.
         * @typedef {View-Model}
         * @memberOf ClientControllers.ToPlayController
         * @instance
         * @property {Game[]} games - An array of all games.
         * @property {Game} formData - Data currently in the form.
         * @property {boolean} isEditing - Indicates if the user is editing.
         * @property {string} updateIcon - Icon for the add/edit button.
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;

        /**
         * Gets all the games and updates the view-model.
         * @function getGames
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.getGames = function() {
            $http.get("/api/games")
                .then(function(response) {
                    vm.games = response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };

        /**
         * Adds a game to the list and updates the view-model.
         * @function addGame
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.addGame = function() {
            $http.post("/api/games", vm.formData)
                .then(function(response) {
                    vm.games.push(response.data);
                    
                    vm.formData = undefined;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };
        
        /**
         * Edits the selected game and updates the view-model.
         * @function editGame
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.editGame = function() {
            $http.put("/api/games/" + vm.formData.id, vm.formData)
                .then(function(response) {
                    for(var i = 0; i < vm.games.length; i++) {
                        if(vm.games[i].id === response.data.id) {
                            vm.games[i] = response.data;
                            break;
                        }
                    }
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
            vm.stopEditing();
        };
        
        /**
         * Either redirects to addGame or editGame depending on the value
         * of isEditing.
         * @function updateGame
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.updateGame = vm.addGame;
        
        /**
         * Removes a game from the list and updates the view-model.
         * @function deleteGame
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.deleteGame = function(id) {
            $http.delete("/api/games/" + id)
                .then(function(response) {
                    for(var i = 0; i < vm.games.length; i++) {
                        if(vm.games[i].id === response.data.id) {
                            vm.games.splice(i, 1);
                            break;
                        }
                    }
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                });
        };
        
        /**
         * Prepares the controller to enter edit mode and updates the view-model.
         * @function startEditing
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.startEditing = function(game) {
            vm.isEditing = true;
            
            vm.updateIcon = "fa fa-check fa-fw";
            
            vm.formData = JSON.parse(JSON.stringify(game));
            vm.updateGame = vm.editGame;
        };
        
        /**
         * Exits edit mode and updates the view-model.
         * @function stopEditing
         * @memberOf ClientControllers.ToPlayController
         * @instance
         */
        vm.stopEditing = function() {
            vm.isEditing = false;
            
            vm.updateIcon = "fa fa-user-plus fa-fw";
            
            vm.formData = undefined;
            vm.updateGame = vm.addGame;
        }
        
        vm.getGames();
    }
})();
