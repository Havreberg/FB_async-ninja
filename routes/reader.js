const express = require('express');
const router = express.Router();
const fs = require('fs/promises'); // Importer fs/promises for at bruge async/await med filsystemet
const emitter = require('../EventEmitter');

router.get('/', async function(req, res, next) {
  try {
      // fs.readFile() returnerer en Promise, og await venter på resultatet
      const data = await fs.readFile('data/data.json', 'utf8');
      emitter.emit('file-access', { action: 'read', file: 'data.json' });
      res.status(200).send(data);
  } catch (err) {
      res.status(500).send('Kunne ikke læse filen');
  }
});

module.exports = router;
