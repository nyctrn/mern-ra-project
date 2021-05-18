const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
// const Application = require("../models/Application");

// POST /register
router.post(
  "/",
  [
    check("firstName", "name is required").not().isEmpty(),
    check("email", "include a valid email").isEmail(),
    // check("password", "please enter a pass with 6+ chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // console.log(req, res, "req,res");
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, applicationId } = req.body;

    // console.log(req.body);

    try {
      // console.log(req.body);

      // let user = await User.findOne({ _id: req.body.currentUser._id });
      // console.log(user, "before");

      let user = await User.findByIdAndUpdate(
        req.body.currentUser._id,
        {
          application: {
            firstName,
            lastName,
            email,
            applicationId,
            status: "εκκρεμής",
          },
        },
        { new: true }
      );

      console.log(user);

      res.send(user);

      // console.log(user, "after");

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
