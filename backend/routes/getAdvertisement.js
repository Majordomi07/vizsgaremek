const paths = require("../path.js");
const db = require(paths.db);

const getAdvertisement = (req, res) => {
  const advertisementID = req.params.id;

  const query = `
  SELECT *
  FROM advertisement
  INNER JOIN category ON category.categoryID = advertisement.categoryID
  INNER JOIN companies ON companies.companiesID = advertisement.companiesID
  INNER JOIN locations ON locations.locationID = advertisement.locationID
  WHERE advertisement.advertisementID = ?;`;

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
