require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const schedule = require('./app/schedule/CptmSchedule');

class Server {

    constructor() {
        this.server = express();
        this.cors();
        this.middlewares();
        this.routes();
        this.schedule();
    }

    middlewares() {
        this.server.use(express.json());
    }

    schedule() {
        schedule.cptm();
    }

    cors() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }

}

module.exports = new Server().server;
