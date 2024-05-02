const paths = require("../path.js");
const db = require(paths.db);

const getApplicants = (req, res) => {
  const advertisementID = req.params.id;

  let query =
    "SELECT firstName, lastName, email, cv, ml FROM applications INNER JOIN users ON users.userID = applications.userID WHERE advertisementID = ?";
  db.query(query, [advertisementID], (err, results) => {
    if (err) {
      console.error("Hiba történt az adatbázis lekérdezése során:", err);
      res.status(500).json({ error: "Szerver oldali hiba történt" });
      return;
    }
    res.json(results);
  });
};

module.exports = { getApplicants };
