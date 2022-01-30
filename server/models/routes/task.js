const express = require("express");
const router = express.Router();
const Task = require("../tasks");
//Add a task
router.post("/addTask", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//getting all task
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});
//update a task
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const availableUpdates = ["name", "description", "completed"];
  const isValidOperation = updates.every((update) =>
    availableUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.json(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//deleting a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    console.log(task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});
module.exports = router;
