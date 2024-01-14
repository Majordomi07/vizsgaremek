const express = require("express");
const path = require("path");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const { validateToken } = require("./jwt.js");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../frontend/assets/images/uploads/logos"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/", router);

const sendPages = require("./routes/sendPages.js");
router.get("/", sendPages.sendHomePage);
router.get("/home", sendPages.redirectHomePage);
router.get("/contact", sendPages.sendContactPage);
router.get("/controlPanel/company", validateToken, sendPages.sendcontrolPanelUserPage);
router.get("/register", sendPages.sendRegisterPage);
router.get("/login", sendPages.sendLoginPage);

const { getCategories } = require("./routes/getCategories.js");
app.get("/advertisement/categories", getCategories);

const { getLocations } = require("./routes/getLocations.js");
app.get("/advertisement/locations", getLocations);

const registerAuth = require("./routes/registerAuth.js");
app.post("/auth/register", upload.single("companyLogo"), registerAuth.registerValidation, registerAuth.registerUser);

const loginAuth = require("./routes/loginAuth.js");
app.post("/auth/login", loginAuth.loginValidation, loginAuth.loginUser);
app.get("/auth/logged-in", validateToken, loginAuth.loggedinUser);
app.get("/auth/logout", validateToken, loginAuth.logoutUser);

const { getCompany, registeredCompany } = require("./routes/getCompany.js");
app.get("/controlPanel/company/info", validateToken, getCompany);
app.get("/controlPanel/company/registered-company", validateToken, registeredCompany);

//Szerver

app.listen(3000, () => {
  console.log("A szerver a 3000-es porton fut.");
});
