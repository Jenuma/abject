/**
 * Game Model
 * @namespace Models
 */
var mongoose = require("mongoose");

/**
 * The schema for a Game.
 * @constructor Game
 * @memberOf Models
 * @param {string} id - A unique identifier for the game.
 * @param {string} title - The name of the game.
 * @param {string} platform - The email address of the game.
 * @param {string} genre - The phone number of the game.
 */
var GameSchema = new mongoose.Schema({
    title: String, default: "",
    platform: String, default: "",
    genre: String, default: ""
});

GameSchema.plugin(autoIncrement.plugin, {model: "Game", field: "id"});

exports.Game = mongoose.model("Game", GameSchema, "games");
