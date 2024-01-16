const db = require("../db.js");

const deleteAdvertisement = async (req, res) => {
  const advertisementID = req.params.id;

  const query = "DELETE FROM `advertisement` WHERE advertisementID = ?";

  db.query(query, [advertisementID], (err, result) => {
    if (err) {
      console.error("Hiba a rekord törlése közben:", err);
      res.status(500).json({ error: "Hiba a rekord törlése közben: " + err.message });
    } else {
      res.json({ message: "Sikeres törlés." });
    }
  });
};

module.exports = {
  deleteAdvertisement,
};
