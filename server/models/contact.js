/**
 * Contact Model
 * @namespace Models
 */
var mongoose = require("mongoose");

/**
 * The schema for a Contact.
 * @constructor Contact
 * @memberOf Models
 * @param {string} id - A unique identifier for the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} number - The phone number of the contact.
 */
var ContactSchema = new mongoose.Schema({
    name: String, default: "",
    email: String, default: "",
    number: String, default: ""
});

ContactSchema.plugin(autoIncrement.plugin, {model: "Contact", field: "id"});

exports.Contact = mongoose.model("Contact", ContactSchema, "contacts");
