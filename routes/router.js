const express = require('express');
const router = express.Router();

const eventosRoutes = require('./eventosRoutes');
const categoriasRoutes = require('./categoriasRoutes');

router.use('/eventos', eventosRoutes);
router.use('/categorias', categoriasRoutes);

module.exports = router;