const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./server/api');
const mongoose = require('mongoose');
const config = require('./server/config');
const Url = require('./server/models/url');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

const app = express();
app.use(cors());

// Porrt number
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api', api);


// catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// Start server
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
