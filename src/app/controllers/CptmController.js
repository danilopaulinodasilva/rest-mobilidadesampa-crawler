const CptmModel = require('../models/CptmModel');

class CptmController {

    async getAllStatus(req, res) {
        CptmModel.getStatusLinhas()

            .then((response) => {
                // console.log(response);
                // RETORNA TUDO
                res.json(response);

            })

            .catch((err) => {
                console.log("CptmService.js line 47", err);
                res.sendStatus(500);

            });

    }

    getStatusByLine(req, res) {

        CptmModel.getStatusByLine()

            .then((response) => {
                // console.log(response);
                // RETORNA TUDO
                res.json(response);

            })

            .catch((err) => {
                console.log("CptmService.js line 47", err);
                res.sendStatus(500);

            });

        res.send(CptmService.returnByLine(req.params.linha));

    }

    async saveAllStatusLines(req, res) {
        await CptmModel.saveAllStatusLines(req.body)

            .then((response) => {
                res.sendStatus(200);
            })

            .catch((err) => {
                res.sendStatus(500);
            });
    }

}

module.exports = new CptmController();
