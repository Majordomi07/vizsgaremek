const paths = require("../path.js");
const db = require(paths.db);

const getByCompanyAdvertisement = async (req, res) => {
  const userID = req.user.userID;

  const query =
    "SELECT advertisementID, title, introduction, general, wage, category, location, benefit, requirement, companies.logo FROM advertisement INNER JOIN companies ON companies.companiesID = advertisement.companiesID INNER JOIN category ON category.categoryID = advertisement.categoryID INNER JOIN locations ON locations.locationID = advertisement.locationID WHERE userID = ?";
  db.query(query, [userID], (err, result) => {
    if (err) {
      console.error("Hiba az adatok keresése közben:", err);
      res.status(500).json({ error: "Hiba az adatok keresése közben: " + err.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getByCompanyAdvertisement,
};
