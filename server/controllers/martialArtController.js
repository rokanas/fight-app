const express = require('express');
const mongoose = require('mongoose');
const martialArt = require('../models/martial_art');
const { json } = require('body-parser');

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());


router.post('/', async (req, res) => {
    try {
        const newMartialArt = new martialArt(req.body);
        await  newMartialArt.save();
        res.status(201).json(newMartialArt);              // new resource has been created
    } catch(err) {
        res.status(400).json({error: err.message}); // issue with the client's request
    }
});

router.get('/', async (req,res) => {
    try {
        const newMartialArt = await martialArt.find();
        res.status(200).json(newMartialArt);             // request successful
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

router.delete('/', async (req,res) => {
    try{
        await martialArt.deleteMany({});
        // Martial Art has been deleted
        res.status(200).json({message : "Martial Arts deleted successfully"});
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.get('/:name', async (req,res) =>{
    const newMartialArt = await martialArt.findOne({name : req.params.name });
    // This checks if there is a martial art with that specific name
    // P.S. in js undefined,null,0, and empty strings are all considered FALSE
    if(!newMartialArt){
        res.status(404).send({message : "The requested Martial Art does not exist!"});
        return;
    }
    res.status(200).send(newMartialArt);
});

router.put('/:name', async (req,res) => {
    try{
        // Updates martial art based on the name requested by the client
        const newMartialArt = await martialArt.findOneAndUpdate(
            {name: req.params.name},
            {name: req.body.name , ruleset: req.body.ruleset},
            {new : true}
        );
        // Checks the existence of the martial art with the requested name
        if(!newMartialArt){
            res.status(404).send({message : "The requested Martial Art does not exist!"});
            return;
        }
        res.status(200).send(newMartialArt);
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.patch('/:name', async (req,res) => {
    try{
        /* Checks to see if the informatin sent for update is name or 
        ruleset and updates the one that is requested by the client */
        
        /*
        This code will update the martialArt object with any information
        given from the req.body but it also adds new information (attributes)
        to it, so we have to limit and control the request from the client side
        (front-end) when we use this.

        Object.assign(martialArt, req.body);
        martialArt.save();

        */
        
        // Check to see if the user ONLY sent 1 attribute to get changed and change it accordingly
        if(Object.keys(req.body).length === 1 && req.body.name){
            const newMartialArt = await martialArt.updateOne({name : req.params.name}, {name : req.body.name}, {new : true});
            if(!newMartialArt){
                res.status(404).send({message : "Martial Art not found"});
                return;
            }
            res.status(200).send(newMartialArt);
            return;
        }
        if(Object.keys(req.body).length === 1 && req.body.ruleset){
            const newMartialArt = await martialArt.updateOne({name : req.params.name}, {ruleset : req.body.ruleset}, {new : true});
            if(!newMartialArt){
                res.status(404).send({message : "Martial At not found"});
                return;
            }
            res.status(200).send(newMartialArt);
            return;
        }
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

router.delete('/:name', async (req,res) => {
    try{
        const newMartialArt = await martialArt.findOneAndDelete({name : req.params.name});
        if(!newMartialArt){
            res.status(404).send({message : "Martial Art not found"});
            return;
        }
        // Martial Art has been deleted
        res.status(200).json({ message: 'Martial Art deleted successfully' });
        
    }catch(err){
        // Wrong client request
        res.status(400).json({error: err.message});
    }
});

// Export the router
module.exports = router;

