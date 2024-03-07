const paths = require("../path.js");
const db = require(paths.db);

const deleteAdvertisement = async (req, res) => {
  const advertisementID = req.params.id;

  const query1 = "DELETE FROM `applications` WHERE advertisementID = ?";
  const query2 = "DELETE FROM `advertisement` WHERE advertisementID = ?";

  db.query(query1, [advertisementID], (err, result) => {
    if (err) {
      console.error("Hiba a rekord törlése közben:", err);
      res.status(500).json({ error: "Hiba a rekord törlése közben: " + err.message });
    } else {
      db.query(query2, [advertisementID], (err, result) => {
        if (err) {
          console.error("Hiba a rekord törlése közben:", err);
          res.status(500).json({ error: "Hiba a rekord törlése közben: " + err.message });
        } else {
          res.json({ message: "Sikeres törlés." });
        }
      });
    }
  });
};

module.exports = {
  deleteAdvertisement,
};
