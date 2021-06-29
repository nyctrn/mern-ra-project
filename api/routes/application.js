const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");

const formFields = [
  { fieldName: "firstName", labelName: "Όνομα" },
  { fieldName: "lastName", labelName: "Επώνυμο" },
  { fieldName: "fName", labelName: "Πατρώνυμο" },
  { fieldName: "mName", labelName: "Μητρώνυμο" },
  { fieldName: "birthday", labelName: "Ημερομηνία Γέννησης" },
  { fieldName: "citizenship", labelName: "Υπηκοότητα" },
  { fieldName: "idNumber", labelName: "Αριθμός Ταυτότητας/Διαβατηρίου" },
  { fieldName: "municipality", labelName: "Δήμος" },
  { fieldName: "city", labelName: "Πόλη" },
  { fieldName: "address", labelName: "Διεύθυνση κατοικίας" },
  { fieldName: "postalCode", labelName: "Τ.Κ." },
  { fieldName: "phoneNumber", labelName: "Τηλέφωνο" },
  { fieldName: "mobileNumber", labelName: "Κινητό" },
  { fieldName: "email", labelName: "E-mail" },
];

// POST /register
router.post(
  "/",
  auth,
  formFields.map((fn) => {
    return check(fn.fieldName, `Το πεδίο ${fn.labelName} είναι απαραίτητο`)
      .not()
      .isEmpty();
  }),
  check("email", "Παρακαλώ εισάγεται ένα έγκυρο email").isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

    console.log(req.body);
    console.log(applicationId);

    try {
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

      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
