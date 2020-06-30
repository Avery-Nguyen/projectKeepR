const express = require('express');
const router  = express.Router({ mergeParams:true});

  module.exports = (db) => {

    router.post("/", (req, res) => {
      console.log(req.body)
      const data = req.body.editPass
      db.query(`
      UPDATE websites
      SET password = $2
      WHERE id = $1
      RETURNING *
      ;`,[req.params.id, data])
      .then(() => {

        res.redirect('/');
      }).catch(error => {
        console.log(error)
      })
    });
    return router;
  };
