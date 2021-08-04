const express = require('express')
// const bcrypt = require('bcryptjs');
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register);
router.post('/login', AuthController.logIn);


module.exports = router;