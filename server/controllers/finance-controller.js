module.exports = function(protected) {
    var router = require("express").Router();
    var exec = require("child_process").exec;
    
    router.get("/balance", protected, getBalance);
    
    function getBalance(req, res, next) {
        var cmd = "casperjs ../../mogul.io/mogul.io.js";
        
        exec(cmd, function(error, stdout, stderr) {
            var balance = stdout.match(/Value: (\$(?:,?\d{0,3})*\.\d\d)/);
            
            if(balance) {
                res.status(200).send(balance[1]);
            } else {
                var err = new Error("Balance could not be retrieved.");
                err.status = 503;
                next(err);
            }
        });
        
        // TODO
        // -Get last balance amount from db before scraping bank again
        // -Set up app to scrape bank every 60s
        // -Write the new balance to db
        // -Fix script to not generate output file, or find other solution
    }
    
    return router;
};
