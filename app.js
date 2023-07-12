// 'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// import Routes
const apiRouter = require('./routes/api.js'); 
app.use('/api', apiRouter);


// INIT
  const init = () => {
  app.listen(3000, (err) =>
    console.log(err || 'Server läuft: http://localhost:3000')
  );
};

init();