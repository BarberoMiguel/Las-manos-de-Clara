require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');

const port = 3000;
const secret = process.env.secret;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public", { index: false, redirect: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

const viewsRoutes = require("./routes/views.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/", viewsRoutes);
app.use("/admin", adminRoutes);

app.use("*", (req, res) => {
    res.status(404).json({
      message: "route not found",
    });
  });

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
