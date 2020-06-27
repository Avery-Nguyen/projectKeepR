const express = require('express');
const router  = express.Router({ mergeParams:true});

  module.exports = (db) => {

    router.post("/", (req, res) => {
      db.query(`
      DELETE FROM websites
      WHERE id = $1
      ;`,[req.params.id])
      .then(() => {
        res.redirect('/');
      }).catch(error => {
        console.log(error)
      })
    });
    return router;
  };
