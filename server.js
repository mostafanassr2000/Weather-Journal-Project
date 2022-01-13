// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Server port
const port = 3000;

// Setup Server
const server = app.listen(port, () => console.log(port));

//Get request method
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
}

//Post request method
app.post('/post', postData);

function postData(req, res) {
    projectData = req.body;
    res.send(projectData);
    console.log(req.body);
}