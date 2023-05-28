const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const mongo = require('mongodb')

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const collection = db.db('worldbuilding').collection('settings');
    const documents = await collection.find().toArray();
    res.send(documents);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving settings');
  }
};

const getById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const db = mongodb.getDb();
    const collection = db.db('worldbuilding').collection('settings');

    const id = String(req.params.id);
    const contact = await collection.findOne({
      _id: new mongo.ObjectId(id)
    });

    if (!contact) {
      res.status(404).send('Setting not found');
    } else {
      res.send(contact);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving setting');
  }
};

const insert = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const db = mongodb.getDb();
    const collection = db.db('worldbuilding').collection('settings');

    const requiredFields = ['name', 'genre', 'magic', 'technology', 'species', 'government', 'summary'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(400).send(`Missing fields: ${missingFields.join(', ')}`);
      return;
    }

    const {
      name,
      genre,
      magic,
      technology,
      species,
      government,
      summary
    } = req.body;
    const document = {
      name,
      genre,
      magic,
      technology,
      species,
      government,
      summary
    };

    const result = await collection.insertOne(document);
    if (!result.acknowledged) {
      console.log(err);
      res.status(500).send('Error adding setting');
    } else {
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding setting');
  }
};

const updateById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const db = mongodb.getDb();
    const collection = db.db('worldbuilding').collection('settings');

    const id = String(req.params.id);
    const setting = await collection.findOne({
      _id: new mongo.ObjectId(id)
    });

    if (!setting) {
      res.status(404).send('Setting not found');
      return;
    }

    const fieldsToUpdate = Object.keys(req.body);
    const validFields = ['name', 'genre', 'magic', 'technology', 'species', 'government', 'summary'];

    const canUpdate = fieldsToUpdate.every(field => validFields.includes(field));
    if (!canUpdate) {
      const invalidFields = fieldsToUpdate.filter(field => !validFields.includes(field));
      res.status(400).send(`Invalid fields: ${invalidFields.join(', ')}`);
      return;
    }

    const updateValues = {};
    fieldsToUpdate.forEach(field => {
      updateValues[field] = req.body[field];
    });

    const result = await collection.updateOne({
      _id: new mongo.ObjectId(id)
    }, {
      $set: updateValues
    });

    if (!result.acknowledged) {
      console.log(err);
      res.status(500).send('Error updating setting');
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating setting');
  }
};

const deleteById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const db = mongodb.getDb();
    const collection = db.db('worldbuilding').collection('settings');

    const id = String(req.params.id);

    const result = await collection.deleteOne({
      _id: new mongo.ObjectId(id)
    });

    if (result.deletedCount === 0) {
      res.status(404).send('Setting not found');
    } else {
      res.status(200).send('Setting deleted');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting setting');
  }
};

module.exports = {
  insert,
  getAll,
  getById,
  updateById,
  deleteById
}