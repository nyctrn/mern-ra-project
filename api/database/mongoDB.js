if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const envUser = process.env.MONGODBUSER;
const envPass = process.env.MONGODBPASSWORD;

const devDb = `mongodb+srv://${envUser}:${envPass}@cluster0.izx90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const prodDb = `mongodb://${envUser}:${envPass}@mongodb-service:27017`;

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
