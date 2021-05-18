const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const { route } = require("./application");

////////////
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  // host: "mailhog",
  host: "localhost",
  port: 1025,
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

////////////

// const Application = require("../models/Application");

// GET
router.get("/", auth, async (req, res) => {
  let results = await User.find({}).select("-password");
  res.send(results);
});

router.post(
  "/",
  //   [
  //     check("name", "name is required").not().isEmpty(),
  //     check("email", "include a valid email").isEmail(),
  //     // check("password", "please enter a pass with 6+ chars").isLength({ min: 6 }),
  //   ],
  async (req, res) => {
    // console.log(req);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // const { name, email } = req.body;

    try {
      // console.log(req.body._id, "_id");

      let user = await User.findByIdAndUpdate(req.body._id, {
        "application.status": req.body.status,
      });

      const messageStatus = transporter
        .sendMail({
          from: "syntaxiodotisi@mail.com",
          to: user.email,
          subject: "Σχετικά με την αίτηση συνταξιοδότησης που καταθέσατε",
          text: `Αγαπητέ/ή πολίτη, η αίτηση συνταξιοδότησης που καταθέσατε με αριθμο; ${
            user.application.applicationId
          } ${
            user.application_status == "δεκτή"
              ? "έγινε δεκτή."
              : "δεν έγινε δεκτή."
          }
          Για περισσότερες πληροφορίες ...`,
        })
        .then();

      res.json({
        msg: "success",
      });

      console.log(user, "user");

      // let user = await User.findOne({ email });

      // if (user) {
      //   return res.status(400).json({ msg: "user exists" });
      // }

      // Application.create({ name, email }).then((application) => {
      //   console.log(application);
      // return Application.find({}).exec();
      // });

      // const application = new Application({
      //   name,
      //   email,
      // });

      // application.save((err, doc) => {
      //   if (err) console.error(err);
      //   console.log(doc);
      // });

      // user = new User({
      //   name,
      //   email,
      //   password,
      // });

      // const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, salt);

      // await user.save();

      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   {
      //     expiresIn: 36000,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
