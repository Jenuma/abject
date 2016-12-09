module.exports = function(protected, passport) {
    var router = require("express").Router();
    
    router.get("/login", passport.authenticate("facebook"));
    
    router.get("/return", passport.authenticate("facebook", {failWithError: true}),
        function(req, res, next) {
            res.redirect("/");
        },
        function(err, req, res, next) {
            res.status(401).redirect("/401");
        }
    );

    router.get("/user", function(req, res, next) {
        // Passport stores session (which has user) inside request object.
        if(req.user) {
            res.status(200).json(req.user);
        }
        else {
            res.status(404).send("There is no user logged in.");
        }
    });

    router.get("/logout", protected, function(req, res, next) {
        req.logout();
        res.redirect("/login");
    });
    
    return router;
};
