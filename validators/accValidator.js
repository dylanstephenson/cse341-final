const { body, param } = require('express-validator');

exports.validateAcc = [
  body('brand').notEmpty().isString().withMessage('Brand must be a string and is required.'),
  body('console').notEmpty().isString().withMessage('Console must be a string and is required.'),
  body('classification').notEmpty().isString().withMessage('classification must be a string and is required.'),
  body('name').notEmpty().isString().withMessage('Name is required and must be a string'),
  body('inventory').notEmpty().isObject().withMessage('Inventory must be an object and is required')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];