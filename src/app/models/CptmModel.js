const axios = require("axios");
const { response } = require("express");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const S = require('string');

const CptmSchema = require("../schemas/Cptm");

class Cptm {

    // persist in mongodb the data

    saveAllStatusLines(body) {

        return new Promise(async (resolve, reject) => {
            const ctpm = CptmSchema(
                {
                    "descricao": body.descricao,
                    "codigo": body.codigo,
                    "mensagem": body.mensagem,
                    "status": body.status,
                    "linha": body.linha
                }
            );

            await ctpm.save()
                .then((response) => resolve(response))
                .catch((err) => {
                    console.log(err);
                    reject(err)
                });

        });

    }

    // return from mongodb 

    getStatusLines() {
        return new Promise(async (resolve, reject) => {



        });

    }

    // filter from mongodb

    getStatusByLine() {

    }

}

module.exports = new Cptm();
