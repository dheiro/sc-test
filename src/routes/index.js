const { Router } = require('express');
const userRouter = require('./users');

const routes = Router();

routes.use('/users', userRouter);
routes.get('/', (req, res) => {
  res.send('Simple Event Rest API CRUD');
});

module.exports = routes;
