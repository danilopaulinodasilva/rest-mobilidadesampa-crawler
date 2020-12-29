const CptmModel = require('../models/CptmModel');

class CptmController {

    async saveAllStatusLines(req, res) {
        
        await CptmModel.saveAllStatusLines(req.body)

            .then((response) => {
                res.sendStatus(200);
                
            })

            .catch((err) => {
                console.log("CptmController.js line 15", err);
                res.sendStatus(500);

            });
    }

    async getAllStatusLines(req, res) {

        CptmModel.getAllStatusLines()

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("CptmService.js line 31", err);
                res.sendStatus(500);

            });

    }

    async getStatusByLine(req, res) {

        CptmModel.getStatusByLine(req.params.linha)

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("CptmService.js line 48", err);
                res.sendStatus(500);

            });

    }

    async deleteAll(req,res) {

        CptmModel.deleteAll()

            .then((response) => {
                res.json(response);

            })

            .catch((err) => {
                console.log("CptmController.js line 65", err);
                res.sendStatus(500);

            });

    }

}

module.exports = new CptmController();
