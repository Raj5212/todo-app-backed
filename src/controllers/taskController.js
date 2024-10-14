const Task = require("../schema/task");
const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");
const bcrypt = require("bcrypt");
const { createUser } = require("../models/users");
const { generateToken } = require("../helper");

require("dotenv").config();

module.exports = {
  createTask: async (req, res) => {
    try {

        const task =  await new Task({
            userId : req.user.id,
            title: req.body.title || "Untitled Note", 
            content: req.body.content,
            completed : req.body.completed
        });

       await task.save()
      return res.json(
        helper.showSuccessResponse("Task added successfully.")
      );

    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },

  // list tasks according user id
  listTask: async (req, res) => {

    
    try {

      const userRecord = await Task.find({
        userId: req.user._id
      });

      console.log(userRecord)
      if (!userRecord) {
        return res.json(helper.showValidationErrorResponse("Not created any task"));
      }
    
      return res.json(
        helper.createResponse("User fetch successfully", userRecord )
      );
    } catch (error) {
      console.error(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },


//   update record
  updateTask: async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isCompleted } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...(title !== undefined && { title }),
                    ...(content !== undefined && { content }),
                    ...(isCompleted !== undefined && { isCompleted }),
                },
            },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

         return res.json(
        helper.simpleResponse(
          "Task update successfully"
        )
      );

    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },

// Delete record
  deleteTask: async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
      return res.json(
        helper.simpleResponse(
          "Task removed successfully",
        )
      );

    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },

};
