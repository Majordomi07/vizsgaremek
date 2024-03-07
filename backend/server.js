const express = require("express");
const paths = require("./path.js");
const path = require("path");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const { validateToken } = require(paths.jwt);

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "cvFile") {
      cb(null, path.join(__dirname, paths.cvFile));
    } else if (file.fieldname === "mlFile") {
      cb(null, path.join(__dirname, paths.mlFile));
    } else if (file.fieldname === "companyLogo") {
      cb(null, path.join(__dirname, paths.companyLogo));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, paths.frontend)));
app.use("/", router);

const sendPages = require(paths.sendPages);
router.get("/", sendPages.sendHomePage);
router.get("/home", sendPages.redirectHomePage);
router.get("/contact", sendPages.sendContactPage);
router.get("/controlPanel/company", validateToken, sendPages.sendcontrolPanelCompanyPage);
router.get("/controlPanel/advertisements", validateToken, sendPages.sendcontrolPanelAdvertisementsPage);
router.get(
  "/controlPanel/advertisement/edit/:id",
  validateToken,
  sendPages.sendcontrolPanelEditAdvertisementPage
);
router.get(
  "/controlPanel/advertisement/applicants/:id",
  validateToken,
  sendPages.sendcontrolPanelAdvertisementApplicantsPage
);
router.get("/advertisement/view/:id", sendPages.sendAdvertisementViewPage);
router.get("/register", sendPages.sendRegisterPage);
router.get("/login", sendPages.sendLoginPage);

const { getAdvertisement } = require(paths.getAdvertisement);
app.get("/advertisement/api/:id", getAdvertisement);

const { getAllAdvertisements } = require(paths.getAllAdvertisement);
app.get("/advertisement/getAllAdvertisements", getAllAdvertisements);

const { getApplicants } = require(paths.getApplicants);
app.get("/advertisement/getApplicants/:id", getApplicants);

const { editVerification } = require(paths.editVerification);
app.get("/advertisement/edit-verification/:id", validateToken, editVerification);

const { getAllCategories } = require(paths.getAllCategories);
app.get("/advertisement/allCategories", getAllCategories);

const { getUsedCategories } = require(paths.getUsedCategories);
app.get("/advertisement/usedCategories", getUsedCategories);

const { getAllLocations } = require(paths.getAllLocations);
app.get("/advertisement/allLocations", getAllLocations);

const { getUsedLocations } = require(paths.getUsedLocations);
app.get("/advertisement/usedLocations", getUsedLocations);

const { calculateWageRanges } = require(paths.calculateWageRanges);
app.get("/advertisement/calculateWageRanges", calculateWageRanges);

const { createAdvertisement } = require(paths.createAdvertisement);
app.post("/advertisement/create-new", validateToken, createAdvertisement);

const { saveValidation, saveAdvertisement } = require(paths.saveAdvertisement);
app.put("/advertisement/save/:id", validateToken, saveValidation, saveAdvertisement);

const { deleteAdvertisement } = require(paths.deleteAdvertisement);
app.delete("/advertisement/delete/:id", validateToken, deleteAdvertisement);

const { getByCompanyAdvertisement } = require(paths.getByCompanyAdvertisement);
app.get("/advertisement/getByCompanyAdvertisement", validateToken, getByCompanyAdvertisement);

const registerAuth = require(paths.registerAuth);
app.post(
  "/auth/register",
  upload.single("companyLogo"),
  registerAuth.registerValidation,
  registerAuth.registerUser
);

const loginAuth = require(paths.loginAuth);
app.post("/auth/login", loginAuth.loginValidation, loginAuth.loginUser);
app.get("/auth/logged-in", validateToken, loginAuth.loggedinUser);
app.get("/auth/logout", validateToken, loginAuth.logoutUser);

const contactForm = require(paths.contactForm);
app.post(
  "/contactForm/:id",
  upload.fields([
    { name: "cvFile", maxCount: 1 },
    { name: "mlFile", maxCount: 1 },
  ]),
  validateToken,
  contactForm.formValidation,
  contactForm.sendForm
);

const { getCompany, registeredCompany } = require(paths.getCompany);
app.get("/controlPanel/company/info", validateToken, getCompany);
app.get("/controlPanel/company/registered-company", validateToken, registeredCompany);

//Szerver

app.listen(3000, () => {
  console.log("A szerver a 3000-es porton fut.");
});
