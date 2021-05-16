"use strict";

const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

require('./routes/routes')
const router = require('./routes/router')

const dotenv = require('dotenv')
dotenv.config()


const initDB = require("./database");
initDB();



app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});



app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8800);
