var express = require('express');
var router = express.Router();
var fs = require('fs/promises'); // Importer fs/promises for at bruge async/await med filsystemet

router.get('/read-file', async function(req, res, next) {
  try {
      // fs.readFile() returnerer en Promise, og await venter på resultatet
      const data = await fs.readFile('data/file.txt', 'utf8');
      res.status(200).send(data);
  } catch (err) {
      res.status(500).send('Kunne ikke læse filen');
  }
});

module.exports = router;
