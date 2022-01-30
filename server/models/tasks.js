const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trime: true,
    required: true,
  },
  completed: { type: Boolean, default: false },
});
module.exports = Task;
