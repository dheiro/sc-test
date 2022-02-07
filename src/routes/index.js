const { Router } = require('express');
const authRouter = require('./auth');
const userRouter = require('./users');
const { authenticateAccessToken } = require('../middleware');

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', authenticateAccessToken, userRouter);
routes.get('/', (req, res) => {
  res.send('Simple Event Rest API CRUD');
});

module.exports = routes;
