const Task = require("../../model/task");

module.exports = {
    newTask: (req, res) => {
        //creating new object for meeting
        const newTaskCreate = new Task({
            user: req.user.id,
            name: req.body.name,

            description: req.body.description,
            priority_of_task: req.body.priority_of_task,
        });
        //saving new meeting data to database
        newTaskCreate
            .save()
            .then((data) => {
                res.status(200).json({
                    message: "New task is created",
                    meeting_data: data,
                });
            })
            .catch((err) => {
                res.status(500).send("server error");
                console.log(err);
            });
    },
    //getting task
    getAllTask: (req, res) => {
        //finding document by its id
        console.log(req.user.id);
        Task.find({ user: req.user.id })
            .sort({ priority_of_task: 1 })
            .then((particularMeeting) => {
                console.log(particularMeeting);
                res.status(200).json({
                    message: "Meeting Detail",
                    data: particularMeeting,
                });
            })
            .catch((err) => {
                res.send(err);
            });
    },
    //deleting perticular product
    deleteTask: async (req, res) => {
        const user = req.user.id;
        const task_id = req.params.id;
        console.log(task_id);
        try {
            //finding perticular product and delete by id
            await Task.findOneAndDelete({
                _id: task_id,
            });
            res.status(200).send("deleted");
        } catch (err) {
            res.status(500).send("server error");
            console.log(err.massage);
        }
    },

    EditTodo: (req, res) => {
        const id = req.params.id;
        console.log(id);
        const newData = {};

        if (req.body.name) newData.name = req.body.name;
        if (req.body.description) newData.description = req.body.description;
        if (req.body.priority_of_task)
            newData.priority_of_task = req.body.priority_of_task;

        Task.findByIdAndUpdate(
            { _id: id },
            { $set: newData },
            {
                new: true,
            }
        )
            .then((data) => {
                console.log(data);
                res.status(200).json({ message: " updated", data: data });
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
