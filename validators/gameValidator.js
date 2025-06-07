const { body, param } = require('express-validator');

exports.validateGame = [
  body('name').notEmpty().isString().withMessage('Name is required.'),
  body('genre').notEmpty().isArray().withMessage('Genre is required.'),
  body('inventory').notEmpty().withMessage('Inventory must be an object and is required.'),
  body('metacriticScore').notEmpty().isInt().withMessage('Score must be an int and is required'),
  body('releaseYear').notEmpty().isInt().withMessage('Release year must be an int and is required')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];