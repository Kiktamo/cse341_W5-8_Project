const express = require('express');
const router = express.Router();
const settings = require('../controllers/settings');

router.get('/', settings.getAll)
router.get('/:id', settings.getById);
router.post('/', settings.insert)
router.put('/:id', settings.updateById)
router.delete('/:id', settings.deleteById)

module.exports = router;