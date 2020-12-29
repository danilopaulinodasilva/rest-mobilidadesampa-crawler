const CptmSchema = require("../schemas/CptmSchema"); // esse é o model

class Cptm {

    // persist in mongodb the data

    saveAllStatusLines(body) {

        return new Promise(async (resolve, reject) => {

            CptmSchema.create(body)

                .then(response => {
                    resolve();
                })

                .catch(err => {
                    console.log("CptmModel.js line 18", err);
                    reject(err);

                });

        });

    }

    // return from mongodb 

    getAllStatusLines() {

        return new Promise(async (resolve, reject) => {

            CptmSchema.findOne({}, {}, {
                sort: {
                    'timestamp': -1
                }
            }, (err, post) => {
                if(err) {
                    console.log("CptmModel.js line 39", err); 
                    reject(err);
                } else {
                    resolve(post.situacao);

                }
                
            });

        });

    }

    // filter from mongodb

    getStatusByLine(codigo) {

        return new Promise(async (resolve, reject) => {

            CptmSchema.findOne( {}, {}, {
                sort: {
                    'timestamp': -1
                }
            }, (err, post) => {
                if(err) {
                    console.log("CptmModel.js line 64", err); 
                    reject(err);

                } else {
                    resolve(post.situacao.filter(linha => linha.codigo == codigo));

                }

            });

        });

    }

    // delete all from mongodb

    deleteAll() {

        return new Promise(async (resolve, reject) => {

            CptmSchema.deleteMany()
                .then(response => {
                    resolve(response);

                })

                .catch(err => {
                    console.log("CptmModel.js line 80", err);
                    reject(err);

                });

        });

    }

}

module.exports = new Cptm();
