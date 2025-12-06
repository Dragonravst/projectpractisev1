const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { authenticate } = require('../middleware/auth');
const { validateTag } = require('../middleware/validation');

router.get('/', authenticate, tagController.getTags);
router.get('/:id', authenticate, tagController.getTag);
router.post('/', authenticate, validateTag, tagController.createTag);
router.put('/:id', authenticate, validateTag, tagController.updateTag);
router.delete('/:id', authenticate, tagController.deleteTag);

module.exports = router;