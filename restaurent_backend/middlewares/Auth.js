const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "accesstoken");
    const { userId, companyId } = decoded;
    req.userId = userId;
    req.companyId = companyId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = Auth;
