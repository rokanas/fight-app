require('dotenv').config();

const express = require("express");
const router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const Fighter = require('../models/fighter');
const Token = require('../models/token');

router.use(express.json());

let refreshTokens = [] // !!!!! may have to crete new entry in database for this

// login fighter
router.post('/login', async(req, res) => {
    const fighter = await Fighter.findOne({email : req.body.email});
    if(!fighter) {
        return res.status(404).json({error: 'Fighter not found'}); // resource not found
    }
    try {
        if (await bcrypt.compare(req.body.password, fighter.password)) {
            const user = { username: fighter.email}; // create fighter user object
            const accessToken = generateAccessToken(user); // create access token
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET); // create refresh token
            refreshTokens.push(refreshToken); // add to list of valid refresh tokens
            console.log(refreshTokens)

            res.status(200).json({message : 'Login successful', accessToken: accessToken, refreshToken: refreshToken}); // return message and login tokens
        } else {
            res.status(401).json({error: 'Login unauthorized'});  
        }
    } catch(err) {
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

// create new token
router.post('/token', async(req, res) => { 
    const refreshToken = req.body.token;
    if(refreshToken == null) {
        return res.status(401).json({error: 'Token not found, access unauthorized'});
    }
    if(!refreshTokens.includes(refreshToken)) { // is refreshToken valid i.e. does it exist in our list of valid refreshTokens?
        return res.status(403).json({error: 'Token invalid, access unathorized'});
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({error: 'Token invalid, access unathorized'});
        }
        const accessToken = generateAccessToken({ username: user.username }); // if all checks passed, create new access token
        res.status(201).json({ accessToken: accessToken });
        })
});

// delete refresh token (user logout)
router.delete('/logout', async (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token); // check to make sure the tokens stored are not equal to the token we send in request body
    console.log(refreshTokens)
    res.status(204).send();
});

module.exports = {router, authenticateToken};