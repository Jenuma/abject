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
        
        // TODO
        // -Get last balance amount from db before scraping bank again
        // -Set up app to scrape bank every 60s
        // -Write the new balance to db
        // -Fix script to not generate output file, or find other solution
    }
    
    return router;
};
