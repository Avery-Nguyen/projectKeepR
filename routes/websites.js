const express = require('express');
const router  = express.Router();

  module.exports = (db) => {

    router.post("/", (req, res) => {
      db.query(`
      INSERT INTO websites (user_id, url, password, username, category)
      VALUES ($1, $2, 'monkeyys', 'carrie_underwood', 'work')
      returning *
      ;`,[req.cookies.user])
      .then(data => {
        console.log("document.getElementById('addWebsite')");
        res.redirect('/');
      })
    });
    return router;
  };


