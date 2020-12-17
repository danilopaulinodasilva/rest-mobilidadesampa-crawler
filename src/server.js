require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const routine = require('./app/routine/cptm');

class Server {

    constructor() {
        this.server = express();
        this.cors();
        this.middlewares();
        this.routes();
        this.routine();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routine() {
        routine.cptm();
    }

    cors() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }

}

module.exports = new Server().server;
