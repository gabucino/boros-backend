const orderService = require("../services/order");

exports.addToBasket = async ctx => {
  const { userId, productId } = ctx.request.body;

  const result = await orderService.addToDBBasket(userId, productId)

  if (result.statusCode) throw result
  else ctx.body = {
      basket: result
  }
};


exports.removeFromBasket = async ctx => {
  const { userId, productId } = ctx.request.body;

  const result = await orderService.removeFromBasket(userId, productId)

  if (result.statusCode) throw result
  else ctx.body = {
      basket: result
  }
};


exports.createOrder = async ctx => {
  const {data} = ctx.request.body

  const result = await orderService.createOrder(data)

  //send email

  if (result.statusCode) throw result
  else ctx.body = {
      order: result
  }
}