'use strict';

const fs = require('fs');
const path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory() && file !== 'images')
}

function getFiles(srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isFile())
}

let book = '';
const directories = getDirectories('manuscript').sort();
for (let i in directories) {
  const subDirectories = getFiles(path.join('manuscript', directories[i])).sort();
  for (let j in subDirectories) {
    book += directories[i] + '/' + subDirectories[j] + '\n';
  }
}

fs.writeFileSync('manuscript/Book.txt', book, 'utf8');
