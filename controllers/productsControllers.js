const Product = require('../models/Products');

module.exports = {
    /* createProduct: async(req, res) => {
        const newProduct = new Product(req.body);
        try{
            await newProduct.save();
            res.status(200).json("product created succesfully")
        }catch(error){
            res.status(500).json("failed to create the product")
        }
    }, */

    createProduct: async (req, res) => {
        const newProduct = new Product({ 
            title: req.body.title,
            supplier: req.body.supplier,
            supplierId: req.body.supplierId,
            category: req.body.category,
            price: req.body.price,
            imageUrl: req.body.imageUrl, //imageURL
            description: req.body.description,
            product_location: req.body.product_location,
        });    
        // set user properties from request body
        try{
            await newProduct.save();
            res.status(200).json("product created succesfully")
        }catch(error){ 
            res.status(500).json({message: error});
        }
    },

    getAllProduct: async(req, res) => {
        // const newProduct = new Product(req.body);
        
        try{
            const products = await Product.find().sort({ createdAt: -1})
            res.status(200).json(products)
        }catch(error){
            res.status(500).json("failed to get the products")
        }
    },
    getProductsByCategory: async(req, res) => {
        const { category } = req.params;
        try{
            const products = await Product.find({ category }).sort({ createdAt: -1 });
            res.status(200).json(products)
        }catch(error){
            res.status(500).json("failed to get the products")
        }
    },
    getProductsExceptSupplierIdAndByCategory: async (req, res) => {
        const { supplierId, category } = req.params;
        try {
            let query = { supplierId: { $ne: supplierId } };
            // If category is provided, add it to the query
            if (category) {
                query.category = category;
            }
            // Find all products except those from the given supplier and filter by category if provided
            const products = await Product.find(query)
                                          .sort({ category: 1 }); // Sorting by category ascending
            res.status(200).json(products);
        } catch (error) {
            console.error("Failed to get the products:", error);
            res.status(500).json("Failed to get the products");
        }
    },        
    getProductsExceptSupplierId: async(req, res) => {
        const { supplierId } = req.params;
        try{
            const products = await Product.find({ supplierId: { $ne: supplierId } });
            res.status(200).json(products)
        }catch(error){
            res.status(500).json("failed to get the products")
        }
    },
    getProductsPostByUser: async(req, res) => {
        const { supplierId } = req.params;
        try{
            const products = await Product.find({ supplierId: { $eq: supplierId } });
            res.status(200).json(products)
        }catch(error){
            res.status(500).json("failed to get the products")
        }
    },
    getProduct: async(req, res) => {
        // const newProduct = new Product(req.body); 
        try{
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }catch(error){
            res.status(500).json("failed to get the product")
        }
    },
    searchProduct: async(req, res) => {
        // const newProduct = new Product(req.body);
        try{
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "farm",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        }catch(error){
            res.status(500).json("failed to get the product")
        }
    },
}