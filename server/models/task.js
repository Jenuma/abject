/**
 * Task Model
 * @namespace Models
 */
var mongoose = require("mongoose");

/**
 * The schema for a Task.
 * @constructor Task
 * @memberOf Models
 * @param {string} id - A unique identifier for the task.
 * @param {string} name - The name of the task.
 */
var TaskSchema = new mongoose.Schema({
    name: String, default: "New Task"
});

TaskSchema.plugin(autoIncrement.plugin, {model: "Task", field: "id"});

exports.Task = mongoose.model("Task", TaskSchema, "tasks");
