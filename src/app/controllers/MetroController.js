const MetroModel = require('../models/MetroModel');

class MetroController {

    async saveAllStatusLines(req, res) {
        
        await MetroModel.saveAllStatusLines(req.body)

            .then((response) => {
                res.sendStatus(200);
                
            })

            .catch((err) => {
                console.log("MetroController.js line 15", err);
                res.sendStatus(500);

            });
    }

    async getAllStatusLines(req, res) {

        await MetroModel.getAllStatusLines()

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("MetroController.js line 31", err);
                res.sendStatus(500);

            });

    }

    async getStatusByLine(req, res) {

        await MetroModel.getStatusByLine(req.params.linha)

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("MetroController.js line 48", err);
                res.sendStatus(500);

            });

    }

    async deleteAll(req,res) {

        await MetroModel.deleteAll()

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("MetroController.js line 65", err);
                res.sendStatus(500);

            });

    }

}

module.exports = new MetroController();
