const express = require('express');
const {handleUserSignup ,handleUserLogin}=require("../controller/user");

const router=express.Router();

router.post('/signup',handleUserSignup )
 

router.post('/login',handleUserLogin )
module.exports=router;




// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
// const { setUser } = require("../service/auth");

// // signup form submit
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const newUser = await User.create({ name, email, password });
//     console.log("User signed up:", newUser.email);
//     return res.redirect("/login"); // after signup → go to login page
//   } catch (err) {
//     console.error("Signup error:", err);
//     return res.render("signup", { error: "Email already in use" });
//   }
// });

// // login form submit
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user || user.password !== password) {
//     return res.render("login", { error: "Invalid email or password" });
//   }

//   const sessionId = uuidv4();
//   setUser(sessionId, user);           // save session
//   res.cookie("uid", sessionId);       // set cookie

//   return res.redirect("/");           // redirect to home
// });

// module.exports = router;
