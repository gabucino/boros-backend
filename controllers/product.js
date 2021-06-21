const productService = require("../services/product");

exports.createProduct = async (ctx) => {
  const result = await productService.createDBProduct(ctx.request.body);

  if (result.statusCode) throw result;
  else ctx.body = result;
};
