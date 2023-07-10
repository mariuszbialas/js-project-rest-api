'use strict';
// require('dotenv').config();

import express from 'express';
const app = express();

// couchDB CONNECTION
import nano from 'nano';
const db = nano('http://admin:alfa@127.0.0.1:5984').db;
const dbName = 'calendar';

import apiRouter from './routes/api.js';

app.use(express.json());

// ROUTES
app.get('/api', (req, res) => {
    db.list()
      .then((res) => {
        if (!res.includes(dbName)) {
          db.create(dbName);
          console.log('Databas created successfully');
        } else {
          console.log('Databse connecion');
        }
      })
      .catch(console.warn);
  
      // db.get('calendar').then(data=> res.json(data));
  
      db.use(dbName)
          .list({include_docs: true})
          .then(res => res.rows.map(row => row.doc))
          .then(data => res.json(data));
      
  });


const init = () => {
  app.listen(3000, (err) =>
    console.log(err || 'Server läuft: http://localhost:3000')
  );
};

init();
