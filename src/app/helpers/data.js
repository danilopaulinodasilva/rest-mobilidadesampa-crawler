module.exports = {

    today: () => {
        
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;

    },

    sqlDate: (date) => {

        const dateSplit = date.split("/");
        
        const datetDay = dateSplit[0];
        const dateMonth = dateSplit[1];
        const dateYear = dateSplit[2];
    
        return `${dateYear}-${dateMonth}-${datetDay}`;

    }

}
