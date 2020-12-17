module.exports = {

    formataTelefone: (telefonecelular) => {

        var removeParentesesTelefoneCelular = telefonecelular.replace(/\(|\)/g, ''); // remove () parenteses
        var removeSeparadorTelefoneCelular = removeParentesesTelefoneCelular.replace("-", ""); // remove - hífen
        var removeEspacoTelefoneCelular = removeSeparadorTelefoneCelular.replace(/ /g, ""); // remove espaços
        
        var dddTelefone = removeEspacoTelefoneCelular.substring(0,2);
        var telefone = removeEspacoTelefoneCelular.substring(10, 2);
        
        return {length:10,ddd:dddTelefone,numero:telefone}

    }

}
