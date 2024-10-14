const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const middleware = require("../middleware/auth");

router.post("/add-task", middleware.authUser, taskController.createTask );
router.get("/view-task", middleware.authUser, taskController.listTask);
router.put ("/update-task/:id" ,middleware.authUser ,  taskController.updateTask)
router.delete ("/delete-task/:id" ,middleware.authUser ,  taskController.deleteTask)


module.exports = router;
