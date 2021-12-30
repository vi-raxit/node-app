const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct (id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            //Analyze  the cart => find the existing one
            const existingProductIndex = cart.products.findIndex(prod=>prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //Add new product/increase the quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart),err => {
                console.log(err);
            })
        });
    }

    static deleteProduct (id, productPrice) {
        fs.readFile(p, (err, fileContent)=>{
            if(err) {
                return;
            } else {
                const updatedCart = {...JSON.parse(fileContent)};
                const cartProd = updatedCart.products.find(prod=>prod.id === id);
                if(!cartProd) {
                    return;
                }
                updatedCart.products = updatedCart.products.filter(prod=>prod.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - (cartProd.qty * productPrice);
                fs.writeFile(p, JSON.stringify(updatedCart), err=>{
                    console.log(err);
                });
            }
        })
    }

    static getCart (cb) {
        fs.readFile(p, (err, fileContent)=>{
            if(err) {
                return null;
            } else {
                const cart = {...JSON.parse(fileContent)};
                cb(cart);
            }
        })
    }

    // static deleteCartProduct (id) {
    //     fs.readFile(p, (err, fileContent)=>{
    //         const updatedCartProducts = {...JSON.parse(fileContent)};
    //         cartProduct.qty = 
    //         const cartProduct = updatedCartProducts.products.filter(prod=>prod.id !== id);
            
    //     });
    // }
}