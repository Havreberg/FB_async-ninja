var express = require('express');
var fs = require('fs').promises;
var path = require('path');
var router = express.Router();
var filePath = path.join(__dirname, '..', 'data', 'data.json');

router.post('/', async function(req, res) {
  if (!req.body || typeof req.body.content !== 'string') {
    return res.status(400).json({ error: 'Feltet content skal findes og være en tekststreng.' });
  }

  try {
    var data = { content: req.body.content };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return res.status(200).json({ message: 'Indholdet blev skrevet til filen.' });
  } catch (err) {
    return res.status(500).json({ error: 'Kunne ikke skrive til filen. Prøv igen senere.' });
  }
});

module.exports = router;
