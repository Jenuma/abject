describe("The error service", function() {
    beforeEach(module("app"));
    
    var errorService;
    
    beforeEach(inject(function($injector) {
        errorService = $injector.get("errorService");
    }));
    
    it("can update the error message", function() {
        var exampleErrorMessage = "This is an example error message for the error controller unit test.";
        
        errorService.updateErrorMessage(exampleErrorMessage);
        
        expect(errorService.errorMessage).toEqual(exampleErrorMessage);
    });
});
