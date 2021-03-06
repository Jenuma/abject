/**
 * Contact Controller
 * @namespace ClientControllers
 */
(function() {
    "use strict";
    
    angular
        .module("wgl.controllers.contact", [])
        .controller("ContactController", ContactController);
    
    /**
     * Client (Angular) Controller for contact resources.
     * @constructor ContactController
     * @memberOf ClientControllers
     * @param {service} $http - Facilitates communication with remote HTTP server.
     * @param {service} errorService - Notified if there are any errors with contacts.
     */
    function ContactController($state, $stateParams, contactService) {
        /**
         * The view-model for a contact resources.
         * @typedef {View-Model}
         * @memberOf ClientControllers.ContactController
         * @instance
         * @property {Contact[]} contacts - An array of all contacts.
         * @property {Contact} formData - Data currently in the form.
         * @property {boolean} isEditing - Indicates if the user is editing.
         * @property {string} updateIcon - Icon for the add/edit button.
         * @property {string} error - The most recent error, if any.
         */
        var vm = this;

        /**
         * Gets all the contacts and updates the view-model.
         * @function getContacts
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.getContacts = function() {
            vm.isLoading = true;
            contactService.getContacts().then(function(response) {
                vm.contacts = response;
                vm.isLoading = false;
            });
        };

        /**
         * Adds a contact to the list and updates the view-model.
         * @function addContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.addContact = function() {
            contactService.addContact(vm.formData).then(function(response) {
                if($state.current.name === "contacts-new") {
                    $state.go("contacts");
                } else {
                    vm.contacts.push(response);
                    vm.formData = undefined;
                } 
            });
        };
        
        /**
         * Edits the selected contact and updates the view-model.
         * @function editContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.editContact = function() {
            contactService.editContact(vm.formData).then(function(response) {
                if($state.current.name === "contacts-edit") {
                    $state.go("contacts");
                } else {
                    for(var i = 0; i < vm.contacts.length; i++) {
                        if(vm.contacts[i].id === response.id) {
                            vm.contacts[i] = response;
                            break;
                        }
                    }
                }
            });
            
            vm.stopEditing();
        };
        
        /**
         * Either redirects to addContact or editContact depending on the value
         * of isEditing.
         * @function updateContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.updateContact = vm.addContact;
        
        /**
         * Removes a contact from the list and updates the view-model.
         * @function deleteContact
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.deleteContact = function(id) {
            contactService.deleteContact(id).then(function(response) {
                for(var i = 0; i < vm.contacts.length; i++) {
                    if(vm.contacts[i].id === response.id) {
                        vm.contacts.splice(i, 1);
                        break;
                    }
                }
            });
        };
        
        vm.startAdding = function() {
            var mq = window.matchMedia("(max-device-width: 480px)");
            
            if(mq.matches) {
                $state.go("contacts-new");
            }
        };
        
        /**
         * Prepares the controller to enter edit mode and updates the view-model.
         * @function startEditing
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.startEditing = function(contact) {
            var mq = window.matchMedia("(max-device-width: 480px)");
            
            if(mq.matches) {
                $state.go("contacts-edit", {"id": contact.id});
            } else {
                vm.isEditing = true;
            
                vm.updateIcon = "fa fa-check fa-fw";

                vm.formData = JSON.parse(JSON.stringify(contact));
                vm.updateContact = vm.editContact;
            }
        };
        
        /**
         * Exits edit mode and updates the view-model.
         * @function stopEditing
         * @memberOf ClientControllers.ContactController
         * @instance
         */
        vm.stopEditing = function() {
            vm.isEditing = false;
            
            vm.updateIcon = "fa fa-user-plus fa-fw";
            
            vm.formData = undefined;
            vm.updateContact = vm.addContact;
        };
        
        if($state.current.name === "contacts-edit") {
            contactService.getContact($stateParams.id).then(function(response) {
                vm.updateMode = "Edit";
                vm.formData = response;
                vm.updateIcon = "fa fa-check fa-fw";
                vm.updateContact = vm.editContact;
            });
        } else if($state.current.name === "contacts-new") {
            vm.updateMode = "Add";
        } else {
            vm.getContacts();
        }
    }
    
    ContactController.$inject = ["$state", "$stateParams", "contactService"];
})();
