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

const sendcontrolPanelUserPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/company.html"));
};

const sendRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/register.html"));
};

const sendLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/login.html"));
};

module.exports = {
  sendHomePage,
  redirectHomePage,
  sendContactPage,
  sendcontrolPanelUserPage,
  sendRegisterPage,
  sendLoginPage,
};
