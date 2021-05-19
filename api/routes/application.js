const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");

// POST /register
router.post(
  "/",
  auth,
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
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
