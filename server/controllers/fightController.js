const express = require("express")
const router = express.Router()
const Fight = require('../models/fight');

router.use(express.json())

// create new fight
router.post('/', async (req, res) => {
    try {
        const fight = new fight(req.body);
        await fight.save();
        res.status(201).json(fight);              // new resource has been created
    } catch(err) {
        res.status(400).json({error: err.message}); // issue with the client's request
    }
});

// get all fights
router.get('/', async (req, res) => {
    try {
        const fights = await fight.find();
        res.status(200).json(fights);             // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// delete all fights
router.delete('/', async (req, res) => {
    try {
        await fight.deleteMany({}); 
        res.status(200).json({message: 'Fights deleted successfully   '}); // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// get fight by id
router.get('/:id', async (req, res) => {
    try {
        const fight = await fight.findById(req.params.id);
        if(!fight) {
            return res.status(404).json({error: 'Fight not found'}); // resource not found
        }
        res.status(200).json(fight);               // request successful
    } catch (err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// update fight by id
router.put('/:id', async (req, res) => {
    try {
        const fight = await fight.findByIdAndUpdate(req.parameters.id, req.body, 
            {new: true}                              // tell mongoose to return updated fight, not original
        );
        if(!fight) {
            return res.status(404).json({error: 'Fight not found'}); // resource not found
        }
        res.status(200).json(fight);               // request successful 
    } catch (err) {
        res.status(500).json({error: err.message});  // internal server error
    }

});

// partially update fight by id
router.patch('/:id', async (req, res) => {
    try {
        const fight = await fight.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!fight) {
          return res.status(404).json({ error: 'Fight not found' }); // resource not found
        }
        res.status(200).json(fight);               // request successful
    } catch (err) {
        res.status(500).json({error: err.message }); // internal server error
      }
});

// delete fight by id
router.delete('/:id', async (req, res) => {
    try {
      const fight = await fight.findByIdAndDelete(req.params.id);
      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' }); // resource not found
      }
      res.status(200).json({ message: 'Fight deleted successfully' }); // request successful
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router