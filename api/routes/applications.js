if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const mailhogAddress =
  process.env.NODE_ENV === "development" ? "localhost" : "mailhog-service";

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../models/User");

//////////// MailHog /////////////
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: mailhogAddress,
  port: 1025,
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

////////////////////////////////

// GET
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user.title) {
      let results = await User.find({ application: { $exists: true } }).select(
        "-password"
      );
      res.send(results);
    } else {
      res.send("access denied");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// POST
router.post("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user.title) res.send("access denied");
    user = await User.findByIdAndUpdate(req.body._id, {
      "application.status": req.body.status,
    });

    const emailMsg = {
      from: "syntaxiodotisi@mail.com",
      to: user.email,
      subject: "Σχετικά με την αίτηση συνταξιοδότησης που καταθέσατε",
      text: `Αγαπητέ/ή πολίτη, η αίτηση συνταξιοδότησης που καταθέσατε με αριθμό; ${
        user.application.applicationId
      } ${
        user.application_status == "δεκτή"
          ? "έγινε δεκτή. Μπορείτε να την βρείτε στον 'φάκελο χρήστη' και να την κατεβάσετε σε μορφή pdf."
          : "δεν έγινε δεκτή. ...."
      } 
      Για περισσότερες πληροφορίες ...`,
    };

    await transporter.sendMail(emailMsg);

    res.json({
      msg: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
