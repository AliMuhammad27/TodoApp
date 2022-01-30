const moongoose = require("mongoose");
const validator = require("validator");
const User = moongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Cannot set Password as password");
      }
    },
    taskList: [
      {
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
      },
    ],
  },
});
module.exports = User;
