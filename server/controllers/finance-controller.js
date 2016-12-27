module.exports = function(protected) {
    var router = require("express").Router();
    
    router.get("/balance", protected, getBalance);
    
    function getBalance(req, res, next) {
        
    }
    
    return router;
};
