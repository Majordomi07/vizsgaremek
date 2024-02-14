const paths = require("../path.js");
const db = require(paths.db);

const calculateWageRanges = (req, res) => {
  const query = "SELECT wage FROM advertisement";
  db.query(query, (err, rows) => {
    if (err) {
      console.error("Adatbázis hiba:", err.message);
      return res.status(500).json({ error: "Szerver hiba" });
    }

    const wages = rows.map((row) => row.wage);
    const minimum = kerekit10esHelyiertekre(Math.min(...wages));
    const maximum = kerekit10esHelyiertekre(Math.max(...wages));
    const x = (maximum - minimum) / 3;

    const ranges = [
      `${minimum} Ft - ${kerekitettErtek(minimum + x)} Ft`,
      `${kerekitettErtek(minimum + x)} Ft - ${kerekitettErtek(minimum + 2 * x)} Ft`,
      `${kerekitettErtek(minimum + 2 * x)} Ft - ${maximum} Ft`,
    ];

    res.json({ ranges });
  });
};

function kerekit10esHelyiertekre(szam) {
  var szamjegyek = szam.toString().split(".");
  var egeszResz = szamjegyek[0];

  var tizedesResz = szamjegyek[1] || "";
  if (tizedesResz.length > 0) {
    tizedesResz = tizedesResz.slice(0, 1);
  }

  var elozoErtek = parseFloat(egeszResz + "." + tizedesResz);
  var kerekitettErtek = Math.round(elozoErtek / 10) * 10;

  return kerekitettErtek;
}

function kerekitettErtek(szam) {
  return Math.round(szam / 10) * 10;
}

module.exports = { calculateWageRanges };
