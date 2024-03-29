const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
  postalCode: String,
});

const ContactInfoSchema = mongoose.Schema({
  tel: Number,
  deliveryAddress: {
    type: AddressSchema,
  },
  isDeliverySameAsBilling: {
    type: Boolean,
  },
  billingAddress: {
    type: AddressSchema,
  },
});

const userSchema = new Schema(
  {
    googleID: String,
    facebookID: String,
    email: {
      type: String,
      unique: true,
    },
    pw: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    basket: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
    basketTotal: {
      type: Number,
    },
    lastActive: { type: Date },
    contactInfo: ContactInfoSchema,
    // refreshToken: [{type: String}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
