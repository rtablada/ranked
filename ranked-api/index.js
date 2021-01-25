require('dotenv').config({
  path: '../.env',
});

require = require('esm')(module);
module.exports = require('./main.js');
