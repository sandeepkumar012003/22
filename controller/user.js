const { v4: uuidv4 } = require('uuid'); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const User=require("../model/user");
const {setUser}=require("../service/auth");
   async function  handleUserSignup(req,res) {
   
    const{name,email,password}=req.body;

     // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with this email.");
    }

    await User.create({
        name,
        email,
        password,
    });
    // return res.render("home")
    return res.render("home", { id: null, urls: [] });

}
//   async function handleUserLogin(req, res) {
//   const { email, password } = req.body;

//   // find user by email
//   const user = await User.findOne({ email });

//   // if user not found OR password does not match
//   if (!user || user.password !== password) {
//     return res.render("login", {
//       error: "Invalid email or password",
//     });
//   }
//      const sessionId = uuidv4(); // Generate a unique session ID

//     setUser(sessionId,user);
//     res.cookie("uid",sessionId);
//   // ✅ if login is valid → show home page
//   return res.render("home", { id: null, urls: [] });
// }


   async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("User found:", user);
  if (!user || user.password !== password) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);

  // ✅ redirect instead of render
  return res.redirect("/");
}

module.exports={
    handleUserSignup,handleUserLogin}