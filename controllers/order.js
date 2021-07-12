const orderService = require("../services/order");

exports.addToBasket = async ctx => {
  const { userId, productId } = ctx.request.body;

  const result = await orderService.addToDBBasket(userId, productId)

  console.log("result is:", result)

  if (result.statusCode) throw result
  else ctx.body = {
      basket: result
  }
};


exports.removeFromBasket = async ctx => {
  const { userId, productId } = ctx.params

  console.log(ctx.query)

  console.log(userId, productId)

  const result = await orderService.removeFromBasket(userId, productId)

  if (result.statusCode) throw result
  else ctx.body = {
      basket: result
  }
};


exports.createOrder = async ctx => {
  const {data} = ctx.request.body

  const result = await orderService.createOrder(data)
  if (result.statusCode) throw result

  const emptyBasket = await orderService.clearBasket(data.userId)
  if (emptyBasket.statusCode) throw result

  //send email

  ctx.body = {
      order: result
  }
}