const express = require('express');
const router = express.Router();
const accController = require('../controllers/accessories');
const { validateAcc, validateObjectId } = require('../validators/accValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', accController.getAll);
router.get('/:id', validateObjectId, accController.getSingle);

router.post('/', [isAuthenticated, validateAcc], accController.createAcc);

router.put('/:id', [isAuthenticated, validateObjectId, validateAcc], accController.updateAcc);

router.delete('/:id', [isAuthenticated, validateObjectId], accController.deleteAcc);

module.exports = router;