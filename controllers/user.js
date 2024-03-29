const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

const authService = require("../services/auth");

exports.register = async (ctx) => {
  const { googleID, facebookID, email, pw, name } = ctx.request.body;

  const hashedPw = await bcrypt.hash(pw, 12);

  const newUser = new User({
    email: email.toLowerCase(),
    pw: hashedPw,
    name: name,
  });

  await newUser.save();

  ctx.body = { ...newUser.toObject() };
};

exports.login = async (ctx) => {
  const { email, pw } = ctx.request.body;

  const authResult = await authService.authUser(email, pw);

  console.log(authResult.message);

  if (authResult.statusCode) throw authResult;
  else {
    const accessToken = authService.generateAccessToken(authResult);
    const refreshToken = jwt.sign(authResult._id, process.env.REFRESH_TOKEN_SECRET)

    ctx.body = {
      user: authResult,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }
};
