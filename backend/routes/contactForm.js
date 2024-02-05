const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../db.js");
const nodemailer = require("nodemailer");
const { createTokens, validateToken } = require("../jwt.js");

const formValidation = [
  check("message").notEmpty().withMessage("Az üzenet mező nem lehet üres."),

  check("adatvedelmi").custom((value, { req }) => {
    if (req.body.adatvedelmi == "false") {
      throw new Error("El kell fogadni az adatvédelmi nyilatkozatot.");
    }
    return true;
  }),

  check("cvFile").custom((value, { req }) => {
    if (!req.files.cvFile) {
      throw new Error("Önéletrajz feltöltése kötelező!");
    }
    return true;
  }),

  check("mlFile").custom((value, { req }) => {
    if (!req.files.mlFile) {
      throw new Error("Motivációs levél feltöltése kötelező!");
    }
    return true;
  }),
];

const sendForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { message } = req.body;

  let advertisementID = req.params.id;
  let userID = req.user.userID;
  let cv = req.files.cvFile[0].filename;
  let ml = req.files.mlFile[0].filename;

  let query = "SELECT * FROM applications WHERE userID = ? AND advertisementID = ?";
  db.query(query, [userID, advertisementID], (err, results) => {
    if (results.length == 0) {
      query = "INSERT INTO applications (userID, advertisementID, cv, motivation_letter) VALUES (?, ?, ?, ?)";
      db.query(query, [userID, advertisementID, cv, ml]);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ujmelokft@gmail.com",
          pass: "keyx xpvg magg yroh",
        },
      });

      var mailOptions = {
        from: "ujmelokft@gmail.com",
        to: "majordomi07@gmail.com",
        subject: "Új jelentkezés",
        text: "Új ember jelentkezett a meghírdetett állásodra!",
        attachments: [
          {
            filename: cv,
            path: "../frontend/assets/uploads/cv/" + cv,
            contentType: "application/pdf",
          },
          {
            filename: ml,
            path: "../frontend/assets/uploads/ml/" + ml,
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Sikeres form küldés" });
    } else {
      return res.status(500).json({ message: "Már jelentkeztél erre az állásra." });
    }
  });
};

module.exports = {
  formValidation,
  sendForm,
};
