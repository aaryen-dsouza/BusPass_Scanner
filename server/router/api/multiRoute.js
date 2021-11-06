const express = require('express');
const router = express.Router();
require('dotenv').config();


const { getAll, getByBranch, post, put, delet } = require('../../controllers/multiRoute')
const auth = require('../../middlewares/auth');

router.get('/all', getAll)

router.get('/:busBranch', getByBranch)

router.post('/new', post)

router.put('/edit/:id', put)

router.delete('/delete/:id', delet)

module.exports = router;