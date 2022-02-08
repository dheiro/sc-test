const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const router = Router();
const swaggerDoc = YAML.load('./swagger.yaml');

router.use('/', swaggerUi.serve, (req, res) => {
  swaggerUi.setup(swaggerDoc)(req, res);
});

module.exports = router;
