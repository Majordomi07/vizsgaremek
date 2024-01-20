const { check, validationResult } = require("express-validator");
const db = require("../db.js");

// Advertisement validáció

const saveValidation = [
  check("title").notEmpty().withMessage("Az cím mező nem lehet üres."),
  check("general").notEmpty().withMessage("Az általános információk mező nem lehet üres."),
  check("wage").notEmpty().withMessage("Az órabér mező nem lehet üres."),
  check("location").notEmpty().withMessage("A település mező nem lehet üres."),
  check("requirement").notEmpty().withMessage("A követelmények mező nem lehet üres."),
  check("benefit").notEmpty().withMessage("A juttatások mező nem lehet üres."),
];

// Advertisement elmentése

const saveAdvertisement = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { title, general, category, wage, location, requirement, benefit } = req.body;
  const advertisementID = req.params.id;

  const query =
    "UPDATE advertisement SET title=?, general=?, categoryID=?, requirement=?, benefit=?, location=?, wage=? WHERE advertisementID = ?";
  db.query(query, [title, general, category, requirement, benefit, location, wage, advertisementID], (err, result) => {
    if (err) {
      console.error("Hiba az adatok mentése közben:", err);
      res.status(500).json({ error: "Hiba az adatok mentése közben: " + err.message });
    } else {
      res.json({ message: "Sikeres editálás." });
    }
  });
};

module.exports = {
  saveValidation,
  saveAdvertisement,
};
