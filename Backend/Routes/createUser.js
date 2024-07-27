const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "meraNaamTinTinTooTinTinToobabaTinTinToo";

router.post(
  "/createUser",
  body("email", "Not a valid Mail").isEmail(),
  body("password", "Not a valid Password").isLength({ min: 5 }),
  body("name", "Input Name with atleast 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        //   name: "Mohammad Tarique",
        //   email: "mohd@gmail.com",
        //   password: "123@123",
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: Date.now(),
      });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  body("email").isEmail(),
  body("password", "Not a valid Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    let password = req.body.password;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }

      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) {
        return res.json({ success: false, message: "Wrong Password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({
        success: true,
        authToken: authToken,
        message: "Login Successful",
      });

      //return res.json({ success: true, message: "Login Successful" });
    } catch (err) {
      console.error(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
