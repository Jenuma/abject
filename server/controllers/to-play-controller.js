/**
 * To-Play Controller
 * @namespace ServerControllers
 */

/**
 * Server controller for a to-play resource.
 * @constructor ToPlayController
 * @memberOf ServerControllers
 */

/**
 * The router directory for /games/ endpoints.
 * @typedef {Router}
 * @memberOf ServerControllers.ToPlayController
 * @instance
 * @property {Route} GET/ - Gets all games.
 * @property {Route} POST/ - Adds a game.
 * @property {Route} DELETE/:id - Removes game with :id.
 * @property {Route} PUT/:id - Edits game with :id.
 */
var router = require("express").Router();

router.get("/", getGames);
router.post("/", addGame);
router.delete("/:id", deleteGame);
router.put("/:id", editGame);

/**
 * Gets all the games from the database.
 * <ul>
 *  <li>HTTP 200 - The games were retrived.</li>
 *  <li>HTTP 500 - Server error prevented the games from being received.</li>
 * </ul>
 * @function getGames
 * @memberOf ServerControllers.ToPlayController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function getGames(req, res) {
    var Game = require("../models/game").Game;
    Game.find({}).lean().exec()
        .then(function(results) {
            res.status(200).json(results);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(500).send(err.message);
        });
}

/**
 * Adds a new game to the database.
 * <ul>
 *  <li>HTTP 201 - A new game was created and saved.</li>
 *  <li>HTTP 500 - Server error prevented the new game from being saved.</li>
 * </ul>
 * @function addGame
 * @memberOf ServerControllers.ToPlayController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function addGame(req, res) {
    var Game = require("../models/game").Game;
    var newGame = new Game({
        title: req.body.title,
        platform: req.body.platform,
        genre: req.body.genre
    });
    
    newGame.save()
        .then(function(result) {
            res.status(201).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(500).send(err.message);
        });
}

/**
 * Removes a game from the database.
 * <ul>
 *  <li>HTTP 200 - The game was removed from the database.</li>
 *  <li>HTTP 404 - The game was not found in the database.</li>
 * </ul>
 * @function deleteGame
 * @memberOf ServerControllers.ToPlayController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function deleteGame(req, res) {
    var id = req.params.id;
    
    var Game = require("../models/game").Game;
    Game.findOneAndRemove({id: id}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).send(err.message);
        });
}

/**
 * Updates an existing game in the database.
 * <ul>
 *  <li>HTTP 200 - The game was edited and updated.</li>
 *  <li>HTTP 404 - The game was not found in the database.</li>
 * </ul>
 * @function editGame
 * @memberOf ServerControllers.ToPlayController
 * @param {Request} req - The request from the client controller.
 * @param {Response} res - The response from the server controller.
 * @protected
 */
function editGame(req, res) {
    var id = req.params.id;
    
    var Game = require("../models/game").Game;
    Game.findOneAndUpdate({id: id}, req.body, {new: true}).exec()
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            console.log("Error: " + err);
            res.status(404).send(err.message);
        });
}

module.exports = router;
