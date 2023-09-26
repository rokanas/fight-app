const express = require("express");
const router = express.Router();
const Fighter = require('../models/fighter');

router.use(express.json());

// create new fighter
router.post('/', async (req, res) => {
    try {
        const fighter = new Fighter(req.body);
        await fighter.save();
        res.status(201).json(fighter);              // new resource has been created
    } catch(err) {
        res.status(400).json({error: err.message}); // issue with the client's request
    }
});

// get all fighters
router.get('/', async (req, res) => {
    try {
        const fighters = await Fighter.find();
        res.status(200).json(fighters);             // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// delete all fighters
router.delete('/', async (req, res) => {
    try {
        await Fighter.deleteMany({}); 
        res.status(200).json({message: 'Fighters deleted successfully   '}); // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// get fighter by email
router.get('/:email', async (req, res) => {
    try {
        const fighter = await Fighter.findOne({email : req.params.email});
        if(!fighter) {
            return res.status(404).json({error: 'Fighter not found'}); // resource not found
        }
        res.status(200).json(fighter);               // request successful
    } catch (err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// update fighter by email
router.put('/:email', async (req, res) => {
    try {
        const fighter = await Fighter.findOneAndUpdate(
            {email : req.params.email}, 
             req.body, 
            {new: true}                              // tell mongoose to return updated fighter, not original
        );
        if(!fighter) {
            return res.status(404).json({error: 'Fighter not found'}); // resource not found
        }
        res.status(200).json(fighter);               // request successful 
    } catch (err) {
        res.status(500).json({error: err.message});  // internal server error
    }

});

// partially update fighter by email
router.patch('/:email', async (req, res) => {
    try {
        const fighter = await Fighter.updateOne(
            {email : req.params.email},
            { $set: req.body },
            { new: true }
        );
        if (!fighter) {
          return res.status(404).json({ error: 'Fighter not found' }); // resource not found
        }
        res.status(200).json(fighter);               // request successful
    } catch (err) {
        res.status(500).json({error: err.message }); // internal server error
      }
});

// delete fighter by email
router.delete('/:email', async (req, res) => {
    try {
      const fighter = await Fighter.findOneAndDelete({id : req.params.id});
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' }); // resource not found
      }
      res.status(200).json({ message: 'Fighter deleted successfully' }); // request successful
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router