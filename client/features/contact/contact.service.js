(function() {
    "use strict";
    
    angular
        .module("wgl.services.contact", [])
        .service("contactService", contactService);

    contactService.$inject = ["$http", "errorService"];
    
    function contactService($http, errorService) {
        
        this.getContacts = function() {
            return $http.get("/api/contacts")
                .then(function(response) {
                    return response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
        
        this.getContact = function(id) {
            return $http.get("/api/contacts/" + id)
                .then(function(response) {
                    return response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
        
        this.addContact = function(newContact) {
            return $http.post("/api/contacts", newContact)
                .then(function(response) {
                    return response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
        
        this.editContact = function(contact) {
            return $http.put("/api/contacts/" + contact.id, contact)
                .then(function(response) {
                    return response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
        
        this.deleteContact = function(id) {
            return $http.delete("/api/contacts/" + id)
                .then(function(response) {
                    return response.data;
                },
                function(response) {
                    errorService.updateErrorMessage(response.data);
                    return false;
                });
        };
    }
})();
