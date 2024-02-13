const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const paths = require("../path.js");
const db = require(paths.db);

// Validáció

const registerValidation = [
  check("email")
    .isEmail()
    .withMessage("Érvénytelen email cím.")
    .custom(async (email) => {
      const user = await getUserByEmail(email);
      if (user) {
        throw new Error("Ez az email cím már regisztrálva van.");
      }
      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("A jelszónak legalább 8 karakterből kell állnia.")
    .matches(/[\W_]/)
    .withMessage("A jelszónak tartalmaznia kell legalább egy speciális karaktert."),

  check("passwordAgain")
    .notEmpty()
    .withMessage("A jelszó újra mező nem lehet üres.")
    .custom((passwordAgain, { req }) => {
      if (passwordAgain !== req.body.password) {
        throw new Error("A két jelszó nem egyezik meg.");
      }
      return true;
    }),

  check("firstname").notEmpty().withMessage("A keresztnév mező nem lehet üres."),

  check("lastname").notEmpty().withMessage("A vezetéknév mező nem lehet üres."),

  check("policy").custom((value, { req }) => {
    if (req.body.policy == "false") {
      throw new Error("El kell fogadni az adatvédelmi nyilatkozatot.");
    }
    return true;
  }),

  check("companyName").custom((value, { req }) => {
    if (req.body.company == "true") {
      if (!value) {
        throw new Error("Cégnév megadása kötelező.");
      }
    }
    return true;
  }),

  check("companyLogo").custom((value, { req }) => {
    if (req.body.company == "true") {
      if (!req.file) {
        throw new Error("Céglogó megadása kötelező.");
      }
    }
    return true;
  }),

  check("companyDescription").custom((value, { req }) => {
    if (req.body.company == "true") {
      if (!value) {
        throw new Error("Cégleírás megadása kötelező.");
      }
    }
    return true;
  }),
];

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

// User regisztráció

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password, firstname, lastname, companyName, companyDescription } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let companyLogo = null;
  if (req.file) {
    companyLogo = req.file.filename;
  }

  const query = "INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?);";
  db.query(query, [email, hashedPassword, firstname, lastname], (err, result) => {
    if (err) {
      console.error("Hiba a regisztráció során:", err);
      res.status(500).json({ error: "Hiba történt a regisztráció során: " + err.message });
    } else {
      const userID = result.insertId;

      if (req.body.company == "true") {
        const query = "INSERT INTO companies(name, logo, description, userID) VALUES (?, ?, ?, ?);";
        db.query(query, [companyName, companyLogo, companyDescription, userID]);
      }
      res.json({ message: "Sikeres regisztráció." });
    }
  });
};

module.exports = {
  registerValidation,
  registerUser,
};
