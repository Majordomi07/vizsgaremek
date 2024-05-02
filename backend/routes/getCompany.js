const paths = require("../path.js");
const db = require(paths.db);

const getCompany = async (req, res) => {
  const userID = req.user.userID;

  const query = "SELECT name, logo, description FROM companies WHERE userID = ?;";

  db.query(query, [userID], (error, results) => {
    if (error) {
      console.error("Hiba a lekérdezés során:", error);
      res.status(500).json({ error: "Szerver hiba" });
    } else {
      res.json(results);
    }
  });
};

const registeredCompany = async (req, res) => {
  const userID = req.user.userID;

  const query = "SELECT COUNT(*) AS count FROM companies WHERE userID = ?";

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés során:", err);
      res.status(500).send("Hiba a lekérdezés során");
    } else {
      const count = results[0].count;
      const userExists = count > 0;

      res.json({ userExists });
    }
  });
};

module.exports = { getCompany, registeredCompany };
