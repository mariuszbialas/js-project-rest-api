'use strict';

require('dotenv').config();

const express = require('express');
const router = express.Router();

// couchDB CONNECTION
const db = require('nano')(process.env.URL).db;
const dbName = 'calendar';
const monthID = '4c379d1cb2ae152f0e7d17472c000f51';
const yearID = '7f2088534cf89ba1d6dfa298230018c5';

// Dataien von Databank auslesen
const dataFromDB = async (id) => {
  const data = await db.use(dbName).get(id, { include_docs: true });
  delete data._id;
  delete data._rev;
  return data;
};

// Ausegelesene Dateien in eienem Objekt spiechern
const fetchData = async () => {
  try {
    const years = await dataFromDB(yearID);
    const months = await dataFromDB(monthID);
    const data = { months, years };
    return data;
  } catch (err) {
    console.error('UPS...', err);
  }
};

// API Haupt Router
router.get('/', (req, res) => {
  const data = fetchData();
  if (data)
    data.then((data) => res.status(200).json(data)).catch(console.warn);
  else
    res.status(404).send({ error: 'ungültiger Pfad' });
});

// Monate Routers
router.get('/months/:month', (req, res) => {
  let month = req.params.month;
  month = month.charAt(0).toUpperCase() + month.slice(1);
  const data = fetchData();
  data
    .then((data) => {
      if (data.months[month])
        res.status(200).json({ month: month, ...data.months[month] });
      else
        res.status(404).send({
          error: 'ungültiger Pfad',
          path: '.../api/months/' + req.params.month + ': nicht gefunden!',
        });
    })
    .catch(console.warn);
});
router.get('/months', (req, res) => {
  const data = fetchData();
  data.then((data) => res.status(200).json(data.months)).catch(console.warn);
});

// Jahr Routers
router.get('/years/:year', (req, res) => {
  let year = req.params.year;
  const data = fetchData();
  data
    .then((data) => {
      if (data.years[year])
        res.status(200).json({ year: year, ...data.years[year] });
      else
        res.status(404).send({
          error: 'ungültiger Pfad',
          path: '.../api/years/' + req.params.year + ': nicht gefunden!',
        });
    })
    .catch(console.warn);
});
router.get('/years', (req, res) => {
  const data = fetchData();
  data.then((data) => res.status(200).json(data.years)).catch(console.warn);
});

// Not gültiger Pfad
router.use((req, res) => {
  res.status(404).send({ error: 'ungültiger Pfad' });
});


module.exports = router;