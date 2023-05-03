//imoprt database driver
const dbDriver = require('better-sqlite3');

// Connect to db
const db = dbDriver ('bands.sqlite3');

// Import express
const express = require ('express');

// Create express app
const app = express();

// Configure express
app.use(express.static('frontend'));
app.use(express.json());

/* Bulilding the REST API */

// Get all
app.get('/bands', (req, res) => {
    // Query all bands
    const bands = db.prepare('SELECT * FROM bands').all();

    //return bands in JSON
    res.json(bands);
});

// Get one
app.get('/bands/:id', (req, res) => {
    // Get single band
    const band = db.prepare('SELECT * FROM bands WHERE id =?')

    //Return json or error
    res.json(band || {error: 'No such band'});

});


;