const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //permite que el servidor entiendo datos de un formulario y lo convierte a formatojson

app.use(require("./controllers/authController"));

module.exports = app;
