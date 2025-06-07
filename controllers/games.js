const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const games = await mongodb
        .getDatabase()
        .db()
        .collection('games')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve games.' });
    }
  };
  const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const game = await mongodb
        .getDatabase()
        .db()
        .collection('games')
        .findOne({ _id: userId });
  
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(game);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch game' });
    }
  };
  
  // Create a new character
  const createGame = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newGame = {
        name: req.body.name,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        metacriticScore: req.body.metacriticScore,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('games')
        .insertOne(newGame);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create game' });
    }
  };
  
  // Update a game
  const updateGame = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const game = {
        name: req.body.name,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        metacriticScore: req.body.metacriticScore,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('games')
        .replaceOne({ _id: userId }, game);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('Game not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update game' });
    }
  };
  
  // Delete a game
  const deleteGame = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('games')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('Game not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete game' });
    }
  };

module.exports = { getAll, getSingle, createGame, updateGame, deleteGame };