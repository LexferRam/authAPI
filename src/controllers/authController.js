const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("./verifyToken");

router.post("/signup", async (req, res, next) => {
  const user = new User(req.body);
  user.password = await user.encryptPassword(user.password);
  await user.save();

  //sign(payload,secret, expiration) crea un token
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  console.log(user);
  res.send({ auth: true, token });
});

router.get("/me", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: 0 }); // { password: 0 } para ue no devuelva la contrasena

  if (!user) {
    return res.status(404).send("Not user found");
  }
  res.json(user);
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("The email does not exist");
  }
  const validPassword = await user.validatePassword(password);

  if (!validPassword) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token });
});

module.exports = router;
