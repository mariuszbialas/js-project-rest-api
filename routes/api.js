require('dotenv').config();

const express = require('express');
const router = express.Router();

// couchDB CONNECTION
const db = require('nano')(process.env.URL).db;
const dbName = 'calendar';
const dbID = '4c379d1cb2ae152f0e7d17472c000f51';

router.get('/', (req, res) => {

  db.use(dbName)
    .get(dbID, { include_docs: true })
    .then(data => {
      delete data._id;
      delete data._rev;
      res.status(200).json(data);
    })
    .catch(console.warn);
    
});
 
router.get('/:query', (req, res) => {
  db.use(dbName)
    .get(dbID, { include_docs: true })
    .then(doc => {
      const data = doc[req.params.query];
      if (data) res.status(200).json(data);
      else res.status(404).send({ message: 'ungültige Daten' });
    })
    .catch(console.warn);
});

module.exports = router;
