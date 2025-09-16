// const {getUser} = require("../service/auth");   
// // async function restrictToLoggedinUserOnly(req,res,next) {
// //   const userUid=req.cookies?.uid;  
// //    const user = await getUser(userUid);   // ✅ fetch user with the uid
// //   if(!userUid){
// //     return res.redirect("/login");
// //   }
// // if(!user) return res.redirect("/login");

// //   req.user=user;
// //     next();
    
// // }


// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;

//   if (!userUid) return res.redirect("/login");

//   const user = getUser(userUid);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }



// module.exports={
//     restrictToLoggedinUserOnly,
// }





const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const sessionId = req.cookies?.uid;  // cookie se sessionId nikalo

  if (!sessionId) {
    return res.redirect("/login");     // cookie hi nahi hai → login page
  }

  const user = getUser(sessionId);     // sessionId se user nikaalo

  if (!user) {
    return res.redirect("/login");     // user nahi mila → login page
  }

  req.user = user;  // request object me user attach karo
  next();           // aage route handler chalne do
}

module.exports = { restrictToLoggedinUserOnly };
