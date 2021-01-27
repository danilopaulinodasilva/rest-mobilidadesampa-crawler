const express = require('express'),
    routes = express();

const CptmModel = require("../app/models/CptmModel");
const MetroModel = require("../app/models/MetroModel");

routes.get("/", async (req,res) => { const dataCptm = await CptmModel.getAllStatusLines(); const dataMetro = await MetroModel.getAllStatusLines(); res.render('index.ejs', {cptm: dataCptm, metro: dataMetro }) });
routes.use("/cptm", require("./cptm"));
routes.use("/metro", require("./metro"));

module.exports = routes;
