const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


const myError = (message, statusCode) => {
  const error = new Error(message)
  error.statusCode = statusCode
  throw error
}

exports.checkForExistingUser = async (email) => {
  console.log(email, "terersdsfs");
  const userDoc = await User.findOne({ email: email.toLowerCase() });

  if (userDoc) return true;
  return false;
};

exports.signToken = (user) => {
  return jwt.sign(
    {
      iss: "boros",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1), //plus one day
    },
    process.env.JSONSECRET
  );
};

exports.authUser = async (email, pw) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const error = new Error("No user found with that email. Please sign up.");
      error.statusCode = 401;
      return error;
    }
    const isPwMatch = await bcrypt.compare(pw, user.pw);

    

    if (isPwMatch) return user;
    else {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      return error;
    }
  } catch (err) {
    console.log(err);
  }
};
