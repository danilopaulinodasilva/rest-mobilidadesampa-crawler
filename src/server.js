require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const tasks = require('./app/tasks/Tasks');

class Server {

    constructor() {
        this.server = express();
        this.cors();
        this.middlewares();
        this.routes();
        this.tasks();
    }

    middlewares() {
        this.server.use(express.json());
    }

    tasks() {
        tasks.cptm();
    }

    cors() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }

}

module.exports = new Server().server;
