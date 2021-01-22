const router = require('express').Router();
const controller = require('./controller/controller');

router.get('/categorias', controller.getCategorias);
router.post('/get/pregunta', controller.getUnaPregunta);
router.post('/responder', controller.compararPregunta);
router.post('/puntuacion', controller.calcularPuntuacion);

module.exports = router;