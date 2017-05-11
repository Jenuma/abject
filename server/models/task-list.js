/**
 * TaskList Model
 * @namespace Models
 */
var mongoose = require("mongoose");

/**
 * The schema for a TaskList.
 * @constructor TaskList
 * @memberOf Models
 * @param {string} id - A unique identifier for the task list.
 * @param {string} name - The name of the task list.
 */
var TaskListSchema = new mongoose.Schema({
    id: Number,
    name: String, default: "New Task List"
});

exports.TaskList = mongoose.model("TaskList", TaskListSchema, "task-lists");
