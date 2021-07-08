const User = require("../models/user");
const Order = require("../models/order");
const ObjectId = require("mongodb").ObjectID;

const calculateTotal = (basket) => {
  let total = 0;

  console.log(basket);

  for (let product of basket) {
    total = total + product.product.price * product.qty;
  }
  console.log("Total calculated: ", total);
  return total;
};

exports.addToDBBasket = async (userId, productId) => {
  try {
    console.log('service stuff')
    let user = await User.findById(userId);

    console.log('service stuff 2')
    const existingItem = await user.basket.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (!existingItem) {
      user.basket.push({ product: productId });
      await user.save();
    } else {
      await User.findOneAndUpdate(
        {
          _id: ObjectId(userId),
          "basket._id": existingItem._id,
        },
        { $set: { "basket.$.qty": existingItem.qty + 1 } }
      );
    }

    user = await User.findById(userId).populate({
      path: "basket.product",
      select: "name price",
    });

    let total = calculateTotal(user.basket);

    const result = {
      basket: user.basket,
      total: total,
    };
    return result;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    return error;
  }
};

exports.removeFromBasket = async (userId, productId) => {
  try {
    let user = await User.findById(userId);

    const itemToDelete = user.basket.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemToDelete.qty > 1) {
      user = await User.findOneAndUpdate(
        {
          _id: ObjectId(userId),
          "basket._id": itemToDelete._id,
        },
        { $set: { "basket.$.qty": itemToDelete.qty - 1 } }
      );
    } else {
      user = await User.findOneAndUpdate(userId, {
        $pull: { basket: { _id: itemToDelete._id } },
      });
    }

    user = await User.findById(userId).populate({
      path: "basket.product",
      select: "name price",
    });

    let total = calculateTotal(user.basket);

    const result = {
      basket: user.basket,
      total: total,
    };

    return result;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    return error;
  }
};

exports.createOrder = async (data) => {
  try {
    const user = await User.findById(data.userId).populate({
      path: "basket.product",
      select: "name price",
    });

    let total = calculateTotal(user.basket);

    if (data.total != total) {
      const error = new Error("Something went wrong, please refresh the page");
      error.statusCode = 500;
      return error;
    }

    const newOrder = new Order({
      user: Object(data.userId),
      total: total,
      products: user.basket,
      deliveryAddress: data.deliveryAddress,
      billingAddress: data.billingAddress
        ? data.billingAddress
        : data.deliveryAddress,
    });

    const order = await newOrder.save();
    user.orders.push(order._id);
   await user.save();

    return order;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    return error;
  }
};

exports.clearBasket = async (userId) => {
  try {
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          basket: [],
        },
      }
    );

    return true;
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    return error;
  }
};
