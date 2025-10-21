const express = require('express');
const { getLatest, getAll } = require('../controllers/product');

const router = express.Router();

router.get('/', getAll);
router.get('/latest', getLatest);

module.exports = router;