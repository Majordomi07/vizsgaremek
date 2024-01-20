const db = require("../db.js");

const getTotalAdvertisementsCount = (req, res) => {
  const { keywordFilter, locationFilter, categoryFilter } = req.query;

  let query =
    "SELECT COUNT(*) as totalRecords FROM advertisement INNER JOIN companies ON companies.companiesID = advertisement.companiesID INNER JOIN category ON category.categoryID = advertisement.categoryID";

  const filters = [];

  if (keywordFilter) filters.push(`title LIKE '%${keywordFilter}%'`);
  if (locationFilter) filters.push(`location = '${locationFilter}'`);
  if (categoryFilter) filters.push(`category = '${categoryFilter}'`);

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  db.query(query, (err, results) => {
    if (err) throw err;

    res.json({ totalRecords: results[0].totalRecords });
  });
};

module.exports = { getTotalAdvertisementsCount };
