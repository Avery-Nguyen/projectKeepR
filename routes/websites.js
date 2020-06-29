const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    db.query(`
      INSERT INTO websites (user_id, url, password, username, category)
      VALUES ($1, $2, $3, $4, $5)
      returning *
      ;`, [req.cookies.user_id, req.body.newWebsite, req.body.newPass, req.body.newUsername, req.body.newCategory])
      .then(() => {
        res.redirect('/');
      }).catch(err => {
        console.log(err);
      })
  });

  router.get("/", (req, res) => {
    const query = `
    SELECT *
    FROM websites
    WHERE websites.user_id = $1 OR websites.organization_id = (
                                                                SELECT organization_id
                                                                FROM users
                                                                WHERE id = $1
                                                              );
    `;
    const value = [req.cookies.user_id];
    console.log(query);
    db.query(query, value)
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


