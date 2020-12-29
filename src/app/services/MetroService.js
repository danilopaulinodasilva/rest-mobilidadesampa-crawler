const S = require('string');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const MetroModel = require("../models/MetroModel");

class MetroService {

    saveAllStatusLines() {

        return new Promise(async (resolve, reject) => {

            const metroUrl = "http://www.metro.sp.gov.br/Sistemas/direto-do-metro-via4/diretodoMetroHome.aspx?id=c5c9ec99-1dce-43af-8ef4-5c987205fbf9";

            await got(metroUrl)

                .then(async response => {
                    const dom = new JSDOM(response.body);
                    const linhas = dom.window.document.querySelector('.situacao_linhas').querySelectorAll(".col-xs-4");
                    const array = [];

                    linhas.forEach((element, index) => {

                        array.push({
                            codigo: index + 7,
                            mensagem: element.getElementsByTagName("span")[1].getAttribute("data-original-title") ? element.getElementsByTagName("span")[1].getAttribute("data-original-title") : element.querySelector(".status_normal").innerHTML,
                            status: element.querySelector(".status_normal").innerHTML,
                            linha: S(element.querySelector(".nome_linha").innerHTML).capitalize().s,
                            descricao: ""
                        });

                    });

                    await MetroModel.saveAllStatusLines({
                            situacao: array
                        })

                        .then((response) => {
                            console.log('save successful in mongodb');
                            resolve(response);

                        })

                        .catch((err) => {
                            console.log("MetroService.js line 48", err);
                            reject(err);

                        });

                })

                .catch(err => {
                    console.log("MetroService.js line 56", err);
                    reject(err);

                });

        })
    };

}

module.exports = new MetroService();
