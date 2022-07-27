var express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const verifyToken = require('../app/middleware/auth');

router.post('/login',AuthController.loginAuth);
router.post('/register',AuthController.registerAuth);
router.get('/',verifyToken,AuthController.checkToken);

module.exports = router;


