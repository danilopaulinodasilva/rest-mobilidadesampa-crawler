const { response } = require("express");
const CptmModel = require("../models/CptmModel");

class CptmService {

    constructor() {
        // reaproveitar alguma coisa dentro da Classe
    }

    saveAllStatusLines() {

        await axios.get('http://www.cptm.sp.gov.br/Pages/Home.aspx', { headers: { 'Content-Type': 'text/plain' } })

            .then((res) => {

                const dom = new JSDOM(res.data);

                // USANDO O "PERIGOSO" EVAL É EXTRAÍDO O CÓDIGO HTML

                eval(dom.window.destaques);
                // console.log(dom.window.destaques.getElementsByClassName("situacao_linhas")[0].innerHTML);
                // console.log(dom.window.destaques.getElementsByClassName("rubi")[0].getElementsByClassName("nome_linha")[0].innerHTML);
                // console.log(dom.window.destaques.getElementsByClassName("col-xs-4").length);

                // CRIA O ARRAY VAZIO

                var statusLinhasJSON = [];
                var divLinha = dom.window.destaques.getElementsByClassName("col-xs-4");

                // LOOP PARA ADICIONAR TODAS AS LINHAS NO ARRAY

                var i = 0;

                for (i = 0; i < divLinha.length; i++) {
                    statusLinhasJSON.push({
                        "linha": S(divLinha[i].getElementsByClassName("nome_linha")[0].innerHTML).capitalize().s,
                        "status": divLinha[i].getElementsByTagName("span")[1].innerHTML,
                        "mensagem": divLinha[i].getElementsByTagName("span")[1].getAttribute("data-original-title"),
                        "codigo": i + 7,
                        "descricao": ""
                    })
                }

                resolve(statusLinhasJSON);

            })

            .catch((err) => {
                console.log("CptmModel.js line 47", err);
                reject(err);
            });

    }

    // must call model and save in mongodb

    returnByLine(code) {

        return new Promise(async (resolve, reject) => {

            await CptmModel.getStatusLinhas()

                .then((response) => {

                    console.log(response);

                    // FAZ A PESQUISA DENTRO DO ARRAY

                    function filterByLine(array, code) {
                        return array.filter(function (line) {
                            return line.codigo == code;
                        })
                    };

                    // RETORNA O STATUS DE ACORDO COM A LINHA PASSADA

                    resolve(filterByLine(response, code));

                })

                .catch((err) => {
                    console.log("CptmService.js line 31", err);
                    reject(err);

                });

        })



    }

    returnAll() {

        return new Promise(async (resolve, reject) => {



        })



    }

}

module.exports = new CptmService();