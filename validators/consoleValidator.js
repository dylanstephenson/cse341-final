const { body, param } = require('express-validator');

exports.validateConsole = [
  body('brand').notEmpty().isString().withMessage('Brand must be a string and is required.'),
  body('model').notEmpty().isString().withMessage('Series must be a string and is required.'),
  body('price').notEmpty().isString().withMessage('Price must be a string and is required.'),
  body('inventory').notEmpty().isInt().withMessage('Inventory must be an int and is required')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];