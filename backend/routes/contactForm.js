const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../db.js");
const { createTokens, validateToken } = require("../jwt.js");

const formValidation = [
  check("message").notEmpty().withMessage("Az üzenet mező nem lehet üres."),
];

const sendForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { message } = req.body;

  console.log(message);
};

module.exports = {
  formValidation,
  sendForm,
};
