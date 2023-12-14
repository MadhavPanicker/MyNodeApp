const path = require('path');

const express = require('express');

const error = require('../controllers/error');

const router = express.Router();

router.use('/',error.get404);

module.exports = router;