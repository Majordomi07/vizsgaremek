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
    subject: "Sending Email using Node.js",
    text: "Kabd be a faszt " + message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.json({ message: "Sikeres form küldés." });
};

module.exports = {
  formValidation,
  sendForm,
};
