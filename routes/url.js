const express = require("express");
const { handleGenerateNewShortURL,handleGetAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL); // ✅ FIXED

 
router.get("/analytics/:shortId",handleGetAnalytics)
module.exports = router;
