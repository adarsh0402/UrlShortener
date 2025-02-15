const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  const host = req.get("host");
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
    host,
  });
}

async function handleDeleteShortURL(req, res) {
  const { shortId } = req.params;

  // Find and delete the URL associated with the shortId
  const deletedURL = await URL.findOneAndDelete({
    shortId,
    createdBy: req.user._id,
  });

  if (!deletedURL) {
    return res
      .status(404)
      .json({ error: "URL not found or unauthorized to delete" });
  }

  return res.redirect("/"); // Redirect to the homepage after deletion
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
};
