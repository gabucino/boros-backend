const Product = require("../models/product");


exports.createDBProduct = async (product) => {
  try {
    const { name, price, qty, description } = product;

    const newProduct = new Product({
      name: name,
      price: price,
      description: description ? description : "",
    });

    await newProduct.save();
    return newProduct
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500
    error.message = "Something went wrong, sorry"
    return error
  }
};
