module.exports = {

    validaCep: (cep) => {

        const regexObj = /^\d{5}-?\d{3}$/g;
        return regexObj.test(cep);

    },
    
    formataCep: (cep) => {

        var cepRaw = cep.replace("-", ""); // remove - hífen
        var cepSpace = cepRaw.replace(/ /g, ""); // remove espaços
        var cepPre = cepSpace.substring(0,5); // 05424
        var cepPos = cepSpace.substring(5) // 010

        return `${cepPre}-${cepPos}` // 05424-010

    }

}
