const express = require("express");
const router = express.Router();
const Fighter = require('../models/fighter');
const MartialArt = require('../models/martial_art');
const Fight = require('../models/fight');
const Date = require('../models/date');

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

// get all fighters by location
router.get('/location/:location', async (req, res) => {
    try {
        const fighters = await Fighter.find({location : req.params.location});
        res.status(200).json(fighters);               // request successful
    } catch (err) {
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
router.get('/email/:email', async (req, res) => {
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

/* ========================= MARTIAL ART RELATIONSHIP ==============================*/

// add martial art relationship
router.post('/:email/martial-art', async (req, res) => {
    try {
  
      // find the fighter by email
      const fighter = await Fighter.findOne({ email : req.params.email });
  
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' });
      }
  
      // find the existing martial art by name
      const martialArt = await MartialArt.findOne({ name : req.body.name });
  
      if (!martialArt) {
        return res.status(404).json({ error: 'Martial art not found' });
      }
  
      // add the martial art to the fighter's list of martial arts
      fighter.martial_art.push(req.body.name);
  
      // save the updated fighter document
      await fighter.save();
  
      res.status(201).json(fighter); // respond with the updated fighter
    } catch (err) {
      res.status(400).json({ error: err.message }); // issue with the client's request
    }
  });

// get all martial arts in fighter
router.get('/:email/martial-art', async (req, res) => {
    try {
        // find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        // retrieve martial arts based on names stored in fighter
        const martialArts = await MartialArt.find({ name: { $in: fighter.martial_art } });

        // return the list of martial arts in fighter
        res.status(200).json(martialArts);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// get specific martial art in fighter by name
router.get('/:email/martial-art/:name', async (req, res) => {
    try {
        // Find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const martialArtName = req.params.name;

        // check if the fighter has specific martial art in their profile
        if (!fighter.martial_art.includes(martialArtName)) {
            return res.status(404).json({ error: 'Fighter does not know Martial Art' });
        }

        // retrieve martial arts based on names stored in fighter   
        const martialArt = await MartialArt.findOne({ name: martialArtName });

        // return the specific martial art
        res.status(200).json(martialArt);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// delete specific martial art in fighter by name
router.delete('/:email/martial-art/:name', async (req, res) => {
    try {
        // find fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const martialArt = req.params.name;

        // Check if the fighter has the specified martial art in their profile
        const index = fighter.martial_art.indexOf(martialArt);

        if (index === -1) {
            return res.status(404).json({ error: 'Fighter does not know Martial Art' });
        }

        // Remove the martial art from the fighter's profile
        fighter.martial_art.splice(index, 1);   

        // Save the updated fighter document
        await fighter.save();

        res.status(204).json({ message: "Martial Art deleted successfully" }); // no content, successfully deleted
        
    } catch (err) {
        res.status(500).json({ error: err.message }); // Internal server error
    }
});

/* ========================= FIGHT RELATIONSHIP ==============================*/

// add fight relationship
router.post('/:email/fight', async (req, res) => {
    try {
  
      // Find the fighter by email
      const fighter = await Fighter.findOne({ email : req.params.email });
  
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' });
      }
  
      // Find the existing fight by id
      const fight = await Fight.findOne({ id : req.body.id });
  
      if (!fight) {
        return res.status(404).json({ error: 'Fight not found' });
      }
  
      // Add the fight to the fighter's fight history
      fighter.fight_history.push(req.body.id);
  
      // Save the updated fighter document
      await fighter.save();
  
      res.status(201).json(fighter); // Respond with the updated fighter
    } catch (err) {
      res.status(400).json({ error: err.message }); // Issue with the client's request
    }
  });

// get all fights in fighter
router.get('/:email/fight', async (req, res) => {
    try {
        // find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        // retrieve fights  based on ids stored in fighter
        const fights = await Fight.find({ id: { $in: fighter.fight_history } });

        // return the list of fights in fighter
        res.status(200).json(fights);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// get specific fight in fighter by id
router.get('/:email/fight/:id', async (req, res) => {
    try {
        // Find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const fightId = req.params.id;

        // check if the fighter has specific fight in their fight history
        if (!fighter.fight_history.includes(fightId)) {
            return res.status(404).json({ error: 'Fighter does not have Fight' });
        }

        // retrieve fight based on id stored in fighter   
        const fight = await Fight.findOne({ id: fightId });

        // return the specific fight
        res.status(200).json(fight);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// delete specific fight in fighter by id
router.delete('/:email/fight/:id', async (req, res) => {
    try {
        // find fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const fight = req.params.id;

        // Check if the fighter has specific fight in their profile
        const index = fighter.fight_history.indexOf(fight);

        if (index === -1) {
            return res.status(404).json({ error: 'Fighter does not have Fight' });
        }

        // Remove the fight from the fighter's profile
        fighter.fight_history.splice(index, 1);   

        // Save the updated fighter document
        await fighter.save();

        res.status(204).send(); // no content, successfully deleted
        
    } catch (err) {
        res.status(500).json({ error: err.message }); // Internal server error
    }
});

/* ========================= DATE RELATIONSHIP ==============================*/

// add date relationship
router.post('/:email/date', async (req, res) => {
    try {
  
      // Find the fighter by email
      const fighter = await Fighter.findOne({ email : req.params.email });
  
      if (!fighter) {
        return res.status(404).json({ error: 'Fighter not found' });
      }
  
      // Find the existing date by id
      const date = await Date.findOne({ id : req.body.id });
  
      if (!date) {
        return res.status(404).json({ error: 'Date not found' });
      }
  
      // Add the martial art to the fighter's list of martial arts
      fighter.date_history.push(req.body.id);
  
      // Save the updated fighter document
      await fighter.save();
  
      res.status(201).json(fighter); // Respond with the updated fighter
    } catch (err) {
      res.status(400).json({ error: err.message }); // Issue with the client's request
    }
  });

// get all dates in fighter
router.get('/:email/date', async (req, res) => {
    try {
        // find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        // retrieve fights  based on ids stored in fighter
        const dates = await Date.find({ id: { $in: fighter.date_history } });

        // return the list of fights in fighter
        res.status(200).json(dates);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// get specific date in fighter by id
router.get('/:email/date/:id', async (req, res) => {
    try {
        // Find the fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const dateId = req.params.id;

        // check if the fighter has specific date in their fight history
        if (!fighter.date_history.includes(dateId)) {
            return res.status(404).json({ error: 'Fighter does not have Date' });
        }

        // retrieve date based on names stored in fighter   
        const date = await Date.findOne({ id: dateId });

        // return the specific date
        res.status(200).json(date);

    } catch (err) {
        res.status(500).json({ error: err.message }); // internal server error
    }
});

// delete specific date in fighter by id
router.delete('/:email/date/:id', async (req, res) => {
    try {
        // find fighter by email
        const fighter = await Fighter.findOne({ email: req.params.email });

        if (!fighter) {
            return res.status(404).json({ error: 'Fighter not found' });
        }

        const date = req.params.id;

        // Check if the fighter has the specified date in their profile
        const index = fighter.date_history.indexOf(date);

        if (index === -1) {
            return res.status(404).json({ error: 'Fighter does not have Date' });
        }

        // Remove the date from the fighter's profile
        fighter.date_history.splice(index, 1);   

        // Save the updated fighter document
        await fighter.save();

        res.status(204).send(); // no content, successfully deleted
        
    } catch (err) {
        res.status(500).json({ error: err.message }); // Internal server error
    }
});

module.exports = router