/**
 * Balance Model
 * @namespace Models
 */
var mongoose = require("mongoose");

/**
 * The schema for a Balance.
 * @constructor Balance
 * @memberOf Models
 * @param {string} id - A unique identifier for the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} number - The phone number of the contact.
 */
var BalanceSchema = new mongoose.Schema({
    amount: Number, default: 0.0
});

exports.Balance = mongoose.model("Balance", BalanceSchema, "finance");
