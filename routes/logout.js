const express = require('express');
const router  = express.Router({ mergeParams:true});

  module.exports = () => {

    router.post("/", (req, res) => {
      res.clearCookie("user_id");
      res.redirect("/login");
    });
    return router;
  };
