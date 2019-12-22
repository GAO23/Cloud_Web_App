const express = require('express');
const router = express.Router();
const {STATUS_OK} = require('../lib/constants');
const fs = require("fs");
const cors = require("cors");

// for cross origin domain
router.use(cors());

router.get('/', function(req, res, next) {
  return res.status(200).send({status: STATUS_OK, msg: "Back end server is online"});
});

router.get('/pdf', function(req, res, next){
  // const file = fs.createReadStream(process.env.PDF_PATH);
  // file.pipe(res);

  res.download(process.env.PDF_PATH, "network.pdf");
});

module.exports = router;
