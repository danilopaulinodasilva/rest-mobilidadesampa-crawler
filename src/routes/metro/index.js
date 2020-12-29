const express = require('express'),
    routes = express.Router();

const MetroController = require('../../app/controllers/MetroController');

routes
    .get('/status', MetroController.getAllStatusLines)
    .get('/status/:linha', MetroController.getStatusByLine)
    .post('/status', MetroController.saveAllStatusLines)
    .delete('/delete', MetroController.deleteAll) // for tests purpose

module.exports = routes;
