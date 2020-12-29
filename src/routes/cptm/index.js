const express = require('express'),
    routes = express.Router();

const CptmController = require('../../app/controllers/CptmController');

routes
    .get('/status', CptmController.getAllStatusLines)
    .get('/status/:linha', CptmController.getStatusByLine)
    .post('/status', CptmController.saveAllStatusLines)
    .delete('/delete', CptmController.deleteAll) // for tests purpose

module.exports = routes;
