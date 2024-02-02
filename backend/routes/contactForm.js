const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../db.js");
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
};

module.exports = {
  formValidation,
  sendForm,
};
