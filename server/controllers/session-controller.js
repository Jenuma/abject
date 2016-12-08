module.exports = function(passport) {
    var router = require("express").Router();
    
    router.get("/login", passport.authenticate("facebook"));
    
    router.get("/return", passport.authenticate("facebook", {failWithError: true}),
        function(req, res, next) {
            res.redirect("/");
        },
        function(err, req, res, next) {
            res.status(401).sendFile(path.resolve(__dirname + "/../client/views/errors/401.html"));
        }
    );

    router.get("/user", function(req, res) {
        // Passport stores session (which has user) inside request object.
        res.json(req.user);
    });

    router.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });
    
    return router;
};
