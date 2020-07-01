const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const crypto = require('crypto');

module.exports = (db) => {

  router.post("/", (req, res) => {

    const genRandomString = function(length){
      return crypto.randomBytes(Math.ceil(length/2))
              .toString('hex') /** convert to hexadecimal format */
              .slice(0,length);   /** return required number of characters */
    };

    const salt = genRandomString(8);

    const hash = CryptoJS.AES.encrypt(req.body.newPass, salt).toString();

    db.query(`
      INSERT INTO websites (user_id, url, password, username, category, salt)
      VALUES ($1, $2, $3, $4, $5, $6)
      returning *
      ;`, [req.cookies.user_id, req.body.newWebsite, hash, req.body.newUsername, req.body.newCategory, salt])
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


