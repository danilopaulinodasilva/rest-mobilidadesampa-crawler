const express = require('express'),
    routes = express.Router();

const MetroController = require('../../app/controllers/MetroController');

routes
    .get('/status', MetroController.getAllStatus)
    .get('/status/:linha', MetroController.getLineStatus)

module.exports = routes;
