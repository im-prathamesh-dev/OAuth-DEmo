const express = require("express");
const passport = require("passport");
const ActivityLog = require("../model/ActivityLog");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);



router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {

    await ActivityLog.create({
      userId: req.user._id,
      action: "LOGIN",
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.send("Login Successful");
  }
);

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).send("Logout error");
    }

    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});
module.exports = router;