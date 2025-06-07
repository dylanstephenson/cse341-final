const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const consoles = await mongodb
        .getDatabase()
        .db()
        .collection('consoles')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(consoles);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve consoles.' });
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
      const console = await mongodb
        .getDatabase()
        .db()
        .collection('consoles')
        .findOne({ _id: userId });
  
      if (!console) {
        return res.status(404).json({ message: 'console not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(console);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch console' });
    }
  };
  
  // Create a new console
  const createConsole = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newConsole = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('consoles')
        .insertOne(newConsole);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create console' });
    }
  };
  
  // Update a console
  const updateConsole = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const console = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('consoles')
        .replaceOne({ _id: userId }, console);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('console not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update console' });
    }
  };
  
  // Delete a console
  const deleteConsole = async (req, res) => {
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
        .collection('consoles')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('console not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete console' });
    }
  };

module.exports = { getAll, getSingle, createConsole, updateConsole, deleteConsole };