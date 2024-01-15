const db = require("../db.js");

const getAllCategories = (req, res) => {
  const query = "SELECT category FROM category;";

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

module.exports = { getAllCategories };
