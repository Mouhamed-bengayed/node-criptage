const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const reclamationController = require('../controller/reclamationController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', verifyJWT, reclamationController.addReclamation);
router.get('/', verifyJWT, verifyAdmin, reclamationController.getAllReclamation)
router.get('/:id', verifyJWT, verifyAdmin, reclamationController.getReclamationById);

module.exports = router;
