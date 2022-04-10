const Product = require("../model/Products")

const getAllProducts = (req,res)=>{
    Product.find()
    .then((product)=>{
        res.json(product);
    })
    .catch((err) =>{
        res.json(err);
    })
}

const getProductById = (req,res)=>{
    Product.findById(req.params.id)
    .then((product) =>{
        res.json(product)
    })
    .catch((err) =>{
        res.json(err);
    })
}

const createProduct = (req,res)=>{
     
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        description : req.body.description,
        user: req.userId
    })
    product.save();
    res.json(product)
}

const updateProduct = (req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{ //req.body
        name:req.body.name,
        price:req.body.price,
        description : req.body.description
    })
    .then((product) =>{
        res.json(product)
    })
    .catch((err) =>{
        res.json(err);
    })
}

const deleteProduct = (req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then((product) =>{
        res.json(product + "deleted")
    })
    .catch((err) =>{
        res.json(err);
    })

    Product.deleteOne(product)
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
