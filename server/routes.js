// ---------------------------------------------------------------------------------------------------------|
// Route Directory                                                                                          |
// ---------------------------------------------------------------------------------------------------------|
module.exports = function(passport) {
    var router = require("express").Router();
    
    var protected = function(req, res, next) {
        if (req.isUnauthenticated()) {
            var err = new Error("You are not authorized to use this service.");
            err.status = 401;
            next(err);
        }
        else {
            next();
        }
    };
    
    // -----------------------------------------------------------------------------------------------------|
    // Session                                                                                              |
    // -----------------------------------------------------------------------------------------------------|
    router.use("/session", require("./controllers/session-controller")(protected, passport));
    
    // -----------------------------------------------------------------------------------------------------|
    // API                                                                                                  |
    // -----------------------------------------------------------------------------------------------------|
    router.use("/api/contacts", require("./controllers/contact-controller")(protected));
    
    return router;
};
