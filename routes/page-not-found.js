const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.use('/',(req,res,next)=>{
    res.status(404).render('page-not-found', {pageTitle: '404 wError'});
});

module.exports = router;