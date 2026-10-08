const EventEmitter = require('events');
const fs = require('fs/promises');
const path = require('path');

const emitter = new EventEmitter();
const logPath = path.join(__dirname, 'data', 'log.txt');

// Listener: kører hver gang 'file-access' bliver udsendt
emitter.on('file-access', async ({ action, file }) => {
  const line = `[${new Date().toISOString()}] ${action} ${file}`;
  console.log(line);
  try {
    await fs.appendFile(logPath, line + '\n', 'utf8');
  } catch (err) {
    console.error('Kunne ikke skrive til logfilen', err);
  }
});

module.exports = emitter;
