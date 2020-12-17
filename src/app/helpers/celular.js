module.exports = {

    formataCelular: (telefonecelular) => {

        var telefoneCelularRaw = telefonecelular;
        var removeParentesesTelefoneCelular = telefoneCelularRaw.replace(/\(|\)/g, ''); // remove () parenteses
        var removeSeparadorTelefoneCelular = removeParentesesTelefoneCelular.replace("-", ""); // remove - hífen 
        var removeEspacoTelefoneCelular = removeSeparadorTelefoneCelular.replace(/ /g, ""); // remove espaços
            
        var dddCelular = removeEspacoTelefoneCelular.substring(0,2);
        var celular = removeEspacoTelefoneCelular.substring(11, 2);
        
        return {length:11,ddd:dddCelular,numero:celular}

    }

}
