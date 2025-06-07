const express = require('express');
const router = express.Router();
const gameController = require('../controllers/games');
const { validateGame, validateObjectId } = require('../validators/gameValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', gameController.getAll);
router.get('/:id', validateObjectId, gameController.getSingle);

router.post('/', [isAuthenticated, validateGame], gameController.createGame);

router.put('/:id', [isAuthenticated, validateObjectId, validateGame], gameController.updateGame);

router.delete('/:id', [isAuthenticated, validateObjectId], gameController.deleteGame);

module.exports = router;