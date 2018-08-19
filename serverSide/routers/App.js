const express = require('express');
const app = express();
const morgan = require('morgan');

const drugRouter = require('../api/routers/drugs');

app.use(morgan('dev'));

app.use('/drugs', drugRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});
app.use('/drugs', drugRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;