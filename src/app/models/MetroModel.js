const MetroSchema = require("../schemas/MetroSchema"); // esse é o model

class Metro {

    // persist in mongodb the data

    saveAllStatusLines(body) {

        return new Promise(async (resolve, reject) => {

            MetroSchema.create(body)

                .then(response => {
                    resolve();
                })

                .catch(err => {
                    console.log("MetroModel.js line 18", err);
                    reject(err);

                });

        });

    }

    // return from mongodb 

    getAllStatusLines() {

        return new Promise(async (resolve, reject) => {

            MetroSchema.findOne({}, {}, {
                sort: {
                    'timestamp': -1
                }
            }, (err, post) => {
                if(err) console.log("MetroModel.js line 38", err); reject(err)
                resolve(post.situacao);
                
            });

        });

    }

    // filter from mongodb

    getStatusByLine(codigo) {

        return new Promise(async (resolve, reject) => {

            MetroSchema.findOne( {}, {}, {
                sort: {
                    'timestamp': -1
                }
            }, (err, post) => {
                if(err) console.log("MetroModel.js line 58", err); reject(err)
                resolve(post.situacao.filter(linha => linha.codigo == codigo));

            });

        });

    }

    // delete all from mongodb

    deleteAll() {

        return new Promise(async (resolve, reject) => {

            MetroSchema.deleteMany()
                .then(response => {
                    resolve(response);

                })

                .catch(err => {
                    console.log("MetroModel.js line 80", err);
                    reject(err);

                });

        });

    }

}

module.exports = new Metro();
