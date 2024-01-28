const db = require("../db.js");

const getAllAdvertisements = (req, res) => {
  const { page = 1, keywordFilter, locationFilter, categoryFilter, wageFilter } = req.query;
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  if (wageFilter) {
    var wageRanges = wageFilter.split(",");
  }

  let query =
    "SELECT * FROM advertisement INNER JOIN category on category.categoryID = advertisement.categoryID INNER JOIN companies on companies.companiesID = advertisement.companiesID";

  const filters = [];

  if (keywordFilter) filters.push(`title LIKE '%${keywordFilter}%'`);
  if (locationFilter) filters.push(`location = '${locationFilter}'`);
  if (categoryFilter) filters.push(`category = '${categoryFilter}'`);
  if (wageFilter) {
    filters.push(`wage BETWEEN ${wageRanges[0]} AND ${wageRanges[1]}`);
  }

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  query += ` LIMIT ?, ?`;

  db.query(query, [offset, pageSize + 1], (err, results) => {
    if (err) throw err;

    if (results.length > pageSize) {
      results.pop();
    }

    res.json(results);
  });
};

module.exports = { getAllAdvertisements };
