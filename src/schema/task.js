// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    userId : {
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true,
        default: "none",
      },  
    title: {
        type: String,
        required: true,
    },
    
    content: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });



module.exports = mongoose.models.Task || mongoose.model("tasks", taskSchema);
