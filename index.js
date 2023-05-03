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

// Create new band - POST
app.post('/bands', (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const genre = req.body.genre;

    const statement = db.prepare('INSERT INTO bands (name, genre) VALUES (?, ?)');
    const result = statement.run(name, genre);

    //return result
    res.json(result);

    });

// Get one
app.get('/bands/:id', (req, res) => {
    // Get single band
    const band = db.prepare('SELECT * FROM bands WHERE id =?')

    //Return json or error
    res.json(band || {error: 'No such band'});

});

app.listen(3000, () => {console.log('Server started on port 3000')
});