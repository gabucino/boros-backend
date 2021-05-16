const router = require('./router')

const userController = require('../controllers/user')


//Customer
router.post('/register', userController.register);

