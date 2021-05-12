const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/jwtpractica", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB connected"))
  .catch((err) => console.log(err));
