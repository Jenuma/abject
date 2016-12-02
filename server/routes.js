// ---------------------------------------------------------------------------------------------------------|
// Route Directory                                                                                          |
// ---------------------------------------------------------------------------------------------------------|

var router = require("express").Router();

router.use("/api/contacts", require("./controllers/contact-controller"));

module.exports = router;
