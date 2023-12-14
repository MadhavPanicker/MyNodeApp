const Product = require('../model/product');

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product',{
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        editing: false
    });
}

exports.postAddProduct = (req,res,next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageURL: imageURL,
        description: description,
    })
    .then(result => {
        console.log(result);
        res.redirect('/admin/add-product');
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
    //Product.findByPk(prodId)
    .then(products=>{
        const product = products[0];
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            path: '/admin/edit-product',
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.postEditProduct = (req,res,next) => {
    const id = req.body.productId;
    const newTitle = req.body.title;
    const newImageURL = req.body.imageURL;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    Product.findByPk(id)
    .then(product => {
        product.title = newTitle;
        product.imageURL = newImageURL;
        product.price = newPrice;
        product.description = newDescription;
        return product.save();
    })
    .then(result => {
        console.log('UPDATED PRODUCTS!');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(result=>{
        console.log('PRODUCT DESTROYED');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProducts = (req,res,next) => {
    req.user.getProducts()
    .then((products) => {
        res.render('admin/products',{
            path: '/admin/products',
            prods: products, 
            pageTitle: 'Admin Products', 
        });
    }).catch(err => {
        console.log(err);
    });
}

