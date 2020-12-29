const express = require('express'),
    routes = express();

routes.use("/cptm", require("./cptm"));
routes.use("/metro", require("./metro"));

module.exports = routes;
