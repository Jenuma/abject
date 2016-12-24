describe("The client-side error controller", function() {
    beforeEach(module("app"));
    
    var $controller, $rootScope, errorService;
    var errorController;
    
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        $controller = $injector.get("$controller");
        errorService = $injector.get("errorService");
        
        errorController = $controller("ErrorController", {"$scope": $rootScope, "errorService": errorService});
    }));
    
    it("can dismiss an error message", function() {
        errorController.dismissError();
        
        expect(errorController.errorMessage).toEqual("");
    });
    
    it("update its error message when notified", function() {
        var exampleErrorMessage = "This is an example error message for the error controller unit test.";
        
        errorService.updateErrorMessage(exampleErrorMessage);
        
        expect(errorController.errorMessage).toEqual(exampleErrorMessage);
    });
});
