const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;

exports.register = async (ctx) => {
  const { googleID, facebookID, email, pw, name } = ctx.request.body;

  const newUser = new User({
    email: email.toLowerCase(),
    pw: pw,
    name: name,
  });

  await newUser.save()

  ctx.body = {...newUser.toObject()}
};

