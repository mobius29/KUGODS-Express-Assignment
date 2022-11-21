const express = require('express');
const controller = require('./controller');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', controller);

module.exports = app;
