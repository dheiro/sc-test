const { Router } = require('express');
const { isAdmin, onlyMe } = require('../middleware');
const userController = require('../controllers/user');

const router = Router();

router.post('/', isAdmin, userController.createUser);
router.get('/', isAdmin, userController.getUsers);
router.get('/:id', onlyMe, userController.getUser);
router.put('/:id', isAdmin, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;
