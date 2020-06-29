// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT         = process.env.PORT || 8080;
const ENV          = process.env.ENV || "development";
const express      = require("express");
const bodyParser   = require("body-parser");
const sass         = require("node-sass-middleware");
const app          = express();
const morgan       = require('morgan');
const cookieParser = require('cookie-parser')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const websitesRoutes = require("./routes/websites");
const deleteWebsiteRoutes = require("./routes/deleteWebsite")
const editPassRoutes = require("./routes/editPass")


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/websites", websitesRoutes(db));
app.use("/websites/:id/delete", deleteWebsiteRoutes(db));
app.use("/websites/:id", editPassRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/login/:id', (req, res) => {
  res.cookie('user_id',req.params.id);
  res.redirect('/');
});

app.get("/", (req, res) => {
  db.query(`
  SELECT users.id AS id, users.name AS name, organizations.name AS organization
  FROM users
  JOIN organizations ON organizations.id = organization_id;
  `)
      .then((data) => {
        const users = data.rows;
        const id = req.cookies.user_id;
        return res.render('index', {users, id})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
