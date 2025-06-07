const express = require('express');
const router = express.Router();
const consoleController = require('../controllers/consoles');
const { validateConsole, validateObjectId } = require('../validators/consoleValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', consoleController.getAll);
router.get('/:id', validateObjectId, consoleController.getSingle);

router.post('/', [isAuthenticated, validateConsole], consoleController.createConsole);

router.put('/:id', [isAuthenticated, validateObjectId, validateConsole], consoleController.updateConsole);

router.delete('/:id', [isAuthenticated, validateObjectId], consoleController.deleteConsole);

module.exports = router;