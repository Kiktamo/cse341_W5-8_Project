const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const auth = require('../middleware/auth');

router.use('/', auth, require('./swagger'));
router.use('/settings', auth, require('./settings'));

module.exports = router;