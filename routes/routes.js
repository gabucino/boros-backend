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
router.post('/order/add_to_basket', auth.authenticateToken, orderController.addToBasket)
router.post('/order/remove_from_basket', orderController.removeFromBasket)
router.post('/order/new', orderController.createOrder)
