const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
require('dotenv').config();

const { login, getUser } = require('../../controllers/multiAuth')

router.post('/', login);

router.get('/', auth, getUser);

module.exports = router;

