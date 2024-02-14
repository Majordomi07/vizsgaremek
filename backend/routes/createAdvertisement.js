const paths = require("../path.js");
const db = require(paths.db);

const createAdvertisement = (req, res) => {
  const userID = req.user.userID;

  const queryCompaniesID = "SELECT companiesID FROM companies WHERE userID = ?;";

  db.query(queryCompaniesID, [userID], (error, results) => {
    if (error) {
      console.error("Keresési hiba:", error);
      res.status(500).json({ error: "Hiba történt a keresés során." });
    } else {
      const companiesID = results[0].companiesID;

      const query = "INSERT INTO advertisement(companiesID) VALUES (?);";

      db.query(query, [companiesID], (error, results) => {
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

              res.json({ advertisementID });
            }
          });
        }
      });
    }
  });
};

module.exports = { createAdvertisement };
