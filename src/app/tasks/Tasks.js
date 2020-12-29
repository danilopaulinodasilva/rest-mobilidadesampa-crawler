const CptmService = require('../services/CptmService');
const MetroService = require('../services/MetroService');

module.exports = {

    cptm: () => {

        const args = "";
        const cptmTaskResolution = (args, period) => {
            return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    CptmService.saveAllStatusLines()
                        .then((data) => {
                            // console.log("tasks/index.js 13", data)
                            if (data === 'failure') {
                                clearInterval(interval);
                                reject(Error('fail'));
                            } else if (data === 'success') {
                                resolve('complete')
                            }
                            // keep on waiting
                        });
                }, period);
            });
        };

        // each 1 min save 

        cptmTaskResolution(args, 60000)
            .then((data) => { console.log(data) })
            .catch((err) => { console.log("Tasks.js line 30", err) });

    },

    metro: () => {

        const args = "";
        const metroTaskResolution = (args, period) => {
            return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    MetroService.saveAllStatusLines()
                        .then((data) => {
                            // console.log("tasks/index.js 13", data)
                            if (data === 'failure') {
                                clearInterval(interval);
                                reject(Error('fail'));
                            } else if (data === 'success') {
                                resolve('complete')
                            }
                            // keep on waiting
                        });
                }, period);
            });
        };

        // each 1 min save 

        metroTaskResolution(args, 60000)
            .then((data) => { console.log(data) })
            .catch((err) => { console.log("Tasks.js line 60", err) });
            
    }

}
