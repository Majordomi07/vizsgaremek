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
router.get("/controlPanel/company", validateToken, sendPages.sendcontrolPanelCompanyPage);
router.get("/controlPanel/advertisements", validateToken, sendPages.sendcontrolPanelAdvertisementsPage);
router.get("/controlPanel/advertisement/edit/:id", validateToken, sendPages.sendcontrolPanelEditAdvertisementPage);
router.get("/register", sendPages.sendRegisterPage);
router.get("/login", sendPages.sendLoginPage);

const { getAdvertisement } = require("./routes/getAdvertisement.js");
app.get("/advertisement/api/:id", getAdvertisement);

const { editVerification } = require("./routes/editVerification.js");
app.get("/advertisement/edit-verification/:id", validateToken, editVerification);

const { getAllCategories } = require("./routes/getAllCategories.js");
app.get("/advertisement/allCategories", getAllCategories);

const { getUsedCategories } = require("./routes/getUsedCategories.js");
app.get("/advertisement/usedCategories", getUsedCategories);

const { getLocations } = require("./routes/getLocations.js");
app.get("/advertisement/locations", getLocations);

const { createAdvertisement } = require("./routes/createAdvertisement.js");
app.post("/advertisement/create-new", validateToken, createAdvertisement);

const { saveValidation, saveAdvertisement } = require("./routes/saveAdvertisement.js");
app.post("/advertisement/save/:id", validateToken, saveValidation, saveAdvertisement);

const { deleteAdvertisement } = require("./routes/deleteAdvertisement.js");
app.post("/advertisement/delete/:id", validateToken, deleteAdvertisement);

const { getByCompanyAdvertisement } = require("./routes/getByCompanyAdvertisement.js");
app.get("/advertisement/getByCompanyAdvertisement", validateToken, getByCompanyAdvertisement);

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
