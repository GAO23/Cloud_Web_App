const express = require('express');
const router = express.Router();
const {STATUS_OK} = require('../lib/constants');
const fs = require("fs");
const cors = require("cors");
const path = require('path');

// for cross origin domain
router.use(cors());

router.get('/', function(req, res, next) {
  return res.status(200).send({status: STATUS_OK, msg: "Back end server is online"});
});

router.get('/download/:file', function (req, res){
  const file_name = req.params.file;
  const file_path = path.join(process.env.ASSET_PATH, file_name);
  return res.download(file_path, file_name);
});



module.exports = router;
