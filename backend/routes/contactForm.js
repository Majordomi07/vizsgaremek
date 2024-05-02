const { check, validationResult } = require("express-validator");
const paths = require("../path.js");
const db = require(paths.db);
const nodemailer = require("nodemailer");

const formValidation = [
  check("message").notEmpty().withMessage("Az üzenet mező nem lehet üres."),

  check("adatvedelmi").custom((value, { req }) => {
    if (req.body.adatvedelmi == "false") {
      throw new Error("El kell fogadni az adatvédelmi nyilatkozatot.");
    }
    return true;
  }),

  check("cvFile").custom((value, { req }) => {
    if (!req.files.cvFile) {
      throw new Error("Önéletrajz feltöltése kötelező!");
    }
    return true;
  }),

  check("mlFile").custom((value, { req }) => {
    if (!req.files.mlFile) {
      throw new Error("Motivációs levél feltöltése kötelező!");
    }
    return true;
  }),
];

const sendForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { message } = req.body;

  let advertisementID = req.params.id;
  let userID = req.user.userID;
  let cv = req.files.cvFile[0].filename;
  let ml = req.files.mlFile[0].filename;

  let query = "SELECT * FROM applications WHERE userID = ? AND advertisementID = ?";
  db.query(query, [userID, advertisementID], (err, results) => {
    if (results.length == 0) {
      query = "INSERT INTO applications (userID, advertisementID, cv, ml) VALUES (?, ?, ?, ?)";
      db.query(query, [userID, advertisementID, cv, ml]);

      query =
        "SELECT firstName, lastName, email, title FROM users INNER JOIN applications on applications.userID = users.userID INNER JOIN advertisement on advertisement.advertisementID = applications.advertisementID WHERE applications.userID = ? AND applications.advertisementID = ?";
      db.query(query, [userID, advertisementID], (err, results) => {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ujmelokft@gmail.com",
            pass: "keyx xpvg magg yroh",
          },
        });

        var mailOptions = {
          from: "ujmelokft@gmail.com",
          to: "majordomi07@gmail.com",
          subject: `Új jelentkezés | ${advertisementID} - ${userID}`,
          attachments: [
            {
              filename: cv,
              path: paths.cvFile + "/" + cv,
              contentType: "application/pdf",
            },
            {
              filename: ml,
              path: paths.mlFile + "/" + ml,
              contentType: "application/pdf",
            },
          ],
          html: `<!DOCTYPE html>
          <html lang="hu">
          <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
          <header style="background: linear-gradient(90deg, #008baa 0%, #004e68 100%)">
          <div class="container">
          <img src="https://i.imgur.com/Vu8ghjM.png" style="height: 30px;"/>
          </div>
          </header>
          <main>
          <div class="box">
          <p style="margin-top: 15px">Kedves Felhasználónk!,</p>
          <p>
          Cégének egyik álláshírdetésére egy új jelentkezés érkezett a jelentkezés pontos információit alább
          találja.
          </p>
          <table>
          <tr>
          <td><strong>Álláshírdetés címe:</strong></td>
          <td>${results[0].title}</td>
          </tr>
          <tr>
          <td><strong>Jelentkező neve:</strong></td>
          <td>${results[0].lastName} ${results[0].firstName}</td>
          </tr>
          <tr>
          <td><strong>Jelentkező üzenete:</strong></td>
          <td>${message}</td>
          </tr>
          </table>
          <p>
          Az önéletrajzot, illetve a motivációs levelet csatolmányként elküldtük önnek. Minden információt megtalál
          a honlapon az álláshírdetésének "jelentkezők" opciójában.
          </p>
          <p>
          Üdvözlettel, <br />
          újmeló csapata
          </p>
          </div>
          </main>
          </body>
          </html>
          `,
        };

        transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Sikeres form küldés" });
      });
    } else {
      return res.status(500).json({ message: "Már jelentkeztél erre az állásra." });
    }
  });
};

module.exports = {
  formValidation,
  sendForm,
};
