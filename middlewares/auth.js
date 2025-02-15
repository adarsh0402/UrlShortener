const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // Bypass authentication check for "/url/shortid" routes so that non registered users can also use links
  if (req.baseUrl == "/url") {
    return next();
  }
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
