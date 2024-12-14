const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

// 1- MiddleWares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json()); // Middleware -> Modify incoming Req
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// 2- Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;