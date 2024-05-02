const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const { JWT } = process.env;

const createTokens = (userID) => {
  const accessToken = sign({ userID: userID }, JWT);
  return accessToken;
};

const validateToken = async (req, res, next) => {
  const accessToken = req.cookies && req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).json({ error: "Hiányzó token" });
  }

  try {
    const validToken = await verify(accessToken, JWT);
    if (validToken) {
      req.authenticated = true;
      req.user = { userID: validToken.userID };
      return next();
    } else {
      return res.status(401).json({ error: "Érvénytelen token" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Érvénytelen token" });
  }
};

module.exports = { createTokens, validateToken };
