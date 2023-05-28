const express = require('express');
const router = express.Router();
const settings = require('../controllers/settings');
const validation = require('../middleware/validate');

router.get('/', settings.getAll)
router.get('/:id', validation.IdValidation, settings.getById);
router.post('/', validation.insertValidation, settings.insert)
router.put('/:id', validation.IdValidation, settings.updateById)
router.delete('/:id', validation.IdValidation, settings.deleteById)

module.exports = router;