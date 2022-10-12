const express = require('express');
const controller = require('./controller');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', controller);

module.exports = app;
