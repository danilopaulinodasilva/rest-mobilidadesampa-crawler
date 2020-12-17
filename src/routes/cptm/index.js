const express = require('express'),
    routes = express.Router();

const CptmController = require('../../app/controllers/CptmController');

routes
    .get('/status', CptmController.getAllStatus)
    .get('/status/:linha', CptmController.getStatusByLine)
    .post('/status', CptmController.saveAllStatusLines)

module.exports = routes;
