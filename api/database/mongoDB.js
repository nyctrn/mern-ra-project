if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

  var devDb = process.env.CONNECTION_STRING;
} else {
  var envUser = process.env.MONGODBUSER;
  var envPass = process.env.MONGODBPASSWORD;
  var prodDb = `mongodb://${envUser}:${envPass}@mongodb-service:27017`;
}

const db = process.env.NODE_ENV === "development" ? devDb : prodDb;

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to mongodb"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
