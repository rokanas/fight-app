const express = require('express');
const mongoose = require('mongoose');
const date = require('../models/date');
const { json } = require('body-parser');

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

router.post('/', async (req,res) => {
    try{
        const newDate = new date({
            id: req.body.id,
            date: req.body.date,
            location: req.body.location,
            fighters: req.body.fighters
        });
        await newDate.save();
        // New date has been created
        res.status(201).json(newDate);
    } catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
    
});

router.get('/', async (req,res) => {
    try {
        const newDate = await date.find();
        res.status(200).json(newDate);             // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

router.delete('/', async (req,res) => {
    try{
        await date.deleteMany({});
        // Date has been deleted
        res.status(200).json({message : "Dates deleted successfully"});
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.get('/:id', async (req,res) =>{
    const newDate = await date.findOne({id : req.params.id });
    // This checks if there is a date with that specific id
    // P.S. in js undefined,null,0, and empty strings are all considered FALSE
    if(!newDate){
        res.status(404).send({"message" : "The requested date does not exist!"});
        return;
    }
    res.status(200).send(newDate);
});

router.put('/:id', async (req,res) => {
    try{
        // Updates date based on the id requested by the client
        const newDate = await date.findOneAndUpdate(
            {id: req.params.id},
            {
                id: req.body.id,
                date: req.body.date,
                location: req.body.location,
                fighters: req.body.fighters
            },
            {new : true}
        );
        // Checks the existence of the date with the requested id
        if(!newDate){
            res.status(404).send({"message" : "The requested date does not exist!"});
            return;
        }
        res.status(200).send(newDate);
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.patch('/:id', async (req,res) => {
    try{
        
        if(Object.keys(req.body).length === 1 && req.body.id){
            const newDate = await date.updateOne({id : req.params.id},{id : req.body.id},{new : true});
            if(!newDate){
                res.status(404).send({message : "Date not found"});
                return;
            }
            res.status(200).send(newDate);
            return;
        }
        if(Object.keys(req.body).length === 1 && req.body.date){
            const newDate = await date.updateOne({id : req.params.id},{date : req.body.date},{new : true});
            if(!newDate){
                res.status(404).send({message : "Date not found"});
                return;
            }
            res.status(200).send(newDate);
            return;
        }
        if(Object.keys(req.body).length === 1 && req.body.location){
            const newDate = await date.updateOne({id : req.params.id},{location : req.body.location},{new : true});
            if(!newDate){
                res.status(404).send({message : "Date not found"});
                return;
            }
            res.status(200).send(newDate);
            return;
        }
        if(Object.keys(req.body).length === 1 && req.body.fighters){
            const newDate = await date.updateOne({id : req.params.id},{fighters : req.body.fighters},{new : true});
            if(!newDate){
                res.status(404).send({message : "Date not found"});
                return;
            }
            res.status(200).send(newDate);
            return;
        }
        
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const newDate = await date.findOneAndDelete({id : req.params.id});
        if(!newDate){
            res.status(404).send({message : "Date not found"});
            return;
        }
        // Date has been deleted
        res.status(200).json({ message: 'Date deleted successfully' });
        
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

// Export the router
module.exports = router;