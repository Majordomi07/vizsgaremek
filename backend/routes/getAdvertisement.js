const db = require("../db.js");

const getAdvertisement = (req, res) => {
  const advertisementID = req.params.id;

  const query =
    "SELECT * FROM advertisement LEFT JOIN category ON category.categoryID = advertisement.categoryID WHERE advertisement.advertisementID = ?;";

  db.query(query, [advertisementID], (error, results) => {
    if (error) {
      console.error("Lekérdezés hiba:", error);
      res.status(500).json({ error: "Hiba történt a lekérdezés során." });
    } else {
      res.json(results);
    }
  });
};

module.exports = { getAdvertisement };
