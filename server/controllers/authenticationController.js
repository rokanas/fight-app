require('dotenv').config();

const express = require("express");
const router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const Fighter = require('../models/fighter');
const Token = require('../models/token');

router.use(express.json());

// login fighter
router.post('/login', async(req, res) => {
    try {
        const fighter = await Fighter.findOne({email : req.body.email});
        if(!fighter) {
            return res.status(404).json({error: 'Fighter not found'}); // resource not found
        }

        if (await bcrypt.compare(req.body.password, fighter.password)) {
            const user = { email: req.body.email}; // create fighter user object
            const accessToken = generateAccessToken(user); // create access token
            let userToken = await Token.findOne({user: user.email})
            if (!userToken) {
                const newToken = new Token({ user: user.email, token: accessToken });
                await newToken.save()
            } else {
                await Token.updateOne({user: user.email}, {$set: {token: accessToken}})
            } 
            
            res.status(201).json({message : 'Login successful', accessToken: accessToken}); // return message and login tokens
        } else {
            res.status(401).json({error: 'Login unauthorized'});  
        }
    } catch(err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

router.post('/register', async(req, res) => {
    try {
        const existingFighter = await Fighter.findOne({ email: req.body.email });
        if (!existingFighter) { // if fighter doesn't already exist, proceed
            const fighter = new Fighter(req.body);
            const hashPassword = await bcrypt.hash(fighter.password, 10); // generate password hash and salt
            fighter.password = hashPassword; // replace unencrypted password with encrypted one
            await fighter.save();
        } else {
            return res.status(409).json({ error: 'Fighter already exists' });
        }
        const user = { email: req.body.email}; // create fighter user object
        const accessToken = generateAccessToken(user); // create access token
        let userToken = await Token.findOne({user: user.email})
        if (!userToken) {
            const newToken = new Token({ user: user.email, token: accessToken });
            await newToken.save()
        } else {
            await Token.updateOne({user: user.email}, {$set: {token: accessToken}})
        } 

        return res.status(201).json({message: 'Fighter created successfully', accessToken: accessToken})
    } catch(err) {
        console.error(err)
        return res.status(500).json({error: err.message})
    }
});

// get user by access token
router.get('/:token', async (req, res) => {
    try {
        const token = await Token.findOne({token: req.params.token});
        if(!token) {
            return res.status(404).json({error: 'Token not found'}); // resource not found
        }
        res.status(200).json(token.user);               // request successful
    } catch (err) {
        res.status(500).json({error: err.message});  // internal server error
    }
});

// authenticate access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] // authorization header that contains the token
    const token = authHeader && authHeader.split(' ')[1] // if we have an authHeader, then return the token portion of the Bearer token, or return undefined
    if(token == null) {
        return res.status(401).json({error: 'Token not found, access unauthorized'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {     // verify token, takes callback that takes value we serialized (fighter user object)
        if(err) {
            return res.status(403).json({error: 'Token invalid, access unauthorized'})
        }
        req.user = user;
        next();
    }) 
};

// generate access token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'}); // return access token that expires in xxx time
}

// delete refresh token (user logout)
router.delete('/logout', async (req, res) => {
    validTokens = await Token.findOne({type: 'authentication'})
    validTokens.tokens.filter(token => token !== req.body.token); // check to make sure the tokens stored are not equal to the token we send in request body
    res.status(204).send();
});

module.exports = {router, authenticateToken, generateAccessToken};