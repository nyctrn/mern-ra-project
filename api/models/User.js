const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  status: {
    type: String,
  },
  applicationId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: "Συνταξιοδότηση",
  },
});

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // application_status: {
  //   type: String,
  //   default: "δεν έχει γίνει αίτηση",
  // },
  title: {
    type: Number,
    default: 0,
  },
  application: ApplicationSchema,
});

module.exports = mongoose.model("user", UserSchema);
