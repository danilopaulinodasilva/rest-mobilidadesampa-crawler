require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path')
const routes = require('./routes');
const tasks = require('./app/tasks/Tasks');

class Server {

    constructor() {
        this.server = express();
        this.cors();
        this.middlewares();
        this.routes();
        this.tasks();
        this.ejs();
        this.public();
    }

    middlewares() {
        this.server.use(express.json());
    }

    tasks() {
        tasks.cptm();
        tasks.metro();
    }

    cors() {
        this.server.use(cors());
    }

    routes() {
        this.server.use(routes);
    }
    
    ejs() {
        this.server.set('view engine', 'ejs');
        this.server.set('views', path.join(__dirname, 'views'));

    }

    public() {
        this.server.use(express.static(path.join(__dirname, 'public')));

    }

}

module.exports = new Server().server;
