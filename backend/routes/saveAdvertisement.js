const { check, validationResult } = require("express-validator");
const paths = require("../path.js");
const db = require(paths.db);
const saveValidation = [
  check("title").notEmpty().withMessage("Az cím mező nem lehet üres."),
  check("introduction")
    .notEmpty()
    .withMessage("Az ismertető mező nem lehet üres.")
    .isLength({ min: 100, max: 350 })
    .withMessage("Az ismertető mező minimum 100 karakter, maximum 350 karakter lehet."),
  check("general")
    .notEmpty()
    .withMessage("Az általános információk mező nem lehet üres.")
    .isLength({ min: 100 })
    .withMessage("Az általános információ mezőnek minimum 100 karaktert tartalmaznia kell."),
  check("wage")
    .notEmpty()
    .withMessage("Az órabér mező nem lehet üres.")
    .isInt({ min: 1000, max: 10000 })
    .withMessage("Az órabérnek 1000 és 10000 között kell lennie."),
  check("requirement").notEmpty().withMessage("A követelmények mező nem lehet üres."),
  check("benefit").notEmpty().withMessage("A juttatások mező nem lehet üres."),
];

// Advertisement elmentése

const saveAdvertisement = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { title, introduction, general, category, wage, location, requirement, benefit } = req.body;
  const advertisementID = req.params.id;

  const query =
    "UPDATE advertisement SET title=?, introduction=?, general=?, categoryID=?, requirement=?, benefit=?, locationID=?, wage=? WHERE advertisementID = ?";
  db.query(
    query,
    [title, introduction, general, category, requirement, benefit, location, wage, advertisementID],
    (err, result) => {
      if (err) {
        console.error("Hiba az adatok mentése közben:", err);
        res.status(500).json({ error: "Hiba az adatok mentése közben: " + err.message });
      } else {
        res.json({ message: "Sikeres editálás." });
      }
    }
  );
};

module.exports = {
  saveValidation,
  saveAdvertisement,
};
