const express = require('express');
const placaController = require('../controllers/placa');
let router = express.Router();
const auth = require('../middlewares/auth');

router.post('/', placaController.nuevaPlaca);
router.get('/myPlate', placaController.listarPlacas);

module.exports = router;