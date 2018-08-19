const express = require('express');
const app = express();
const drugRouter = require('../api/routers/drugs');

app.use('/drugs', drugRouter);

module.exports = app;