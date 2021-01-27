const S = require('string');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const CptmModel = require("../models/CptmModel");

class CptmService {

    saveAllStatusLines() {

        return new Promise(async (resolve, reject) => {

            const cptmUrl = "https://www.cptm.sp.gov.br/Pages/Home.aspx";

            await got(cptmUrl)

                .then(async response => {
                    const dom = new JSDOM(response.body);
                    const linhas = dom.window.document.querySelector('.situacao_linhas').querySelectorAll(".col-xs-4");
                    const array = [];

                    linhas.forEach((element, index) => {

                        const status = element.querySelector(".status_normal").innerHTML;

                        array.push({
                            codigo: index + 7,
                            mensagem: element.getElementsByTagName("span")[1].getAttribute("data-original-title") ? element.getElementsByTagName("span")[1].getAttribute("data-original-title") : element.querySelector(".status_normal").innerHTML,
                            status: status, //.replace("Operação ",""),
                            linha: S(element.querySelector(".nome_linha").innerHTML).capitalize().s,
                            descricao: ""
                        });

                    });

                    await CptmModel.saveAllStatusLines({
                            situacao: array
                        })

                        .then((response) => {
                            console.log('CtpmService.js line 40 save successful in mongodb');
                            resolve(response);

                        })

                        .catch((err) => {
                            console.log("CtpmService.js line 48", err);
                            reject(err);

                        });

                })

                .catch(err => {
                    console.log("CtpmService.js line 56", err);
                    reject(err);

                });

        })
    };

}

module.exports = new CptmService();
