const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    registerUser,
    loginUser,
} = require("../controller/apiController/userApiController");
const {
    newTask,
    getAllTask,
    deleteTask,
    EditTodo,
} = require("../controller/apiController/taskApi");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post(
    "/createNewTask",
    passport.authenticate("jwt", { session: false }),
    newTask
);
router.get(
    "/getalltask",
    passport.authenticate("jwt", { session: false }),
    getAllTask
);

router.post(
    "/deleteTask/:id",
    passport.authenticate("jwt", { session: false }),
    deleteTask
);
router.post(
    "/editTodo/:id",
    passport.authenticate("jwt", { session: false }),
    EditTodo
);
module.exports = router;
