const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('../routes/admin');

const router = express.Router();
const products = adminData.products;

router.get('/',(req,res,next) => {
    res.render('shop',{
        path: '/',
        prods: products, 
        active: 'shop', 
        pageTitle: 'Shop', 
        hasProducts: products.length>0,
        productCSS: true,
        activeShop: true
    });
});

module.exports = router;