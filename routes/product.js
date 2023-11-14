const router = require('express').Router();

const Product = Parse.Object.extend('Product')

router.post('/', async (req, res) => {
    const { product_name, description, price, quantity_stocks, sales } = req.body;
    
    const product = new Product();

    product.set('product_name', product_name);
    product.set('description', description);
    product.set('price', price);
    product.set('quantity_stocks', quantity_stocks);
    product.set('sales', sales);

    try{
        const response = await product.save();
        res.status(200).json(response)
    }
    catch(error){
        res.status(505).json(error)
    }
})

router.get('/getProduct', async (req, res) => {
    try{
        const productQuery = new Parse.Query(Product)
        const product = await productQuery.find();

        res.status(200).json(product.map(products => products.toJSON()))
    }
    catch(error){
        res.status(500).json(error)
    }
})


router.delete('/deleteProduct/:objecId', async (req, res) => {
    const objectId = req.params.objecId;

    const productQuery = new Parse.Query(Product);
    productQuery.equalTo('objectId', objectId);
    const product = await productQuery.first();

    try{
        const response = await product.destroy();
        res.status(200).json("successfully deleted")
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;
