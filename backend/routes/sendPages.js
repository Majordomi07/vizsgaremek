const path = require("path");
const paths = require("../path.js");

const sendHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.home));
};

const redirectHomePage = (req, res) => {
  res.redirect("/");
};

const sendContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.contact));
};

const sendcontrolPanelCompanyPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.controlPanelCompany));
};

const sendcontrolPanelAdvertisementsPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.controlPanelAdvertisements));
};

const sendcontrolPanelEditAdvertisementPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.controlPanelEditAdvertisement));
};

const sendcontrolPanelAdvertisementApplicantsPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.controlPanelAdvertisementApplicants));
};

const sendAdvertisementViewPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.advertisementView));
};

const sendRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.register));
};

const sendLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, paths.login));
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
