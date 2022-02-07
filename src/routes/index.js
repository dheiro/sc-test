const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Simple Event Rest API CRUD');
});

module.exports = routes;
