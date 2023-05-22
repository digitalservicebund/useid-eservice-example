require("dotenv").config();
const express = require("express");
const path = require("path");

const { index, success, qrcode, health } = require("./routes");

const app = express();

app.use(express.static("public"));

app.set("views", [path.join(__dirname, "/../views")]);
app.set("view engine", "pug");

app.get("/", index);
app.get("/health", health);
app.get("/success", success);
app.get("/qrcode", qrcode);

module.exports = app;
