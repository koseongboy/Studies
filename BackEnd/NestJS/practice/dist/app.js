"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});
//# sourceMappingURL=app.js.map