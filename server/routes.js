//
// Route Directory
//
var router = require("express").Router();

router.use("/api/contacts", require("./controllers/contact-controller"));
router.use("/api/games", require("./controllers/to-play-controller"));

module.exports = router;
