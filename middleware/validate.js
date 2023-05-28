const {
    body,
    param
} = require('express-validator');

const insertValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('magic').notEmpty().withMessage('Magic is required'),
    body('technology').notEmpty().withMessage('Technology is required'),
    body('species').notEmpty().withMessage('Species is required'),
    body('government').notEmpty().withMessage('Government is required'),
    body('summary').notEmpty().withMessage('Summary is required'),
];

const IdValidation = [
    param('id').notEmpty().isMongoId().withMessage('ID must be valid MongoID')
];


module.exports = {
    insertValidation,
    IdValidation,
};