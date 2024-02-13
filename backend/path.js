module.exports = {
  //Files
  cvFile: "../frontend/assets/uploads/cv",
  mlFile: "../frontend/assets/uploads/ml",
  companyLogo: "../frontend/assets/uploads/logo",

  //Jwt
  jwt: "./jwt.js",
  jwtRoutes: "../jwt.js",

  //Database
  db: "../db.js",

  //Frontend
  frontend: "../frontend",

  //Routes
  sendPages: "./routes/sendPages.js",
  getAdvertisement: "./routes/getAdvertisement.js",
  getAllAdvertisement: "./routes/getAllAdvertisements.js",
  getApplicants: "./routes/getApplicants.js",
  editVerification: "./routes/editVerification.js",
  getAllCategories: "./routes/getAllCategories.js",
  getUsedCategories: "./routes/getUsedCategories.js",
  getAllLocations: "./routes/getAllLocations.js",
  getUsedLocations: "./routes/getUsedLocations.js",
  calculateWageRanges: "./routes/calculateWageRanges.js",
  createAdvertisement: "./routes/createAdvertisement.js",
  saveAdvertisement: "./routes/saveAdvertisement.js",
  deleteAdvertisement: "./routes/deleteAdvertisement.js",
  getByCompanyAdvertisement: "./routes/getByCompanyAdvertisement.js",
  registerAuth: "./routes/registerAuth.js",
  loginAuth: "./routes/loginAuth.js",
  contactForm: "./routes/contactForm.js",
  getCompany: "./routes/getCompany.js",

  //Send pages
  home: "../../frontend/views/home.html",
  contact: "../../frontend/views/contact.html",
  controlPanelCompany: "../../frontend/views/controlPanel/company.html",
  controlPanelAdvertisements: "../../frontend/views/controlPanel/advertisements.html",
  controlPanelEditAdvertisement: "../../frontend/views/controlPanel/advertisement-edit.html",
  controlPanelAdvertisementApplicants: "../../frontend/views/controlPanel/applicants.html",
  advertisementView: "../../frontend/views/advertisement.html",
  register: "../../frontend/views/authentication/register.html",
  login: "../../frontend/views/authentication/login.html",
};
