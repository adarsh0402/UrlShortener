const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.post("/delete/:shortId", handleDeleteShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
