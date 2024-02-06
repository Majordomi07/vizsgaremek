const path = require("path");

const sendHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/home.html"));
};

const redirectHomePage = (req, res) => {
  res.redirect("/");
};

const sendContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/contact.html"));
};

const sendcontrolPanelCompanyPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/controlPanel/company.html"));
};

const sendcontrolPanelAdvertisementsPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/controlPanel/advertisements.html"));
};

const sendcontrolPanelEditAdvertisementPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/controlPanel/advertisement-edit.html"));
};

const sendcontrolPanelAdvertisementApplicantsPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/controlPanel/applicants.html"));
};

const sendAdvertisementViewPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/advertisement.html"));
};

const sendRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/authentication/register.html"));
};

const sendLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/authentication/login.html"));
};

module.exports = {
  sendHomePage,
  redirectHomePage,
  sendContactPage,
  sendcontrolPanelCompanyPage,
  sendcontrolPanelAdvertisementsPage,
  sendcontrolPanelEditAdvertisementPage,
  sendcontrolPanelAdvertisementApplicantsPage,
  sendAdvertisementViewPage,
  sendRegisterPage,
  sendLoginPage,
};
