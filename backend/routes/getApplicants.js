const db = require("../db.js");

const getApplicants = (req, res) => {
  const advertisementID = req.params.id;

  let query =
    "SELECT firstName, lastName, email, cv, motivation_letter FROM applications INNER JOIN users ON users.userID = applications.userID WHERE advertisementID = ?";
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
