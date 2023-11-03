const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('../routes/admin');

const router = express.Router();
const products = adminData.products;

router.get('/',(req,res,next) => {
    res.render('shop',{prods: products, active: 'shop', pageTitle: 'Shop'});
});

module.exports = router;