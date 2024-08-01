const router = require('express').Router();
const productController = require('../controllers/productsControllers');

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.get('/search/:key', productController.searchProduct)
router.post('/', productController.createProduct)
router.get('/category/:category', productController.getProductsByCategory);
router.get('/userPosts/:supplierId', productController.getProductsPostByUser);
router.get('/supplierId/:supplierId', productController.getProductsExceptSupplierId);
router.get('/supplierId/:supplierId/category/:category', productController.getProductsExceptSupplierIdAndByCategory);



module.exports =router