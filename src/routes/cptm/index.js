const datefns = require('date-fns');
const express = require('express'),
    routes = express.Router();

const CptmController = require('../../app/controllers/CptmController');
const CptmModel = require("../../app/models/CptmModel");

routes
    .get('/', async (req,res) => { const cptm = await CptmModel.getAllStatusLines(); res.render('cptm.ejs', {cptm, datefns}) })
    .post('/status', CptmController.getAllStatusLines)
    .post('/status/:linha', CptmController.getStatusByLine)
    .post('/status', CptmController.saveAllStatusLines)
    .delete('/delete', CptmController.deleteAll) // for tests purpose

module.exports = routes;
