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

const sendAdminUserPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/views/admin/user.html"));
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
  sendAdminUserPage,
  sendRegisterPage,
  sendLoginPage,
};
