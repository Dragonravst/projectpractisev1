const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

router.post('/login', userController.login);
router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUser);
router.post('/', validateUser, userController.createUser);
router.put('/:id', authenticate, validateUser, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;