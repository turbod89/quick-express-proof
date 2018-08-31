const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const updatesRouter = require('./routes/updates');

const app = express();

const io = require('./socket.io');
const PollingService = require('./services/pollingService');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

/**
 * Middlewares
 * */
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Start services
 * */
const pollingService = new PollingService();
pollingService.start();

/**
 * Inject
 * */
app.use(function (req, res, next) {
    req.io = io;
    next();
});

/**
 * Routes
 * */
app.use('/', indexRouter);
app.use('/updates', updatesRouter);

/**
 * Catch 404 and forward to error handler
 * */
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * Error handler
 * */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        'errors': [
            {
                'code': 1,
                'message': 'Requested URL or method not valid.',
            },
        ],
    });
});

module.exports = app;
