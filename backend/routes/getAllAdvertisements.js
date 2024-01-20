const db = require("../db.js");

const getAllAdvertisements = (req, res) => {
  const { page = 1, keywordFilter } = req.query;
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  let query =
    "SELECT * FROM advertisement INNER JOIN category on category.categoryID = advertisement.categoryID INNER JOIN companies on companies.companiesID = advertisement.companiesID";

  const filters = [];

  if (keywordFilter) filters.push(`title LIKE '%${keywordFilter}%'`);

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
