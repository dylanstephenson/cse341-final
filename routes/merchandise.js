const express = require('express');
const router = express.Router();
const merchController = require('../controllers/merchandise');
const { validateMerch, validateObjectId } = require('../validators/merchValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', merchController.getAll);
router.get('/:id', validateObjectId, merchController.getSingle);

router.post('/', [isAuthenticated, validateMerch], merchController.createMerch);

router.put('/:id', [isAuthenticated, validateObjectId, validateMerch], merchController.updateMerch);

router.delete('/:id', [isAuthenticated, validateObjectId], merchController.deleteMerch);

module.exports = router;