const CptmService = require('../services/CptmService');

module.exports = {

    cptm: () => {

        const args = "";
        const taskResolution = (args, period) => {
            return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    CptmService.saveAllStatusLines()
                        .then((data) => {
                            console.log("13", data)
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

        taskResolution(args, 6000)
            .then((data) => { console.log(data) })
            .catch((err) => { console.log("??????", err) });

    }

}
