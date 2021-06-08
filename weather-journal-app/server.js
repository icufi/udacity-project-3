


// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// const bodyParser = require('body-parser'); deprecated
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, () => console.log(`server is listening on port ${port}`));

app.get('/projectdata', (req, res) => res.send(projectData));
app.post('/weatherdata', saveWeather)

function saveWeather(req, res) {
  let data = req.body;
  // console.log(data)
  let newEntry = {
    temperature: data.temperature,
    date: data.date,
    feeling: data.feeling
  };
  projectData.push(newEntry);
  console.log(projectData);
};









