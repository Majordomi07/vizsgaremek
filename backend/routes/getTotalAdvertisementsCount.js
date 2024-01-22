const db = require("../db.js");

const getTotalAdvertisementsCount = (req, res) => {
  const { keywordFilter, locationFilter, categoryFilter } = req.query;

  let query =
    "SELECT COUNT(*) as totalRecords FROM advertisement INNER JOIN companies ON companies.companiesID = advertisement.companiesID INNER JOIN category ON category.categoryID = advertisement.categoryID";

  const filters = [];

  if (keywordFilter) filters.push(`advertisement.title LIKE '%${keywordFilter}%'`);
  if (locationFilter) filters.push(`advertisement.location = '${locationFilter}'`);
  if (categoryFilter) filters.push(`category.category = '${categoryFilter}'`);

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying total records count:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ totalRecords: results[0].totalRecords });
    }
  });
};

module.exports = { getTotalAdvertisementsCount };

module.exports = { getTotalAdvertisementsCount };
