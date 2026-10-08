var express = require('express');
var fs = require('fs').promises;
var path = require('path');
var emitter = require('../EventEmitter');
var router = express.Router();
const filePath = path.join(__dirname, '..', 'data', 'data.json');

router.post('/', async function(req, res) {
  if (!req.body || typeof req.body.content !== 'string') {
    return res.status(400).json({ error: 'Indholdet mangler eller er ikke tekst besked.' });
  }

  try {
    const data = { content: req.body.content };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    emitter.emit('file-access', { action: 'write', file: 'data.json' });
    return res.status(200).json({ message: 'Indholdet blev skrevet til filen.' });
  } catch (err) {
    return res.status(500).json({ error: 'Indholdet kunne ikke gemmes i filen. Prøv igen senere.' });
  }
});

module.exports = router;
