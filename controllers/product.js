const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  }

exports.postAddProduct =  (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

exports.getProducts =  (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop", {
            prods: products,
            docTitle: "Shop",
            path: "/",
            hasPrducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}