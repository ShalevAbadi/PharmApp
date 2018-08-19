const express = require('express');
const app = express();
const morgan = require('morgan');

const drugRouter = require('../api/routers/drugs');

app.use(morgan('dev'));
app.use('/drugs', drugRouter);

module.exports = app;