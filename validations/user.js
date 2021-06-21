const dbCheck = require("../services/auth");

const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isFullName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return re.test(name);
};

exports.signupUser = async (ctx, next) => {
  const { email, pw, name } = ctx.request.body;

  let isValidEmail = isEmail(email);
  if (!isValidEmail) {
    const error = new Error("Please enter a valid email address");
    error.statusCode = 400;
    throw error;
  }

  if (name) {
    console.log(name);
    const isValidFullName = isFullName(name);
    console.log(isValidFullName)
    if (!isValidFullName) {
      const error = new Error(
        "Please enter your full name. Name can't contain special characters other than hyphens, apostrophs and spaces."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  const existingUser = await dbCheck.checkForExistingUser(email);
  if (existingUser) {
    const error = new Error("Email is already in use. Try logging in instead.");
    error.statusCode = 409;
    throw error;
  }

  next();
};
