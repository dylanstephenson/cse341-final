const { body, param } = require('express-validator');

exports.validateMerch = [
  body('name').notEmpty().isString().withMessage('Name must be a string and is required.'),
  body('merchType').notEmpty().isString().withMessage('Merch type must be a string and is required.'),
  body('source').notEmpty().isString().withMessage('Source must be a string and is required.'),
  body('inventory').notEmpty().isInt().withMessage('Inventory must be an int and is required')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];