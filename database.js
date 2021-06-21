const mongoose = require("mongoose");

const initDB = () => {
  mongoose.connect(process.env.CONNEXIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  mongoose.connection.on("error", console.error);
};
module.exports = initDB;
