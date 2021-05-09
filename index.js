"use strict";

const Koa = require("koa");
const Router = require("@koa/router");

const initDB = require('./database'); 
initDB(); 

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      console.log(err.status)
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  });

router.get("koa-example", "/", (ctx) => {
  ctx.body = "Hello World";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234);
