const express = require('express');
const router  = express.Router();

  module.exports = (db) => {

    router.post("/", (req, res) => {
      db.query(`
      INSERT INTO websites (user_id, url, password, username, category)
      VALUES ($1, $2, $3, $4, $5)
      returning *
      ;`,[req.cookies.user, req.body.newWebsite, req.body.newPass, req.body.newUsername, req.body.newCategory])
      .then(() => {
        res.redirect('/');
      })
    });

    router.get("/", (req, res) => {
      let query = `SELECT * FROM websites`;
      console.log(query);
      db.query(query)
        .then(data => {
          const websites = data.rows;
          res.json({ websites });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

    return router;
  };


