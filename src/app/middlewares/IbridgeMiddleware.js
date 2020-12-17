const axios = require('axios');

const conexao = require('../../config/mysql');
const DataHelper = require("../helpers/data");
const CapitalizeHelper = require("../helpers/capital");

const lista_id = process.env.IBRIDGE_LIST;

module.exports = {
    
    insert: (lastid,nome,email,celular,datadenascimento,sexo,jatrabalhou) => {
        
        return new Promise((resolve, reject) => {
            
            console.log("insertIbridge()", lastid);
            
            let jaTrabalhou = "";
            
            if(jatrabalhou == "true") {
                jaTrabalhou = "Sim";
            } else {
                jaTrabalhou = "Não";
            }
            
            var url = encodeURI(`http://indenizaja-crm.ibridge.net.br/api/v2/?k=53ArORJvlgWP17OBMjZrZhZvV4TXNlu4&m=contatos&a=adicionar&operacao_id=4&campanha_id=4&lista_id=${lista_id}&contato_codigo=${lastid}&contato_nome=${nome}&contato_email=${email}&contato_telefone_1=${celular}&contato_data_nascimento=${datadenascimento}&contato_ja_trabalhou=${jaTrabalhou}&contato_sexo=${CapitalizeHelper.capitalize(sexo)}&chamada_retorno=-1`);
            
            axios.post(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            
            .then((response) => {

                console.log("insertIbridge() -> .then", lastid);
                
                // SALVA RESPOSTA DA API
                
                // precisa ser promise??? e se a query falhar? 14/09/2020 18:25 

                conexao.query(`UPDATE leads SET 
                ibridge = ?
                WHERE id = ?`, [JSON.stringify(response.data), lastid], (error, results, fields) => {
                    console.log("Resultado do INSERT na IBRIDGE", lastid);
                    resolve(lastid);
                
                });
            
            })
            
            .catch((error) => {
                console.log(error);
            });
            
        });
        
    },
    
    contracts: (lastid,nome,email,celular,contratos) => {
        
        return new Promise((resolve, reject) => {
            
            console.log("updateIbridge()", lastid);
            
            const contratosJson = JSON.parse(contratos);
            let contato_contratos = ""; 
            
            for (let index = 0; index < contratosJson.length; index++) {
                contato_contratos += `${DataHelper.sqlDate(contratosJson[index].inicio)}%26%26%26${DataHelper.sqlDate(contratosJson[index].fim)}%26%26%26${contratosJson[index].regime}@@@`;
                
            }
            
            const contato_contratos_slice = contato_contratos.slice(0,-3);
            
            var url = encodeURI(`http://indenizaja-crm.ibridge.net.br/api/v2/?k=53ArORJvlgWP17OBMjZrZhZvV4TXNlu4&m=contatos&a=adicionar&operacao_id=4&campanha_id=4&lista_id=${lista_id}&contato_codigo=${lastid}&contato_nome=${nome}&contato_email=${email}&contato_telefone_1=${celular}&contato_contratos=${contato_contratos_slice}&chamada_retorno=-1`);
            
            axios.post(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            
            .then((response) => {
                console.log("updateIbridge() -> .then", lastid);
                console.log("ibridge update",response.data);
                
                // SALVA RESPOSTA DA API

                // precisa ser promise??? e se a query falhar? 14/09/2020 18:25 
                
                conexao.query(`UPDATE leads SET 
                ibridge = ?
                WHERE id = ?`, [JSON.stringify(response.data), lastid], (error, results, fields) => {
                    resolve(response.data);
                    
                });
                
            })
            
            .catch((error) => {
                reject(error);
            })
            
        });
        
    },
    
    finish: (lastid,nome,email,celular,status) => {
        
        return new Promise((resolve, reject) => {
            
            console.log("finishIbridge()", lastid);
            
            var url = encodeURI(`http://indenizaja-crm.ibridge.net.br/api/v2/?k=53ArORJvlgWP17OBMjZrZhZvV4TXNlu4&m=contatos&a=adicionar&operacao_id=4&campanha_id=4&lista_id=${lista_id}&contato_codigo=${lastid}&contato_nome=${nome}&contato_email=${email}&contato_telefone_1=${celular}&contato_finalizou_cadastro=${status}&chamada_retorno=-1`);
            
            axios.post(url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            
            .then((response) => {
                console.log("finishIbridge() -> .then", lastid);
                resolve(response);
                console.log("ibridge finish",response.data);
                
                // sql here
                // precisa ser promise??? e se a query falhar? 14/09/2020 18:25 
                
            })
            
            .catch((error) => {
                reject(error);
                
            });
            
        });
        
    }
    
}
