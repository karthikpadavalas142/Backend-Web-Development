const fs = require('fs');
const path = require('path');
const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');
function readWholeFile() {
  fs.readFile(INPUT, (error, data) => {
    if (error) { console.error('readFile error:', error); return; }
    console.log(`readFile: loaded ${data.length} bytes into memory`);
  });
}
function streamFile() {
  const readable = fs.createReadStream(INPUT);
  const writable = fs.createWriteStream(OUTPUT);
  readable.on('error', error => console.error('stream read error:', error));
  writable.on('error', error => console.error('stream write error:', error));
  writable.on('finish', () => console.log('stream: finished copying via chunks (flat memory)'));
  readable.pipe(writable);
}
// readFile holds the entire file in memory at once, so memory use grows with file size.
// A stream processes small chunks and passes them along, keeping peak memory low and making large-file transfers more scalable.
readWholeFile();
streamFile();
module.exports = { readWholeFile, streamFile, INPUT, OUTPUT };
