const express = require('express');
const router  = express.Router({ mergeParams:true});
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

      const data = CryptoJS.AES.encrypt(req.body.editPass, salt).toString();

      db.query(`
      UPDATE websites
      SET password = $2, salt = $3
      WHERE id = $1
      RETURNING *
      ;`,[req.params.id, data, salt])
      .then(() => {

        res.redirect('/');
      }).catch(error => error)
    });
    return router;
  };
