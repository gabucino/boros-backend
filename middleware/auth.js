const jwt = require("jsonwebtoken");
const { myError } = require("../services/auth");

exports.authenticateToken = async (ctx, next) => {
  const authHeader = ctx.get("authorization");

  const token = authHeader && authHeader.split(" ")[1];


  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (err) {
    myError("Unauthorized", 401);
  }

  let verified = console.log("verified", verified);
  next();
};
