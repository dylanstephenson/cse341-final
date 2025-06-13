const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const merchandise = await mongodb
        .getDatabase()
        .db()
        .collection('merchandise')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(merchandise);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve merchandise.' });
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
      const merchandise = await mongodb
        .getDatabase()
        .db()
        .collection('merchandise')
        .findOne({ _id: userId });
  
      if (!merchandise) {
        return res.status(404).json({ message: 'merchandise not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(merchandise);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch merchandise' });
    }
  };
  
  // Create a new merchandise
  const createMerch = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newMerch = {
        name: req.body.name,
        merchType: req.body.merchType,
        source: req.body.source,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('merchandise')
        .insertOne(newMerch);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create merchandise' });
    }
  };
  
  // Update a merchandise
  const updateMerch = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const merchandise = {
        name: req.body.name,
        merchType: req.body.merchType,
        source: req.body.source,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('merchandise')
        .replaceOne({ _id: userId }, merchandise);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('merchandise not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update merchandise' });
    }
  };
  
  // Delete a merchandise
  const deleteMerch = async (req, res) => {
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
        .collection('merchandise')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('merchandise not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete merchandise' });
    }
  };

module.exports = { getAll, getSingle, createMerch, updateMerch, deleteMerch };