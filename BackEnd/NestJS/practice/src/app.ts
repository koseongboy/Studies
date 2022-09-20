import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware");
  next();
});


//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send({ error: "404 not found error" });
});
