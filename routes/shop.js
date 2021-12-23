const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/',(req, res, next)=>{
    // res.send('<h1>Hello from Express!</h1>');
    console.log(adminData.products);
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'Shop', path: '/shop'});
    // res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;