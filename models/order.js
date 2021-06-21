const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
  postalCode: String,
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    total: { type: Number },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: Number
      },
    ],
    deliveryAddress: {
      type: AddressSchema,
    },
    billingAddress: {
      type: AddressSchema,
    },
    trackingNumber: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
