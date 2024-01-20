const db = require("../db.js");

const getTotalAdvertisementsCount = (req, res) => {
  const { keywordFilter } = req.query;

  let query = "SELECT COUNT(*) AS totalRecords FROM advertisement";

  const filters = [];

  if (keywordFilter) filters.push(`title LIKE '%${keywordFilter}%'`);

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  db.query(query, (err, results) => {
    if (err) throw err;

    res.json({ totalRecords: results[0].totalRecords });
  });
};

module.exports = { getTotalAdvertisementsCount };
