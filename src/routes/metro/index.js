const express = require('express'),
    routes = express.Router();

const MetroController = require('../../app/controllers/MetroController');
const MetroModel = require("../../app/models/MetroModel");

routes
    .get('/', async (req,res) => { const data = await MetroModel.getAllStatusLines(); res.render('metro.ejs', {metro: data}) })
    .post('/status', MetroController.getAllStatusLines)
    .get('/status/:linha', MetroController.getStatusByLine)
    .post('/status', MetroController.saveAllStatusLines)
    .delete('/delete', MetroController.deleteAll) // for tests purpose

module.exports = routes;
