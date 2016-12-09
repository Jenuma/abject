module.exports = function(protected, passport) {
    var router = require("express").Router();
    
    router.get("/login", passport.authenticate("facebook"));
    
    router.get("/return", passport.authenticate("facebook", {failWithError: true}),
        function(req, res, next) {
            res.redirect("/");
        },
        function(err, req, res, next) {
            console.log("Error: " + err.message);
            err.status = 401;
            next(err);
        }
    );

    router.get("/user", function(req, res, next) {
        // Passport stores session (which has user) inside request object.
        if(req.user) {
            res.status(200).json(req.user);
        }
        else {
            var err = new Error("There is no user logged in.");
            err.status = 404;
            next(err);
        }
    });

    router.get("/logout", protected, function(req, res, next) {
        req.logout();
        res.redirect("/login");
    });
    
    return router;
};
