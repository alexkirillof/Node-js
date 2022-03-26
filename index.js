const fs = require('fs'),
    { Transform } = require('stream');
ACCESS_LOG = './access.log';


import fs from 'fs';
import readline from 'readline';
import { Stream } from 'stream';
const parseFile = './access_tmp.log';

let ip = process.argv.slice(2);
const newStream = fs.createReadStream(parseFile, 'utf-8');
const outStream = new Stream();
const readLineFromStream = readline.createInterface(newStream, outStream);
const writeStreams = {};

if (ip.length == 0) {
    ip = ['89.123.1.41', '34.48.240.111'];
}

ip.forEach((ip) => {
    writeStreams[ip] = fs.createWriteStream(`${ip}_requests.log`, {
        encoding: 'utf-8',
        flags: 'a'
    });

});

readLineFromStream.on('line', (line) => {
    if (line.length == 0) { return; }

    ip.forEach((ip) => {
        if (line.indexOf(ip) !== -1) {
            writeStreams[ip].write(line + '\n');
        }
    });
});