const router = require('./router')

const validate = require('../middleware/validations')
const auth = require('../middleware/auth')

const userController = require('../controllers/user')
const productController = require('../controllers/product')
const orderController = require('../controllers/order')


//User
router.post('/register', validate.signupUser, userController.register);//Customer
router.post('/login', userController.login);

//Product
router.post('/product/new', productController.createProduct);


//Order
router.put('/order/add_to_basket', auth.authenticateToken, orderController.addToBasket)
router.delete('/order/remove_from_basket/:userId/:productId', auth.authenticateToken, orderController.removeFromBasket)
router.post('/order/new', auth.authenticateToken, orderController.createOrder)
