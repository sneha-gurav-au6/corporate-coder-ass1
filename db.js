//mongodb connection

const mongoose = require("mongoose");

mongoose
    .connect(
        `mongodb+srv://snehagurav:sneha@zero.pip3u.mongodb.net/todo-assignment?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then(function () {
        console.log("Mongo db compass connected");
    })
    .catch(function (err) {
        console.log(err.message);
    });
