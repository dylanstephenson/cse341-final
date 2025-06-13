const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const accessories = await mongodb
        .getDatabase()
        .db()
        .collection('accessories')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(accessories);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve accessories.' });
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
      const accessory = await mongodb
        .getDatabase()
        .db()
        .collection('accessories')
        .findOne({ _id: userId });
  
      if (!accessory) {
        return res.status(404).json({ message: 'accessory not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(accessory);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch accessory' });
    }
  };
  
  // Create a new accessory
  const createAcc = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newAcc = {
        brand: req.body.brand,
        console: req.body.console,
        classification: req.body.classification,
        name: req.body.name,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('accessories')
        .insertOne(newAcc);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create accessory' });
    }
  };
  
  // Update a accessory
  const updateAcc = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const accessory = {
        brand: req.body.brand,
        console: req.body.console,
        classification: req.body.classification,
        name: req.body.name,
        inventory: req.body.inventory
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('accessories')
        .replaceOne({ _id: userId }, accessory);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('accessory not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update accessory' });
    }
  };
  
  // Delete a accessory
  const deleteAcc = async (req, res) => {
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
        .collection('accessories')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('accessory not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete accessory' });
    }
  };

module.exports = { getAll, getSingle, createAcc, updateAcc, deleteAcc };