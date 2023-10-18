const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const employerController = require('../controller/employerController');

router.get('/curent',verifyJWT, employerController.getCurentEmployer);
router.get('/',verifyJWT, employerController.getAllEmployers);
router.get('/:id',verifyJWT, employerController.getEmployerById);
router.get('/find/:employer',verifyJWT, employerController.find);
router.put('/:id',verifyJWT, employerController.updateEmployer);
router.delete('/:id', verifyJWT,employerController.deleteEmployer);

module.exports = router;
