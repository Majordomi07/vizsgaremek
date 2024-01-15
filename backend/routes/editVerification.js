const db = require("../db.js");

const editVerification = async (req, res) => {
  const advertisementID = req.params.id;
  console.log(advertisementID);
  const userID = req.user.userID;
  console.log(userID);

  const query =
    "SELECT companies.userID, advertisement.advertisementID FROM advertisement INNER JOIN companies ON companies.companiesID = advertisement.advertisementID WHERE companies.userID = ? AND advertisementID = ?;";

  db.query(query, [userID, advertisementID], (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés során:", err);
      res.status(500).send("Hiba a lekérdezés során");
    } else {
      if (results.length > 0) {
        verificatedUser = true;
      } else {
        verificatedUser = false;
      }

      res.json({ verificatedUser });
    }
  });
};

module.exports = { editVerification };
