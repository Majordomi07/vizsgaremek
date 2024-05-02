const paths = require("../path.js");
const db = require(paths.db);

const getAllLocations = (req, res) => {
  const query = `
    SELECT location FROM locations;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Lekérdezés hiba:", error);
      res.status(500).json({ error: "Hiba történt a lekérdezés során." });
    } else {
      const locations = results.map((result) => result.location);
      res.json({ locations });
    }
  });
};

module.exports = { getAllLocations };
