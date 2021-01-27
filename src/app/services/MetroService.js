const S = require("string");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const vm = require("vm");

const MetroModel = require("../models/MetroModel");
const Utils = require("../utils/Utils");

class MetroService {

    saveAllStatusLines() {

        return new Promise(async (resolve, reject) => {

            const metroUrl = "http://www.metro.sp.gov.br/Sistemas/direto-do-metro-via4/diretodoMetroHome.aspx";

            await got(metroUrl)

                .then(async response => {
                    const dom = new JSDOM(response.body);

                    const script = dom.window.document.getElementsByTagName("script");
                    const scriptArrLinhas = script[3].innerHTML;

                    const context = {}; // Creating context 
                    const vmscript = new vm.Script(scriptArrLinhas); // Calling the constructor
                    vm.createContext(context); // Contextifying object 
                    vmscript.runInContext(context); // Calling runInContext method 

                    const array = [];
                    const objArrLinhas = context.objArrLinhas;
                    const objArrL4 = context.objArrL4;

                    objArrLinhas.forEach(element => {
                        array.push({
                            "codigo": element.codigo,
                            "mensagem": Utils.decodeHtml(element.msgStatus),
                            "id": element.id,
                            "status": Utils.decodeHtml(element.status) == "Normal" ? "Operação Normal" : Utils.decodeHtml(element.status),
                            "linha": Utils.decodeHtml(Utils.removeLine(element.linha)),
                            "descricao": element.descricao
                        });
                        
                    });

                    objArrL4.forEach(element => {
                        array.push({
                            "codigo": element.codigo,
                            "mensagem": Utils.decodeHtml(element.msgStatus),
                            "id": element.id,
                            "status": Utils.decodeHtml(element.status) == "Normal" ? "Operação Normal" : Utils.decodeHtml(element.status),
                            "linha": Utils.decodeHtml(Utils.removeLine(element.linha)),
                            "descricao": element.descricao
                        });
                        
                    });

                    await MetroModel.saveAllStatusLines({
                            situacao: array
                        })

                        .then((response) => {
                            console.log('MetroService.js line 50 save successful in mongodb');
                            resolve(response);

                        })

                        .catch((err) => {
                            console.log("MetroService.js line 56", err);
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
