if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

var credentials = "";

if (process.env.NODE_ENV === "production") {
  const envKey = process.env.KEY;
  const envCert = process.env.CERT;
  credentials = { key: envKey, cert: envCert };
}

const express = require("express");
const connectDB = require("./database/mongoDB");
const cors = require("cors");
const https = require("https");
const http = require("http");
const app = express();

// mongodb
connectDB();

// middleware
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/application", require("./routes/application"));
app.use("/applications", require("./routes/applications"));

const PORT = process.env.PORT || 6050;

const server =
  process.env.NODE_ENV === "development"
    ? http.createServer(app)
    : https.createServer(credentials, app);

server.listen(PORT, () => console.log(`server is running on: ${PORT}`));
