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

const emailValidation = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be a valid email address'),
];

const passwordValidation = [
    body('password').notEmpty().withMessage('Password is required').isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
    insertValidation,
    IdValidation,
    emailValidation,
    passwordValidation,
};