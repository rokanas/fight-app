const express = require("express");
const router = express.Router();
const Fight = require('../models/fight');
const Fighter = require('../models/fighter');
const MartialArt = require('../models/martial_art');

router.use(express.json());

// create new fight
router.post('/', async (req, res) => {
    try {
        const fight = new Fight(req.body);
        await fight.save();
        res.status(201).json(fight);              // new resource has been created
    } catch(err) {
        res.status(400).json({error: err.message}); // issue with the client's request
    }
});

// get all fights
router.get('/', async (req, res) => {
    try {
        const fights = await Fight.find();
        res.status(200).json(fights);             // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// delete all fights
router.delete('/', async (req, res) => {
    try {
        await Fight.deleteMany({}); 
        res.status(200).json({message: 'Fights deleted successfully'}); // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// get fight by id
router.get('/:id', async (req, res) => {
    try {
        const fight = await Fight.findOne({id :req.params.id});
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
        const fight = await Fight.findOneAndUpdate(
            {id : req.params.id} ,
            req.body, 
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
        const fight = await Fight.updateOne(
            {id : req.params.id},
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
      const fight = await Fight.findOneAndDelete({id :req.params.id});
      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' }); // resource not found
      }
      res.status(200).json({ message: 'Fight deleted successfully' }); // request successful
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

/* ========================= FIGHTER RELATIONSHIP ==============================*/

// add fighter relationship
router.post('/:id/fighter', async (req, res) => {
    try {
  
      // Find fight by id
      const fight = await Fight.findOne({ id : req.params.id });
  
      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' });
      }
  
      // Find fighter by email
      const fighter = await Fighter.findOne({ email : req.body.email });
  
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' });
      }
  
      // Add the fighter to the fight
      fight.fighters.push(req.body.email);
  
      // Save the updated fight
      await fight.save();
  
      res.status(201).json(fight); // Respond with the updated fight
    } catch (err) {
      res.status(400).json({ error: err.message }); // issue with the client's request
    }
  });

// add winner fighter relationship
router.post('/:id/fighter/winner', async (req, res) => {
    try {
  
      // Find fight by id
      const fight = await Fight.findOne({ id : req.params.id });
  
      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' });
      }
  
      // Find fighter by email
      const fighter = await Fighter.findOne({ email : req.body.email });
  
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' });
      }
  
      // Add the fighter to the fight
      fight.winner = req.body.email;
  
      // Save the updated fighter document
      await fight.save();
  
      res.status(201).json(fight); // Respond with the updated fight
    } catch (err) {
      res.status(400).json({ error: err.message }); // issue with the client's request
    }
  });

// get all fighters in fight
router.get('/:id/fighter', async (req, res) => {
    try {

      // Find fight by id
      const fight = await Fight.findOne({ id : req.params.id });

      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' });
      }

    // retrieve fighters based on emails stored in fight
    const fighters = await Fighter.find({ email: { $in: fight.fighters } });

    // return the list of fighters in fight
    res.status(200).json(fighters);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// get winner fighter in fight
router.get('/:id/fighter/winner', async (req, res) => {
    try {

      // Find fight by id
      const fight = await Fight.findOne({ id : req.params.id });

      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' });
      }

    // retrieve winner fighter based on email stored in fight
    const fighter = await Fighter.find({ email: { $in: fight.winner } });

    // return the list of fighters in fight
    res.status(200).json(fighter);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

module.exports = router

/* ========================= MARTIAL ART RELATIONSHIP ==============================*/

// add martial art relationship
router.post('/:id/martial-art', async (req, res) => {
  try {

    // find the fight by id
    const fight = await Fight.findOne({ id : req.params.id });

    if (!fight) {
      return res.status(404).json({ error: 'Fight not found' });
    }

    // find the existing martial art by name
    const martialArt = await MartialArt.findOne({ name : req.body.name });

    if (!martialArt) {
      return res.status(404).json({ error: 'Martial art not found' });
    }

    // add the martial art to the fight's list of martial arts
    fight.martial_art.push(req.body.name);

    // save the updated fight document
    await fight.save();

    res.status(201).json(fight); // respond with the updated fight
  } catch (err) {
    res.status(400).json({ error: err.message }); // issue with the client's request
  }
});

// get all martial arts in fight
router.get('/:id/martial-art', async (req, res) => {
  try {
      // find the fight by id
      const fight = await Fight.findOne({ id: req.params.id });

      if (!fight) {
          return res.status(404).json({ error: 'Fight not found' });
      }

      // retrieve martial arts based on names stored in fight
      const martialArts = await MartialArt.find({ name: { $in: fight.martial_art } });

      // return the list of martial arts in fight
      res.status(200).json(martialArts);

  } catch (err) {
      res.status(500).json({ error: err.message }); // internal server error
  }
});

// get specific martial art in fight by name
router.get('/:id/martial-art/:name', async (req, res) => {
  try {
      // Find the fight by id
      const fight = await Fight.findOne({ id: req.params.id });

      if (!fight) {
          return res.status(404).json({ error: 'Fight not found' });
      }

      const martialArtName = req.params.name;

      // check if the fight has specific martial art
      if (!fight.martial_art.includes(martialArtName)) {
          return res.status(404).json({ error: 'Fight does not have Martial Art' });
      }

      // retrieve martial arts based on names stored in fight   
      const martialArt = await MartialArt.findOne({ name: martialArtName });

      // return the specific martial art
      res.status(200).json(martialArt);

  } catch (err) {
      res.status(500).json({ error: err.message }); // internal server error
  }
});

// delete specific martial art in fight by name
router.delete('/:id/martial-art/:name', async (req, res) => {
  try {
      // find fight by id
      const fight = await Fight.findOne({ id: req.params.id });

      if (!fight) {
          return res.status(404).json({ error: 'Fight not found' });
      }

      const martialArt = req.params.name;

      // Check if the fight has the specified martial art
      const index = fight.martial_art.indexOf(martialArt);

      if (index === -1) {
          return res.status(404).json({ error: 'Fight does not have Martial Art' });
      }

      // Remove the martial art from the fighte
      fight.martial_art.splice(index, 1);   

      // Save the updated fight document
      await fight.save();

      res.status(204).send(); // no content, successfully deleted
      
  } catch (err) {
      res.status(500).json({ error: err.message }); // Internal server error
  }
});