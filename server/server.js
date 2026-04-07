const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();
app.use(bodyParser.json()); 


app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
  const movies = require('./movie-model');

app.get('/movies', function (req, res) {
    res.json(Object.values(movies));
});

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const movie = movies[req.params.imdbID];

    if (movie) {
        res.json(movie);
    } else {
        res.sendStatus(404);
    }
});

app.put('/movies/:imdbID', function (req, res) {
    const id = req.params.imdbID;

    if (movies[id]) {
        movies[id] = req.body;
        res.sendStatus(200);
    } else {
        movies[id] = req.body;
        res.status(201).json(req.body);
    }
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

