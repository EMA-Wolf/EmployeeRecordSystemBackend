const express = require('express');
const router = express.Router();
const {loginContoller, SignupContoller} = require('../controllers/authControllers')

router.post('/login',loginContoller)
router.post('/signup',SignupContoller)

module.exports = router;