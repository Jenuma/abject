module.exports = function(protected) {
    var router = require("express").Router();
    
    router.get("/balance", protected, getBalance);
    
    function getBalance(req, res, next) {
        var Balance = require("../models/balance").Balance;
        Balance.find({}).lean().exec()
            .then(function(results) {
                res.status(200).json(results[0]);
            })
            .catch(function(err) {
                console.log(err);
                err.status = 503;
                next(err);
            });
    }
    
    return router;
};
