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
    check("firstName", "Το πεδίο 'Όνομα' είναι απαραίτητο").not().isEmpty(),
    check("email", "Παρακαλώ εισάγεται ένα έγκυρο email").isEmail(),
    // check("password", "please enter a pass with 6+ chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body, "req.body");
    // console.log(req, res, "req,res");
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(400)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }

    const {
      firstName,
      lastName,
      fName,
      mName,
      birthday,
      citizenship,
      idNumber,
      municipality,
      city,
      address,
      postalCode,
      phoneNumber,
      mobileNumber,
      email,
      applicationId,
    } = req.body;

    // console.log(req.body);

    try {
      // console.log(req.body);
      // console.log(user, "before");

      let user = await User.findByIdAndUpdate(
        req.user.id,
        {
          application: {
            firstName,
            lastName,
            fName,
            mName,
            birthday,
            citizenship,
            idNumber,
            municipality,
            city,
            address,
            postalCode,
            phoneNumber,
            mobileNumber,
            email,
            applicationId,
            status: "εκκρεμής",
          },
        },
        { new: true }
      ).select("-password");

      console.log(user, "user");

      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
