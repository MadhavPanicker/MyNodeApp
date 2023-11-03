const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product',(req,res,next) => {
    res.render('add-product',{active: 'admin', pageTitle: 'Add Product'});
});

router.post('/add-product',(req,res,next) => {
    products.push({title: req.body.title});
    res.render('add-product',{active: 'admin', pageTitle: 'Add Product'});
});

exports.routes = router;
exports.products = products;
