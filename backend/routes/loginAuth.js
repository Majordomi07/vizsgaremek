const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../db.js");

// Validáció

const loginValidation = [
  check("email").notEmpty().withMessage("Az email cím mező nem lehet üres."),
  check("password").notEmpty().withMessage("A jelszó mező nem lehet üres."),
];

// User lekérdezés

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `users` WHERE `email` = ? LIMIT 1";
    db.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Jelszó ellenőrzés

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Felhasználó beléptetése

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Hibás email cím vagy jelszó." });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Hibás email cím vagy jelszó." });
    }

    res.json({ message: "Sikeres bejelentkezés." });
  } catch (error) {
    console.error("Hiba a bejelentkezés során:", error);
    res.status(500).json({ error: "Hiba történt a bejelentkezés során: " + error.message });
  }
};

module.exports = {
  loginValidation,
  loginUser,
};
