const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

// connect to mongodb
connectDB();

// app.use(auth);

// middleware
app.use(express.json({ extended: false }));

// routes
app.use("/register", require("./routes/register"));

app.use("/login", require("./routes/login"));

app.use("/application", require("./routes/application"));
app.use("/applications", require("./routes/applications"));

// app.get("/", (req, res) => res.json({ msg: "test msg" }));

// app.use("/register", require("./routes/users"));
// app.use("/register", require("./routes/users"));

// for production (????)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "builld", "index.html"))
  );
}

const PORT = process.env.PORT || 6050;

app.listen(PORT, () => console.log(`server is running on: ${PORT}`));
