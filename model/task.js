const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product model
const taskSchema = new Schema({
    //owner of product
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
    },

    description: {
        type: String,
    },
    priority_of_task: {
        type: Number,
    },
});

module.exports = Task = mongoose.model("tasks", taskSchema);
