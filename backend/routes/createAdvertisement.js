const db = require("../db.js");

const createAdvertisement = (req, res) => {
  const query = "INSERT INTO advertisement() VALUES ();";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Feltöltési hiba:", error);
      res.status(500).json({ error: "Hiba történt a feltöltés során." });
    } else {
      const queryLastInsertedId = "SELECT LAST_INSERT_ID() as advertisementID;";

      db.query(queryLastInsertedId, (errorId, resultsId) => {
        if (errorId) {
          console.error("Azonosító lekérdezési hiba:", errorId);
          res.status(500).json({ error: "Hiba történt az azonosító lekérdezése során." });
        } else {
          const advertisementID = resultsId[0].advertisementID;

          res.redirect("/controlPanel/advertisement/edit/" + advertisementID);
        }
      });
    }
  });
};

module.exports = { createAdvertisement };
