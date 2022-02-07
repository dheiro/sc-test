const { Router } = require('express');
const { verifyRefreshTokenValidityFromBody } = require('../middleware/access-control');
const authController = require('../controllers/auth');

const router = Router();

router.post('/login', authController.login);
router.post('/refresh-token', verifyRefreshTokenValidityFromBody, authController.refreshToken);

module.exports = router;
