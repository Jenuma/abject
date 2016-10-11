/**
 * Contact Controller
 * @namespace ServerControllers
 */

/**
 * Server controller for a Contact resource.
 * @constructor ContactController
 * @memberOf ServerControllers
 */

/**
 * The router directory for /contacts/ endpoints.
 * @typedef {Router}
 * @memberOf ServerControllers.ContactController
 * @instance
 * @property {Route} GET/ - Gets all contacts.
 * @property {Route} POST/ - Adds a contact.
 * @property {Route} DELETE/:id - Removes contact with :id.
 * @property {Route} PUT/:id - Edits contact with :id.
 */
var router = require("express").Router();

router.get("/", getContacts);
router.post("/", addContact);
router.delete("/:id", deleteContact);
router.put("/:id", editContact);

/**
 * Gets all the contacts from the database.
 * <ul>
 *  <li>HTTP 200 - The contacts were retrived.</li>
 *  <li>HTTP 500 - Server error prevented the contacts from being received.</li>
 * </ul>
 * @function getContacts
 * @memberOf ServerControllers.ContactController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function getContacts(req, res) {
    var Contact = require("../models/contact").Contact;
    Contact.find({}).lean().exec()
        .then(function(results) {
            res.status(200).json(results);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(500).send(err.message);
        });
}

/**
 * Adds a new contact to the database.
 * <ul>
 *  <li>HTTP 201 - A new contact was created and saved.</li>
 *  <li>HTTP 500 - Server error prevented the new contact from being saved.</li>
 * </ul>
 * @function addContact
 * @memberOf ServerControllers.ContactController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function addContact(req, res) {
    var Contact = require("../models/contact").Contact;
    var newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    });
    
    newContact.save()
        .then(function(result) {
            res.status(201).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(500).send(err.message);
        });
}

/**
 * Removes a contact from the database.
 * <ul>
 *  <li>HTTP 200 - The contact was removed from the database.</li>
 *  <li>HTTP 404 - The contact was not found in the database.</li>
 * </ul>
 * @function deleteContact
 * @memberOf ServerControllers.ContactController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function deleteContact(req, res) {
    var id = req.params.id;
    
    var Contact = require("../models/contact").Contact;
    Contact.findOneAndRemove({id: id}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).send(err.message);
        });
}

/**
 * Updates an existing contact in the database.
 * <ul>
 *  <li>HTTP 200 - The contact was edited and updated.</li>
 *  <li>HTTP 404 - The contact was not found in the database.</li>
 * </ul>
 * @function editContact
 * @memberOf ServerControllers.ContactController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function editContact(req, res) {
    var id = req.params.id;
    
    var Contact = require("../models/contact").Contact;
    Contact.findOneAndUpdate({id: id}, req.body, {new: true}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).send(err.message);
        });
}

module.exports = router;
