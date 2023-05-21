const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.use('/', require('./swagger'));
router.use('/settings', require('./settings'));

module.exports = router;
