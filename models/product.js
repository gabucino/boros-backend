const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      qty: {
        type: Number,
      },
      description: {
        type: String,
      },
    //   similarItems: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Product", productSchema);
  

