const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const Task = require("./models/tasks");
//const userRouter = require("./models/routes/user");
const taskRouter = require("./models/routes/task");
const app = express();
//app.use(userRouter);
app.use(cors());
app.use(express.json());
app.use(taskRouter);
const dbUrl =
  "mongodb+srv://Ali:Ali123@cluster0.bwyfo.mongodb.net/TodoApp?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8080, () => {
  console.log("server is running on 8080");
});
