
const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedinUserOnly}=require("./meddlewares/auth");
const URL = require("./model/url");
const app = express();
const port = 8000;

const userRoute=require("./routes/user")

const staticRoute=require("./routes/staticsRouter")
const urlRoute = require("./routes/url");
// MongoDB connect
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("mongodb connect"))
  .catch((err) => console.error("MongoDB connection error:", err));

// View engine setup
app.set("view engine", "ejs");
// __dirname = current folder (short-URL)
app.set("views", path.join(__dirname, "views"));

// Test route → render home.ejs
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", { urls: allUrls });
  
// });
    
// Middlewares - sabse pehle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/user",restrictToLoggedinUserOnly, userRoute);
app.use("/", staticRoute);
app.use("/url", urlRoute);

app.get("/", restrictToLoggedinUserOnly, async (req, res) => {
  // yeh tab chalega jab user login hoga
  const allUrls = await URL.find({});
  res.render("home", { id: null, urls: allUrls });
});

// Redirect handler for short URLs
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

// Start server
app.listen(port, () => console.log(`server is started at: ${port}`));
