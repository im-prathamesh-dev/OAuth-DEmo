require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");

connectDB();

require("./config/passport");

const authRoutes = require("./routes/auth");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});