const db = require("../db.js");

const getCategories = (req, res) => {
  const query = `
    SELECT category
    FROM category
    INNER JOIN advertisement ON advertisement.categoryID = category.categoryID;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Lekérdezés hiba:", error);
      res.status(500).json({ error: "Hiba történt a lekérdezés során." });
    } else {
      const categories = results.map((result) => result.category);
      res.json({ categories });
    }
  });
};

module.exports = { getCategories };
