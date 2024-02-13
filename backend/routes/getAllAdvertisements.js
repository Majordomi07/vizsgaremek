const paths = require("../path.js");
const db = require(paths.db);

const getAllAdvertisements = (req, res) => {
  const { page = 1, keywordFilter, locationFilter, categoryFilter, wageFilter, orderFilter } = req.query;
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  if (wageFilter) {
    var wageRanges = wageFilter.split(",");
  }

  let countQuery =
    "SELECT COUNT(*) AS totalCount FROM advertisement INNER JOIN category on category.categoryID = advertisement.categoryID INNER JOIN companies on companies.companiesID = advertisement.companiesID INNER JOIN locations ON locations.locationID = advertisement.locationID";

  const filters = [];

  if (keywordFilter)
    filters.push(
      `title LIKE '%${keywordFilter}%' OR introduction LIKE '%${keywordFilter}%' OR general LIKE '%${keywordFilter}%' OR benefit LIKE '%${keywordFilter}%' OR requirement LIKE '%${keywordFilter}%'`
    );
  if (locationFilter) filters.push(`location = '${locationFilter}'`);
  if (categoryFilter) filters.push(`category = '${categoryFilter}'`);
  if (wageFilter) {
    filters.push(`wage BETWEEN ${wageRanges[0]} AND ${wageRanges[1]}`);
  }

  if (filters.length > 0) {
    countQuery += " WHERE " + filters.join(" AND ");
  }

  db.query(countQuery, (countErr, countResults) => {
    if (countErr) throw countErr;

    const totalCount = countResults[0].totalCount;

    let query =
      "SELECT * FROM advertisement INNER JOIN category on category.categoryID = advertisement.categoryID INNER JOIN companies on companies.companiesID = advertisement.companiesID INNER JOIN locations ON locations.locationID = advertisement.locationID";

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    if (orderFilter == "Legtöbbet fizető") {
      query += " ORDER BY wage DESC";
    } else {
      query += " ORDER BY createdAt DESC";
    }

    query += ` LIMIT ?, ?`;

    db.query(query, [offset, pageSize], (err, results) => {
      if (err) throw err;

      res.json({ results, totalCount });
    });
  });
};

module.exports = { getAllAdvertisements };
