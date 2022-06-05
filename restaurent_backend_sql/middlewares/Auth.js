const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "accesstoken");
    const { username } = decoded;
    req.username = username;
    next();
  } catch (err) {
    res.json({
      status: 407,
      type: "error",
      message: "Unauthenticated",
      message2: "Try Again Later...",
    });
  }
};

module.exports = Auth;
